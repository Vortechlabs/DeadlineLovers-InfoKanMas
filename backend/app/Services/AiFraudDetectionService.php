<?php
// app/Services/AiFraudDetectionService.php

namespace App\Services;

use App\Models\ProgramModel;
use App\Models\ProgramDokumenModel;
use App\Models\ProgramRabModel;
use App\Models\FraudAnalysisModel;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class AiFraudDetectionService
{
    private $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.gemini.api_key');
    }

    /**
     * Analisis komprehensif program untuk deteksi fraud
     */
    public function analyzeProgramComprehensive($programId)
    {
        try {
            $program = ProgramModel::with(['dokumen', 'rabItems', 'kategori', 'wilayah'])->find($programId);
            
            if (!$program) {
                throw new \Exception('Program tidak ditemukan');
            }

            // Buat record analisis
            $fraudAnalysis = FraudAnalysisModel::create([
                'program_id' => $programId,
                'jenis_analisis' => 'comprehensive',
                'jenis_dokumen' => 'multiple',
                'status' => 'processing'
            ]);

            // Analisis berbagai aspek
            $results = [
                'rab_analysis' => $this->analyzeRAB($program),
                'proposal_analysis' => $this->analyzeProposal($program),
                'consistency_analysis' => $this->analyzeConsistency($program),
                'risk_analysis' => $this->analyzeRiskFactors($program)
            ];

            // Gabungkan hasil dan hitung skor akhir
            $finalResult = $this->calculateFinalScore($results);

            // Update fraud analysis
            $fraudAnalysis->update([
                'hasil_analisis' => $finalResult,
                'skor_risiko' => $finalResult['final_score'],
                'level_risiko' => $finalResult['risk_level'],
                'rekomendasi' => $finalResult['recommendations'],
                'flag_meragukan' => $finalResult['risk_level'] === 'high' || $finalResult['risk_level'] === 'critical',
                'item_mencurigakan' => $finalResult['suspicious_items'],
                'status' => 'completed',
                'processed_at' => now()
            ]);

            // Auto update status program berdasarkan risiko
            $this->autoUpdateProgramStatus($program, $finalResult['risk_level']);

            return $finalResult;

        } catch (\Exception $e) {
            Log::error('AI Fraud Detection Error: ' . $e->getMessage());
            
            // Update status failed
            if (isset($fraudAnalysis)) {
                $fraudAnalysis->update([
                    'status' => 'failed',
                    'processed_at' => now()
                ]);
            }

            throw $e;
        }
    }

    /**
     * Analisis RAB untuk anomali harga
     */
    private function analyzeRAB($program)
    {
        $rabItems = $program->rabItems;
        $anomalies = [];
        $totalScore = 0;

        foreach ($rabItems as $item) {
            $itemAnalysis = $this->analyzeRABItem($item, $program->kategori->nama_kategori);
            
            if ($itemAnalysis['is_anomaly']) {
                $anomalies[] = $itemAnalysis;
            }
            
            $totalScore += $itemAnalysis['risk_score'];
        }

        $avgScore = count($rabItems) > 0 ? $totalScore / count($rabItems) : 0;

        return [
            'average_risk_score' => $avgScore,
            'anomalies_detected' => count($anomalies),
            'anomaly_details' => $anomalies,
            'recommendations' => $this->generateRABRecommendations($anomalies)
        ];
    }

    /**
     * Analisis individual item RAB
     */
    private function analyzeRABItem($item, $kategori)
    {
        // Harga standar berdasarkan kategori (dalam IDR)
        $standardPrices = $this->getStandardPrices($kategori);
        
        $hargaSatuan = $item->harga_satuan;
        $volume = $item->volume;
        $total = $item->total;
        
        $riskFactors = [];
        $riskScore = 0;

        // 1. Check harga satuan vs standar
        $standardPrice = $standardPrices[$item->nama_item] ?? null;
        if ($standardPrice) {
            $deviation = abs($hargaSatuan - $standardPrice) / $standardPrice * 100;
            if ($deviation > 50) {
                $riskFactors[] = "Harga menyimpang {$deviation}% dari standar";
                $riskScore += 30;
            }
        }

        // 2. Check volume tidak wajar
        if ($volume > 1000) {
            $riskFactors[] = "Volume sangat besar: {$volume} {$item->satuan}";
            $riskScore += 20;
        }

        // 3. Check total item terlalu tinggi
        if ($total > 100000000) { // 100 juta
            $riskFactors[] = "Total item sangat tinggi: Rp " . number_format($total);
            $riskScore += 25;
        }

        // 4. Check deskripsi item
        $descRisk = $this->analyzeItemDescription($item->nama_item);
        if ($descRisk > 0) {
            $riskFactors[] = "Deskripsi item mencurigakan";
            $riskScore += $descRisk;
        }

        return [
            'item_name' => $item->nama_item,
            'harga_satuan' => $hargaSatuan,
            'volume' => $volume,
            'total' => $total,
            'is_anomaly' => $riskScore > 30,
            'risk_score' => min($riskScore, 100),
            'risk_factors' => $riskFactors,
            'recommendation' => $riskScore > 30 ? "Perlu verifikasi harga dan volume" : "Aman"
        ];
    }

    /**
     * Analisis proposal dengan AI
     */
    private function analyzeProposal($program)
    {
        $proposalDoc = $program->dokumen->where('jenis_dokumen', 'proposal')->first();
        
        if (!$proposalDoc) {
            return [
                'risk_score' => 10, // Minor risk karena tidak ada proposal
                'analysis' => 'Tidak ada dokumen proposal',
                'recommendations' => ['Lengkapi dokumen proposal']
            ];
        }

        try {
            // Extract text dari proposal
            $text = $this->extractTextFromDocument($proposalDoc->file_path);
            
            if (empty($text)) {
                return [
                    'risk_score' => 15,
                    'analysis' => 'Tidak bisa mengekstrak teks dari proposal',
                    'recommendations' => ['Periksa format dokumen proposal']
                ];
            }

            // Analisis dengan AI
            $aiAnalysis = $this->analyzeWithAI($text, 'proposal_analysis');
            
            return [
                'risk_score' => $aiAnalysis['risk_score'] ?? 20,
                'analysis' => $aiAnalysis['analysis'] ?? 'Analisis standar',
                'red_flags' => $aiAnalysis['red_flags'] ?? [],
                'recommendations' => $aiAnalysis['recommendations'] ?? ['Proposal tampak normal']
            ];

        } catch (\Exception $e) {
            Log::error('Proposal analysis error: ' . $e->getMessage());
            
            return [
                'risk_score' => 25,
                'analysis' => 'Gagal menganalisis proposal',
                'recommendations' => ['Perlu verifikasi manual proposal']
            ];
        }
    }

    /**
     * Analisis konsistensi data
     */
    private function analyzeConsistency($program)
    {
        $inconsistencies = [];
        $riskScore = 0;

        // 1. Check konsistensi tanggal
        if ($program->tanggal_mulai > $program->tanggal_selesai) {
            $inconsistencies[] = "Tanggal mulai setelah tanggal selesai";
            $riskScore += 30;
        }

        // 2. Check anggaran vs kategori
        $budgetRisk = $this->analyzeBudgetAppropriateness($program->anggaran_total, $program->kategori->nama_kategori);
        if ($budgetRisk > 0) {
            $inconsistencies[] = "Anggaran tidak sesuai dengan kategori program";
            $riskScore += $budgetRisk;
        }

        // 3. Check kelengkapan dokumen
        $docRisk = $this->analyzeDocumentCompleteness($program->dokumen);
        if ($docRisk > 0) {
            $inconsistencies[] = "Dokumen tidak lengkap";
            $riskScore += $docRisk;
        }

        return [
            'risk_score' => $riskScore,
            'inconsistencies' => $inconsistencies,
            'recommendations' => $this->generateConsistencyRecommendations($inconsistencies)
        ];
    }

    /**
     * Analisis faktor risiko
     */
    private function analyzeRiskFactors($program)
    {
        $riskFactors = [];
        $riskScore = 0;

        // 1. Prioritas vs anggaran
        if ($program->prioritas === 'tinggi' && $program->anggaran_total < 50000000) {
            $riskFactors[] = "Program prioritas tinggi dengan anggaran kecil";
            $riskScore += 15;
        }

        // 2. Timeline singkat
        $duration = \Carbon\Carbon::parse($program->tanggal_mulai)
            ->diffInDays($program->tanggal_selesai);
        
        if ($duration < 7) {
            $riskFactors[] = "Timeline sangat singkat ({$duration} hari)";
            $riskScore += 20;
        }

        // 3. Target penerima manfaat
        if ($program->target_penerima_manfaat > 1000) {
            $riskFactors[] = "Target penerima manfaat sangat besar";
            $riskScore += 10;
        }

        return [
            'risk_score' => $riskScore,
            'risk_factors' => $riskFactors,
            'recommendations' => $this->generateRiskRecommendations($riskFactors)
        ];
    }

    /**
     * Hitung skor akhir dan tentukan level risiko
     */
    private function calculateFinalScore($results)
    {
        $weights = [
            'rab_analysis' => 0.4,
            'proposal_analysis' => 0.3,
            'consistency_analysis' => 0.2,
            'risk_analysis' => 0.1
        ];

        $finalScore = 0;
        foreach ($weights as $key => $weight) {
            $finalScore += $results[$key]['risk_score'] * $weight;
        }

        // Tentukan level risiko
        $riskLevel = $this->determineRiskLevel($finalScore);

        // Generate rekomendasi akhir
        $recommendations = $this->generateFinalRecommendations($results, $riskLevel);

        // Identifikasi item mencurigakan
        $suspiciousItems = $this->extractSuspiciousItems($results);

        return [
            'final_score' => round($finalScore, 2),
            'risk_level' => $riskLevel,
            'detailed_analysis' => $results,
            'recommendations' => $recommendations,
            'suspicious_items' => $suspiciousItems,
            'auto_action' => $this->getAutoAction($riskLevel)
        ];
    }

    /**
     * Tentukan level risiko berdasarkan skor
     */
    private function determineRiskLevel($score)
    {
        if ($score >= 80) return 'critical';
        if ($score >= 60) return 'high';
        if ($score >= 40) return 'medium';
        if ($score >= 20) return 'low';
        return 'very_low';
    }

    /**
     * Auto update status program berdasarkan risiko
     */
    private function autoUpdateProgramStatus($program, $riskLevel)
    {
        $actions = [
            'critical' => ['status' => 'rejected', 'reason' => 'Tingkat risiko sangat tinggi'],
            'high' => ['status' => 'rejected', 'reason' => 'Tingkat risiko tinggi'],
            'medium' => ['status' => 'draft', 'reason' => 'Perlu revisi'],
            'low' => ['status' => 'diajukan', 'reason' => 'Risiko rendah'],
            'very_low' => ['status' => 'diajukan', 'reason' => 'Risiko sangat rendah']
        ];

        $action = $actions[$riskLevel] ?? $actions['medium'];

        $program->update([
            'status_program' => $action['status'],
            'catatan_verifikasi' => "AI Analysis: {$action['reason']}. Skor risiko: {$riskLevel}"
        ]);

        Log::info("Program {$program->id} auto updated to {$action['status']} due to {$riskLevel} risk");
    }

    /**
     * Analisis dengan AI Gemini
     */
    private function analyzeWithAI($text, $analysisType)
    {
        $prompt = $this->buildAnalysisPrompt($text, $analysisType);
        
        $response = Http::timeout(60)->post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={$this->apiKey}",
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
                    'maxOutputTokens' => 1024,
                ]
            ]
        );

        if ($response->failed()) {
            throw new \Exception('AI API request failed');
        }

        $data = $response->json();
        $aiResponse = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';

        return $this->parseAIResponse($aiResponse);
    }

    private function buildAnalysisPrompt($text, $type)
    {
        $prompts = [
            'proposal_analysis' => "
                ANALISIS PROPOSAL PROGRAM - DETEKSI FRAUD

                TEKS PROPOSAL:
                {$text}

                TUGAS: Analisis proposal ini dan berikan:
                1. Skor risiko (0-100)
                2. Analisis singkat
                3. Bendera merah (red flags) jika ada
                4. Rekomendasi

                FORMAT OUTPUT JSON:
                {
                    \"risk_score\": 75,
                    \"analysis\": \"Analisis singkat...\",
                    \"red_flags\": [\"item1\", \"item2\"],
                    \"recommendations\": [\"rekomendasi1\", \"rekomendasi2\"]
                }
            "
        ];

        return $prompts[$type] ?? $prompts['proposal_analysis'];
    }

    // Helper methods lainnya...
    private function getStandardPrices($kategori) { /* implementation */ }
    private function analyzeItemDescription($description) { /* implementation */ }
    private function analyzeBudgetAppropriateness($budget, $kategori) { /* implementation */ }
    private function analyzeDocumentCompleteness($documents) { /* implementation */ }
    private function generateRABRecommendations($anomalies) { /* implementation */ }
    private function generateConsistencyRecommendations($inconsistencies) { /* implementation */ }
    private function generateRiskRecommendations($riskFactors) { /* implementation */ }
    private function generateFinalRecommendations($results, $riskLevel) { /* implementation */ }
    private function extractSuspiciousItems($results) { /* implementation */ }
    private function getAutoAction($riskLevel) { /* implementation */ }
    private function parseAIResponse($response) { /* implementation */ }
    private function extractTextFromDocument($filePath) { /* implementation */ }
}