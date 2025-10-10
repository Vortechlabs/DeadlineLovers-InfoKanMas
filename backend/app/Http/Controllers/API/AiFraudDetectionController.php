<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ProgramDokumenModel;
use App\Models\ProgramModel;
use App\Models\ProgramRabModel;
use App\Models\FraudAnalysisModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Smalot\PdfParser\Parser as PdfParser;
use PhpOffice\PhpWord\IOFactory;

class AiFraudDetectionController extends Controller
{
    /**
     * Analisis dokumen untuk deteksi kecurangan - COMPREHENSIVE VERSION
     */
    public function analyzeDocument(Request $request, $programId)
    {
        try {
            $program = ProgramModel::findOrFail($programId);

            // Validasi akses
            $user = Auth::user();
            if ($user->role === 'admin_desa' && $program->wilayah_id !== $user->alamat_lengkap) {
                return response()->json([
                    'success' => false,
                    'message' => 'Forbidden. Anda hanya bisa mengakses program di desa Anda.'
                ], 403);
            }

            $validator = Validator::make($request->all(), [
                'document_file' => 'required|file|mimes:pdf,doc,docx,txt|max:10240',
                'jenis_dokumen' => 'required|in:proposal,rab,spk,kontrak,laporan',
                'analisis_tipe' => 'required|in:fraud_detection,consistency_check,risk_analysis'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $file = $request->file('document_file');
            $filePath = $file->store("fraud_analysis/{$programId}", 'public');

            // Simpan dokumen untuk analisis
            $dokumen = ProgramDokumenModel::create([
                'program_id' => $programId,
                'jenis_dokumen' => $request->jenis_dokumen,
                'nama_dokumen' => 'Analisis Kecurangan - ' . $request->jenis_dokumen,
                'file_path' => $filePath,
                'file_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'file_size' => $file->getSize(),
                'keterangan' => 'Dokumen untuk analisis kecurangan',
                'status_verifikasi_ai' => 'processing'
            ]);

            Log::info("✅ Dokumen fraud analysis uploaded: {$dokumen->id}");

            // Mulai analisis dengan AI
            $analysisResult = $this->analyzeDocumentWithAI($dokumen, $request->jenis_dokumen, $request->analisis_tipe);

            // Simpan hasil analisis
            $fraudAnalysis = FraudAnalysisModel::create([
                'program_id' => $programId,
                'dokumen_id' => $dokumen->id,
                'jenis_analisis' => $request->analisis_tipe,
                'jenis_dokumen' => $request->jenis_dokumen,
                'hasil_analisis' => json_encode($analysisResult),
                'skor_risiko' => $analysisResult['skor_risiko'] ?? 0,
                'level_risiko' => $analysisResult['level_risiko'] ?? 'unknown',
                'rekomendasi' => json_encode($analysisResult['rekomendasi'] ?? []),
                'flag_meragukan' => $analysisResult['flag_meragukan'] ?? false,
                'processed_at' => now(),
                'status' => 'completed'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Analisis dokumen berhasil dilakukan',
                'data' => [
                    'analysis' => $fraudAnalysis,
                    'document' => $dokumen,
                    'results' => $analysisResult
                ]
            ], 201);

        } catch (\Exception $e) {
            Log::error('❌ Fraud analysis error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menganalisis dokumen: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Analisis RAB untuk deteksi anomali harga
     */
    public function analyzeRAB(Request $request, $programId)
    {
        try {
            $program = ProgramModel::findOrFail($programId);

            // Validasi akses
            $user = Auth::user();
            if ($user->role === 'admin_desa' && $program->wilayah_id !== $user->alamat_lengkap) {
                return response()->json([
                    'success' => false,
                    'message' => 'Forbidden. Anda hanya bisa mengakses program di desa Anda.'
                ], 403);
            }

            $validator = Validator::make($request->all(), [
                'rab_items' => 'required|array',
                'rab_items.*.nama_item' => 'required|string',
                'rab_items.*.volume' => 'required|numeric',
                'rab_items.*.satuan' => 'required|string',
                'rab_items.*.harga_satuan' => 'required|numeric',
                'rab_items.*.total' => 'required|numeric',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi RAB gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $rabData = $request->input('rab_items');
            
            // Analisis RAB dengan AI
            $analysisResult = $this->analyzeRABWithAI($rabData, $program);

            // Simpan hasil analisis RAB
            $fraudAnalysis = FraudAnalysisModel::create([
                'program_id' => $programId,
                'jenis_analisis' => 'rab_anomaly',
                'jenis_dokumen' => 'rab',
                'hasil_analisis' => json_encode($analysisResult),
                'skor_risiko' => $analysisResult['skor_risiko'] ?? 0,
                'level_risiko' => $analysisResult['level_risiko'] ?? 'unknown',
                'rekomendasi' => json_encode($analysisResult['rekomendasi'] ?? []),
                'flag_meragukan' => $analysisResult['flag_meragukan'] ?? false,
                'item_mencurigakan' => json_encode($analysisResult['item_mencurigakan'] ?? []),
                'processed_at' => now(),
                'status' => 'completed'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Analisis RAB berhasil dilakukan',
                'data' => [
                    'analysis' => $fraudAnalysis,
                    'results' => $analysisResult
                ]
            ], 201);

        } catch (\Exception $e) {
            Log::error('❌ RAB analysis error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal menganalisis RAB: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Analisis komprehensif seluruh program
     */
    public function comprehensiveAnalysis($programId)
    {
        try {
            $program = ProgramModel::with(['rabItems', 'dokumen', 'tahapan'])->findOrFail($programId);

            // Validasi akses
            $user = Auth::user();
            if ($user->role === 'admin_desa' && $program->wilayah_id !== $user->alamat_lengkap) {
                return response()->json([
                    'success' => false,
                    'message' => 'Forbidden. Anda hanya bisa mengakses program di desa Anda.'
                ], 403);
            }

            // Kumpulkan semua data untuk analisis
            $analysisData = [
                'program' => [
                    'nama_program' => $program->nama_program,
                    'anggaran_total' => $program->anggaran_total,
                    'kategori' => $program->kategori->nama_kategori ?? 'Unknown',
                    'lokasi' => $program->wilayah->nama_wilayah ?? 'Unknown'
                ],
                'rab_items' => $program->rabItems->toArray(),
                'dokumen_count' => $program->dokumen->count(),
                'tahapan' => $program->tahapan->toArray()
            ];

            // Analisis komprehensif dengan AI
            $analysisResult = $this->comprehensiveAnalysisWithAI($analysisData, $program);

            // Simpan hasil analisis
            $fraudAnalysis = FraudAnalysisModel::create([
                'program_id' => $programId,
                'jenis_analisis' => 'comprehensive',
                'jenis_dokumen' => 'multiple',
                'hasil_analisis' => json_encode($analysisResult),
                'skor_risiko' => $analysisResult['skor_risiko_keseluruhan'] ?? 0,
                'level_risiko' => $analysisResult['level_risiko_keseluruhan'] ?? 'unknown',
                'rekomendasi' => json_encode($analysisResult['rekomendasi_komprehensif'] ?? []),
                'flag_meragukan' => $analysisResult['program_berisiko'] ?? false,
                'item_mencurigakan' => json_encode($analysisResult['item_berisiko'] ?? []),
                'processed_at' => now(),
                'status' => 'completed'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Analisis komprehensif berhasil dilakukan',
                'data' => [
                    'analysis' => $fraudAnalysis,
                    'results' => $analysisResult
                ]
            ], 200);

        } catch (\Exception $e) {
            Log::error('❌ Comprehensive analysis error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal melakukan analisis komprehensif: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Analisis dokumen dengan Gemini AI untuk deteksi kecurangan
     */
    private function analyzeDocumentWithAI($dokumen, $jenisDokumen, $analisisTipe)
    {
        try {
            Log::info("🔄 Starting fraud analysis for document: {$dokumen->id}");

            // Extract text dari dokumen
            $text = $this->extractTextFromDocument($dokumen->file_path);

            if (empty($text)) {
                throw new \Exception('Tidak dapat mengekstrak teks dari dokumen');
            }

            Log::info("📝 Text extracted for fraud analysis, length: " . strlen($text));

            // Analisis dengan Gemini AI
            $analysisResult = $this->analyzeFraudWithGeminiAPI($text, $jenisDokumen, $analisisTipe);

            Log::info("✅ Fraud analysis completed", $analysisResult);

            return $analysisResult;

        } catch (\Exception $e) {
            Log::error('❌ Fraud analysis error: ' . $e->getMessage());
            
            // Fallback analysis
            return $this->fallbackFraudAnalysis($text ?? '', $jenisDokumen);
        }
    }

    /**
     * Analisis RAB dengan AI untuk deteksi anomali
     */
    private function analyzeRABWithAI($rabData, $program)
    {
        try {
            Log::info("🔄 Starting RAB analysis for program: {$program->id}");

            $analysisResult = $this->analyzeRABWithGeminiAPI($rabData, $program);

            Log::info("✅ RAB analysis completed", $analysisResult);

            return $analysisResult;

        } catch (\Exception $e) {
            Log::error('❌ RAB analysis error: ' . $e->getMessage());
            
            // Fallback RAB analysis
            return $this->fallbackRABAnalysis($rabData);
        }
    }

    /**
     * Analisis komprehensif dengan AI
     */
    private function comprehensiveAnalysisWithAI($analysisData, $program)
    {
        try {
            Log::info("🔄 Starting comprehensive analysis for program: {$program->id}");

            $analysisResult = $this->comprehensiveAnalysisWithGeminiAPI($analysisData, $program);

            Log::info("✅ Comprehensive analysis completed", $analysisResult);

            return $analysisResult;

        } catch (\Exception $e) {
            Log::error('❌ Comprehensive analysis error: ' . $e->getMessage());
            
            // Fallback comprehensive analysis
            return $this->fallbackComprehensiveAnalysis($analysisData);
        }
    }

    /**
     * Analisis kecurangan dengan Gemini API
     */
    private function analyzeFraudWithGeminiAPI($text, $jenisDokumen, $analisisTipe)
    {
        $apiKey = config('services.gemini.api_key');

        if (!$apiKey) {
            throw new \Exception('Gemini API key tidak dikonfigurasi');
        }

        // Potong text jika terlalu panjang
        $maxLength = 28000;
        if (strlen($text) > $maxLength) {
            $text = substr($text, 0, $maxLength) . "... [text dipotong]";
        }

        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={$apiKey}";

        $prompt = $this->buildFraudAnalysisPrompt($text, $jenisDokumen, $analisisTipe);

        Log::info("🚀 Sending fraud analysis request to Gemini API...");

        $response = Http::timeout(60)->post($url, [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => 0.1,
                'topK' => 32,
                'topP' => 0.8,
                'maxOutputTokens' => 2048,
            ]
        ]);

        if ($response->failed()) {
            throw new \Exception('Gemini API request failed. Status: ' . $response->status());
        }

        $data = $response->json();

        if (!isset($data['candidates'][0]['content']['parts'][0]['text'])) {
            throw new \Exception('Invalid response structure from Gemini API');
        }

        $aiResponse = $data['candidates'][0]['content']['parts'][0]['text'];

        return $this->parseFraudAnalysisResponse($aiResponse);
    }

    /**
     * Build prompt untuk analisis kecurangan
     */
    private function buildFraudAnalysisPrompt($text, $jenisDokumen, $analisisTipe)
    {
        $jenisDokumenLabels = [
            'proposal' => 'Proposal Program',
            'rab' => 'Rencana Anggaran Biaya (RAB)',
            'spk' => 'Surat Perintah Kerja (SPK)',
            'kontrak' => 'Kontrak Kerja',
            'laporan' => 'Laporan Progress'
        ];

        $analysisTypeLabels = [
            'fraud_detection' => 'Deteksi Kecurangan dan Penyelewengan',
            'consistency_check' => 'Pemeriksaan Konsistensi Data',
            'risk_analysis' => 'Analisis Risiko Program'
        ];

        return <<<PROMPT
ANALISIS DOKUMEN UNTUK DETEKSI KECURANGAN

JENIS DOKUMEN: {$jenisDokumenLabels[$jenisDokumen]}
JENIS ANALISIS: {$analysisTypeLabels[$analisisTipe]}

DATA DOKUMEN:
{$text}

INSTRUKSI ANALISIS:
1. Analisis dokumen untuk menemukan indikasi kecurangan, ketidakwajaran, atau penyelewengan
2. Identifikasi pola yang mencurigakan atau tidak sesuai standar
3. Berikan skor risiko 0-100 (semakin tinggi semakin berisiko)
4. Tentukan level risiko: low/medium/high/critical
5. Berikan rekomendasi perbaikan spesifik
6. Flag item/poin yang mencurigakan

FORMAT OUTPUT HARUS JSON:

{
  "skor_risiko": 75,
  "level_risiko": "high",
  "flag_meragukan": true,
  "temuan_kunci": [
    {
      "deskripsi": "Deskripsi temuan",
      "level_keparahan": "medium",
      "rekomendasi": "Rekomendasi perbaikan"
    }
  ],
  "rekomendasi": [
    "Rekomendasi perbaikan 1",
    "Rekomendasi perbaikan 2"
  ],
  "ringkasan_analisis": "Ringkasan hasil analisis"
}

OUTPUT SEKARANG:
PROMPT;
    }

    /**
     * Analisis RAB dengan Gemini API
     */
    private function analyzeRABWithGeminiAPI($rabData, $program)
    {
        $apiKey = config('services.gemini.api_key');

        if (!$apiKey) {
            throw new \Exception('Gemini API key tidak dikonfigurasi');
        }

        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={$apiKey}";

        $prompt = $this->buildRABAnalysisPrompt($rabData, $program);

        $response = Http::timeout(60)->post($url, [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => 0.1,
                'topK' => 32,
                'topP' => 0.8,
                'maxOutputTokens' => 2048,
            ]
        ]);

        if ($response->failed()) {
            throw new \Exception('Gemini API request failed. Status: ' . $response->status());
        }

        $data = $response->json();

        if (!isset($data['candidates'][0]['content']['parts'][0]['text'])) {
            throw new \Exception('Invalid response structure from Gemini API');
        }

        $aiResponse = $data['candidates'][0]['content']['parts'][0]['text'];

        return $this->parseRABAnalysisResponse($aiResponse);
    }

    /**
     * Build prompt untuk analisis RAB
     */
    private function buildRABAnalysisPrompt($rabData, $program)
    {
        $rabJson = json_encode($rabData, JSON_PRETTY_PRINT);

        return <<<PROMPT
ANALISIS RAB (RENCANA ANGGARAN BIAYA) UNTUK DETEKSI ANOMALI

PROGRAM: {$program->nama_program}
TOTAL ANGGARAN: Rp " . number_format($program->anggaran_total, 0, ',', '.') . "

DATA RAB:
{$rabJson}

INSTRUKSI ANALISIS:
1. Analisis setiap item RAB untuk ketidakwajaran harga
2. Bandingkan dengan harga pasar wajar untuk setiap material/jasa
3. Identifikasi item dengan harga terlalu tinggi/rendah
4. Deteksi duplikasi item atau mark-up berlebihan
5. Hitung skor risiko berdasarkan temuan
6. Berikan rekomendasi perbaikan

FORMAT OUTPUT HARUS JSON:

{
  "skor_risiko": 65,
  "level_risiko": "medium",
  "flag_meragukan": true,
  "item_mencurigakan": [
    {
      "nama_item": "Nama item",
      "harga_satuan": 1000000,
      "harga_pasar_wajar": 750000,
      "selisih_persen": 33.33,
      "keterangan": "Harga di atas pasar wajar",
      "rekomendasi": "Negosiasi ulang harga"
    }
  ],
  "rekomendasi": [
    "Rekomendasi perbaikan 1",
    "Rekomendasi perbaikan 2"
  ],
  "ringkasan_analisis": "Ringkasan hasil analisis RAB"
}

OUTPUT SEKARANG:
PROMPT;
    }

    /**
     * Parse response analisis kecurangan
     */
    private function parseFraudAnalysisResponse($aiResponse)
    {
        // Bersihkan response dari markdown code blocks
        $cleanedResponse = preg_replace('/```json\s*/', '', $aiResponse);
        $cleanedResponse = preg_replace('/```\s*/', '', $cleanedResponse);
        $cleanedResponse = trim($cleanedResponse);

        // Cari JSON dalam response
        preg_match('/\{(?:[^{}]|(?R))*\}/s', $cleanedResponse, $matches);

        if (isset($matches[0])) {
            $result = json_decode($matches[0], true);
            if (json_last_error() === JSON_ERROR_NONE) {
                Log::info('✅ Successfully parsed fraud analysis JSON');
                return $result;
            }
        }

        // Fallback jika tidak ada JSON valid
        Log::warning('⚠️ No valid JSON found in fraud analysis, using fallback');
        return $this->fallbackFraudAnalysis('');
    }

    /**
     * Parse response analisis RAB
     */
    private function parseRABAnalysisResponse($aiResponse)
    {
        $cleanedResponse = preg_replace('/```json\s*/', '', $aiResponse);
        $cleanedResponse = preg_replace('/```\s*/', '', $cleanedResponse);
        $cleanedResponse = trim($cleanedResponse);

        preg_match('/\{(?:[^{}]|(?R))*\}/s', $cleanedResponse, $matches);

        if (isset($matches[0])) {
            $result = json_decode($matches[0], true);
            if (json_last_error() === JSON_ERROR_NONE) {
                Log::info('✅ Successfully parsed RAB analysis JSON');
                return $result;
            }
        }

        Log::warning('⚠️ No valid JSON found in RAB analysis, using fallback');
        return $this->fallbackRABAnalysis([]);
    }

    /**
     * Fallback analysis untuk kecurangan
     */
    private function fallbackFraudAnalysis($text, $jenisDokumen)
    {
        // Analisis sederhana berdasarkan panjang teks dan kata kunci
        $suspiciousKeywords = [
            'mark up', 'mark-up', 'markup', 'fee', 'komisi', 'uang tunai',
            'tanpa bukti', 'tidak sesuai', 'diluar ketentuan', 'penyelewengan'
        ];

        $keywordCount = 0;
        foreach ($suspiciousKeywords as $keyword) {
            if (stripos($text, $keyword) !== false) {
                $keywordCount++;
            }
        }

        $riskScore = min(100, $keywordCount * 15 + (strlen($text) < 500 ? 30 : 0));

        return [
            'skor_risiko' => $riskScore,
            'level_risiko' => $riskScore >= 70 ? 'high' : ($riskScore >= 40 ? 'medium' : 'low'),
            'flag_meragukan' => $riskScore >= 50,
            'temuan_kunci' => [
                [
                    'deskripsi' => 'Analisis otomatis: ' . $keywordCount . ' kata kunci mencurigakan ditemukan',
                    'level_keparahan' => $riskScore >= 70 ? 'high' : 'medium',
                    'rekomendasi' => 'Perlu pemeriksaan lebih lanjut oleh auditor'
                ]
            ],
            'rekomendasi' => [
                'Lakukan verifikasi lapangan',
                'Mintalah bukti pendukung lengkap',
                'Bandingkan dengan harga pasar wajar'
            ],
            'ringkasan_analisis' => 'Analisis fallback: Dokumen memerlukan pemeriksaan manual'
        ];
    }

    /**
     * Fallback analysis untuk RAB
     */
    private function fallbackRABAnalysis($rabData)
    {
        $suspiciousItems = [];
        $totalRisk = 0;

        foreach ($rabData as $item) {
            $hargaSatuan = $item['harga_satuan'];
            $volume = $item['volume'];
            $total = $item['total'];

            // Deteksi harga tidak wajar
            if ($hargaSatuan > 100000000) { // Harga > 100 juta per unit
                $suspiciousItems[] = [
                    'nama_item' => $item['nama_item'],
                    'harga_satuan' => $hargaSatuan,
                    'harga_pasar_wajar' => $hargaSatuan * 0.7, // Estimasi
                    'selisih_persen' => 42.8,
                    'keterangan' => 'Harga sangat tinggi',
                    'rekomendasi' => 'Negosiasi ulang atau cari supplier lain'
                ];
                $totalRisk += 25;
            }

            // Deteksi volume tidak wajar
            if ($volume > 1000) {
                $totalRisk += 15;
            }
        }

        $riskScore = min(100, $totalRisk);
        $suspiciousCount = count($suspiciousItems);

        return [
            'skor_risiko' => $riskScore,
            'level_risiko' => $riskScore >= 60 ? 'high' : ($riskScore >= 30 ? 'medium' : 'low'),
            'flag_meragukan' => $suspiciousCount > 0,
            'item_mencurigakan' => $suspiciousItems,
            'rekomendasi' => [
                'Verifikasi harga dengan minimum 3 supplier',
                'Minta breakdown harga detail',
                'Lakukan survey harga pasar'
            ],
            'ringkasan_analisis' => "Ditemukan {$suspiciousCount} item mencurigakan"
        ];
    }

    /**
     * Extract text dari dokumen (reuse dari AiDocumentController)
     */
    private function extractTextFromDocument($filePath)
    {
        $fullPath = Storage::disk('public')->path($filePath);
        $extension = pathinfo($fullPath, PATHINFO_EXTENSION);

        switch (strtolower($extension)) {
            case 'pdf':
                return $this->extractTextFromPDF($fullPath);
            case 'doc':
            case 'docx':
                return $this->extractTextFromWord($fullPath);
            case 'txt':
                return file_get_contents($fullPath);
            default:
                throw new \Exception('Format dokumen tidak didukung: ' . $extension);
        }
    }

    private function extractTextFromPDF($filePath)
    {
        try {
            $parser = new PdfParser();
            $pdf = $parser->parseFile($filePath);
            return $pdf->getText();
        } catch (\Exception $e) {
            throw new \Exception('Gagal mengekstrak teks dari PDF: ' . $e->getMessage());
        }
    }

    private function extractTextFromWord($filePath)
    {
        try {
            $phpWord = IOFactory::load($filePath);
            $text = '';

            foreach ($phpWord->getSections() as $section) {
                foreach ($section->getElements() as $element) {
                    if (method_exists($element, 'getText')) {
                        $text .= $element->getText() . ' ';
                    }
                }
            }

            return trim($text);
        } catch (\Exception $e) {
            throw new \Exception('Gagal mengekstrak teks dari Word: ' . $e->getMessage());
        }
    }
}