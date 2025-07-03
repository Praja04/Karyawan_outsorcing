<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Employee;
use App\Models\PlottingKehadiran;

class TelegramPolling extends Command
{
    protected $signature = 'app:telegram-polling';
    protected $description = 'Polling Telegram untuk menangani /start dan konfirmasi kehadiran';

    public function handle()
    {
        $token = config('services.telegram.bot_token');

        $response = Http::get("https://api.telegram.org/bot{$token}/getUpdates");
        $updates = $response->json('result') ?? [];

        foreach ($updates as $update) {
            $message = strtolower($update['message']['text'] ?? '');
            $chatId  = $update['message']['chat']['id'] ?? null;
            $username = $update['message']['from']['username'] ?? null;

            if (!$message || !$chatId) {
                continue;
            }

            // === 🟢 HANDLE /start
            if ($message === '/start' && $username) {
                $employee = \App\Models\Employee::where('username_telegram', $username)->first();

                if ($employee && !$employee->chat_id) {
                    $employee->update(['chat_id' => $chatId]);

                    Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
                        'chat_id' => $chatId,
                        'text'    => "Halo {$employee->nama_karyawan}, bot berhasil terhubung dengan akun kamu! 👍"
                    ]);
                }
                continue;
            }

            // === 🟠 HANDLE KONFIRMASI HADIR / TIDAK HADIR
            if (preg_match('/^(hadir|tidak hadir)\s+(p[0-9]+-[a-z0-9]{6})$/i', $message, $match)) {
                $status = strtolower($match[1]);
                $otp    = strtoupper($match[2]);

                $employee = \App\Models\Employee::where('chat_id', $chatId)->first();
                if (!$employee) continue;

                $plot = $employee->plottingKehadiran()
                    ->where('otp', $otp)
                    ->first();

                if (!$plot) continue;

                if (!is_null($plot->status_konfirmasi)) {
                    // OTP sudah pernah dipakai
                    Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
                        'chat_id' => $chatId,
                        'text'    => "⚠️ OTP *{$otp}* sudah pernah digunakan. Konfirmasi tidak bisa diulang.",
                        'parse_mode' => 'Markdown'
                    ]);
                    continue;
                }

                // ✅ Simpan status kehadiran
                $plot->status_konfirmasi = $status;
                $plot->save();

                Http::post("https://api.telegram.org/bot{$token}/sendMessage", [
                    'chat_id'    => $chatId,
                    'text'       => "Terima kasih! Kehadiran kamu tercatat sebagai *{$status}*.",
                    'parse_mode' => 'Markdown'
                ]);
            }
        }

        $this->info('Polling selesai.');
    }
}
