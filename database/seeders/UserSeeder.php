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

        // \App\Models\User::create([
        //     'name' => 'Admin_HRD',
        //     'email' => 'Admin_HRD@example.com',
        //     'password' => bcrypt('admin_hrd'),
        //     'role' => 'admin_hrd'
        // ]);
        \App\Models\User::create([
            'name' => 'Admin_HRD_KMJ',
            'email' => 'Admin_HRD_KMJ@example.com',
            'password' => bcrypt('admin_mitra'),
            'role' => 'admin_hrd_mitra_kmj'
        ]);
        \App\Models\User::create([
            'name' => 'Admin_HRD_Fortuna',
            'email' => 'Admin_HRD_Fortuna@example.com',
            'password' => bcrypt('admin_mitra'),
            'role' => 'admin_hrd_mitra_fortuna'
        ]);

        // \App\Models\User::create([
        //     'name' => 'Admin_Produksi',
        //     'email' => 'Admin_Produksi@example.com',
        //     'password' => bcrypt('admin_produksi'),
        //     'role' => 'admin_produksi'
        // ]);

        // \App\Models\User::create([
        //     'name' => 'Staff_Produksi1',
        //     'email' => 'Staff_Produksi1@example.com',
        //     'password' => bcrypt('staff_1'),
        //     'role' => 'staff_produksi',
        //     'admin_group'=> 'Group A'
        // ]);
        // \App\Models\User::create([
        //     'name' => 'Staff_Produksi2',
        //     'email' => 'Staff_Produksi2@example.com',
        //     'password' => bcrypt('staff_2'),
        //     'role' => 'staff_produksi',
        //     'admin_group'=> 'Group B'
        // ]);
        // \App\Models\User::create([
        //     'name' => 'Staff_Produksi3',
        //     'email' => 'Staff_Produksi3@example.com',
        //     'password' => bcrypt('staff_3'),
        //     'role' => 'staff_produksi',
        //     'admin_group'=> 'Group C'
        // ]);

    }
}
