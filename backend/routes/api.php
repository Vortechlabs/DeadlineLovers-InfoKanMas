<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProgramController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix("V1")->group(function () {
    Route::prefix("Auth")->group(function () {
        Route::post("login", [AuthController::class, "login"]);
        Route::post("register", [AuthController::class, "register"]);
        Route::post("logout", [AuthController::class, "logout"])->middleware('auth:sanctum');
    });

    Route::prefix("user")->group(function () {
        Route::get("me", [AuthController::class, "me"])->middleware('auth:sanctum');
    });

    Route::prefix('program')->group(function () {
        // Public routes - semua bisa lihat
        Route::get('/', [ProgramController::class, 'index']);
        Route::get('/filter/search', [ProgramController::class, 'filter']);
        Route::get('/statistics/all', [ProgramController::class, 'statistics']);
        Route::get('/{id}', [ProgramController::class, 'show'])->middleware('program.ownership');

        // Protected routes
        Route::middleware('auth:sanctum')->group(function () {
            // Hanya admin desa yang bisa buat program
            Route::post('/', [ProgramController::class, 'store'])->middleware('admin.desa');
            
            // Hanya admin desa yang bisa update/delete program miliknya
            Route::put('/{id}', [ProgramController::class, 'update'])
                ->middleware(['admin.desa', 'program.ownership']);
            Route::delete('/{id}', [ProgramController::class, 'destroy'])
                ->middleware(['admin.desa', 'program.ownership']);

            // Program workflow dengan middleware spesifik
            Route::post('/{id}/submit', [ProgramController::class, 'submit'])
                ->middleware(['admin.desa', 'program.ownership']);
            
            Route::post('/{id}/verify', [ProgramController::class, 'verify'])
                ->middleware(['can.verify', 'program.ownership']);
            
            Route::post('/{id}/approve', [ProgramController::class, 'approve'])
                ->middleware(['can.approve', 'program.ownership']);
            
            Route::post('/{id}/reject', [ProgramController::class, 'reject'])
                ->middleware(['can.verify', 'program.ownership']);
            
            Route::post('/{id}/change-status', [ProgramController::class, 'changeStatus'])
                ->middleware(['admin.desa', 'program.ownership']);

            // Form metadata - hanya admin desa
            Route::get('/create/metadata', [ProgramController::class, 'create'])
                ->middleware('admin.desa');
        });
    });

    // Route khusus untuk admin level tertentu
    Route::middleware(['auth:sanctum'])->group(function () {
        // Hanya admin kecamatan ke atas
        Route::prefix('kecamatan')->middleware('admin.kecamatan')->group(function () {
            Route::get('/dashboard', function () {
                return response()->json(['message' => 'Dashboard Kecamatan']);
            });
        });

        // Hanya admin kabupaten ke atas  
        Route::prefix('kabupaten')->middleware('admin.kabupaten')->group(function () {
            Route::get('/dashboard', function () {
                return response()->json(['message' => 'Dashboard Kabupaten']);
            });
        });

        // Hanya admin dinas
        Route::prefix('dinas')->middleware('admin.dinas')->group(function () {
            Route::get('/dashboard', function () {
                return response()->json(['message' => 'Dashboard Dinas']);
            });
        });
    });
});