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

    public function plottingKehadiran()
    {
        return $this->hasMany(PlottingKehadiran::class);
    }
}
