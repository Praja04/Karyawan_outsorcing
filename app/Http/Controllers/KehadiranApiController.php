<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\PlottingKehadiran;
use Carbon\Carbon;
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

    public function konfirmasi(Request $request)
    {
        $token = config('services.telegram.bot_token');
        $response = Http::get("https://api.telegram.org/bot{$token}/getUpdates");

        $updates = $response->json()['result'] ?? [];

        foreach ($updates as $update) {
            $messageText = strtolower($update['message']['text'] ?? '');
            $chatId = $update['message']['chat']['id'] ?? null;

            if (!$messageText || !$chatId) {
                continue;
            }

            // Cek apakah pesan mengandung HADIR/TIDAK HADIR + OTP
            if (preg_match('/^(hadir|tidak hadir)\s+(p[0-9]+-[a-z0-9]{6})$/i', $messageText, $match)) {
                $status = strtolower($match[1]); // hadir / tidak hadir
                $otp = strtoupper($match[2]);

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
                    continue;
                }

                if ($plotting->status_konfirmasi !== null) {
                    Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
                        'chat_id' => $chatId,
                        'text'    => "OTP sudah digunakan sebelumnya untuk konfirmasi sebagai *{$plotting->status_konfirmasi}*.",
                        'parse_mode' => 'Markdown',
                    ]);
                    continue;
                }

                $plotting->status_konfirmasi = $status;
                $plotting->save();

                Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
                    'chat_id' => $chatId,
                    'text'    => "Terima kasih, status kamu tercatat sebagai *{$status}*.",
                    'parse_mode' => 'Markdown'
                ]);
            }
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
}
