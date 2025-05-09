<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Planning extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'start_date', 'end_date', 'group', 'jumlah_karyawan', 'created_by'
    ];

    public function plottingKehadiran()
    {
        return $this->hasMany(PlottingKehadiran::class);
    }
}
