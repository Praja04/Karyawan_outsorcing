<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();

            $table->string('company')->nullable();
            $table->string('nik_bas')->unique(); // NIK BAS
            $table->string('nama_vendor')->nullable();
            $table->string('nik_os')->nullable(); // NIK OS
            $table->string('nama_karyawan'); // required
            $table->string('nomor_ktp')->unique();
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan']);
            $table->text('alamat_ktp');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->string('nomor_hp');
            $table->string('email')->nullable();
            $table->string('agama');
            $table->string('status_nikah')->nullable();
            $table->string('pendidikan');
            $table->string('employee_type')->nullable();
            $table->string('action_type')->nullable();
            $table->string('kode_level')->nullable();
            $table->string('kode_department')->nullable();
            $table->string('grup')->nullable();
            $table->string('kode_bagian')->nullable();
            $table->string('kode_jabatan')->nullable();
            $table->date('begin_date')->nullable();
            $table->date('tanggal_masuk');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
