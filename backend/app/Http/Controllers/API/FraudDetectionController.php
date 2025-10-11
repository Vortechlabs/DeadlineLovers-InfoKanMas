<?php
// app/Http/Controllers/API/FraudDetectionController.php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\AiFraudDetectionService;
use App\Models\ProgramModel;
use App\Models\FraudAnalysisModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FraudDetectionController extends Controller
{
    protected $fraudService;

    public function __construct(AiFraudDetectionService $fraudService)
    {
        $this->fraudService = $fraudService;
    }

    /**
     * Trigger fraud analysis untuk program
     */
    public function analyzeProgram($programId)
    {
        try {
            $program = ProgramModel::findOrFail($programId);

            // Cek akses
            $user = Auth::user();
            if (!$user->hasRole(['admin_kecamatan', 'admin_kabupaten', 'admin_dinas'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Anda tidak memiliki akses untuk fitur ini'
                ], 403);
            }

            $result = $this->fraudService->analyzeProgramComprehensive($programId);

            return response()->json([
                'success' => true,
                'message' => 'Analisis fraud berhasil dilakukan',
                'data' => $result
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menganalisis program: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get fraud analysis history untuk program
     */
    public function getAnalysisHistory($programId)
    {
        try {
            $analyses = FraudAnalysisModel::where('program_id', $programId)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $analyses
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil history analisis'
            ], 500);
        }
    }

    /**
     * Manual override status (jika AI salah)
     */
    public function manualOverride(Request $request, $programId)
    {
        try {
            $program = ProgramModel::findOrFail($programId);
            
            $validated = $request->validate([
                'status_program' => 'required|in:draft,diajukan,diverifikasi_kecamatan,approved,rejected',
                'alasan' => 'required|string'
            ]);

            $program->update([
                'status_program' => $validated['status_program'],
                'catatan_verifikasi' => "MANUAL OVERRIDE: {$validated['alasan']}"
            ]);

            // Log manual override
            FraudAnalysisModel::create([
                'program_id' => $programId,
                'jenis_analisis' => 'manual_override',
                'jenis_dokumen' => 'multiple',
                'hasil_analisis' => ['manual_override_reason' => $validated['alasan']],
                'skor_risiko' => 0,
                'level_risiko' => 'low',
                'status' => 'completed',
                'processed_at' => now()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Status program berhasil diupdate manual'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal update manual: ' . $e->getMessage()
            ], 500);
        }
    }
}