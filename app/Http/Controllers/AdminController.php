<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\EmployeeSchedule;
use App\Models\Planning;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Illuminate\Support\Facades\Validator;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;



class AdminController extends Controller
{
    //dashboard admin
    public function dashboard()
    {
        // cek apakah user punya session login true dan session username
        if (!session('login') || !session('username')) {
            return redirect('/login');
        }
        $plannings = Planning::orderBy('start_date', 'desc')->get();
        
        return view('admin.dashboard', compact('plannings'));
    }

    //management karyawan
    public function index()
    {
        // cek apakah user punya session login true dan session username
        if (!session('login') || !session('username')) {
            return redirect('/login');
        }
        return view('admin.hrd.index');
    }
    public function index_kmj()
    {
        // cek apakah user punya session login true dan session username
        if (!session('login') || !session('username')) {
            return redirect('/login');
        }
        return view('admin.mitra.index_kmj');
    }
    public function index_fortuna()
    {
        // cek apakah user punya session login true dan session username
        if (!session('login') || !session('username')) {
            return redirect('/login');
        }
        return view('admin.mitra.index_fortuna');
    }

    //plotting karyawan Prd
    public function plot_prd()
    {
        // cek apakah user punya session login true dan session username
        if (!session('login') || !session('username')) {
            return redirect('/');
        }
        // Ambil semua grup unik
        $groups = Employee::select('grup')->distinct()->pluck('grup');

        // Ambil semua karyawan
        $employees = Employee::orderBy('grup')->orderBy('nama_karyawan')->get();
        $schedules = EmployeeSchedule::with('employee')->orderBy('start_date', 'desc')->get();

        return view('admin.hrd.plotting_karyawan', compact('groups', 'employees', 'schedules'));
    }


