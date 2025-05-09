<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\EmployeeSchedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{

    public function view(Request $request)
    {
        $weeks = range(1, 5); // Maksimal 5 minggu sebulan
        $months = range(1, 12);
        $currentYear = now()->year;

        $query = EmployeeSchedule::with('employee');

        if ($request->filled(['week', 'month', 'year'])) {
            $query->where('week', $request->week)
                ->where('month', $request->month)
                ->where('year', $request->year);
        }

        $schedules = $query->get();

        return view('schedule.view', compact('schedules', 'weeks', 'months', 'currentYear'));
    }


    /**
     * Tampilkan halaman pembagian jadwal.
     */
    public function index()
    {
        // Ambil semua grup unik
        $groups = Employee::select('grup')->distinct()->pluck('grup');

        // Ambil semua karyawan
        $employees = Employee::orderBy('grup')->orderBy('nama_karyawan')->get();

        return view('schedule.index', compact('groups', 'employees'));
    }

    /**
     * Simpan jadwal baru.
     */
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'week' => 'required|integer',
    //         'employee_ids' => 'required|array',
    //     ]);

    //     $week = $request->input('week');
    //     $employeeIds = $request->input('employee_ids');
    //     $currentMonth = now()->month;
    //     $currentYear = now()->year;

    //     foreach ($employeeIds as $employeeId) {
    //         $employee = Employee::find($employeeId);

    //         if ($employee) {
    //             EmployeeSchedule::updateOrCreate(
    //                 [
    //                     'employee_id' => $employeeId,
    //                     'week' => $week,
    //                     'month' => $currentMonth,
    //                     'year' => $currentYear,
    //                 ],
    //                 [
    //                     'group' => $employee->grup,
    //                     'status_hadir' => true,
    //                 ]
    //             );
    //         }
    //     }

    //     return redirect()->back()->with('success', 'Jadwal berhasil disimpan!');
    // }

    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'week' => 'required|integer',
    //         'month' => 'required|integer',
    //         'year' => 'required|integer',
    //         'employee_ids' => 'required|array',
    //     ]);

    //     $week = $request->input('week');
    //     $month = $request->input('month');
    //     $year = $request->input('year');
    //     $employeeIds = $request->input('employee_ids');

    //     foreach ($employeeIds as $employeeId) {
    //         $employee = Employee::find($employeeId);

    //         if ($employee) {
    //             EmployeeSchedule::updateOrCreate(
    //                 [
    //                     'employee_id' => $employeeId,
    //                     'week' => $week,
    //                     'month' => $month,
    //                     'year' => $year,
    //                 ],
    //                 [
    //                     'group' => $employee->grup,
    //                     'status_hadir' => true,
    //                 ]
    //             );
    //         }
    //     }

    //     return response()->json([
    //         'status' => 'success',
    //         'message' => "data berhasil disimpan."
    //     ]);
    // }

    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'start_date' => 'required|date',
    //         'end_date' => 'required|date|after_or_equal:start_date',
    //         'employee_ids' => 'required|array',
    //     ]);

    //     $startDate = $request->input('start_date');
    //     $endDate = $request->input('end_date');
    //     $employeeIds = $request->input('employee_ids');

    //     foreach ($employeeIds as $employeeId) {
    //         $employee = Employee::find($employeeId);

    //         if ($employee) {
    //             EmployeeSchedule::updateOrCreate(
    //                 [
    //                     'employee_id' => $employeeId,
    //                     'start_date' => $startDate,
    //                     'end_date' => $endDate,
    //                 ],
    //                 [
    //                     'group' => $employee->grup,
    //                     'status_hadir' => true,
    //                 ]
    //             );
    //         }
    //     }

    //     return response()->json([
    //         'status' => 'success',
    //         'message' => "Data berhasil disimpan untuk tanggal $startDate sampai $endDate."
    //     ]);
    // }
    public function store(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'employee_ids' => 'required|array',
        ]);

        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        $employeeIds = $request->input('employee_ids');

        $conflicts = [];

        foreach ($employeeIds as $employeeId) {
            // Cek apakah sudah ada jadwal yang bentrok
            $hasConflict = EmployeeSchedule::where('employee_id', $employeeId)
                ->where(function ($query) use ($startDate, $endDate) {
                    $query->whereBetween('start_date', [$startDate, $endDate])
                        ->orWhereBetween('end_date', [$startDate, $endDate])
                        ->orWhere(function ($query) use ($startDate, $endDate) {
                            $query->where('start_date', '<=', $startDate)
                                ->where('end_date', '>=', $endDate);
                        });
                })
                ->exists();

            if ($hasConflict) {
                $employee = Employee::find($employeeId);
                $conflicts[] = $employee ? $employee->nama_karyawan : "ID: $employeeId";
                continue; // Lewati penyimpanan untuk yang konflik
            }

            // Jika tidak bentrok, simpan/update data
            $employee = Employee::find($employeeId);
            if ($employee) {
                EmployeeSchedule::updateOrCreate(
                    [
                        'employee_id' => $employeeId,
                        'start_date' => $startDate,
                        'end_date' => $endDate,
                    ],
                    [
                        'group' => $employee->grup,
                        'status_hadir' => true,
                    ]
                );
            }
        }

        if (!empty($conflicts)) {
            return response()->json([
                'status' => 'warning',
                'message' => 'Beberapa karyawan sudah memiliki jadwal pada tanggal tersebut: ' . implode(', ', $conflicts),
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => "Data berhasil disimpan untuk tanggal $startDate sampai $endDate."
        ]);
    }


    /**
     * Hapus jadwal (opsional).
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'week' => 'required|integer',
            'employee_id' => 'required|integer',
        ]);

        EmployeeSchedule::where('employee_id', $request->employee_id)
            ->where('week', $request->week)
            ->delete();

        return redirect()->back()->with('success', 'Jadwal berhasil dihapus!');
    }

    public function checkSchedule(Request $request)
    {
        $start = $request->start_date;
        $end = $request->end_date;

        $employeeIds = EmployeeSchedule::where('start_date', $start)
            ->where('end_date', $end)
            ->pluck('employee_id');

        return response()->json($employeeIds);
    }

}
