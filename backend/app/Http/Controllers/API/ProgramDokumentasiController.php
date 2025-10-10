<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use App\Models\ProgramDokumentasiModel;
use App\Models\ProgramProgressModel;
use App\Models\ProgramModel;
use Exception;

class ProgramDokumentasiController extends Controller
{
    // URL FastAPI endpoint
    private $fastApiUrl = 'https://prepyloric-nonfamiliar-victoria.ngrok-free.dev/deteksi-anggaran';
    
    /**
     * Upload file dokumentasi dan kirim ke FastAPI untuk analisis
     */
    public function uploadDokumentasi(Request $request)
    {
        try {
            // Validasi input
            $validated = $request->validate([
                'progress_id' => 'required|exists:program_progress,id',
                'jenis' => 'required|in:foto,video,dokumen,proposal',
                'file' => 'required|file|max:51200', // Max 50MB
                'latitude' => 'nullable|numeric',
                'longitude' => 'nullable|numeric',
                'waktu_pengambilan' => 'nullable|date_format:Y-m-d H:i:s',
                'keterangan' => 'nullable|string|max:500',
            ]);

            $file = $request->file('file');
            $progress = ProgramProgressModel::findOrFail($validated['progress_id']);
            
            // Validasi file untuk proposal/anggaran
            if ($validated['jenis'] === 'proposal') {
                if ($file->getClientOriginalExtension() !== 'pdf') {
                    return response()->json([
                        'status' => false,
                        'message' => 'File proposal harus berformat PDF',
                    ], 422);
                }
            }

            // Simpan file terlebih dahulu
            $fileData = $this->saveFile($file, $progress->program_id, $validated['jenis']);

            // Jika file adalah proposal/pdf, kirim ke FastAPI
            if ($validated['jenis'] === 'proposal' || $file->getClientOriginalExtension() === 'pdf') {
                $analysisResult = $this->analyzeWithFastAPI($file, $progress);
            } else {
                $analysisResult = null;
            }

            // Buat record dokumentasi
            $dokumentasi = ProgramDokumentasiModel::create([
                'progress_id' => $validated['progress_id'],
                'jenis' => $validated['jenis'],
                'file_path' => $fileData['path'],
                'file_name' => $fileData['name'],
                'mime_type' => $fileData['mime_type'],
                'file_size' => $fileData['size'],
                'latitude' => $validated['latitude'] ?? null,
                'longitude' => $validated['longitude'] ?? null,
                'waktu_pengambilan' => $validated['waktu_pengambilan'] ?? now(),
                'keterangan' => $validated['keterangan'] ?? null,
                'metadata_ai' => $analysisResult['metadata_ai'] ?? null,
                'is_verified_ai' => $analysisResult['is_verified'] ?? false,
                'resiko_kecurangan' => $analysisResult['fraud_risk'] ?? null,
                'presentase_kecurangan' => $analysisResult['fraud_percent'] ?? null,
                'skor_ai' => $analysisResult['ai_score'] ?? null,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'File dokumentasi berhasil diupload dan dianalisis',
                'data' => [
                    'dokumentasi_id' => $dokumentasi->id,
                    'file_name' => $dokumentasi->file_name,
                    'resiko_kecurangan' => $dokumentasi->resiko_kecurangan,
                    'skor_ai' => $dokumentasi->skor_ai,
                    'presentase_kecurangan' => $dokumentasi->presentase_kecurangan,
                ]
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Simpan file ke storage
     */
    private function saveFile($file, $programId, $jenis): array
    {
        $fileName = $jenis . '_' . $programId . '_' . time() . '.' . $file->getClientOriginalExtension();
        $path = 'dokumentasi/' . $programId . '/' . $fileName;
        
        Storage::disk('public')->put($path, file_get_contents($file));

        return [
            'name' => $fileName,
            'path' => $path,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
        ];
    }

    /**
     * Analisis file ke FastAPI
     */
    private function analyzeWithFastAPI($file, $progress): array
    {
        try {
            $response = Http::withTimeout(60)
                ->attach('file', fopen($file->path(), 'r'), $file->getClientOriginalName())
                ->post($this->fastApiUrl);

            if (!$response->successful()) {
                error_log('FastAPI Error: ' . json_encode($response->json()));
                return [];
            }

            $fastApiData = $response->json();

            // Ekstrak data dari FastAPI response
            $summary = $fastApiData['summary'] ?? [];
            $fraudRisk = $summary['fraud_risk'] ?? 'UNKNOWN';
            $fraudPercent = $summary['fraud_percent'] ?? 0;
            $aiScore = $summary['ai_score'] ?? 0;
            $aiReason = $summary['ai_reason'] ?? [];
            $anomaliDetail = $fastApiData['anomali_detail'] ?? [];

            // Siapkan metadata
            $metadata = [
                'ai_reason' => is_array($aiReason) ? $aiReason : [$aiReason],
                'ai_recommendation' => $fastApiData['ai_recommendation'] ?? '',
                'anomali_detail' => $anomaliDetail,
            ];

            return [
                'fraud_risk' => $fraudRisk,
                'fraud_percent' => $fraudPercent,
                'ai_score' => $aiScore,
                'is_verified' => true,
                'metadata_ai' => $metadata,
            ];

        } catch (\Exception $e) {
            error_log('FastAPI Connection Error: ' . $e->getMessage());
            return [];
        }
    }


    /**
     * Menampilkan detail dokumentasi
     */
    public function showDokumentasi($dokumentasiId)
    {
        try {
            $dokumentasi = ProgramDokumentasiModel::findOrFail($dokumentasiId);

            return response()->json([
                'status' => true,
                'data' => [
                    'id' => $dokumentasi->id,
                    'jenis' => $dokumentasi->jenis,
                    'file_name' => $dokumentasi->file_name,
                    'file_url' => $dokumentasi->file_url,
                    'mime_type' => $dokumentasi->mime_type,
                    'file_size' => $dokumentasi->file_size,
                    'latitude' => $dokumentasi->latitude,
                    'longitude' => $dokumentasi->longitude,
                    'waktu_pengambilan' => $dokumentasi->waktu_pengambilan,
                    'keterangan' => $dokumentasi->keterangan,
                    'resiko_kecurangan' => $dokumentasi->resiko_kecurangan,
                    'presentase_kecurangan' => $dokumentasi->presentase_kecurangan,
                    'skor_ai' => $dokumentasi->skor_ai,
                    'is_verified_ai' => $dokumentasi->is_verified_ai,
                    'metadata_ai' => $dokumentasi->metadata_ai,
                ]
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Dokumentasi tidak ditemukan'
            ], 404);
        }
    }

    /**
     * Menampilkan semua dokumentasi untuk progress tertentu
     */
    public function listDokumentasi($progressId)
    {
        try {
            $progress = ProgramProgressModel::findOrFail($progressId);
            $dokumentasi = ProgramDokumentasiModel::where('progress_id', $progressId)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'status' => true,
                'data' => $dokumentasi->map(function ($doc) {
                    return [
                        'id' => $doc->id,
                        'jenis' => $doc->jenis,
                        'file_name' => $doc->file_name,
                        'mime_type' => $doc->mime_type,
                        'waktu_pengambilan' => $doc->waktu_pengambilan,
                        'resiko_kecurangan' => $doc->resiko_kecurangan,
                        'skor_ai' => $doc->skor_ai,
                        'is_verified_ai' => $doc->is_verified_ai,
                    ];
                })
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Progress tidak ditemukan'
            ], 404);
        }
    }

    /**
     * Menampilkan ringkasan analisis untuk satu program
     */
    public function getSummaryAnalysis($programId)
    {
        try {
            $program = ProgramModel::findOrFail($programId);
            
            // Ambil semua dokumentasi dari semua progress program ini
            $dokumentasi = ProgramDokumentasiModel::whereHas('progress', function ($query) use ($programId) {
                $query->where('program_id', $programId);
            })->where('is_verified_ai', true)->get();

            $totalDokumentasi = $dokumentasi->count();
            $risikoTinggi = $dokumentasi->where('resiko_kecurangan', 'HIGH')->count();
            $risikoStandar = $dokumentasi->where('resiko_kecurangan', 'STANDARD')->count();
            $risikoRendah = $dokumentasi->where('resiko_kecurangan', 'LOW')->count();
            $rataRataSkorAi = $dokumentasi->avg('skor_ai');
            $rataRataFraudPercent = $dokumentasi->avg('presentase_kecurangan');

            return response()->json([
                'status' => true,
                'data' => [
                    'program_id' => $program->id,
                    'program_name' => $program->nama_program,
                    'total_dokumentasi' => $totalDokumentasi,
                    'analisis' => [
                        'resiko_tinggi' => $risikoTinggi,
                        'resiko_standar' => $risikoStandar,
                        'resiko_rendah' => $risikoRendah,
                    ],
                    'rata_rata_skor_ai' => round($rataRataSkorAi, 2),
                    'rata_rata_fraud_percent' => round($rataRataFraudPercent, 2),
                    'persentase_risiko' => [
                        'tinggi' => round(($risikoTinggi / max($totalDokumentasi, 1)) * 100, 2),
                        'standar' => round(($risikoStandar / max($totalDokumentasi, 1)) * 100, 2),
                        'rendah' => round(($risikoRendah / max($totalDokumentasi, 1)) * 100, 2),
                    ]
                ]
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Program tidak ditemukan'
            ], 404);
        }
    }

    /**
     * Update verifikasi manual hasil analisis AI
     */
    public function updateVerifikasi(Request $request, $dokumentasiId)
    {
        try {
            $validated = $request->validate([
                'resiko_kecurangan' => 'required|in:LOW,STANDARD,HIGH',
                'skor_ai' => 'required|numeric|min:0|max:100',
                'is_verified_ai' => 'required|boolean',
                'keterangan' => 'nullable|string|max:500',
            ]);

            $dokumentasi = ProgramDokumentasiModel::findOrFail($dokumentasiId);
            $dokumentasi->update($validated);

            return response()->json([
                'status' => true,
                'message' => 'Verifikasi berhasil diupdate',
                'data' => [
                    'id' => $dokumentasi->id,
                    'resiko_kecurangan' => $dokumentasi->resiko_kecurangan,
                    'skor_ai' => $dokumentasi->skor_ai,
                    'is_verified_ai' => $dokumentasi->is_verified_ai,
                ]
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal mengupdate verifikasi: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete dokumentasi
     */
    public function deleteDokumentasi($dokumentasiId)
    {
        try {
            $dokumentasi = ProgramDokumentasiModel::findOrFail($dokumentasiId);
            
            // Hapus file dari storage
            if (Storage::disk('public')->exists($dokumentasi->file_path)) {
                Storage::disk('public')->delete($dokumentasi->file_path);
            }

            $dokumentasi->delete();

            return response()->json([
                'status' => true,
                'message' => 'Dokumentasi berhasil dihapus'
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menghapus dokumentasi'
            ], 500);
        }
    }
}