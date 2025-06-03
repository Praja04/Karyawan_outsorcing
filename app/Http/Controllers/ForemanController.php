<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Planning;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\PlottingKehadiran;

class ForemanController extends Controller
{
    //
    public function dashboard()
    {
        $adminGroup = Auth::user()->admin_group; // Ambil group user yang login
        $today = now()->toDateString(); // Tanggal hari ini

        // Ambil planning yang end_date >= hari ini
        $plannings = Planning::with('plottingKehadiran.employee')
            ->where('group', $adminGroup)
            ->where('end_date', '>=', $today)
            ->orderBy('start_date', 'desc')
            ->get();

        // Ambil employees hanya dari grup yang sesuai
        $employees = Employee::where('grup', $adminGroup)->get();

        // Jika ingin return JSON
        // return response()->json(['plannings' => $plannings, 'employees' => $employees]);

        return view('staff_produksi.dashboard', compact('plannings', 'employees'));
    }

    public function data_planing()
    {
        $adminGroup = Auth::user()->admin_group; // Ambil group user yang login
        $today = now()->toDateString(); // Tanggal hari ini

        // Ambil planning yang end_date >= hari ini
        $plannings = Planning::with('plottingKehadiran.employee')
        ->where('group', $adminGroup)
            ->where('end_date', '>=', $today)
            ->orderBy('start_date', 'desc')
            ->get();

        // Ambil employees hanya dari grup yang sesuai
        $employees = Employee::where('grup', $adminGroup)->get();

        // Jika ingin return JSON
        // return response()->json(['plannings' => $plannings, 'employees' => $employees]);

        return view('staff_produksi.data_planing', compact('plannings', 'employees'));
    }


    public function storePlotting(Request $request)
    {
        $request->validate([
            'planning_id' => 'required|exists:plannings,id',
            'employee_ids' => 'required|array',
        ]);

        $planning = Planning::findOrFail($request->planning_id);

        $existingPlottingCount = $planning->plottingKehadiran()->count();
        $newPlottingCount = count($request->employee_ids);

        if (($existingPlottingCount + $newPlottingCount) > $planning->jumlah_karyawan) {
            return response()->json([
                'status' => 'error',
                'message' => 'Jumlah karyawan yang dipilih melebihi jumlah yang direncanakan.'
            ], 422);
        }

        $bulkMessages = [];

        foreach ($request->employee_ids as $empId) {
            $planning->plottingKehadiran()->create([
                'employee_id' => $empId,
                'tanggal' => Carbon::today()->toDateString(),
                'status_konfirmasi' => null,
            ]);

            $employee = Employee::find($empId);
            if (!$employee || !$employee->nomor_hp) {
                continue;
            }

            $nomorTujuan = preg_replace('/^0/', '62', preg_replace('/\D/', '', $employee->nomor_hp));

            $bulkMessages[] = [
                'number' => $nomorTujuan,
                'message' => "Halo *{$employee->nama_karyawan}*,\nAnda dijadwalkan masuk pada tanggal *" . $planning->start_date ." sampai " . $planning->end_date .  " shift : " . $planning->shift . "*.\nSilakan konfirmasi dengan membalas *Hadir* atau *Tidak Hadir*."
            ];
        }

        // Kirim semua pesan sekaligus ke Node.js via /send-bulk
        try {
            Http::timeout(10)->post('http://localhost:3000/send-bulk', [
                'messages' => $bulkMessages,
                'delayMs' => 3000 // Opsional: delay antar pesan untuk keamanan
            ]);
        } catch (\Exception $e) {
            Log::warning("Gagal kirim WA massal: " . $e->getMessage());
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Plotting berhasil disimpan dan notifikasi dikirim.'
        ]);
    }
    
    public function viewPlotting(Planning $planning)
    {
        // Ambil hanya karyawan dari grup terkait
        $employees = Employee::where('grup', $planning->group)->get();
        // Ambil ID karyawan yang sudah di-plotting
        $plottingEmployeeIds = $planning->plottingKehadiran()->pluck('employee_id')->toArray();
        $plottedEmployees = $planning->plottingKehadiran->pluck('employee_id')->toArray();
        return view('staff_produksi.plotting', compact('planning', 'employees', 'plottedEmployees', 'plottingEmployeeIds'));
    }

    public function deletePlotting($id)
    {
        $plotting = PlottingKehadiran::findOrFail($id);
        $plotting->delete();

        return response()->json(['message' => 'Berhasil dihapus']);
    }

    public function updatePlotting(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:plotting_kehadiran,id', // id plotting yang akan diupdate
            'new_employee_id' => 'required|exists:employees,id',
            'tanggal' => 'required|date',
        ]);

        $plotting = PlottingKehadiran::findOrFail($request->id);
        $planning = $plotting->planning; // relasi planning

        // Cek apakah karyawan baru sudah ada di plotting yang sama (menghindari duplikat)
        $exists = PlottingKehadiran::where('planning_id', $planning->id)
            ->where('employee_id', $request->new_employee_id)
            ->where('id', '!=', $plotting->id)
            ->exists();

        if ($exists) {
            return response()->json([
                'status' => 'error',
                'message' => 'Karyawan sudah terdaftar di plotting ini.'
            ], 422);
        }

        // Update data plotting
        $plotting->employee_id = $request->new_employee_id;
        $plotting->tanggal = $request->tanggal;
        $plotting->save();

        // Kirim notifikasi WA (opsional)
        $employee = Employee::find($request->new_employee_id);
        if ($employee && $employee->nomor_hp) {
            $nomorTujuan = preg_replace('/^0/', '62', preg_replace('/\D/', '', $employee->nomor_hp));
            $message = "Halo *{$employee->nama_karyawan}*,\nAnda dijadwalkan masuk pada tanggal *" . $planning->start_date . " sampai " . $planning->end_date .  " shift : " . $planning->shift . "*.\nSilakan konfirmasi dengan membalas *Hadir* atau *Tidak Hadir*.";

            try {
                Http::timeout(10)->post('http://localhost:3000/send-bulk', [
                    'messages' => [
                        ['number' => $nomorTujuan, 'message' => $message]
                    ],
                    'delayMs' => 3000
                ]);
            } catch (\Exception $e) {
                Log::warning("Gagal kirim WA massal saat update plotting: " . $e->getMessage());
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Plotting berhasil diperbarui dan notifikasi dikirim.'
        ]);
    }

    public function showPlotting($id)
    {
        $planning = Planning::with('plottingKehadiran.employee')->findOrFail($id);

        return view('staff_produksi.plotting_view', compact('planning'));
    }
}
