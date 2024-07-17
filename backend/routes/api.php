<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RequestController;
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

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signin', [AuthController::class, 'signin']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/requests', [RequestController::class, 'index']);
Route::delete('/requests/{id}', [RequestController::class, 'destroy']);
Route::post('/requests', [RequestController::class, 'store']);
Route::put('/requests/{id}', [RequestController::class, 'update']);
Route::get('/request-status-counts', [RequestController::class, 'getStatusCounts']);