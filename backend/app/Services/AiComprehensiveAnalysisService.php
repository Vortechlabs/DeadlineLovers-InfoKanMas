<?php
// app/Services/AiComprehensiveAnalysisService.php

namespace App\Services;

use App\Models\ProgramModel;
use App\Models\ProgramDokumenModel;
use App\Models\ProgramRabModel;
use App\Models\FraudAnalysisModel;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Smalot\PdfParser\Parser as PdfParser;
use PhpOffice\PhpWord\IOFactory;
use Intervention\Image\Facades\Image;
use thiagoalessio\TesseractOCR\TesseractOCR;

class AiComprehensiveAnalysisService
{
    private $geminiApiKey;

    public function __construct()
    {
        $this->geminiApiKey = config('services.gemini.api_key');
    }

    /**
     * ANALISIS KOMPREHENSIF PROGRAM - SEMUA DOKUMEN
     */
    public function analyzeProgramComprehensive($programId)
    {
        try {
            $program = ProgramModel::with(['dokumen', 'rabItems', 'tahapan', 'wilayah'])->find($programId);
            
            if (!$program) {
                throw new \Exception("Program tidak ditemukan");
            }

            Log::info("🔄 Starting comprehensive AI analysis for program: {$programId}");

            // 1. EKSTRAK DATA DARI SEMUA SUMBER
            $extractedData = $this->extractAllProgramData($program);

            // 2. ANALISIS DENGAN GEMINI AI
            $analysisResult = $this->analyzeWithGeminiComprehensive($extractedData, $program);

            // 3. SIMPAN HASIL ANALISIS
            $this->saveAnalysisResult($programId, $analysisResult);

            // 4. AUTO-UPDATE STATUS BERDASARKAN RISK LEVEL
            $this->autoUpdateProgramStatus($program, $analysisResult);

            Log::info("✅ Comprehensive analysis completed for program: {$programId}");

            return $analysisResult;

        } catch (\Exception $e) {
            Log::error("❌ Comprehensive analysis failed: " . $e->getMessage());
            throw $e;
        }
    }

    /**
     * EKSTRAK DATA DARI SEMUA DOKUMEN & GAMBAR
     */
    private function extractAllProgramData($program)
    {
        $extractedData = [
            'program_data' => $program->toArray(),
            'rab_analysis' => $this->analyzeRAB($program->rabItems),
            'documents_text' => [],
            'images_analysis' => [],
            'financial_indicators' => $this->calculateFinancialIndicators($program),
            'location_analysis' => $this->analyzeLocation($program->wilayah)
        ];

        // Ekstrak teks dari semua dokumen
        foreach ($program->dokumen as $dokumen) {
            try {
                $text = $this->extractTextFromAnyDocument($dokumen->file_path, $dokumen->mime_type);
                if ($text) {
                    $extractedData['documents_text'][$dokumen->jenis_dokumen] = [
                        'text' => $text,
                        'file_name' => $dokumen->file_name,
                        'analysis' => $this->quickDocumentAnalysis($text, $dokumen->jenis_dokumen)
                    ];
                }
            } catch (\Exception $e) {
                Log::warning("Failed to extract from {$dokumen->file_name}: " . $e->getMessage());
            }
        }

        // OCR untuk gambar (foto lokasi, dll)
        $imageDocs = $program->dokumen->whereIn('mime_type', ['image/jpeg', 'image/png', 'image/jpg']);
        foreach ($imageDocs as $imageDoc) {
            try {
                $ocrText = $this->extractTextFromImage($imageDoc->file_path);
                if ($ocrText) {
                    $extractedData['images_analysis'][$imageDoc->jenis_dokumen] = [
                        'ocr_text' => $ocrText,
                        'file_name' => $imageDoc->file_name,
                        'visual_analysis' => $this->analyzeImageContent($imageDoc->file_path)
                    ];
                }
            } catch (\Exception $e) {
                Log::warning("Failed OCR for {$imageDoc->file_name}: " . $e->getMessage());
            }
        }

        return $extractedData;
    }

