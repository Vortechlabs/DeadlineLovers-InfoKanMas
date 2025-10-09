<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProgramController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix("V1")->group(function () {
    Route::prefix("Auth")->group(function () {
        Route::post("login",[AuthController::class,"login"]);
        Route::post("register",[AuthController::class,"register"]);
        Route::post("logout",[AuthController::class,"logout"])->middleware('auth:sanctum');
    });

    Route::prefix("user")->group(function () {
        Route::get("me", [AuthController::class, "me"])->middleware('auth:sanctum');
    });

    Route::prefix('program')->group(function () {
        // Standard CRUD
        Route::get('/', [ProgramController::class, 'index']);
        Route::post('/', [ProgramController::class, 'store']);
        Route::get('/{id}', [ProgramController::class, 'show']);
        Route::put('/{id}', [ProgramController::class, 'update']);
        Route::delete('/{id}', [ProgramController::class, 'destroy']);
        
        // Program workflow
        Route::post('/{id}/submit', [ProgramController::class, 'submit']);
        Route::post('/{id}/verify', [ProgramController::class, 'verify']);
        Route::post('/{id}/approve', [ProgramController::class, 'approve']);
        Route::post('/{id}/reject', [ProgramController::class, 'reject']);
        Route::post('/{id}/change-status', [ProgramController::class, 'changeStatus']);
        
        // Program utilities
        Route::get('/filter/search', [ProgramController::class, 'filter']);
        Route::get('/statistics/all', [ProgramController::class, 'statistics']);
        Route::get('/create/metadata', [ProgramController::class, 'create']); // form metadata
    });


});