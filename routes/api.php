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

Route::post('/konfirmasi-kehadiran', [KehadiranApiController::class, 'konfirmasi']);
