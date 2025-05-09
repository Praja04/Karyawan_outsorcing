<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Planning;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\PlottingKehadiran;

class ForemanController extends Controller
{
    //
    public function index()
    {
        $plannings = Planning::with('plottingKehadiran.employee')->orderBy('start_date', 'desc')->paginate(10);
        $employees = Employee::all(); // atau filter by group jika perlu

        return view('foreman.dashboard', compact('plannings', 'employees'));
    }
    public function storePlotting(Request $request)
    {
        $request->validate([
            'planning_id' => 'required|exists:plannings,id',
            'employee_ids' => 'required|array',
        ]);

        $planning = Planning::findOrFail($request->planning_id);

        // Hitung jumlah karyawan yang sudah di-plotting
        $existingPlottingCount = $planning->plottingKehadiran()->count();
        $newPlottingCount = count($request->employee_ids);

        // Cek apakah jumlah yang di-plotting melebihi jumlah yang sudah direncanakan oleh supervisor
        if (($existingPlottingCount + $newPlottingCount) > $planning->jumlah_karyawan) {
            return back()->with('error', 'Jumlah karyawan yang dipilih melebihi jumlah yang sudah direncanakan oleh supervisor.');
        }

        // Jika sudah oke, simpan plotting
        foreach ($request->employee_ids as $empId) {
            $planning->plottingKehadiran()->create([
                'employee_id' => $empId,
                'tanggal' => Carbon::today()->toDateString(),
                'status_konfirmasi' => null,
            ]);
        }

        return redirect()->route('foreman.dashboard')->with('success', 'Plotting berhasil disimpan.');
    }


    public function viewPlotting(Planning $planning)
    {
        // Ambil hanya karyawan dari grup terkait
        $employees = Employee::where('grup', $planning->group)->get();
        // Ambil ID karyawan yang sudah di-plotting
        $plottingEmployeeIds = $planning->plottingKehadiran()->pluck('employee_id')->toArray();
        $plottedEmployees = $planning->plottingKehadiran->pluck('employee_id')->toArray();
        return view('foreman.plotting', compact('planning', 'employees', 'plottedEmployees', 'plottingEmployeeIds'));
    }
    public function deletePlotting($id)
    {
        $plotting = PlottingKehadiran::findOrFail($id);
        $plotting->delete();

        return response()->json(['message' => 'Berhasil dihapus']);
    }
}
