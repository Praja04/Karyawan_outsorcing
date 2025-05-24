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
    //hrd mitra
    Route::get('/hrd/mitra', [AdminController::class, 'index']);
    // hrd Bas
    Route::get('/kelola/karyawan', [AdminController::class, 'index']);
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/plotting/prd', [AdminController::class, 'plot_prd']);

    // CRUD management karyawan
    Route::get('/employees', [AdminController::class, 'getKaryawan']);
    Route::post('/employees', [AdminController::class, 'store']);
    Route::put('/employees/{id}', [AdminController::class, 'update']);
    Route::delete('/employees/{id}', [AdminController::class, 'destroy']);
    Route::post('/employees/import', [AdminController::class, 'import'])->name('employees.import');
    Route::post('/employees/update/wa', [AdminController::class, 'uploadNomorWaExcel'])->name('employees.update_wa');
    Route::get('/download-template', [AdminController::class, 'downloadTemplateUploadData'])->name('download.templateData');
    Route::get('/download-template-wa', [AdminController::class, 'downloadTemplateUpdateWA'])->name('download.templateWa');
    Route::post('/employee/template-wa', [AdminController::class, 'uploadNomorWaExcel'])->name('upload.templateWa');
    Route::get('/planning/{id}/plotting', [AdminController::class, 'planningDetail'])->name('admin_hrd.plotting.show');
    // routes/web.php
    Route::get('/planning/{id}/detail', [AdminController::class, 'planningDetail'])->name('planning.detail');

    //api dashboard
    Route::get('/api/dashboard/summary', [AdminController::class, 'Api_Summary_Dashboard_admin_hrd'])->name('api.dashboard_hrd');
    
});

Route::prefix('supervisor')->group(function () {
    Route::get('/dashboard', [SupervisorController::class, 'dashboard'])->name('admin_produksi.dashboard');
    Route::get('/data/planing', [SupervisorController::class, 'data_planing'])->name('admin_produksi.data_planing');
    Route::get('/planning/create', [SupervisorController::class, 'createPlanning'])->name('admin_produksi.planning.create');
    Route::post('/planning/store', [SupervisorController::class, 'store'])->name('admin_produksi.planning.store');
    Route::put('planning/{id}', [SupervisorController::class, 'update'])->name('admin_produksi.planning.update');
    Route::delete('planning/{id}', [SupervisorController::class, 'destroy'])->name('admin_produksi.planning.destroy');
    Route::get('/planning/{id}/plotting', [SupervisorController::class, 'showPlotting'])->name('admin_produksi.plotting.show');
});



// web.php
Route::prefix('foreman')->group(function () {
    Route::get('/dashboard', [ForemanController::class, 'dashboard'])->name('foreman.dashboard');
    Route::get('/data/planing', [ForemanController::class, 'data_planing'])->name('foreman.data_planing');
    Route::get('/plotting/{planning}', [ForemanController::class, 'viewPlotting'])->name('foreman.plotting.view');
    Route::post('/plotting', [ForemanController::class, 'storePlotting'])->name('foreman.plotting.store');
    Route::post('/plotting/update', [ForemanController::class, 'updatePlotting'])->name('plotting.update'); // ← EDIT Plotting
    Route::delete('/plotting/{id}', [ForemanController::class, 'deletePlotting'])->name('foreman.plotting.delete');
    Route::get('/planning/{id}/plotting', [ForemanController::class, 'showPlotting'])->name('foreman.plotting.show');
});



Route::prefix('schedule')->group(function () {
    Route::get('/', [ScheduleController::class, 'index'])->name('schedule.index');
    Route::post('/store', [ScheduleController::class, 'store'])->name('schedule.store');
    Route::delete('/destroy', [ScheduleController::class, 'destroy'])->name('schedule.destroy');
    Route::get('/view', [ScheduleController::class, 'view'])->name('schedule.view');
    Route::get('/check-schedule', [ScheduleController::class, 'checkSchedule']);
});
