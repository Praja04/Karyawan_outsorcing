<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\PlottingKehadiran;
use Carbon\Carbon;

class KehadiranApiController extends Controller
{
    public function konfirmasi(Request $request)
    {
        if ($request->header('X-BOT-KEY') !== env('BOT_SECRET')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        
        $request->validate([
            'nomor_hp' => 'required|string',
            'status' => 'required|in:hadir,tidak hadir',
        ]);

        // Normalisasi nomor (misal: 62812xxxxx)
        $nomor = preg_replace('/\D/', '', $request->nomor_hp); // hanya angka
        if (str_starts_with($nomor, '0')) {
            $nomor = preg_replace('/^0/', '62', $nomor);
        }

        $employee = Employee::where('nomor_hp', $nomor)->first();

        if (!$employee) {
            return response()->json(['error' => 'Karyawan tidak ditemukan'], 404);
        }

        $plotting = PlottingKehadiran::where('employee_id', $employee->id)
            ->where('tanggal', Carbon::today()->toDateString())
            ->first();

        if (!$plotting) {
            return response()->json(['error' => 'Data kehadiran tidak ditemukan untuk hari ini'], 404);
        }

        $plotting->status_konfirmasi = $request->status;
        $plotting->save();

        return response()->json(['message' => 'Status kehadiran berhasil diperbarui']);
    }
}
