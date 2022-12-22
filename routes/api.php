<?php

use App\Http\Controllers\Api\AllStudentController;
use App\Http\Controllers\Api\AllUserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ExaminerController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\SupervisorController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function (){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('logout', [AuthController::class, 'logout']);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/students', StudentController::class);
    Route::apiResource('/projects', ProjectController::class);
    Route::apiResource('/allusers', AllUserController::class);
    Route::apiResource('/allstudents', AllStudentController::class);
    Route::get('/supervisor', [SupervisorController::class, 'index']);
    Route::get('/examiner', [ExaminerController::class, 'index']);
    Route::put('/supervisor/{id}', [SupervisorController::class, 'update']);
});


Route::post('signup', [AuthController::class, 'signup']);
Route::post('login', [AuthController::class, 'login']);
