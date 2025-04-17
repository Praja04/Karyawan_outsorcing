<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;

// Auth
Route::get('/', [AuthController::class, 'showLogin']);
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');


// Route hanya untuk admin
Route::prefix('admin')->group(function () {
    Route::get('/kelola/karyawan', [AdminController::class, 'index']);
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/plotting/prd', [AdminController::class, 'plot_prd']);

    // CRUD management karyawan
    Route::get('/employees', [AdminController::class, 'getKaryawan']);
    Route::post('/employees', [AdminController::class, 'store']);
    Route::put('/employees/{id}', [AdminController::class, 'update']);
    Route::delete('/employees/{id}', [AdminController::class, 'destroy']);
    Route::post('/employees/import', [AdminController::class, 'import'])->name('employees.import');
});
 
// Route hanya untuk karyawan
Route::prefix('karyawan')->group(function () {
    Route::get('/karyawan-only', fn () => 'Halaman khusus karyawan');
    // bisa buat route untuk karyawan melihat daftar hadirnya
});

