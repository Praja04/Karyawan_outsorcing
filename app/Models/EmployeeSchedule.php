<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id', 'week', 'status_hadir', 'month',
        'year',
        'group'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
