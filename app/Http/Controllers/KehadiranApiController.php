<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\PlottingKehadiran;
use App\Models\Planning;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class KehadiranApiController extends Controller
{
    // public function konfirmasi(Request $request)
    // {
    //     if ($request->header('X-BOT-KEY') !== env('BOT_SECRET')) {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }

    //     $request->validate([
    //         'nomor_hp' => 'required|string',
    //         'status' => 'required|in:hadir,tidak hadir',
    //     ]);

    //     // Normalisasi nomor (misal: 62812xxxxx)
    //     $nomor = preg_replace('/\D/', '', $request->nomor_hp); // hanya angka
    //     if (str_starts_with($nomor, '0')) {
    //         $nomor = preg_replace('/^0/', '62', $nomor);
    //     }

    //     $employee = Employee::where('nomor_hp', $nomor)->first();

    //     if (!$employee) {
    //         return response()->json(['error' => 'Karyawan tidak ditemukan'], 404);
    //     }

    //     $plotting = PlottingKehadiran::where('employee_id', $employee->id)
    //         // ->where('tanggal', Carbon::today()->toDateString())
    //         ->first();

    //     // if (!$plotting) {
    //     //     return response()->json(['error' => 'Data kehadiran tidak ditemukan untuk hari ini'], 404);
    //     // }

    //     $plotting->status_konfirmasi = $request->status;
    //     $plotting->save();

    //     return response()->json(['message' => 'Status kehadiran berhasil diperbarui']);
    // }

    // public function konfirmasi(Request $request)
    // {
    //     $token = config('services.telegram.bot_token');
    //     $response = Http::get("https://api.telegram.org/bot{$token}/getUpdates");

    //     $updates = $response->json()['result'] ?? [];

    //     foreach ($updates as $update) {
    //         $messageText = strtolower($update['message']['text'] ?? '');
    //         $chatId = $update['message']['chat']['id'] ?? null;

    //         if (!$messageText || !$chatId) {
    //             continue;
    //         }

    //         // Cek apakah pesan mengandung HADIR/TIDAK HADIR + OTP
    //         if (preg_match('/^(hadir|tidak hadir)\s+(p[0-9]+-[a-z0-9]{6})$/i', $messageText, $match)) {
    //             $status = strtolower($match[1]); // hadir / tidak hadir
    //             $otp = strtoupper($match[2]);

    //             $employee = Employee::where('chat_id', $chatId)->first();
    //             if (!$employee) continue;

    //             $plotting = PlottingKehadiran::where('employee_id', $employee->id)
    //                 ->where('otp', $otp)
    //                 ->first();

    //             if (!$plotting) {
    //                 Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
    //                     'chat_id' => $chatId,
    //                     'text'    => "Maaf, OTP tidak ditemukan atau tidak valid.",
    //                 ]);
    //                 continue;
    //             }

    //             if ($plotting->status_konfirmasi !== null) {
    //                 Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
    //                     'chat_id' => $chatId,
    //                     'text'    => "OTP sudah digunakan sebelumnya untuk konfirmasi sebagai *{$plotting->status_konfirmasi}*.",
    //                     'parse_mode' => 'Markdown',
    //                 ]);
    //                 continue;
    //             }

    //             $plotting->status_konfirmasi = $status;
    //             $plotting->save();

    //             Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
    //                 'chat_id' => $chatId,
    //                 'text'    => "Terima kasih, status kamu tercatat sebagai *{$status}*.",
    //                 'parse_mode' => 'Markdown'
    //             ]);
    //         }
    //     }

    //     return response()->json(['status' => 'Polling selesai']);
    // }
    public function konfirmasi(Request $request)
    {
        $token = config('services.telegram.bot_token');
        $lastUpdateId = Cache::get('telegram_last_update_id', 0);

        $response = Http::get("https://api.telegram.org/bot{$token}/getUpdates", [
            'offset' => $lastUpdateId + 1,
        ]);

        $updates = $response->json()['result'] ?? [];

        foreach ($updates as $update) {
            $messageText = strtolower($update['message']['text'] ?? '');
            $chatId = $update['message']['chat']['id'] ?? null;
            $updateId = $update['update_id'];

            if (!$messageText || !$chatId) continue;

            // Lewati pesan jika datang sebelum OTP dikirim oleh bot
            $lastBotUpdate = Cache::get("last_bot_update_id_{$chatId}", 0);
            if ($updateId <= $lastBotUpdate) {
                continue;
            }

            // if (preg_match('/^(hadir|tidak hadir)\s+(p[0-9]+-[a-z0-9]{6})$/i', $messageText, $match)) {
            //     $status = strtolower($match[1]);
            //     $otp = strtoupper($match[2]);

            //     $employee = Employee::where('chat_id', $chatId)->first();
            //     if (!$employee) continue;

            //     $plotting = PlottingKehadiran::where('employee_id', $employee->id)
            //         ->where('otp', $otp)
            //         ->first();

            //     if (!$plotting) {
            //         Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
            //             'chat_id' => $chatId,
            //             'text'    => "Maaf, OTP tidak ditemukan atau tidak valid.",
            //         ]);

            //         // Catat update_id balasan dari bot
            //         Cache::put("last_bot_update_id_{$chatId}", $updateId);
            //         continue;
            //     }

            //     $cacheKey = "otp_handled_{$chatId}_{$otp}";
            //     if (Cache::get($cacheKey)) {
            //         continue;
            //     }

            //     if ($plotting->status_konfirmasi !== null) {
            //         Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
            //             'chat_id' => $chatId,
            //             'text'    => "OTP sudah digunakan sebelumnya untuk konfirmasi sebagai *{$plotting->status_konfirmasi}*.",
            //             'parse_mode' => 'Markdown',
            //         ]);
            //         Cache::put($cacheKey, true, now()->addMinutes(10));
            //         Cache::put("last_bot_update_id_{$chatId}", $updateId);
            //         continue;
            //     }

            //     $plotting->status_konfirmasi = $status;
            //     $plotting->save();

            //     Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
            //         'chat_id' => $chatId,
            //         'text'    => "Terima kasih, status kamu tercatat sebagai *{$status}*.",
            //         'parse_mode' => 'Markdown'
            //     ]);

            //     Cache::put($cacheKey, true, now()->addMinutes(10));
            //     Cache::put("last_bot_update_id_{$chatId}", $updateId);
            // }

            if (preg_match('/^(hadir|tidak hadir)\s+(p[0-9]+-[a-z0-9]{6})(?:\s+(sakit|cuti|request off))?$/i', $messageText, $match)) {
                $status = strtolower($match[1]);
                $otp = strtoupper($match[2]);
                $reason = isset($match[3]) ? ucfirst(strtolower($match[3])) : null;

                $employee = Employee::where('chat_id', $chatId)->first();
                if (!$employee) continue;

                $plotting = PlottingKehadiran::where('employee_id', $employee->id)
                ->where('otp', $otp)
                    ->first();

                if (!$plotting) {
                    Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
                        'chat_id' => $chatId,
                        'text'    => "Maaf, OTP tidak ditemukan atau tidak valid.",
                    ]);
                    Cache::put("last_bot_update_id_{$chatId}", $updateId);
                    continue;
                }

                $cacheKey = "otp_handled_{$chatId}_{$otp}";
                if (Cache::get($cacheKey)) {
                    continue;
                }

                if ($plotting->status_konfirmasi !== null) {
                    Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
                        'chat_id' => $chatId,
                        'text'    => "OTP sudah digunakan sebelumnya untuk konfirmasi sebagai *{$plotting->status_konfirmasi}*.",
                        'parse_mode' => 'Markdown',
                    ]);
                    Cache::put($cacheKey, true, now()->addMinutes(10));
                    Cache::put("last_bot_update_id_{$chatId}", $updateId);
                    continue;
                }

                $plotting->status_konfirmasi = $status;
                $plotting->reason = ($status === 'tidak hadir') ? $reason : null;
                $plotting->save();

                $balasan = "Terima kasih, status kamu tercatat sebagai *{$status}*";
                if ($reason) {
                    $balasan .= " dengan alasan *{$reason}*.";
                }

                Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
                    'chat_id' => $chatId,
                    'text'    => $balasan,
                    'parse_mode' => 'Markdown'
                ]);

                Cache::put($cacheKey, true,
                    now()->addMinutes(10)
                );
                Cache::put("last_bot_update_id_{$chatId}", $updateId);
            }

            Cache::put('telegram_last_update_id', $updateId, now()->addMinutes(5));
        }

        return response()->json(['status' => 'Polling selesai']);
    }


    public function polling()
    {
        $token = config('services.telegram.bot_token');
        $response = Http::get("https://api.telegram.org/bot{$token}/getUpdates");

        $updates = $response->json()['result'] ?? [];

        foreach ($updates as $update) {
            $message = $update['message']['text'] ?? '';
            $username = $update['message']['from']['username'] ?? null;
            $chatId = $update['message']['chat']['id'] ?? null;

            if ($message === '/start' && $username && $chatId) {
                $employee = Employee::where('username_telegram', $username)->first();

                if ($employee && !$employee->chat_id) {
                    $employee->update(['chat_id' => $chatId]);

                    Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
                        'chat_id' => $chatId,
                        'text'    => "Halo {$employee->nama_karyawan}, kamu berhasil terhubung!"
                    ]);
                }
            }
        }

        return response()->json(['status' => 'Polling selesai']);
    }

    public function attendanceSummary(Request $request)
    {
        $start = $request->input('start_date')
        ? Carbon::parse($request->input('start_date'))
        : Carbon::now()->subDays(7);

        $end = $request->input('end_date')
        ? Carbon::parse($request->input('end_date'))
        : Carbon::now()->addDays(3);

        $groupFilter = strtoupper($request->input('group', 'SEMUA'));

        $query = Planning::with('plottingKehadiran')
        ->whereBetween('start_date', [$start, $end]);

        if (in_array($groupFilter, ['GRUP A', 'GRUP B', 'GRUP C', 'GRUP N'])) {
            $query->where('group', $groupFilter);
        }

        $plannings = $query->get();

        $summary = $plannings->map(function ($planning) {
            $totalPlanned = $planning->jumlah_karyawan;

            $hadir = $planning->plottingKehadiran->where('status_konfirmasi', 'Hadir')->count();
            $tidakHadir = $planning->plottingKehadiran->where('status_konfirmasi', 'Tidak Hadir')->count();
            $belumKonfirmasi = $planning->plottingKehadiran->whereNull('status_konfirmasi')->count();

            return [
                'planning_id' => $planning->id,
                'group' => $planning->group,
                'shift' => $planning->shift,
                'start_date' => $planning->start_date->format('Y-m-d'),
                'end_date' => $planning->end_date->format('Y-m-d'),
                'jumlah_karyawan' => $totalPlanned,
                'hadir' => $hadir,
                'tidak_hadir' => $tidakHadir,
                'belum_konfirmasi' => $belumKonfirmasi,
            ];
        });

        $grouped = $summary->groupBy('group');

        // Respons data
        $responseData = $groupFilter === 'SEMUA'
            ? $grouped
            : [$groupFilter => $grouped->get($groupFilter, collect())];

        return response()->json([
            'status' => 'success',
            'filter_range' => [
                'start_date' => $start->format('Y-m-d'),
                'end_date' => $end->format('Y-m-d'),
            ],
            'group_filter' => $groupFilter,
            'data' => $responseData
        ]);
    }

}
