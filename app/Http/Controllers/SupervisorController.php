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
        if (Auth::user()->role !== 'supervisor') {
            abort(403, 'Akses ditolak');
        }

        $plannings = Planning::orderBy('start_date', 'desc')->get();
        $groups = Employee::select('grup')
            ->whereNotNull('grup')
            ->distinct()
            ->pluck('grup');

        return view('supervisor.dashboard', compact('plannings', 'groups'));
    }

    public function createPlanning()
    {
        // Ambil semua group unik dari tabel employees
        $groups = Employee::select('grup')
            ->whereNotNull('grup')
            ->distinct()
            ->pluck('grup');

        return view('supervisor.create_planning', compact('groups'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'group' => 'required',
            'jumlah_karyawan' => 'required|integer|min:1',
        ]);

        // Cek duplikat rentang tanggal dan group
        $existing = Planning::where('group', $request->group)
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                    ->orWhereBetween('end_date', [$request->start_date, $request->end_date])
                    ->orWhere(function ($q) use ($request) {
                        $q->where('start_date', '<=', $request->start_date)
                            ->where('end_date', '>=', $request->end_date);
                    });
            })
            ->exists();

        if ($existing) {
            return back()->withErrors(['Planning untuk group ini dan rentang tanggal tersebut sudah ada.'])->withInput();
        }

        // Simpan
        Planning::create([
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'group' => $request->group,
            'jumlah_karyawan' => $request->jumlah_karyawan,
            'created_by' => Auth::id(),
        ]);

        return redirect()->route('supervisor.dashboard')->with('success', 'Planning berhasil disimpan.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
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

        return view('supervisor.plotting_view', compact('planning'));
    }

}