    /**
     * EKSTRAK TEKS DARI SEMUA JENIS DOKUMEN
     */
    private function extractTextFromAnyDocument($filePath, $mimeType)
    {
        $fullPath = Storage::disk('public')->path($filePath);
        
        if (!file_exists($fullPath)) {
            throw new \Exception("File tidak ditemukan: {$fullPath}");
        }

        // PDF
        if (str_contains($mimeType, 'pdf')) {
            $parser = new PdfParser();
            $pdf = $parser->parseFile($fullPath);
            return $pdf->getText();
        }

        // Word Documents
        if (str_contains($mimeType, 'word') || str_contains($mimeType, 'document')) {
            $phpWord = IOFactory::load($fullPath);
            $text = '';
            foreach ($phpWord->getSections() as $section) {
                foreach ($section->getElements() as $element) {
                    if (method_exists($element, 'getText')) {
                        $text .= $element->getText() . ' ';
                    }
                }
            }
            return trim($text);
        }

        // Text files
        if (str_contains($mimeType, 'text')) {
            return file_get_contents($fullPath);
        }

        // Images (OCR)
        if (str_contains($mimeType, 'image')) {
            return $this->extractTextFromImage($fullPath);
        }

        return null;
    }

    /**
     * OCR UNTUK GAMBAR
     */
    private function extractTextFromImage($imagePath)
    {
        try {
            $fullPath = Storage::disk('public')->path($imagePath);
            
            // Gunakan Tesseract OCR
            $tesseract = new TesseractOCR($fullPath);
            $tesseract->setLanguage('ind'); // Bahasa Indonesia
            $text = $tesseract->run();
            
            return !empty(trim($text)) ? $text : null;
            
        } catch (\Exception $e) {
            Log::warning("OCR failed for {$imagePath}: " . $e->getMessage());
            return null;
        }
    }

    /**
     * ANALISIS RAB & ANGGARAN
     */
    private function analyzeRAB($rabItems)
    {
        $totalAnggaran = $rabItems->sum('total');
        $itemCount = $rabItems->count();
        
        $priceAnalysis = [];
        $suspiciousItems = [];

        foreach ($rabItems as $item) {
            // Deteksi harga tidak wajar
            $unitPrice = $item->harga_satuan;
            $isSuspicious = $this->detectSuspiciousPricing($item->nama_item, $unitPrice, $item->satuan);
            
            if ($isSuspicious) {
                $suspiciousItems[] = [
                    'item' => $item->nama_item,
                    'harga_satuan' => $unitPrice,
                    'alasan' => $isSuspicious
                ];
            }

            $priceAnalysis[] = [
                'item' => $item->nama_item,
                'harga_satuan' => $unitPrice,
                'volume' => $item->volume,
                'total' => $item->total,
                'risk_level' => $isSuspicious ? 'high' : 'low'
            ];
        }

        return [
            'total_anggaran' => $totalAnggaran,
            'item_count' => $itemCount,
            'average_price_per_item' => $totalAnggaran / max($itemCount, 1),
            'suspicious_items' => $suspiciousItems,
            'suspicious_count' => count($suspiciousItems),
            'price_analysis' => $priceAnalysis
        ];
    }

