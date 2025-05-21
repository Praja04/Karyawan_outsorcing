<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Planning;
use App\Models\Employee;
use Illuminate\Support\Facades\Auth;

class SupervisorController extends Controller
{
    public function dashboard()
    {
        if (Auth::user()->role !== 'admin_produksi') {
            abort(403, 'Akses ditolak');
        }

        return view('admin_produksi.dashboard');
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

        return view('admin_produksi.data_planing', compact('plannings', 'groups'));
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
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                    ->orWhereBetween('end_date', [$request->start_date, $request->end_date]);
            })
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Planning untuk tanggal dan grup ini sudah ada.'], 422);
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

}
