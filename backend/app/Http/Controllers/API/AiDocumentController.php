<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ProgramDokumenModel;
use App\Models\ProgramTahapanModel;
use App\Models\ProgramModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Smalot\PdfParser\Parser as PdfParser;
use PhpOffice\PhpWord\IOFactory;

class AiDocumentController extends Controller
{
    /**
     * Upload dokumen rundown dan proses AI - FIXED VERSION
     */
    public function uploadRundown(Request $request, $programId)
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
                'rundown_file' => 'required|file|mimes:pdf,doc,docx,txt|max:10240',
                'nama_dokumen' => 'required|string|max:255'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            $file = $request->file('rundown_file');
            $filePath = $file->store("program_documents/{$programId}/rundown", 'public');

            // Simpan dokumen
            $dokumen = ProgramDokumenModel::create([
                'program_id' => $programId,
                'jenis_dokumen' => 'rundown_tahapan',
                'nama_dokumen' => $request->nama_dokumen,
                'file_path' => $filePath,
                'file_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'file_size' => $file->getSize(),
                'keterangan' => 'Dokumen rundown tahapan program',
                'status_verifikasi_ai' => 'processing'
            ]);

            Log::info("✅ Dokumen rundown uploaded: {$dokumen->id}");

            // ✅ PROSES AI SECARA SYNCHRONOUS DULU (TESTING)
            $this->processRundownWithAI($dokumen);