    /**
     * DETEKSI HARGA TIDAK WAJAR
     */
    private function detectSuspiciousPricing($itemName, $price, $unit)
    {
        // Database harga referensi (bisa disimpan di config)
        $referencePrices = [
            'semen' => ['min' => 50000, 'max' => 80000, 'unit' => 'sak'],
            'pasir' => ['min' => 150000, 'max' => 250000, 'unit' => 'm3'],
            'batu' => ['min' => 180000, 'max' => 300000, 'unit' => 'm3'],
            'besi' => ['min' => 12000, 'max' => 20000, 'unit' => 'kg'],
            'kayu' => ['min' => 3000000, 'max' => 6000000, 'unit' => 'm3'],
            'aspal' => ['min' => 800000, 'max' => 1500000, 'unit' => 'ton']
        ];

        $itemLower = strtolower($itemName);
        
        foreach ($referencePrices as $refItem => $range) {
            if (str_contains($itemLower, $refItem)) {
                if ($price < $range['min'] * 0.5 || $price > $range['max'] * 2) {
                    return "Harga {$price} di luar range normal {$range['min']} - {$range['max']}";
                }
            }
        }

        // Deteksi harga terlalu tinggi untuk volume besar
        if ($price > 100000000) { // 100 juta
            return "Harga item sangat tinggi: " . number_format($price);
        }

        return false;
    }

    /**
     * INDIKATOR KEUANGAN
     */
    private function calculateFinancialIndicators($program)
    {
        $anggaranTotal = $program->anggaran_total;
        $targetPenerima = $program->target_penerima_manfaat;
        
        $costPerBeneficiary = $targetPenerima > 0 ? $anggaranTotal / $targetPenerima : 0;
        
        // Benchmarking
        $benchmarks = [
            'infrastruktur' => 5000000, // 5jt per orang
            'bansos' => 1000000,       // 1jt per orang  
            'pendidikan' => 2000000,   // 2jt per orang
            'kesehatan' => 3000000,    // 3jt per orang
        ];

        $kategori = strtolower($program->kategori->nama_kategori ?? 'lainnya');
        $benchmark = $benchmarks[$kategori] ?? 2000000;

        $costEfficiency = $costPerBeneficiary <= $benchmark ? 'efficient' : 'inefficient';

        return [
            'anggaran_total' => $anggaranTotal,
            'target_penerima' => $targetPenerima,
            'cost_per_beneficiary' => $costPerBeneficiary,
            'benchmark' => $benchmark,
            'cost_efficiency' => $costEfficiency,
            'efficiency_ratio' => $benchmark > 0 ? $costPerBeneficiary / $benchmark : 0
        ];
    }

    /**
     * ANALISIS LOKASI
     */
    private function analyzeLocation($wilayah)
    {
        return [
            'nama_wilayah' => $wilayah->nama_wilayah,
            'tingkat' => $wilayah->tingkat,
            'population_density' => 'medium', // bisa integrasi data real
            'development_index' => 'medium',  // bisa integrasi data real
        ];
    }

    /**
     * ANALISIS CEPAT DOKUMEN
     */
    private function quickDocumentAnalysis($text, $docType)
    {
        $textLower = strtolower($text);
        
        $redFlags = [
            'fiktif', 'palsu', 'mark up', 'mark-up', 'dimanipulasi',
            'tidak sesuai', 'disembunyikan', 'dipalsukan'
        ];

        $greenFlags = [
            'sesuai', 'lengkap', 'transparan', 'jelas', 'dokumen asli',
            'terverifikasi', 'resmi'
        ];

        $redFlagCount = 0;
        $greenFlagCount = 0;

        foreach ($redFlags as $flag) {
            if (str_contains($textLower, $flag)) $redFlagCount++;
        }

        foreach ($greenFlags as $flag) {
            if (str_contains($textLower, $flag)) $greenFlagCount++;
        }

        return [
            'red_flags' => $redFlagCount,
            'green_flags' => $greenFlagCount,
            'risk_indicator' => $redFlagCount > $greenFlagCount ? 'high' : 'low'
        ];
    }

    /**
     * ANALISIS KONTEN GAMBAR
     */
    private function analyzeImageContent($imagePath)
    {
        // Basic image analysis - bisa dikembangkan dengan computer vision
        return [
            'analysis' => 'basic_visual_analysis',
            'has_text' => true, // dari OCR sebelumnya
            'quality_score' => 0.8
        ];
    }

