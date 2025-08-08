<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\EmployeeSchedule;
use App\Models\Planning;
use App\Models\PlottingKehadiran;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Illuminate\Support\Facades\Validator;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;



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
    public function data_karyawan()
    {
        // cek apakah user punya session login true dan session username
        if (!session('login') || !session('username')) {
            return redirect('/login');
        }
        return view('admin.hrd.data_karyawan');
    }
    public function data_karyawan_kmj()
    {
        // cek apakah user punya session login true dan session username
        if (!session('login') || !session('username')) {
            return redirect('/login');
        }
        return view('admin.mitra.data_karyawan_kmj');
    }
    public function data_karyawan_fortuna()
    {
        // cek apakah user punya session login true dan session username
        if (!session('login') || !session('username')) {
            return redirect('/login');
        }
        return view('admin.mitra.data_karyawan_fortuna');
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
            'username_telegram' => 'nullable',
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
            'username_telegram' => 'nullable',
        ]);

        $employee->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Employee updated successfully.',
            'data' => $employee
        ]);
    }

    public function updateStatusKaryawan(Request $request, $id)
    {
        // Validasi input
        $request->validate([
            'new_status' => 'required|in:aktif,non aktif,terminated',
            'reason' => 'nullable|string|max:200'
        ]);

        try {
            $karyawan = Employee::findOrFail($id);

            // Jika status non aktif atau terminated, pastikan alasan diisi
            if (in_array($request->new_status, ['non aktif', 'terminated']) && empty($request->reason)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Alasan wajib diisi jika status bukan Aktif.'
                ], 422);
            }

            $karyawan->update([
                'status' => $request->new_status,
                // Tambahkan kolom log jika tersedia, misalnya status_reason
                // 'status_reason' => $request->reason
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Status karyawan berhasil diperbarui.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
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
                'username_telegram' => $row[24],
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

    public function downloadTemplateTelegram()
    {
        $path = 'templates/template_telegram.xlsx'; // Tanpa 'public/' prefix

        $fullPath = storage_path('app/public/' . $path);

        if (!file_exists($fullPath)) {
            abort(404, 'Template file not found.');
        }

        return response()->download($fullPath, 'template_telegram.xlsx');
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
            $sheet = IOFactory::load($request->file('file'))->getActiveSheet();
            $rows = array_values($sheet->toArray());
            $updated = 0;
            $errors = [];

            foreach (array_slice($rows, 1) as $i => $row) {
                $baris = $i + 2;
                [$nomorKtp, $nomorHp] = array_map('trim', [$row[0] ?? '', $row[1] ?? '']);

                if (!$nomorKtp || !$nomorHp) {
                    $errors[] = "Baris ke-{$baris} kosong.";
                    continue;
                }

                $nomorHp = $this->normalizeHp($nomorHp);

                if (!preg_match('/^\d{16}$/', $nomorKtp)) {
                    $errors[] = "Baris ke-{$baris}: Nomor KTP tidak valid.";
                    continue;
                }

                if (!preg_match('/^62\d{9,13}$/', $nomorHp)) {
                    $errors[] = "Baris ke-{$baris}: Nomor HP tidak valid.";
                    continue;
                }

                $employee = Employee::where('nomor_ktp', $nomorKtp)->first();

                if (!$employee) {
                    $errors[] = "Baris ke-{$baris}: Karyawan tidak ditemukan.";
                    continue;
                }

                $employee->update(['nomor_hp' => $nomorHp]);
                $updated++;
            }

            return response()->json([
                'status' => 'success',
                'updated' => $updated,
                'errors' => $errors
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat membaca file Excel.'
            ], 500);
        }
    }

    private function normalizeHp(string $nomor): string
    {
        return preg_replace('/^0/', '62', preg_replace('/\D/', '', $nomor));
    }

    public function uploadTelegramExcel(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls'
        ]);

        try {
            $sheet = IOFactory::load($request->file('file'))->getActiveSheet();
            $rows = array_values($sheet->toArray());
            $updated = 0;
            $errors = [];

            foreach (array_slice($rows, 1) as $i => $row) {
                $baris = $i + 2;
                [$nikOs, $usernameTelegram] = array_map('trim', [$row[0] ?? '', $row[1] ?? '']);

                if (!$nikOs || !$usernameTelegram) {
                    $errors[] = "Baris ke-{$baris} kosong.";
                    continue;
                }

                if (!preg_match('/^[a-zA-Z0-9_]{5,32}$/', $usernameTelegram)) {
                    $errors[] = "Baris ke-{$baris}: Username Telegram tidak valid.";
                    continue;
                }

                $employee = Employee::where('nik_os', $nikOs)->first();

                if (!$employee) {
                    $errors[] = "Baris ke-{$baris}: Karyawan dengan NIK OS {$nikOs} tidak ditemukan.";
                    continue;
                }

                $employee->update(['username_telegram' => $usernameTelegram]);
                $updated++;
            }

            return response()->json([
                'status' => 'success',
                'updated' => $updated,
                'errors' => $errors
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat membaca file Telegram Excel.'
            ], 500);
        }
    }

    public function Api_Summary_Dashboard_admin_hrd(Request $request)
    {
        $today = Carbon::today();

        $start = $request->filled('start_date')
        ? Carbon::parse($request->start_date)
        : $today->copy()->subDays(7);

        $end = $request->filled('end_date')
        ? Carbon::parse($request->end_date)
        : $today->copy()->addDays(4);

      
        // Ambil semua planning dalam range filter
        $activePlannings = Planning::whereDate('start_date', '<=', $end)
        ->whereDate('end_date', '>=', $start)
        ->get();

        $totalEmployees = Employee::count();

        // Ambil semua plotting dalam range tanggal
        $allPlottings = PlottingKehadiran::whereBetween('tanggal', [$start, $end])->get();

        // Hitung total kebutuhan hari ini
        $totalKebutuhanHariIni = $activePlannings->where('start_date', '<=', $today)->where('end_date', '>=', $today)->sum('jumlah_karyawan');

        $totalSudahDipplotHariIni = $allPlottings->where('tanggal', $today->toDateString())->count();

        $totalBelumDipplotHariIni = max($totalKebutuhanHariIni - $totalSudahDipplotHariIni, 0);

        // Summary hari ini
        $todaySummary = $activePlannings->filter(function ($p) use ($today) {
            return Carbon::parse($p->start_date)->lte($today) && Carbon::parse($p->end_date)->gte($today);
        })->map(function ($planning) use ($today, $allPlottings) {
            $countPlotting = $allPlottings
            ->where('planning_id', $planning->id)
            ->where('tanggal', $today->toDateString())
            ->count();

            return [
                'id' => $planning->id,
                'group' => $planning->group,
                'shift' => $planning->shift,
                'kode_bagian' => $planning->kode_bagian,
                'kode_jabatan' => $planning->kode_jabatan,
                'start_date' => $planning->start_date,
                'end_date' => $planning->end_date,
                'jumlah_karyawan' => $planning->jumlah_karyawan,
                'sudah_dipplot' => $countPlotting,
                'sisa' => max($planning->jumlah_karyawan - $countPlotting, 0),
            ];
        })->values();

        $plannings = Planning::whereDate('start_date', '<=', $end)
        ->whereDate('end_date', '>=', $start)
        ->get();
        $grafikGroupByTanggalPerGrup = [];

        foreach ($plannings as $plan) {
            $start = Carbon::parse($plan->start_date);
            $end = Carbon::parse($plan->end_date);
            $dates = new Collection();

            // buat range tanggal planning
            for ($date = $start->copy(); $date->lte($end); $date->addDay()) {
                $dates->push($date->format('Y-m-d'));
            }

            foreach ($dates as $tgl) {
                $sudahDipplot = PlottingKehadiran::where('planning_id', $plan->id)->count();
                $sisa = max($plan->jumlah_karyawan - $sudahDipplot, 0);

                $grafikGroupByTanggalPerGrup[$plan->group][$tgl][] = [
                    'shift' => (int) $plan->shift,
                    'sudah_dipplot' => $sudahDipplot,
                    'sisa' => $sisa
                ];
            }
        }


        return response()->json([
            'totalEmployees' => $totalEmployees,
            'activePlanningCount' => $activePlannings->count(),
            'activePlanning' => $activePlannings,
            'todaySummary' => $todaySummary,
            'totalKebutuhanHariIni' => $totalKebutuhanHariIni,
            'totalSudahDipplotHariIni' => $totalSudahDipplotHariIni,
            'totalBelumDipplotHariIni' => $totalBelumDipplotHariIni,
            'grafikGroupByTanggalPerGrup' => $grafikGroupByTanggalPerGrup,
        ]);
    }






    public function planningDetail($id)
    {
        $planning = Planning::with('plottingKehadiran.employee')->findOrFail($id);
        $jumlahHadir = $planning->plottingKehadiran()
            ->where('status_konfirmasi', 'LIKE', 'HADIR%')
            ->count();

        $jumlahTidakHadir = $planning->plottingKehadiran()
            ->where('status_konfirmasi', 'LIKE', 'TIDAK HADIR%')
            ->count();
        $jumlahBelumKonfirmasi = $planning->plottingKehadiran()
            ->where('status_konfirmasi', NULL)
            ->count();
        return view('admin.hrd.plotting_view', compact('planning',
            'jumlahHadir',
            'jumlahTidakHadir',
            'jumlahBelumKonfirmasi'
        ));
    }

    public function showDetail($id)
    {
        $employee = Employee::with([
            'plottingKehadiran.planning'
        ])->findOrFail($id);

        $plotCount = $employee->plottingKehadiran->count();
        $uniquePlannings = $employee->plottingKehadiran->pluck('planning_id')->unique()->count();

        // Hitung jumlah hadir & tidak hadir
        $hadirCount = $employee->plottingKehadiran->where('status_konfirmasi', 'hadir')->count();
        $tidakHadirCount = $employee->plottingKehadiran->where('status_konfirmasi', 'tidak hadir')->count();
        $tidakKonfirmasiCount = $employee->plottingKehadiran->where('status_konfirmasi', null)->count();
        // Alasan tidak hadir terbanyak
        $topReason = $employee->plottingKehadiran
            ->where('status_konfirmasi', 'tidak hadir')
            ->groupBy('reason')
            ->sortByDesc(fn ($group) => count($group))
            ->keys()
            ->first();

        return view('admin.employee_detail', compact(
            'employee',
            'plotCount',
            'uniquePlannings',
            'hadirCount',
            'tidakHadirCount',
            'topReason',
            'tidakKonfirmasiCount'
        ));
    }
}
