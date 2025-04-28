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

    public function store(Request $request)
    {
        $request->validate([
            'week' => 'required|integer',
            'month' => 'required|integer',
            'year' => 'required|integer',
            'employee_ids' => 'required|array',
        ]);

        $week = $request->input('week');
        $month = $request->input('month');
        $year = $request->input('year');
        $employeeIds = $request->input('employee_ids');

        foreach ($employeeIds as $employeeId) {
            $employee = Employee::find($employeeId);

            if ($employee) {
                EmployeeSchedule::updateOrCreate(
                    [
                        'employee_id' => $employeeId,
                        'week' => $week,
                        'month' => $month,
                        'year' => $year,
                    ],
                    [
                        'group' => $employee->grup,
                        'status_hadir' => true,
                    ]
                );
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => "data berhasil disimpan."
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
}