    /**
     * ANALISIS KOMPREHENSIF DENGAN GEMINI AI
     */
    private function analyzeWithGeminiComprehensive($extractedData, $program)
    {
        $prompt = $this->buildComprehensivePrompt($extractedData, $program);
        
        try {
            $response = Http::timeout(120)->post(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={$this->geminiApiKey}",
                [
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
                        'maxOutputTokens' => 4096,
                    ]
                ]
            );

            if ($response->successful()) {
                $aiResponse = $response->json()['candidates'][0]['content']['parts'][0]['text'];
                return $this->parseComprehensiveAnalysis($aiResponse);
            }

            throw new \Exception("Gemini API failed: " . $response->status());

        } catch (\Exception $e) {
            Log::error("Gemini comprehensive analysis failed: " . $e->getMessage());
            return $this->generateFallbackAnalysis($extractedData);
        }
    }

    /**
     * BUILD PROMPT KOMPREHENSIF
     */
    private function buildComprehensivePrompt($extractedData, $program)
    {
        $programData = $extractedData['program_data'];
        $rabAnalysis = $extractedData['rab_analysis'];
        $financialIndicators = $extractedData['financial_indicators'];

        return <<<PROMPT
ANALISIS PROGRAM PEMBANGUNAN - COMPREHENSIVE FRAUD DETECTION

DATA PROGRAM:
- Nama: {$programData['nama_program']}
- Kategori: {$programData['kategori_program_id']}
- Anggaran: Rp " . number_format($programData['anggaran_total']) . "
- Lokasi: {$extractedData['location_analysis']['nama_wilayah']}
- Target Penerima: {$programData['target_penerima_manfaat']} orang

ANALISIS RAB:
- Total Item: {$rabAnalysis['item_count']}
- Item Mencurigakan: {$rabAnalysis['suspicious_count']}
- Item dengan harga tidak wajar: " . json_encode($rabAnalysis['suspicious_items']) . "

INDIKATOR KEUANGAN:
- Biaya per Penerima: Rp " . number_format($financialIndicators['cost_per_beneficiary']) . "
- Efisiensi: {$financialIndicators['cost_efficiency']}
- Rasio: {$financialIndicators['efficiency_ratio']}

ANALISIS DOKUMEN:
" . $this->formatDocumentsAnalysis($extractedData['documents_text']) . "

INSTRUKSI:
1. Berikan risk level: LOW/MEDIUM/HIGH/CRITICAL
2. Berikan skor 0-100 (100 = sangat berisiko)
3. Analisis temuan utama
4. Rekomendasi tindakan
5. Status rekomendasi: DRAFT/SUBMITTED/APPROVED/REJECTED

FORMAT OUTPUT HARUS JSON:
{
  "risk_level": "HIGH",
  "risk_score": 85,
  "overall_analysis": "Analisis menyeluruh...",
  "key_findings": ["item1", "item2"],
  "recommendations": ["rekomendasi1", "rekomendasi2"],
  "status_recommendation": "REJECTED",
  "confidence_level": 0.92
}

OUTPUT:
PROMPT;
    }

    private function formatDocumentsAnalysis($documentsText)
    {
        $analysis = "";
        foreach ($documentsText as $type => $doc) {
            $analysis .= "- {$type}: {$doc['analysis']['red_flags']} red flags, {$doc['analysis']['green_flags']} green flags\n";
        }
        return $analysis;
    }

    /**
     * PARSE HASIL ANALISIS
     */
    private function parseComprehensiveAnalysis($aiResponse)
    {
        // Clean and parse JSON from AI response
        $cleanedResponse = preg_replace('/```json\s*/', '', $aiResponse);
        $cleanedResponse = preg_replace('/```\s*/', '', $cleanedResponse);
        $cleanedResponse = trim($cleanedResponse);

        preg_match('/\{(?:[^{}]|(?R))*\}/s', $cleanedResponse, $matches);

        if (isset($matches[0])) {
            $result = json_decode($matches[0], true);
            if (json_last_error() === JSON_ERROR_NONE) {
                return $result;
            }
        }

        // Fallback jika parsing gagal
        return [
            'risk_level' => 'MEDIUM',
            'risk_score' => 50,
            'overall_analysis' => 'Analysis completed with fallback',
            'key_findings' => ['Automatic analysis completed'],
            'recommendations' => ['Review manually for verification'],
            'status_recommendation' => 'SUBMITTED',
            'confidence_level' => 0.7
        ];
    }

    /**
     * FALLBACK ANALYSIS
     */
    private function generateFallbackAnalysis($extractedData)
    {
        $rabAnalysis = $extractedData['rab_analysis'];
        $financialIndicators = $extractedData['financial_indicators'];

        $riskScore = 30; // baseline
        $riskLevel = 'LOW';

        // Adjust based on findings
        if ($rabAnalysis['suspicious_count'] > 0) $riskScore += 20;
        if ($financialIndicators['cost_efficiency'] === 'inefficient') $riskScore += 15;
        if ($financialIndicators['efficiency_ratio'] > 1.5) $riskScore += 10;

        // Determine risk level
        if ($riskScore >= 80) $riskLevel = 'CRITICAL';
        elseif ($riskScore >= 60) $riskLevel = 'HIGH';
        elseif ($riskScore >= 40) $riskLevel = 'MEDIUM';
        else $riskLevel = 'LOW';

        return [
            'risk_level' => $riskLevel,
            'risk_score' => min($riskScore, 100),
            'overall_analysis' => 'Automatic fallback analysis completed',
            'key_findings' => ['Automated analysis with basic risk assessment'],
            'recommendations' => ['Proceed with standard verification process'],
            'status_recommendation' => 'SUBMITTED',
            'confidence_level' => 0.6
        ];
    }

    /**
     * SIMPAN HASIL ANALISIS
     */
    private function saveAnalysisResult($programId, $analysisResult)
    {
        FraudAnalysisModel::create([
            'program_id' => $programId,
            'risk_level' => $analysisResult['risk_level'],
            'risk_score' => $analysisResult['risk_score'],
            'analysis_summary' => $analysisResult['overall_analysis'],
            'key_findings' => $analysisResult['key_findings'],
            'recommendations' => $analysisResult['recommendations'],
            'confidence_level' => $analysisResult['confidence_level'],
            'analysis_type' => 'comprehensive',
            'analyzed_by' => 'ai_system'
        ]);
    }

    /**
     * AUTO-UPDATE STATUS PROGRAM BERDASARKAN RISK LEVEL
     */
    private function autoUpdateProgramStatus($program, $analysisResult)
    {
        $riskLevel = $analysisResult['risk_level'];
        $riskScore = $analysisResult['risk_score'];
        
        $newStatus = 'draft'; // default

        // LOGIC AUTO-STATUS BERDASARKAN RISK
        if ($riskLevel === 'CRITICAL' || $riskScore >= 80) {
            $newStatus = 'rejected'; // 🟥 AUTO REJECT
        } elseif ($riskLevel === 'HIGH' || $riskScore >= 60) {
            $newStatus = 'draft'; // 🟨 KEMBALI KE DRAFT (perlu revisi)
        } elseif ($riskLevel === 'LOW' || $riskScore <= 30) {
            $newStatus = 'approved'; // 🟩 AUTO APPROVE
        } else {
            $newStatus = 'diajukan'; // 🟦 SUBMIT FOR REVIEW
        }

        // Update program status
        $program->update([
            'status_program' => $newStatus,
            'auto_analyzed_at' => now(),
            'risk_level' => $riskLevel,
            'risk_score' => $riskScore
        ]);

        Log::info("✅ Auto-updated program {$program->id} to status: {$newStatus} based on risk: {$riskLevel} ({$riskScore})");
    }
}