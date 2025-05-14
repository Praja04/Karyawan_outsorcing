<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SupervisorController;
use App\Http\Controllers\ForemanController;
use App\Http\Controllers\ScheduleController;

// Auth
Route::get('/', [AuthController::class, 'showLogin']);
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');


// Route hanya untuk admin
Route::prefix('admin')->group(function () {
    Route::get('/kelola/karyawan', [AdminController::class, 'index']);
    //Route::get('/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/dashboard', function () {
        if (
            Auth::user()->role !== 'admin'
        ) abort(403, 'Akses ditolak');
        return view('admin.dashboard');
    });
    Route::get('/plotting/prd', [AdminController::class, 'plot_prd']);

    // CRUD management karyawan
    Route::get('/employees', [AdminController::class, 'getKaryawan']);
    Route::post('/employees', [AdminController::class, 'store']);
    Route::put('/employees/{id}', [AdminController::class, 'update']);
    Route::delete('/employees/{id}', [AdminController::class, 'destroy']);
    Route::post('/employees/import', [AdminController::class, 'import'])->name('employees.import');
});

Route::prefix('supervisor')->group(function () {
    Route::get('/dashboard', [SupervisorController::class, 'dashboard'])->name('supervisor.dashboard');
    Route::get('/planning/create', [SupervisorController::class, 'createPlanning'])->name('supervisor.planning.create');
    Route::post('/planning/store', [SupervisorController::class, 'store'])->name('supervisor.planning.store');
    Route::put('planning/{id}', [SupervisorController::class, 'update'])->name('supervisor.planning.update');
    Route::delete('planning/{id}', [SupervisorController::class, 'destroy'])->name('supervisor.planning.destroy');
    Route::get('/planning/{id}/plotting', [SupervisorController::class, 'showPlotting'])->name('supervisor.plotting.show');
    });



// web.php
Route::prefix('foreman')->group(function () {
    Route::get('/dashboard', [ForemanController::class, 'index'])->name('foreman.dashboard');
    Route::get('/plotting/{planning}', [ForemanController::class, 'viewPlotting'])->name('foreman.plotting.view');
    Route::post('/plotting', [ForemanController::class, 'storePlotting'])->name('foreman.plotting.store');
    Route::delete('/plotting/{id}', [ForemanController::class, 'deletePlotting'])->name('foreman.plotting.delete');
});



Route::prefix('schedule')->group(function () {
    Route::get('/', [ScheduleController::class, 'index'])->name('schedule.index');
    Route::post('/store', [ScheduleController::class, 'store'])->name('schedule.store');
    Route::delete('/destroy', [ScheduleController::class, 'destroy'])->name('schedule.destroy');
    Route::get('/view', [ScheduleController::class, 'view'])->name('schedule.view');
    Route::get('/check-schedule', [ScheduleController::class, 'checkSchedule']);
});