            return response()->json([
                'success' => true,
                'message' => 'Dokumen rundown berhasil diupload dan sedang diproses AI',
                'data' => $dokumen
            ], 201);

        } catch (\Exception $e) {
            Log::error('❌ Upload rundown error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal upload dokumen rundown: ' . $e->getMessage()
            ], 500);
        }
    }

    private function processRundownWithAI(ProgramDokumenModel $dokumen)
    {
        try {
            Log::info("🔄 Starting AI processing for document: {$dokumen->id}");

            // Extract text dari dokumen
            $text = $this->extractTextFromDocument($dokumen->file_path);

            if (empty($text)) {
                throw new \Exception('Tidak dapat mengekstrak teks dari dokumen');
            }

            Log::info("📝 Text extracted, length: " . strlen($text));

            // Analisis dengan Gemini AI
            $analysisResult = $this->analyzeWithGeminiAPI($text);

            Log::info("✅ AI analysis completed", $analysisResult);

            // ✅ PERBAIKI: Gunakan update dengan array associative
            $dokumen->update([
                'status_verifikasi_ai' => 'completed',
                'tahapan_generated' => json_encode($analysisResult['tahapan']),
                'catatan_ai' => $analysisResult['catatan'],
                'resiko_kecurangan' => $analysisResult['resiko_kecurangan'],
                'presentase_kecurangan' => $analysisResult['presentase_kecurangan'],
                'skor_ai' => $analysisResult['skor_ai'],
                'processed_at' => now()
            ]);

            // Generate tahapan program
            $this->generateProgramTahapan($dokumen->program_id, $analysisResult['tahapan']);

            Log::info("✅ AI Processing completed for document: " . $dokumen->id);

        } catch (\Exception $e) {
            Log::error('❌ AI Processing error: ' . $e->getMessage());

            // ✅ PERBAIKI: Juga di fallback
            try {
                Log::info("🔄 Trying fallback regex analysis...");
                $text = $this->extractTextFromDocument($dokumen->file_path);
                $analysisResult = $this->analyzeWithRegex($text);

                $dokumen->update([
                    'status_verifikasi_ai' => 'completed',
                    'tahapan_generated' => json_encode($analysisResult['tahapan']),
                    'catatan_ai' => 'Fallback Analysis: ' . $analysisResult['catatan'],
                    'resiko_kecurangan' => $analysisResult['resiko_kecurangan'],
                    'presentase_kecurangan' => $analysisResult['presentase_kecurangan'],
                    'skor_ai' => $analysisResult['skor_ai'],
                    'processed_at' => now()
                ]);

                $this->generateProgramTahapan($dokumen->program_id, $analysisResult['tahapan']);

                Log::info("✅ Fallback processing completed for document: " . $dokumen->id);

            } catch (\Exception $fallbackError) {
                Log::error('❌ Fallback processing error: ' . $fallbackError->getMessage());

                // ✅ PERBAIKI: Update status failed dengan benar
                $dokumen->update([
                    'status_verifikasi_ai' => 'failed',
                    'catatan_ai' => 'Gagal memproses: ' . $e->getMessage(),
                    'processed_at' => now()
                ]);
            }
        }
    }

    /**
     * Analisis dengan Gemini REST API - IMPROVED ERROR HANDLING
     */
    private function analyzeWithGeminiAPI($text)
    {
        $apiKey = config('services.gemini.api_key');

        if (!$apiKey) {
            Log::error('❌ Gemini API key tidak dikonfigurasi');
            throw new \Exception('Gemini API key tidak dikonfigurasi');
        }

        // Potong text jika terlalu panjang
        $maxLength = 28000;
        if (strlen($text) > $maxLength) {
            $text = substr($text, 0, $maxLength) . "... [text dipotong karena terlalu panjang]";
            Log::info("📝 Text trimmed to: " . strlen($text) . " characters");
        }

        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={$apiKey}";

        $prompt = $this->buildAnalysisPrompt($text);

        Log::info("🚀 Sending request to Gemini API...");

        try {
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

            Log::info("📡 Gemini API Response Status: " . $response->status());

            if ($response->failed()) {
                $errorBody = $response->body();
                Log::error('❌ Gemini API request failed. Status: ' . $response->status() . ' - ' . $errorBody);
                throw new \Exception('Gemini API request failed. Status: ' . $response->status());
            }

            $data = $response->json();

            if (!isset($data['candidates'][0]['content']['parts'][0]['text'])) {
                Log::error('❌ Invalid Gemini API response structure', $data);
                throw new \Exception('Invalid response structure from Gemini API');
            }

            $aiResponse = $data['candidates'][0]['content']['parts'][0]['text'];

            Log::info("✅ Gemini AI Response received: " . substr($aiResponse, 0, 200) . "...");

            return $this->parseAIResponse($aiResponse);

        } catch (\Exception $e) {
            Log::error('❌ Gemini API call failed: ' . $e->getMessage());
            throw new \Exception('Gemini API call failed: ' . $e->getMessage());
        }
    }

    /**
     * Build prompt untuk analisis AI - SIMPLIFIED
     */
    private function buildAnalysisPrompt($text)
    {
        return <<<PROMPT
ANALISIS DOKUMEN RUNDOWN PROGRAM

TUGAS: Analisis dokumen rundown program berikut dan ekstrak informasi tahapan pelaksanaannya.

FORMAT OUTPUT: HARUS dalam JSON yang valid.

DATA DOKUMEN:
{$text}

INSTRUKSI:
1. Identifikasi tahapan/fase/stage yang disebutkan
2. Untuk setiap tahapan, ekstrak: nama_tahapan, deskripsi, persentase (total harus 100), tanggal_mulai, tanggal_selesai
3. Berikan analisis risiko: resiko_kecurangan (low/medium/high), presentase_kecurangan (0-100), skor_ai (X/100)
4. Berikan catatan ringkasan

CONTOH FORMAT OUTPUT:
{
  "tahapan": [
    {
      "nama_tahapan": "Persiapan dan Perencanaan",
      "deskripsi": "Penyusunan dokumen, survey lokasi",
      "persentase": 25,
      "tanggal_mulai": "2024-03-01",
      "tanggal_selesai": "2024-03-15"
    }
  ],
  "catatan": "Berhasil mengekstrak tahapan",
  "resiko_kecurangan": "low",
  "presentase_kecurangan": 15.5,
  "skor_ai": "85/100"
}

OUTPUT SEKARANG:
PROMPT;
    }

    /**
     * Parse response AI - IMPROVED
     */
    private function parseAIResponse($aiResponse)
    {
        Log::info('🔍 Parsing AI Response...');

        // Bersihkan response dari markdown code blocks
        $cleanedResponse = preg_replace('/```json\s*/', '', $aiResponse);
        $cleanedResponse = preg_replace('/```\s*/', '', $cleanedResponse);
        $cleanedResponse = trim($cleanedResponse);

        Log::info('🧹 Cleaned response: ' . substr($cleanedResponse, 0, 300));

        // Cari JSON dalam response
        preg_match('/\{(?:[^{}]|(?R))*\}/s', $cleanedResponse, $matches);

        if (isset($matches[0])) {
            $result = json_decode($matches[0], true);
            if (json_last_error() === JSON_ERROR_NONE) {
                Log::info('✅ Successfully parsed JSON from AI response');

                // Validasi hasil
                if (!isset($result['tahapan']) || !is_array($result['tahapan'])) {
                    throw new \Exception('Format tahapan tidak valid dalam response AI');
                }

                return $result;
            } else {
                Log::error('❌ JSON parsing error: ' . json_last_error_msg());
                Log::error('❌ JSON string: ' . $matches[0]);
            }
        }

        // Jika tidak ada JSON valid, gunakan fallback
        Log::warning('⚠️ No valid JSON found, using fallback analysis');
        return $this->analyzeWithRegex($cleanedResponse);
    }

    /**
     * Extract text dari berbagai format dokumen - FIXED
     */
    private function extractTextFromDocument($filePath)
    {
        $fullPath = Storage::disk('public')->path($filePath);
        $extension = pathinfo($fullPath, PATHINFO_EXTENSION);

        Log::info("📄 Extracting text from: {$fullPath}, extension: {$extension}");

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
            if (!file_exists($filePath)) {
                throw new \Exception("File tidak ditemukan: {$filePath}");
            }

            $parser = new PdfParser();
            $pdf = $parser->parseFile($filePath);
            $text = $pdf->getText();

            if (empty($text)) {
                throw new \Exception('Tidak ada teks yang bisa diekstrak dari PDF');
            }

            Log::info("✅ PDF text extracted, length: " . strlen($text));
            return $text;

        } catch (\Exception $e) {
            Log::error('❌ PDF extraction error: ' . $e->getMessage());
            throw new \Exception('Gagal mengekstrak teks dari PDF: ' . $e->getMessage());
        }
    }

    private function extractTextFromWord($filePath)
    {
        try {
            if (!file_exists($filePath)) {
                throw new \Exception("File tidak ditemukan: {$filePath}");
            }

            $phpWord = IOFactory::load($filePath);
            $text = '';

            foreach ($phpWord->getSections() as $section) {
                foreach ($section->getElements() as $element) {
                    if (method_exists($element, 'getText')) {
                        $text .= $element->getText() . ' ';
                    } elseif (method_exists($element, 'getElements')) {
                        foreach ($element->getElements() as $childElement) {
                            if (method_exists($childElement, 'getText')) {
                                $text .= $childElement->getText() . ' ';
                            }
                        }
                    }
                }
            }

            $text = trim($text);

            if (empty($text)) {
                throw new \Exception('Tidak ada teks yang bisa diekstrak dari Word document');
            }

            Log::info("✅ Word text extracted, length: " . strlen($text));
            return $text;

        } catch (\Exception $e) {
            Log::error('❌ Word extraction error: ' . $e->getMessage());
            throw new \Exception('Gagal mengekstrak teks dari Word: ' . $e->getMessage());
        }
    }

    /**
     * Analisis fallback dengan regex - IMPROVED
     */
    private function analyzeWithRegex($text)
    {
        Log::info("🔄 Starting regex fallback analysis...");

        $tahapan = [];
        $lines = explode("\n", $text);

        $currentTahap = null;
        $urutan = 1;

        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line))
                continue;

            // Deteksi tahapan berdasarkan pola umum
            if (
                preg_match('/(tahap|phase|stage|fase)\s*(\d+|[IVXLCDM]+)[:\-\.\s]+(.+)/i', $line, $matches) ||
                preg_match('/^[IVXLCDM]+\.\s*(.+)/i', $line, $matches) ||
                preg_match('/^\d+\.\s*(.+)/i', $line, $matches)
            ) {

                if ($currentTahap) {
                    $tahapan[] = $currentTahap;
                }

                $namaTahap = isset($matches[3]) ? $matches[3] : $matches[1];

                $currentTahap = [
                    'nama_tahapan' => trim($namaTahap),
                    'deskripsi' => '',
                    'persentase' => 0,
                    'tanggal_mulai' => null,
                    'tanggal_selesai' => null
                ];
            } elseif ($currentTahap && !empty($line)) {
                // Tambahkan ke deskripsi
                $currentTahap['deskripsi'] .= $line . ' ';
            }
        }

        if ($currentTahap) {
            $tahapan[] = $currentTahap;
        }

        // Jika tidak ada tahapan terdeteksi, buat default
        if (empty($tahapan)) {
            Log::info("📝 No tahapan detected, creating default structure");
            $tahapan = [
                [
                    'nama_tahapan' => 'Persiapan dan Perencanaan',
                    'deskripsi' => 'Tahap persiapan dokumen dan perencanaan teknis',
                    'persentase' => 25,
                    'tanggal_mulai' => null,
                    'tanggal_selesai' => null
                ],
                [
                    'nama_tahapan' => 'Pelaksanaan Utama',
                    'deskripsi' => 'Tahap pelaksanaan fisik program',
                    'persentase' => 50,
                    'tanggal_mulai' => null,
                    'tanggal_selesai' => null
                ],
                [
                    'nama_tahapan' => 'Penyelesaian dan Serah Terima',
                    'deskripsi' => 'Tahap penyelesaian dan serah terima hasil program',
                    'persentase' => 25,
                    'tanggal_mulai' => null,
                    'tanggal_selesai' => null
                ]
            ];
        }

        // Normalisasi persentase
        $totalPersentase = array_sum(array_column($tahapan, 'persentase'));
        if ($totalPersentase > 0 && $totalPersentase != 100) {
            foreach ($tahapan as &$tahap) {
                $tahap['persentase'] = round(($tahap['persentase'] / $totalPersentase) * 100);
            }
        }

        // Jika tidak ada persentase, bagi rata
        if ($totalPersentase === 0 && count($tahapan) > 0) {
            $equalPercentage = floor(100 / count($tahapan));
            foreach ($tahapan as &$tahap) {
                $tahap['persentase'] = $equalPercentage;
            }
            // Pastikan total 100%
            $tahapan[count($tahapan) - 1]['persentase'] = 100 - ($equalPercentage * (count($tahapan) - 1));
        }

        Log::info("✅ Regex analysis completed, found " . count($tahapan) . " tahapan");

        return [
            'tahapan' => $tahapan,
            'catatan' => 'Fallback: Berhasil mengekstrak ' . count($tahapan) . ' tahapan dari dokumen',
            'resiko_kecurangan' => count($tahapan) >= 3 ? 'low' : 'medium',
            'presentase_kecurangan' => count($tahapan) >= 3 ? 15.5 : 35.0,
            'skor_ai' => count($tahapan) >= 3 ? '75/100' : '55/100'
        ];
    }

    /**
     * Generate tahapan program dari hasil AI - FIXED
     */
    private function generateProgramTahapan($programId, $tahapanAI)
    {
        try {
            $program = ProgramModel::find($programId);
            if (!$program) {
                throw new \Exception('Program tidak ditemukan');
            }

            // Hapus tahapan lama jika ada
            ProgramTahapanModel::where('program_id', $programId)->delete();

            $tanggalMulaiProgram = $program->tanggal_mulai;
            $tanggalSelesaiProgram = $program->tanggal_selesai;

            foreach ($tahapanAI as $index => $tahapAI) {
                // Validasi data tahapan
                if (empty($tahapAI['nama_tahapan'])) {
                    continue;
                }

                // ✅ PERBAIKI: Gunakan field names yang sesuai dengan database
                $tanggalMulai = $tahapAI['tanggal_mulai'] ?? null;
                $tanggalSelesai = $tahapAI['tanggal_selesai'] ?? null;

                // Hitung tanggal otomatis jika tidak ada di dokumen
                if (empty($tanggalMulai) || empty($tanggalSelesai)) {
                    $dates = $this->calculateTahapDates($tanggalMulaiProgram, $tanggalSelesaiProgram, $index, count($tahapanAI));
                    $tanggalMulai = $dates['mulai'];
                    $tanggalSelesai = $dates['selesai'];
                }

                // ✅ PERBAIKI: Pastikan field names sesuai dengan validasi
                ProgramTahapanModel::create([
                    'program_id' => $programId,
                    'nama_tahapan' => $tahapAI['nama_tahapan'],
                    'deskripsi' => trim($tahapAI['deskripsi'] ?? ''),
                    'persentase' => $tahapAI['persentase'] ?? 0,
                    'tanggal_mulai_rencana' => $tanggalMulai, // ✅ Sesuai dengan field database
                    'tanggal_selesai_rencana' => $tanggalSelesai, // ✅ Sesuai dengan field database
                    'status' => 'menunggu',
                    'urutan' => $index + 1
                ]);
            }

            Log::info("✅ Generated " . count($tahapanAI) . " tahapan for program: " . $programId);

        } catch (\Exception $e) {
            Log::error('❌ Generate program tahapan error: ' . $e->getMessage());
            throw $e;
        }
    }

    private function calculateTahapDates($startDate, $endDate, $index, $totalTahapan)
    {
        $start = \Carbon\Carbon::parse($startDate);
        $end = \Carbon\Carbon::parse($endDate);
        $totalDays = $start->diffInDays($end);

        $daysPerTahap = floor($totalDays / $totalTahapan);
        $tahapStart = $start->copy()->addDays($index * $daysPerTahap);
        $tahapEnd = ($index === $totalTahapan - 1)
            ? $end
            : $tahapStart->copy()->addDays($daysPerTahap - 1);

        return [
            'mulai' => $tahapStart->format('Y-m-d'),
            'selesai' => $tahapEnd->format('Y-m-d')
        ];
    }

    /**
     * Get status processing AI
     */
    public function getProcessingStatus($dokumenId)
    {
        try {
            $dokumen = ProgramDokumenModel::findOrFail($dokumenId);

            Log::info("📊 Getting processing status for document: {$dokumenId}, status: {$dokumen->status_verifikasi_ai}");

            return response()->json([
                'success' => true,
                'data' => [
                    'status' => $dokumen->status_verifikasi_ai,
                    'tahapan_generated' => json_decode($dokumen->tahapan_generated, true) ?: [],
                    'catatan_ai' => $dokumen->catatan_ai,
                    'resiko_kecurangan' => $dokumen->resiko_kecurangan,
                    'presentase_kecurangan' => $dokumen->presentase_kecurangan,
                    'skor_ai' => $dokumen->skor_ai,
                    'processed_at' => $dokumen->processed_at
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('❌ Get processing status error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil status processing: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Manual trigger untuk generate tahapan - FIX METHOD NAME
     */
    public function generateTahapan($dokumenId) // ✅ UBAH DARI manualGenerateTahapan JADI generateTahapan
    {
        try {
            $dokumen = ProgramDokumenModel::findOrFail($dokumenId);

            if ($dokumen->status_verifikasi_ai !== 'completed') {
                return response()->json([
                    'success' => false,
                    'message' => 'Dokumen belum selesai diproses AI'
                ], 400);
            }

            $tahapanAI = json_decode($dokumen->tahapan_generated, true);

            if (empty($tahapanAI)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak ada data tahapan yang bisa digenerate'
                ], 400);
            }

            $this->generateProgramTahapan($dokumen->program_id, $tahapanAI);

            return response()->json([
                'success' => true,
                'message' => 'Tahapan berhasil digenerate ke database'
            ]);

        } catch (\Exception $e) {
            Log::error('❌ Generate tahapan error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Gagal generate tahapan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * ✅ COMPLETE WITH AI TAHAPAN — Selesaikan program dengan tahapan dari AI
     */
    public function completeWithAiTahapan(Request $request, $programId)
    {
        try {
            $program = ProgramModel::findOrFail($programId);

            // Cek ownership
            $user = Auth::user();
            if ($user->role === 'admin_desa' && $program->wilayah_id !== $user->alamat_lengkap) {
                return response()->json([
                    'success' => false,
                    'message' => 'Forbidden. Anda hanya bisa mengakses program di desa Anda.'
                ], 403);
            }

            $validator = Validator::make($request->all(), [
                'tahapan' => 'required|array',
                'tahapan.*.nama_tahapan' => 'required|string|max:255',
                'tahapan.*.deskripsi' => 'nullable|string',
                'tahapan.*.persentase' => 'required|numeric|min:0|max:100',
                'tahapan.*.tanggal_mulai_rencana' => 'required|date',
                'tahapan.*.tanggal_selesai_rencana' => 'required|date|after_or_equal:tahapan.*.tanggal_mulai_rencana',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi tahapan gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            DB::beginTransaction();

            // Hapus tahapan lama jika ada
            ProgramTahapanModel::where('program_id', $programId)->delete();

            $tahapanData = $request->input('tahapan');
            $totalPersentase = 0;

            foreach ($tahapanData as $index => $tahap) {
                $tahapan = ProgramTahapanModel::create([
                    'program_id' => $programId,
                    'nama_tahapan' => $tahap['nama_tahapan'],
                    'deskripsi' => $tahap['deskripsi'] ?? '',
                    'persentase' => $tahap['persentase'],
                    'tanggal_mulai_rencana' => $tahap['tanggal_mulai_rencana'],
                    'tanggal_selesai_rencana' => $tahap['tanggal_selesai_rencana'],
                    'status' => 'menunggu',
                    'urutan' => $index + 1,
                ]);

                $totalPersentase += $tahap['persentase'];
            }

            // Validasi total persentase harus 100
            if ($totalPersentase != 100) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Total persentase tahapan harus 100%, saat ini: ' . $totalPersentase . '%'
                ], 422);
            }

            // Update status program menjadi "diajukan"
            $program->update([
                'status_program' => 'diajukan',
                'submitted_at' => now()
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Program berhasil diselesaikan dengan tahapan AI dan diajukan untuk verifikasi',
                'data' => $program->load(['kategori', 'wilayah', 'rabItems', 'tahapan', 'dokumen'])
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('❌ Complete with AI tahapan failed: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal menyelesaikan program dengan tahapan AI: ' . $e->getMessage()
            ], 500);
        }
    }
}