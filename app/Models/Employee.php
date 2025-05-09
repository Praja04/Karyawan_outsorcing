<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{
       use HasFactory;

    protected $fillable = [
        'user_id',
        'company',
        'nik_bas',
        'nama_vendor',
        'nik_os',
        'nama_karyawan',
        'nomor_ktp',
        'jenis_kelamin',
        'alamat_ktp',
        'tempat_lahir',
        'tanggal_lahir',
        'nomor_hp',
        'email',
        'agama',
        'status_nikah',
        'pendidikan',
        'employee_type',
        'action_type',
        'kode_level',
        'kode_department',
        'grup',
        'kode_bagian',
        'kode_jabatan',
        'begin_date',
        'tanggal_masuk',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function schedules()
    {
        return $this->hasMany(EmployeeSchedule::class);
    }

    public function plottingKehadiran()
    {
        return $this->hasMany(PlottingKehadiran::class);
    }
}