    // Api CRUD management karyawan
    public function getKaryawan()
    {
        $karyawan = Employee::all();
        return response()->json($karyawan, 200);
    }
    public function getKaryawan_KMJ()
    {
        $karyawan = Employee::where('nama_vendor', 'KMJ')->get();
        return response()->json($karyawan, 200);
    }
    public function getKaryawan_Fortuna()
    {
        $karyawan =Employee::where('nama_vendor', 'Fortuna')->get();
        return response()->json($karyawan, 200);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'company' => 'required|string',
            'nik_bas' => 'required|string|unique:employees,nik_bas',
            'nama_vendor' => 'nullable|string',
            'nik_os' => 'required|string|unique:employees,nik_os',
            'nama_karyawan' => 'required|string',
            'nomor_ktp' => 'required|string|unique:employees,nomor_ktp',
            'jenis_kelamin' => 'required|string',
            'alamat_ktp' => 'required|string',
            'tempat_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'nomor_hp' => 'required|string',
            'email' => 'nullable|email',
            'agama' => 'nullable|string',
            'status_nikah' => 'nullable|string',
            'pendidikan' => 'nullable|string',
            'employee_type' => 'nullable|string',
            'action_type' => 'nullable|string',
            'kode_level' => 'nullable|string',
            'kode_department' => 'nullable|string',
            'grup' => 'nullable|string',
            'kode_bagian' => 'nullable|string',
            'kode_jabatan' => 'nullable|string',
            'begin_date' => 'nullable|date',
            'tanggal_masuk' => 'nullable|date',
        ]);

        $employee = Employee::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Employee created successfully.',
            'data' => $employee
        ]);
    }

    // UPDATE: Update data karyawan
    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'company' => 'required|string',
            'nik_bas' => 'required|string|unique:employees,nik_bas,' . $id,
            'nama_vendor' => 'nullable|string',
            'nik_os' => 'required|string|unique:employees,nik_os,' . $id,
            'nama_karyawan' => 'required|string',
            'nomor_ktp' => 'required|string|unique:employees,nomor_ktp,' . $id,
            'jenis_kelamin' => 'required|string',
            'alamat_ktp' => 'required|string',
            'tempat_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'nomor_hp' => 'required|string',
            'email' => 'nullable|email',
            'agama' => 'nullable|string',
            'status_nikah' => 'nullable|string',
            'pendidikan' => 'nullable|string',
            'employee_type' => 'nullable|string',
            'action_type' => 'nullable|string',
            'kode_level' => 'nullable|string',
            'kode_department' => 'nullable|string',
            'grup' => 'nullable|string',
            'kode_bagian' => 'nullable|string',
            'kode_jabatan' => 'nullable|string',
            'begin_date' => 'nullable|date',
            'tanggal_masuk' => 'nullable|date',
        ]);

        $employee->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Employee updated successfully.',
            'data' => $employee
        ]);
    }

    // DELETE: Hapus karyawan
    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Employee deleted successfully.'
        ]);
    }

    //import data karyawan excel
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls'
        ]);

        $file = $request->file('file');

        // Load file Excel
        $spreadsheet = IOFactory::load($file->getPathname());
        $sheet = $spreadsheet->getActiveSheet();
        $rows = $sheet->toArray();

        // Lewati header jika ada
        unset($rows[0]);

        $inserted = 0;
        foreach ($rows as $row) {
            $data = [
                //'user_id' => null,
                'company' => $row[0],
                'nik_bas' => $row[1],
                'nama_vendor' => $row[2],
                'nik_os' => $row[3],
                'nama_karyawan' => $row[4],
                'nomor_ktp' => $row[5],
                'jenis_kelamin' => $row[6],
                'alamat_ktp' => $row[7],
                'tempat_lahir' => $row[8],
                'tanggal_lahir' => $this->convertExcelDate($row[9]),
                'nomor_hp' => $row[10],
                'email' => $row[11],
                'agama' => $row[12],
                'status_nikah' => $row[13],
                'pendidikan' => $row[14],
                'employee_type' => $row[15],
                'action_type' => $row[16],
                'kode_level' => $row[17],
                'kode_department' => $row[18],
                'grup' => strtoupper($row[19]),
                'kode_bagian' => $row[20],
                'kode_jabatan' => $row[21],
                'begin_date' => $this->convertExcelDate($row[22]),
                'tanggal_masuk' => $this->convertExcelDate($row[23]),
            ];

            $validator = Validator::make($data, [
                'company' => 'required|string',
                'nik_bas' => 'required|string|unique:employees,nik_bas',
                'nik_os' => 'required|string|unique:employees,nik_os',
                'nama_karyawan' => 'required|string',
                'nomor_ktp' => 'required|string|unique:employees,nomor_ktp',
                'jenis_kelamin' => 'required|string',
                'alamat_ktp' => 'required|string',
                'tempat_lahir' => 'required|string',
                'tanggal_lahir' => 'required|date',
                'nomor_hp' => 'required|string',
            ]);

            if (!$validator->fails()) {
                Employee::create($data);
                $inserted++;
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => "$inserted data berhasil diimport."
        ]);
    }

    private function convertExcelDate($value)
    {
        try {
            if (is_numeric($value)) {
                return Date::excelToDateTimeObject($value)->format('Y-m-d');
            }
            return date('Y-m-d', strtotime($value));
        } catch (\Exception $e) {
            return null;
        }
    }

    public function downloadTemplateUploadData()
    {
        $path = 'templates/template_upload_data_karyawan.xlsx'; // Tanpa 'public/' prefix

        $fullPath = storage_path('app/public/' . $path);

        if (!file_exists($fullPath)) {
            abort(404, 'Template file not found.');
        }

        return response()->download($fullPath, 'template_upload_data_karyawan.xlsx');
    }
    public function downloadTemplateUpdateWa()
    {
        $path = 'templates/template_update_nomor_wa.xlsx'; // Tanpa 'public/' prefix

        $fullPath = storage_path('app/public/' . $path);

        if (!file_exists($fullPath)) {
            abort(404, 'Template file not found.');
        }

        return response()->download($fullPath, 'template_update_nomor_wa.xlsx');
    }

    public function uploadNomorWaExcel(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls'
        ]);

        try {
            $spreadsheet = IOFactory::load($request->file('file'));
            $sheet = $spreadsheet->getActiveSheet();
            $rows = $sheet->toArray();

            // Lewati header (baris 0)
            unset($rows[0]);

            $updated = 0;
            $errors = [];

            foreach ($rows as $index => $row) {
                $nomorKtp = trim($row[0] ?? '');
                $nomorHp = trim($row[1] ?? '');

                if (!$nomorKtp || !$nomorHp) {
                    $errors[] = "Baris ke-" . ($index + 2) . " kosong.";
                    continue;
                }

                // Normalisasi nomor HP: ubah awalan 0 jadi 62 dan buang karakter non-digit
                $nomorHp = preg_replace('/^0/', '62', preg_replace('/\D/', '', $nomorHp));

                if (!preg_match('/^\d{16}$/', $nomorKtp)) {
                    $errors[] = "Baris ke-" . ($index + 2) . ": Nomor KTP tidak valid.";
                    continue;
                }

                if (!preg_match('/^62\d{9,13}$/', $nomorHp)) {
                    $errors[] = "Baris ke-" . ($index + 2) . ": Nomor HP tidak valid.";
                    continue;
                }

                $employee = Employee::where('nomor_ktp', $nomorKtp)->first();
                if (!$employee) {
                    $errors[] = "Baris ke-" . ($index + 2) . ": Karyawan tidak ditemukan.";
                    continue;
                }

                $employee->nomor_hp = $nomorHp;
                $employee->save();
                $updated++;
            }

            return response()->json([
                'status' => 'success',
                'updated' => $updated,
                'errors' => $errors
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat membaca file Excel.'
            ], 500);
        }
    }

    //api dashboard
    public function Api_Summary_Dashboard_admin_hrd()
    {
        $today = Carbon::today();

        // Total semua karyawan
        $totalEmployees = Employee::count();

        // Planning yang aktif hari ini
        $activePlannings = Planning::whereDate('end_date', '>', $today)
            ->get();

        // Ringkasan hari ini
        $totalKebutuhanHariIni = 0;
        $totalSudahDipplotHariIni = 0;

        $todaySummary = $activePlannings->map(function ($planning) use (&$totalKebutuhanHariIni, &$totalSudahDipplotHariIni) {
            $jumlahDipplot = $planning->plottingKehadiran()->count();
            $totalKebutuhanHariIni += $planning->jumlah_karyawan;
            $totalSudahDipplotHariIni += $jumlahDipplot;

            return [
                'id' => $planning->id,
                'tanggal' => Carbon::parse($planning->start_date)->format('Y-m-d') . ' s.d. ' . Carbon::parse($planning->end_date)->format('Y-m-d'),
                'kebutuhan' => $planning->jumlah_karyawan,
                'sudah_dipplot' => $jumlahDipplot,
                'sisa' => max($planning->jumlah_karyawan - $jumlahDipplot, 0),
            ];
        });

        $totalBelumDipplotHariIni = max($totalKebutuhanHariIni - $totalSudahDipplotHariIni, 0);

        // Grafik 7 hari ke depan
        $range = collect();
        for ($i = 0; $i < 7; $i++) {
            $tanggal = $today->copy()->addDays($i)->toDateString();

            $plannings = Planning::whereDate('start_date', '<=', $tanggal)
                ->whereDate('end_date', '>=', $tanggal)
                ->get();

            $totalKebutuhan = $plannings->sum('jumlah_karyawan');
            $totalDipplot = $plannings->sum(fn ($p) => $p->plottingKehadiran()->count());

            $range->push([
                'tanggal' => $tanggal,
                'kebutuhan' => $totalKebutuhan,
                'sudah_dipplot' => $totalDipplot,
                'sisa' => max($totalKebutuhan - $totalDipplot, 0),
            ]);
        }

        return response()->json([
            'totalEmployees' => $totalEmployees,
            'activePlanningCount' => $activePlannings->count(),
            'activePlanning' => $activePlannings,
            'todaySummary' => $todaySummary,
            'totalKebutuhanHariIni' => $totalKebutuhanHariIni,
            'totalSudahDipplotHariIni' => $totalSudahDipplotHariIni,
            'totalBelumDipplotHariIni' => $totalBelumDipplotHariIni,
            'grafikRange' => $range,
        ]);
    }

    public function planningDetail($id)
    {
        $planning = Planning::with('plottingKehadiran.employee')->findOrFail($id);
        return view('admin.hrd.plotting_view', compact('planning'));
    }
    
}
