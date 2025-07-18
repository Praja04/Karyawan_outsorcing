<?php

namespace App\Http\Controllers;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Illuminate\Http\Request;
use App\Models\Planning;
use App\Models\Employee;
use Illuminate\Support\Facades\Auth;
use PhpOffice\PhpSpreadsheet\Cell\DataValidation;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Illuminate\Support\Facades\Validator;

class SupervisorController extends Controller
{
    public function dashboard()
    {
        if (Auth::user()->role !== 'admin_produksi') {
            abort(403, 'Akses ditolak');
        }
        $plannings = Planning::orderBy('start_date', 'desc')->get();
        return view('admin_produksi.dashboard', compact('plannings'));
    }
    public function data_planing()
    {
        if (Auth::user()->role !== 'admin_produksi') {
            abort(403, 'Akses ditolak');
        }

        $plannings = Planning::orderBy('start_date', 'desc')->get();
        $groups = Employee::select('grup')
        ->whereNotNull('grup')
        ->distinct()
            ->pluck('grup');

        $kodeBagians = Employee::select('kode_bagian')
        ->whereNotNull('kode_bagian')
        ->distinct()
            ->pluck('kode_bagian');

        $kodeJabatans = Employee::select('kode_jabatan')
        ->whereNotNull('kode_jabatan')
        ->distinct()
            ->pluck('kode_jabatan');

        // Shift bisa tetap fixed: misalnya Shift 1, 2, 3
        $shifts = ['1', '2', '3'];
    

        return view('admin_produksi.data_planing', compact('plannings', 'groups','kodeBagians', 'kodeJabatans', 'shifts'));
    }

