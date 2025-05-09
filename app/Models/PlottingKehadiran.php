<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PlottingKehadiran extends Model
{
    use HasFactory;
    protected $table = 'plotting_kehadiran';
    protected $fillable = [
        'planning_id',
        'employee_id',
        'tanggal',
        'status_konfirmasi', // optional: hadir/tidak/null
    ];

    public function planning()
    {
        return $this->belongsTo(Planning::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
