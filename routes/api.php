<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KehadiranApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Di sini kamu bisa mendefinisikan semua route API, yang secara default
| menggunakan middleware `api` (tanpa CSRF protection).
|
*/

Route::get('/attendance-summary', [KehadiranApiController::class, 'attendanceSummary']);
Route::get('/konfirmasi-kehadiran', [KehadiranApiController::class, 'konfirmasi']);
// Route::post('/konfirmasi-kehadiran', [KehadiranApiController::class, 'konfirmasi']);
Route::get('/get_data/telegram', [KehadiranApiController::class, 'polling']);