    public function createPlanning()
    {
        $groups = Employee::select('grup')
        ->whereNotNull('grup')
        ->distinct()
            ->pluck('grup');

        $kodeBagians = Employee::select('kode_bagian')
        ->whereNotNull('kode_bagian')
        ->distinct()
            ->pluck('kode_bagian');

        $kodeJabatans = Employee::select('kode_jabatan')
        ->whereNotNull('kode_jabatan')
        ->distinct()
            ->pluck('kode_jabatan');

        // Shift bisa tetap fixed: misalnya Shift 1, 2, 3
        $shifts = ['1', '2', '3'];

        return view('admin_produksi.create_planning', compact('groups', 'kodeBagians', 'kodeJabatans', 'shifts'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'shift' => 'required',
            'group' => 'required',
            'jumlah_karyawan' => 'required|integer|min:1',
            'kode_bagian' => 'required|string',
            'kode_jabatan' => 'required|string',
        ]);

        // Cek konflik: dalam 1 group + kode_bagian + kode_jabatan + shift, tidak boleh overlap tanggal
        $conflict = Planning::where('group', $request->group)
            ->where('kode_bagian', $request->kode_bagian)
            ->where('kode_jabatan', $request->kode_jabatan)
            ->where('shift', $request->shift)
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                    ->orWhereBetween('end_date', [$request->start_date, $request->end_date])
                    ->orWhere(function ($q) use ($request) {
                        $q->where('start_date', '<=', $request->start_date)
                            ->where('end_date', '>=', $request->end_date);
                    });
            })
            ->exists();

        if ($conflict) {
            return back()->withErrors([
                'Planning sudah ada untuk kombinasi Group, Kode Bagian, Kode Jabatan, dan Shift di tanggal tersebut.'
            ])->withInput();
        }

        Planning::create([
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'shift' => $request->shift,
            'group' => $request->group,
            'jumlah_karyawan' => $request->jumlah_karyawan,
            'kode_bagian' => $request->kode_bagian,
            'kode_jabatan' => $request->kode_jabatan,
            'created_by' => Auth::id(),
        ]);

        return redirect()->route('admin_produksi.data_planing')->with('success', 'Planning berhasil disimpan.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'shift' => 'required',
            'group' => 'required',
            'jumlah_karyawan' => 'required|integer|min:1',
        ]);

        $exists = Planning::where('id', '!=', $id)
            ->where('group', $request->group)
            ->where('kode_bagian', $request->kode_bagian)
            ->where('kode_jabatan', $request->kode_jabatan)
            ->where('shift', $request->shift)
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                    ->orWhereBetween('end_date', [$request->start_date, $request->end_date])
                    ->orWhere(function ($q) use ($request) {
                        $q->where('start_date', '<=', $request->start_date)
                            ->where('end_date', '>=', $request->end_date);
                    });
            })
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Planning sudah ada untuk kombinasi Group, Kode Bagian, Kode Jabatan, dan Shift di tanggal tersebut.'], 422);
        }

        $planning = Planning::findOrFail($id);
        $planning->update($request->all());

        return response()->json(['message' => 'Planning berhasil diperbarui.']);
    }

    public function destroy($id)
    {
        $planning = Planning::findOrFail($id);
        $planning->delete();

        return response()->json(['message' => 'Planning berhasil dihapus.']);
    }

    public function showPlotting($id)
    {
        $planning = Planning::with('plottingKehadiran.employee')->findOrFail($id);

        return view('admin_produksi.plotting_view', compact('planning'));
    }

    public function downloadTemplate()
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Perencanaan');

        $sheet->fromArray([
            ['Tanggal Mulai', 'Tanggal Selesai', 'Group', 'Kode Bagian', 'Kode Jabatan', 'Shift', 'Jumlah Karyawan'],
        ]);

        // Format kolom tanggal hanya sampai baris 10
        for ($row = 2; $row <= 15; $row++) {
            $sheet->getStyle("A{$row}")->getNumberFormat()
                ->setFormatCode(NumberFormat::FORMAT_DATE_YYYYMMDD);
            $sheet->getStyle("B{$row}")->getNumberFormat()
                ->setFormatCode(NumberFormat::FORMAT_DATE_YYYYMMDD);
        }

        // Sheet referensi
        $refSheet = $spreadsheet->createSheet();
        $refSheet->setTitle('Referensi');

        $groups = Employee::distinct()->pluck('grup')->filter()->values()->toArray();
        $bagians = Employee::distinct()->pluck('kode_bagian')->filter()->values()->toArray();
        $jabatans = Employee::distinct()->pluck('kode_jabatan')->filter()->values()->toArray();
        $shifts = ['1', '2', '3'];

        $refSheet->fromArray(['Group'], NULL, 'A1');
        $refSheet->fromArray(array_map(fn ($g) => [$g], $groups), NULL, 'A2');

        $refSheet->fromArray(['Kode Bagian'], NULL, 'B1');
        $refSheet->fromArray(array_map(fn ($b) => [$b], $bagians), NULL, 'B2');

        $refSheet->fromArray(['Kode Jabatan'], NULL, 'C1');
        $refSheet->fromArray(array_map(fn ($j) => [$j], $jabatans), NULL, 'C2');

        $refSheet->fromArray(['Shift'], NULL, 'D1');
        $refSheet->fromArray(array_map(fn ($s) => [$s], $shifts), NULL, 'D2');

        // Dropdown hanya sampai baris 11 (10 input baris)
        $rangeGroup = 'Referensi!$A$2:$A$' . (count($groups) + 1);
        $rangeBagian = 'Referensi!$B$2:$B$' . (count($bagians) + 1);
        $rangeJabatan = 'Referensi!$C$2:$C$' . (count($jabatans) + 1);
        $rangeShift = 'Referensi!$D$2:$D$' . (count($shifts) + 1);

        for ($row = 2; $row <= 11; $row++) {
            foreach ([3 => $rangeGroup, 4 => $rangeBagian, 5 => $rangeJabatan, 6 => $rangeShift] as $col => $range) {
                $validation = new DataValidation();
                $validation->setType(DataValidation::TYPE_LIST);
                $validation->setFormula1($range);
                $validation->setAllowBlank(false);
                $validation->setShowDropDown(true);
                $validation->setShowErrorMessage(true);
                $validation->setErrorTitle('Pilihan Tidak Valid');
                $validation->setError('Silakan pilih dari daftar yang tersedia');

                $coord = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($col) . $row;
                $sheet->getCell($coord)->setDataValidation($validation);
            }
        }

        $writer = new Xlsx($spreadsheet);
        $filename = 'template_perencanaan_karyawan.xlsx';

        return response()->streamDownload(fn () => $writer->save('php://output'), $filename);
    }

    public function importExcel(Request $request)
    {
        $request->validate([
            'planning_excel' => 'required|mimes:xlsx,xls'
        ]);

        $file = $request->file('planning_excel');
        $spreadsheet = IOFactory::load($file->getPathname());
        $sheet = $spreadsheet->getActiveSheet();
        $rows = $sheet->toArray();

        $errors = [];
        $count = 0;

        foreach (array_slice($rows, 1) as $index => $row) {
            // Skip jika semua kolom kosong (kecuali kolom jumlah bisa 0)
            if (collect($row)->slice(0, 6)->filter()->isEmpty()) {
                continue;
            }

            [$start_date, $end_date, $group, $kode_bagian, $kode_jabatan, $shift, $jumlah_karyawan] = $row;

            $group = trim(strtoupper($group));
            $kode_bagian = trim(strtoupper($kode_bagian));
            $kode_jabatan = trim(strtoupper($kode_jabatan));
            $shift = trim((string) $shift);

            $validator = Validator::make([
                'start_date' => $start_date,
                'end_date' => $end_date,
                'group' => $group,
                'shift' => $shift,
                'jumlah_karyawan' => $jumlah_karyawan,
                'kode_bagian' => $kode_bagian,
                'kode_jabatan' => $kode_jabatan,
            ], [
                'start_date' => 'required|date',
                'end_date' => 'required|date|after_or_equal:start_date',
                'group' => 'required|string',
                'shift' => 'required|string',
                'jumlah_karyawan' => 'required|integer|min:1',
                'kode_bagian' => 'required|string',
                'kode_jabatan' => 'required|string',
            ]);

            if ($validator->fails()) {
                $errors[] = "Baris " . ($index + 2) . ": " . implode(', ', $validator->errors()->all());
                continue;
            }

            $exactDuplicate = Planning::where([
                ['start_date', '=', $start_date],
                ['end_date', '=', $end_date],
                ['group', '=', $group],
                ['shift', '=', $shift],
            ])->exists();

            if ($exactDuplicate) {
                $errors[] = "Baris " . ($index + 2) . ": Duplikasi persis dengan data planning yang sudah ada (start/end date, group, shift).";
                continue;
            }

            $conflict = Planning::where('group', $group)
                ->where('kode_bagian', $kode_bagian)
                ->where('kode_jabatan', $kode_jabatan)
                ->where('shift', $shift)
                ->where(function ($query) use ($start_date, $end_date) {
                    $query->whereBetween('start_date', [$start_date, $end_date])
                        ->orWhereBetween('end_date', [$start_date, $end_date])
                        ->orWhere(function ($q) use ($start_date, $end_date) {
                            $q->where('start_date', '<=', $start_date)
                                ->where('end_date', '>=', $end_date);
                        });
                })->exists();

            if ($conflict) {
                $errors[] = "Baris " . ($index + 2) . ": Konflik tanggal untuk kombinasi Group, Bagian, Jabatan, dan Shift.";
                continue;
            }

            Planning::create([
                'start_date' => $start_date,
                'end_date' => $end_date,
                'shift' => $shift,
                'group' => $group,
                'jumlah_karyawan' => $jumlah_karyawan,
                'kode_bagian' => $kode_bagian,
                'kode_jabatan' => $kode_jabatan,
                'created_by' => Auth::id(),
            ]);

            $count++;
        }

        if (count($errors)) {
            return response()->json([
                'status' => 'error',
                'errors' => $errors
            ], 422);
        }

        return response()->json([
            'status' => 'success',
            'message' => "Berhasil menyimpan {$count} data planning dari Excel."
        ]);
    }
}
