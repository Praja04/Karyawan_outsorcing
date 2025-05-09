<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // \App\Models\User::create([
        //     'name' => 'Admin',
        //     'email' => 'admin@example.com',
        //     'password' => bcrypt('password'),
        //     'role' => 'admin'
        // ]);

        \App\Models\User::create([
            'name' => 'Supervisor',
            'email' => 'supervisor@example.com',
            'password' => bcrypt('password'),
            'role' => 'supervisor'
        ]);

        \App\Models\User::create([
            'name' => 'Foreman',
            'email' => 'foreman@example.com',
            'password' => bcrypt('password'),
            'role' => 'foreman'
        ]);

        // \App\Models\User::factory(10)->create([
        //     'role' => 'karyawan'
        // ]);
    }
}
