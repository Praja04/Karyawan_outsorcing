<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WeekSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        for ($i = 1; $i <= 5; $i++) {
            $start = now()->startOfWeek()->subWeeks(5 - $i);
            \App\Models\Week::create([
                'week_number' => $start->weekOfYear,
                'start_date' => $start->toDateString(),
                'end_date' => $start->endOfWeek()->toDateString(),
            ]);
        }
    }
}
