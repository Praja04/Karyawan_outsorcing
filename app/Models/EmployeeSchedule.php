<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id', 'status_hadir', 'start_date', 'end_date',
        'group'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
    
}
