<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $weeks = \App\Models\Week::all();
        $employees = \App\Models\Employee::all();

        foreach ($weeks as $week) {
            foreach ($employees->random(20) as $employee) {
                \App\Models\Attendance::create([
                    'employee_id' => $employee->id,
                    'week_id' => $week->id,
                    'is_present' => true,
                    'notes' => 'Hadir untuk minggu ke-' . $week->week_number
                ]);
            }
        }
    }
}
