<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Planning extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'start_date', 'end_date','shift', 'group', 'jumlah_karyawan', 'created_by', 'kode_bagian', 'kode_jabatan'
    ];
    // app/Models/Planning.php
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function plottingKehadiran()
    {
        return $this->hasMany(PlottingKehadiran::class);
    }
}
