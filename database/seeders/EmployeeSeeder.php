<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Support\Str;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::where('role', 'karyawan')->get();

        foreach ($users as $user) {
            Employee::create([
                'company'           => 'PT Outsource Jaya',
                'nik_bas'           => 'BAS-' . str_pad($user->id, 4, '0', STR_PAD_LEFT),
                'nama_vendor'       => 'Vendor Nusantara',
                'nik_os'            => 'OS-' . rand(1000, 9999),
                'nama_karyawan'     => $user->name,
                'nomor_ktp'         => fake()->numerify('################'),
                'jenis_kelamin'     => ['Laki-laki', 'Perempuan'][rand(0, 1)],
                'alamat_ktp'        => fake()->address(),
                'tempat_lahir'      => fake()->city(),
                'tanggal_lahir'     => fake()->date('Y-m-d', '-20 years'),
                'nomor_hp'          => fake()->phoneNumber(),
                'email'             => $user->email,
                'agama'             => ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Budha'][rand(0, 4)],
                'status_nikah'      => ['Menikah', 'Belum Menikah'][rand(0, 1)],
                'pendidikan'        => ['SMA', 'D3', 'S1'][rand(0, 2)],
                'employee_type'     => 'Outsourcing',
                'action_type'       => 'Tetap',
                'kode_level'        => 'L1',
                'kode_department'   => 'DP01',
                'grup'              => 'Grup A',
                'kode_bagian'       => 'BG01',
                'kode_jabatan'      => 'JB01',
                'begin_date'        => fake()->dateTimeBetween('-2 years', '-1 years')->format('Y-m-d'),
                'tanggal_masuk'     => fake()->dateTimeBetween('-1 years', 'now')->format('Y-m-d'),
            ]);
        }
    }
}
