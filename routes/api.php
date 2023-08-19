<?php

use App\Http\Controllers\api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/dataUser', [AuthController::class, 'recup_userData']);
Route::get('/sendSMS', [AuthController::class, 'sendSMS']);
Route::get('/authCheck', [AuthController::class, 'authCheck']);
Route::get('/logout', [AuthController::class, 'logout']);

Route::post('/setDataUser', [AuthController::class, 'setDataUser']);
Route::post('/verify_code', [AuthController::class, 'verify_code']);
Route::post('/verify_token', [AuthController::class, 'verify_token']);
Route::post('/verify_user', [AuthController::class, 'verify_user']);
