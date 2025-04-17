<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Illuminate\Support\Facades\Validator;
use PhpOffice\PhpSpreadsheet\Shared\Date;



class AdminController extends Controller
{
    //dashboard admin
    public function dashboard()
    {
        // cek apakah user punya session login true dan session username
        if (!session('login') || !session('username')) {
            return redirect('/login');
        }
        return view('admin.dashboard');
    }

    //management karyawan
    public function index()
    {
        // cek apakah user punya session login true dan session username
        if (!session('login') || !session('username')) {
            return redirect('/login');
        }
        return view('admin.prd.index');
    }

    //plotting karyawan Prd
    public function plot_prd()
    {
        // cek apakah user punya session login true dan session username
        if (!session('login') || !session('username')) {
            return redirect('/login');
        }
        return view('admin.prd.plotting_karyawan');
    }


    // Api CRUD management karyawan
    public function getKaryawan()
    {
        $karyawan = Employee::all();
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
                'user_id' => null,
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
                'grup' => $row[19],
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

}
