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
        // $employees = Employee::where('grup', $adminGroup)->get();
        $employees = Employee::get();

        // Jika ingin return JSON
        // return response()->json(['plannings' => $plannings, 'employees' => $employees]);

        return view('staff_produksi.data_planing', compact('plannings', 'employees'));
    }



    // public function storePlotting(Request $request)
    // {
    //     $request->validate([
    //         'planning_id'   => 'required|exists:plannings,id',
    //         'employee_ids'  => 'required|array',
    //     ]);

    //     $planning = Planning::findOrFail($request->planning_id);
    //     $existingCount = $planning->plottingKehadiran()->count();
    //     $newCount = count($request->employee_ids);

    //     if (($existingCount + $newCount) > $planning->jumlah_karyawan) {
    //         return response()->json([
    //             'status'  => 'error',
    //             'message' => 'Jumlah karyawan yang dipilih melebihi kapasitas planning.'
    //         ], 422);
    //     }

    //     $token = config('services.telegram.bot_token');

    //     foreach ($request->employee_ids as $empId) {
    //         // Generate OTP unik
    //         do {
    //             $random = strtoupper(substr(md5(uniqid()), 0, 6));
    //             $otp = "P{$planning->id}-{$random}";
    //         } while (PlottingKehadiran::where('otp', $otp)->exists());

    //         // Simpan plotting
    //         $planning->plottingKehadiran()->create([
    //             'employee_id'        => $empId,
    //             'tanggal'            => Carbon::today()->toDateString(),
    //             'status_konfirmasi'  => null,
    //             'otp'                => $otp,
    //         ]);

    //         // Kirim notifikasi via Telegram
    //         $employee = Employee::find($empId);
    //         if (!$employee || !$employee->chat_id) {
    //             continue;
    //         }

    //         $message = "Halo *{$employee->nama_karyawan}*,\n"
    //             . "Anda dijadwalkan kerja tanggal *{$planning->start_date->format('d M')} s.d {$planning->end_date->format('d M')}* (Shift *{$planning->shift}*).\n"
    //             . "Balas dengan *HADIR {$otp}* atau *TIDAK HADIR {$otp}* untuk konfirmasi.";

    //         try {
    //             Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
    //                 'chat_id'    => $employee->chat_id,
    //                 'text'       => $message,
    //                 'parse_mode' => 'Markdown'
    //             ]);
    //         } catch (\Exception $e) {
    //             Log::warning("Gagal kirim ke Telegram ({$employee->chat_id}): " . $e->getMessage());
    //         }
    //     }

    //     return response()->json([
    //         'status'  => 'success',
    //         'message' => 'Plotting disimpan dan notifikasi Telegram dikirim.'
    //     ]);
    // }

    public function storePlotting(Request $request)
    {
        $request->validate([
            'planning_id'   => 'required|exists:plannings,id',
            'employee_ids'  => 'required|array',
        ]);

        $planning = Planning::findOrFail($request->planning_id);
        $existingCount = $planning->plottingKehadiran()->count();
        $newCount = count($request->employee_ids);

        if (($existingCount + $newCount) > $planning->jumlah_karyawan) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Jumlah karyawan yang dipilih melebihi kapasitas planning.'
            ], 422);
        }

        $token = config('services.telegram.bot_token');

        foreach ($request->employee_ids as $empId) {
            // Generate OTP unik
            do {
                $random = strtoupper(substr(md5(uniqid()), 0, 6));
                $otp = "P{$planning->id}-{$random}";
            } while (PlottingKehadiran::where('otp', $otp)->exists());

            // Simpan plotting
            $planning->plottingKehadiran()->create([
                'employee_id'        => $empId,
                'tanggal'            => Carbon::today()->toDateString(),
                'status_konfirmasi'  => null,
                'otp'                => $otp,
            ]);

            // Kirim notifikasi via Telegram dengan tombol balasan langsung
            $employee = Employee::find($empId);
            if (!$employee || !$employee->chat_id) {
                continue;
            }

            $message = "Hai *{$employee->nama_karyawan}*,\n\n"
            . "Kamu dijadwalkan kerja tanggal *{$planning->start_date->format('d M')} s.d {$planning->end_date->format('d M')}* (Shift *{$planning->shift}*).\n\n"
            . "Silakan klik salah satu tombol di bawah ini untuk konfirmasi:";

            $keyboard = [
                'keyboard' => [
                    ["HADIR {$otp}"],
                    ["TIDAK HADIR {$otp} Sakit"],
                    ["TIDAK HADIR {$otp} Cuti"],
                    ["TIDAK HADIR {$otp} Request Off"]
                ],
                'resize_keyboard' => true,
                'one_time_keyboard' => true
            ];

            try {
                Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
                    'chat_id'    => $employee->chat_id,
                    'text'       => $message,
                    'parse_mode' => 'Markdown',
                    'reply_markup' => json_encode([
                        'keyboard' => [
                            ["HADIR {$otp}"],
                            ["TIDAK HADIR {$otp} Sakit"],
                            ["TIDAK HADIR {$otp} Cuti"],
                            ["TIDAK HADIR {$otp} Request Off"]
                        ],
                        'resize_keyboard' => true,
                        'one_time_keyboard' => true
                    ])
                ]);
            } catch (\Exception $e) {
                Log::warning("Gagal kirim ke Telegram ({$employee->chat_id}): " . $e->getMessage());
            }
        }

        return response()->json([
            'status'  => 'success',
            'message' => 'Plotting disimpan dan notifikasi Telegram dikirim dengan tombol balasan langsung.'
        ]);
    }

    public function viewPlotting(Planning $planning)
    {
      
        $allEmployees = Employee::get()->where('status', 'aktif');

        // Ambil ID employee yang jadwal plotting-nya bertabrakan
        $conflictedEmployeeIds = PlottingKehadiran::whereHas('planning', function ($query) use ($planning) {
            $query->where(function ($q) use ($planning) {
                $q->whereDate('start_date', '<=', $planning->end_date)
                    ->whereDate('end_date', '>=', $planning->start_date);
            });
        })->pluck('employee_id')->unique();

        // Ambil hanya karyawan yang TIDAK punya konflik tanggal
        $employees = $allEmployees->whereNotIn('id', $conflictedEmployeeIds);

        // Ambil ID karyawan yang sudah diplotting di planning ini (jika perlu ditandai di blade)
        $plottingEmployeeIds = $planning->plottingKehadiran()->pluck('employee_id')->toArray();

        return view('staff_produksi.plotting', compact('planning', 'employees', 'plottingEmployeeIds'));

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
                Http::timeout(10)->post('http://10.11.11.10:3000/send-bulk', [
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
