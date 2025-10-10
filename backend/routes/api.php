<?php

use App\Http\Controllers\API\AiDocumentController;
use App\Http\Controllers\API\AiFraudDetectionController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\Api\PengaduanController;
use App\Http\Controllers\API\ProgramController;
use App\Http\Controllers\ProgramDokumenController;
use App\Http\Controllers\ProgramDokumentasiController;
use App\Http\Controllers\ProgramRekomendasiController;
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

    Route::get('/test', function () {
        return ['message' => 'API working'];
    });

    // Test authentication
    Route::get('/test-auth', function (Request $request) {
        $user = auth()->user; //awalnya user()
        return response()->json([
            'authenticated' => auth()->check, //awalnya check()
            'user_id' => $user ? $user->id : null,
            'user_name' => $user ? $user->nama : null,
            'token_valid' => !is_null($user)
        ]);
    })->middleware('auth:sanctum');

    Route::prefix('program')->group(function () {
        // Public routes - bisa diakses tanpa login
        Route::get('/', [ProgramController::class, 'index']);
        Route::get('/filter', [ProgramController::class, 'filter']);
        Route::get('/statistics', [ProgramController::class, 'statistics']);
        Route::get('/{id}', [ProgramController::class, 'show']);

        // Protected routes - butuh login
        Route::middleware(['auth:sanctum'])->group(function () {
            Route::get('/create/metadata', [ProgramController::class, 'create'])->middleware('admin.desa');
            Route::post('/', [ProgramController::class, 'store'])->middleware('admin.desa');
            Route::put('/{id}', [ProgramController::class, 'update'])->middleware(['admin.desa', 'program.ownership']);
            Route::delete('/{id}', [ProgramController::class, 'destroy'])->middleware(['admin.desa', 'program.ownership']);

            // Workflow routes
            Route::post('/{id}/submit', [ProgramController::class, 'submit'])->middleware(['admin.desa', 'program.ownership']);
            Route::post('/{id}/verify', [ProgramController::class, 'verify'])->middleware(['can.verify', 'program.ownership']);
            Route::post('/{id}/approve', [ProgramController::class, 'approve'])->middleware(['can.approve', 'program.ownership']);
            Route::post('/{id}/reject', [ProgramController::class, 'reject'])->middleware(['can.verify', 'program.ownership']);
            Route::post('/{id}/change-status', [ProgramController::class, 'changeStatus'])->middleware(['admin.kabupaten', 'program.ownership']);
            Route::post('/{id}/progress', [ProgramController::class, 'updateProgress'])->middleware(['auth:sanctum', 'program.ownership']);
            Route::post('/{id}/dokumentasi', [ProgramController::class, 'uploadDokumentasi'])->middleware(['auth:sanctum', 'program.ownership']);
            Route::get('/{id}/export', [ProgramController::class, 'exportProgram'])->middleware(['auth:sanctum', 'program.ownership']);
            Route::post('/create-without-tahapan', [ProgramController::class, 'createWithoutTahapan'])->middleware('admin.desa');
            Route::post('/{id}/add-tahapan', [ProgramController::class, 'addTahapan'])->middleware(['admin.desa', 'program.ownership']);
            Route::post('/{id}/complete-program', [ProgramController::class, 'completeProgram'])->middleware(['admin.desa', 'program.ownership']);
            Route::get('/{id}/default-tahapan', [ProgramController::class, 'getDefaultTahapan'])->middleware(['admin.desa', 'program.ownership']);
        });
    });

    // Tambahkan routes AI document processing
    Route::prefix('ai-document')->group(function () {
        Route::post('/program/{programId}/upload-rundown', [AiDocumentController::class, 'uploadRundown'])->middleware('auth:sanctum');
        Route::get('/document/{dokumenId}/status', [AiDocumentController::class, 'getProcessingStatus'])->middleware('auth:sanctum');
            Route::post('/document/{dokumenId}/generate-tahapan', [AiDocumentController::class, 'generateTahapan'])->middleware('auth:sanctum');
    });


    Route::prefix('pengaduan')->group(function () {
        Route::get('/', [PengaduanController::class, 'index']);
        Route::get('/{id}', [PengaduanController::class, 'show']);
        Route::post('/', [PengaduanController::class, 'store']);
        Route::put('/{id}', [PengaduanController::class, 'update']);
        Route::patch('/{id}/status', [PengaduanController::class, 'updateStatus']);
        Route::delete('/{id}', [PengaduanController::class, 'destroy']);
    });

    Route::prefix('ai-fraud-detection')->group(function () {
        Route::post('/program/{programId}/analyze-document', [AiFraudDetectionController::class, 'analyzeDocument'])->middleware('auth:sanctum');
        Route::post('/program/{programId}/analyze-rab', [AiFraudDetectionController::class, 'analyzeRAB'])->middleware('auth:sanctum');
        Route::get('/program/{programId}/comprehensive-analysis', [AiFraudDetectionController::class, 'comprehensiveAnalysis'])->middleware('auth:sanctum');
        Route::get('/analysis/{analisisId}/status', [AiFraudDetectionController::class, 'getAnalysisStatus'])->middleware('auth:sanctum');
        Route::get('/analysis/{analisisId}/recommendations', [AiFraudDetectionController::class, 'getRecommendations'])->middleware('auth:sanctum');
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