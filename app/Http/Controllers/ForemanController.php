<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Planning;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use App\Models\PlottingKehadiran;

class ForemanController extends Controller
{
    //
    public function index()
    {
        $plannings = Planning::with('plottingKehadiran.employee')->orderBy('start_date', 'desc')->paginate(10);
        $employees = Employee::all(); // atau filter by group jika perlu

        return view('foreman.dashboard', compact('plannings', 'employees'));
    }

    // public function storePlotting(Request $request)
    // {
    //     $request->validate([
    //         'planning_id' => 'required|exists:plannings,id',
    //         'employee_ids' => 'required|array',
    //     ]);

    //     $planning = Planning::findOrFail($request->planning_id);

    //     $existingPlottingCount = $planning->plottingKehadiran()->count();
    //     $newPlottingCount = count($request->employee_ids);

    //     if (($existingPlottingCount + $newPlottingCount) > $planning->jumlah_karyawan) {
    //         return back()->with('error', 'Jumlah karyawan yang dipilih melebihi jumlah yang sudah direncanakan oleh supervisor.');
    //     }

    //     foreach ($request->employee_ids as $empId) {
    //         $planning->plottingKehadiran()->create([
    //             'employee_id' => $empId,
    //             'tanggal' => Carbon::today()->toDateString(),
    //             'status_konfirmasi' => null,
    //         ]);

    //         $employee = Employee::find($empId);

    //         // Format nomor (pastikan format internasional, misal: 6281234567890)
    //         $nomorTujuan = preg_replace('/^0/', '62', $employee->nomor_hp);

    //         // Kirim pesan ke bot WA (ubah URL dan payload sesuai bot Anda)
    //         Http::post('http://localhost:3000/send-message', [ // misalnya bot jalan di port 3000
    //             'number' => $nomorTujuan,
    //             'message' => "Halo *{$employee->nama_karyawan}*,\nAnda dijadwalkan masuk pada tanggal *" . Carbon::today()->format('d-m-Y') . "*. Mohon konfirmasi kehadiran dengan membalas *Hadir* atau *Tidak Hadir*.",
    //         ]);
    //     }

    //     return redirect()->route('foreman.dashboard')->with('success', 'Plotting berhasil disimpan dan notifikasi dikirim.');
    // }

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
            ], 422); // 422 untuk validasi
        }

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

            try {
                Http::timeout(5)->post('http://localhost:3000/send-message', [
                    'number' => $nomorTujuan,
                    'message' => "Halo *{$employee->nama_karyawan}*,\nAnda dijadwalkan masuk pada tanggal *" . Carbon::today()->format('d-m-Y') . "*.\nSilakan konfirmasi dengan membalas *Hadir* atau *Tidak Hadir*.",
                ]);
            } catch (\Exception $e) {
                Log::warning("Gagal kirim WA ke {$nomorTujuan}: {$e->getMessage()}");
            }
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
        return view('foreman.plotting', compact('planning', 'employees', 'plottedEmployees', 'plottingEmployeeIds'));
    }

    public function deletePlotting($id)
    {
        $plotting = PlottingKehadiran::findOrFail($id);
        $plotting->delete();

        return response()->json(['message' => 'Berhasil dihapus']);
    }
}
