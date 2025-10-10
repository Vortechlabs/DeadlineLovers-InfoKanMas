<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\KategoriProgramModel;
use App\Models\ProgramDokumenModel;
use App\Models\ProgramDokumentasiModel;
use App\Models\ProgramModel;
use App\Models\ProgramProgressModel;
use App\Models\ProgramRabModel;
use App\Models\ProgramTahapanModel;
use App\Models\WilayahModel;
use App\Models\ProgramDokumen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ProgramController extends Controller
{
    /**
     * 📦 INDEX — Menampilkan semua data program dengan filter berdasarkan role
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $query = ProgramModel::with([
            'kategori',
            'wilayah',
            'penanggungJawab',
            'creator',
            'verifier',
            'approver'
        ]);

        // Filter berdasarkan role user (jika user sudah login)
        if ($user) {
            if ($user->role === 'admin_desa') {
                $query->where('wilayah_id', $user->alamat_lengkap);
            } elseif ($user->role === 'admin_kecamatan') {
                $query->whereHas('wilayah', function ($q) use ($user) {
                    $q->where('parent_id', $user->alamat_lengkap);
                });
            }
            // Admin kabupaten & dinas bisa lihat semua
        } else {
            // Untuk user yang belum login, hanya tampilkan program yang approved/berjalan/selesai
            $query->whereIn('status_program', ['approved', 'berjalan', 'selesai']);
        }

        // Filter opsional
        if ($request->has('status') && $request->status) {
            $query->where('status_program', $request->status);
        }

        if ($request->has('kategori') && $request->kategori) {
            $query->where('kategori_program_id', $request->kategori);
        }

        if ($request->has('tahun') && $request->tahun) {
            $query->where('tahun_anggaran', $request->tahun);
        }

        $programs = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'message' => 'Data program berhasil diambil',
            'data' => $programs
        ], 200);
    }

    /**
     * 🔍 SHOW — Menampilkan detail program lengkap
     */
    public function show($id)
    {
        $program = ProgramModel::with([
            'kategori',
            'wilayah',
            'penanggungJawab',
            'creator',
            'verifier',
            'approver',
            'rabItems',
            'tahapan',
            'progress' => function ($query) {
                $query->with(['pelapor', 'validator', 'dokumentasi'])
                    ->orderBy('created_at', 'desc');
            },
            'issues' => function ($query) {
                $query->with(['pelapor', 'penanggungJawab'])
                    ->orderBy('created_at', 'desc');
            },
            'dokumen'
        ])->find($id);

        if (!$program) {
            return response()->json([
                'success' => false,
                'message' => 'Program tidak ditemukan.'
            ], 404);
        }

        // // Cek akses untuk user yang belum login
        // $user = Auth::user();
        // if (!$user && !in_array($program->status_program, ['approved', 'berjalan', 'selesai'])) {
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'Anda tidak memiliki akses untuk melihat program ini.'
        //     ], 403);
        // }

        // Hitung progress keseluruhan
        $progressPercentage = $program->progress_percentage;

        return response()->json([
            'success' => true,
            'message' => 'Detail program berhasil diambil',
            'data' => [
                'program' => $program,
                'progress_percentage' => $progressPercentage
            ]
        ], 200);
    }

    /**
     * 📋 CREATE — Metadata untuk form create program
     */
    public function create()
    {
        // Hanya user yang login yang bisa akses
        if (!Auth::check()) {
            return response()->json([
                'success' => false,
                'message' => 'Anda harus login untuk mengakses fitur ini.'
            ], 401);
        }

        $kategori = KategoriProgramModel::all();
        $wilayah = WilayahModel::where('tingkat', 'desa')->get();

        $user = Auth::user();
        $wilayahUser = $user->alamat;

        return response()->json([
            'success' => true,
            'message' => 'Metadata form create program',
            'data' => [
                'kategori_program' => $kategori,
                'wilayah_list' => $wilayah,
                'default_wilayah' => $wilayahUser,
                'jenis_program_options' => ['desa', 'kecamatan', 'dinas', 'kabupaten'],
                'tingkat_pengusul_options' => ['desa', 'kecamatan', 'dinas', 'kabupaten'],
                'prioritas_options' => ['rendah', 'sedang', 'tinggi', 'darurat'],
                'status_options' => ['draft', 'diajukan', 'diverifikasi_kecamatan', 'approved', 'rejected', 'berjalan', 'selesai']
            ]
        ], 200);
    }

    /**
     * 🔎 FILTER — Filter program dengan berbagai kriteria
     */
    public function filter(Request $request)
    {
        $user = Auth::user();
        $query = ProgramModel::with(['kategori', 'wilayah', 'penanggungJawab']);

        // Filter berdasarkan role (jika user login)
        if ($user) {
            if ($user->role === 'admin_desa') {
                $query->where('wilayah_id', $user->alamat_lengkap);
            } elseif ($user->role === 'admin_kecamatan') {
                $query->whereHas('wilayah', function ($q) use ($user) {
                    $q->where('parent_id', $user->alamat_lengkap);
                });
            }
        } else {
            // Untuk user yang belum login, hanya tampilkan program yang approved/berjalan/selesai
            $query->whereIn('status_program', ['approved', 'berjalan', 'selesai']);
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status_program', $request->status);
        }

        // Filter by kategori
        if ($request->has('kategori_id') && $request->kategori_id) {
            $query->where('kategori_program_id', $request->kategori_id);
        }

        // Filter by tahun
        if ($request->has('tahun_anggaran') && $request->tahun_anggaran) {
            $query->where('tahun_anggaran', $request->tahun_anggaran);
        }

        // Filter by prioritas
        if ($request->has('prioritas') && $request->prioritas) {
            $query->where('prioritas', $request->prioritas);
        }

        // Filter by search term
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama_program', 'like', "%{$search}%")
                    ->orWhere('deskripsi', 'like', "%{$search}%");
            });
        }

        $programs = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'message' => 'Data program filtered berhasil diambil',
            'data' => $programs
        ], 200);
    }

    /**
     * 📊 STATISTICS — Statistik program
     */
    public function statistics()
    {
        $user = Auth::user();
        $query = ProgramModel::query();

        // Filter berdasarkan role (jika user login)
        if ($user) {
            if ($user->role === 'admin_desa') {
                $query->where('wilayah_id', $user->alamat_lengkap);
            } elseif ($user->role === 'admin_kecamatan') {
                $query->whereHas('wilayah', function ($q) use ($user) {
                    $q->where('parent_id', $user->alamat_lengkap);
                });
            }
        } else {
            // Untuk user yang belum login, hanya hitung program yang approved/berjalan/selesai
            $query->whereIn('status_program', ['approved', 'berjalan', 'selesai']);
        }

        $totalProgram = $query->count();
        $totalAnggaran = $query->sum('anggaran_total');
        $totalRealisasi = $query->sum('realisasi_anggaran');

        $byStatus = $query->clone()
            ->groupBy('status_program')
            ->selectRaw('status_program, count(*) as total')
            ->get();

        $byKategori = $query->clone()
            ->join('kategori_program', 'program.kategori_program_id', '=', 'kategori_program.id')
            ->groupBy('kategori_program.id', 'kategori_program.nama_kategori')
            ->selectRaw('kategori_program.nama_kategori, count(*) as total')
            ->get();

        $byYear = $query->clone()
            ->groupBy('tahun_anggaran')
            ->selectRaw('tahun_anggaran, count(*) as total, sum(anggaran_total) as total_anggaran')
            ->orderBy('tahun_anggaran', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Statistik program berhasil diambil',
            'data' => [
                'total_program' => $totalProgram,
                'total_anggaran' => (float) $totalAnggaran,
                'total_realisasi' => (float) $totalRealisasi,
                'sisa_anggaran' => (float) $totalAnggaran - $totalRealisasi,
                'by_status' => $byStatus,
                'by_kategori' => $byKategori,
                'by_year' => $byYear,
            ]
        ], 200);
    }

    /**
     * 💾 STORE — Menyimpan program baru dengan file upload (DEBUG VERSION)
     */
    public function store(Request $request)
    {
        // Cek auth
        if (!Auth::check()) {
            return response()->json([
                'success' => false,
                'message' => 'Anda harus login untuk membuat program.'
            ], 401);
        }

        // \Log::info('🔄 Starting program creation');
        // \Log::info('User: ' . Auth::id());
        // \Log::info('Request keys: ' . json_encode(array_keys($request->all())));
        // \Log::info('Files received: ' . json_encode(array_keys($request->allFiles())));

        try {
            DB::beginTransaction();

            // Parse program data dari JSON string
            $programData = [];
            if ($request->has('program_data')) {
                $programData = json_decode($request->input('program_data'), true);
                // \Log::info('📦 Program data received:', $programData);
            } else {
                // \Log::warning('❌ program_data not found in request');
            }

            if (empty($programData)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data program tidak valid'
                ], 422);
            }

            $validator = Validator::make($programData, [
                'nama_program' => 'required|string|max:255',
                'deskripsi' => 'required|string',
                'kategori_program_id' => 'required|exists:kategori_program,id',
                'wilayah_id' => 'required|exists:wilayah,id',
                'tahun_anggaran' => 'required|integer|min:2020|max:2030',
                'prioritas' => 'required|in:rendah,sedang,tinggi,darurat',
                'tanggal_mulai' => 'required|date',
                'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
                'target_penerima_manfaat' => 'nullable|integer|min:0',
                'anggaran_total' => 'required|numeric|min:0',
            ]);

            if ($validator->fails()) {
                // \Log::error('❌ Validation failed:', $validator->errors()->toArray());
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            // ✅ SET USER DATA dengan benar
            $programData['created_by'] = Auth::id();
            $programData['penanggung_jawab_id'] = Auth::id(); // User yang login
            $programData['status_program'] = 'draft';
            $programData['kode_program'] = $this->generateKodeProgram();

            // \Log::info('💾 Creating program with data:', $programData);

            $program = ProgramModel::create($programData);
            // \Log::info('✅ Program created with ID: ' . $program->id);

            // Jika ada RAB items
            if (isset($programData['rab_items']) && is_array($programData['rab_items'])) {
                foreach ($programData['rab_items'] as $index => $rabItem) {
                    ProgramRabModel::create([
                        'program_id' => $program->id,
                        'nama_item' => $rabItem['nama_item'],
                        'deskripsi' => $rabItem['deskripsi'] ?? null,
                        'volume' => $rabItem['volume'],
                        'satuan' => $rabItem['satuan'],
                        'harga_satuan' => $rabItem['harga_satuan'],
                        'total' => $rabItem['volume'] * $rabItem['harga_satuan'],
                        'urutan' => $index + 1,
                    ]);
                }
                // \Log::info('✅ RAB items created');
            }

            // Jika ada tahapan
            if (isset($programData['tahapan']) && is_array($programData['tahapan'])) {
                foreach ($programData['tahapan'] as $index => $tahapan) {
                    ProgramTahapanModel::create([
                        'program_id' => $program->id,
                        'nama_tahapan' => $tahapan['nama_tahapan'],
                        'deskripsi' => $tahapan['deskripsi'] ?? null,
                        'persentase' => $tahapan['persentase'],
                        'tanggal_mulai_rencana' => $tahapan['tanggal_mulai_rencana'],
                        'tanggal_selesai_rencana' => $tahapan['tanggal_selesai_rencana'],
                        'status' => 'menunggu',
                        'urutan' => $index + 1,
                    ]);
                }
                // \Log::info('✅ Tahapan created');
            }

            // ✅ SIMPAN FILE DOKUMEN
            $uploadedDocs = $this->saveProgramDocuments($program->id, $request);
            // \Log::info('✅ Documents uploaded: ' . count($uploadedDocs));

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Program dan dokumen berhasil dibuat',
                'data' => $program->load(['kategori', 'wilayah', 'rabItems', 'tahapan', 'dokumen'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            // \Log::error('❌ Program creation failed: ' . $e->getMessage());
            // \Log::error('Stack trace: ' . $e->getTraceAsString());

            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat program',
                'error' => $e->getMessage(),
                'debug' => [
                    'user_id' => Auth::id(),
                    'has_program_data' => $request->has('program_data'),
                    'file_count' => count($request->allFiles())
                ]
            ], 500);
        }
    }

    /**
     * Simpan dokumen program dengan key yang sesuai
     */
    private function saveProgramDocuments($programId, $request)
    {
        // \Log::info('Starting document upload for program: ' . $programId);
        // \Log::info('Available files: ', array_keys($request->allFiles()));

        $documentTypes = [
            'proposal' => 'proposal',
            'gambar_teknis' => 'gambar_teknis',
            'surat_permohonan' => 'surat_permohonan',
            'foto_lokasi' => 'foto_lokasi'
        ];

        $uploadedFiles = [];

        foreach ($documentTypes as $fieldName => $jenisDokumen) {
            if ($request->hasFile($fieldName)) {
                // \Log::info("Found file for: {$fieldName}");

                if ($fieldName === 'foto_lokasi') {
                    // Handle array files
                    foreach ($request->file($fieldName) as $index => $file) {
                        $result = $this->saveSingleDocument($programId, $file, $jenisDokumen, $index);
                        $uploadedFiles[] = $result;
                        // \Log::info("Uploaded {$fieldName}[{$index}]: " . $file->getClientOriginalName());
                    }
                } else {
                    // Handle single file
                    $file = $request->file($fieldName);
                    $result = $this->saveSingleDocument($programId, $file, $jenisDokumen);
                    $uploadedFiles[] = $result;
                    // \Log::info("Uploaded {$fieldName}: " . $file->getClientOriginalName());
                }
            } else {
                // \Log::info("No file found for: {$fieldName}");
            }
        }

        // \Log::info('Total uploaded documents: ' . count($uploadedFiles));
        return $uploadedFiles;
    }


    /**
     * 🚀 CREATE WITHOUT TAHAPAN — Buat program tanpa tahapan dulu
     */
    public function createWithoutTahapan(Request $request)
    {
        // Cek auth
        if (!Auth::check()) {
            return response()->json([
                'success' => false,
                'message' => 'Anda harus login untuk membuat program.'
            ], 401);
        }

        try {
            DB::beginTransaction();

            // Parse program data dari JSON string
            $programData = [];
            if ($request->has('program_data')) {
                $programData = json_decode($request->input('program_data'), true);
            }

            if (empty($programData)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data program tidak valid'
                ], 422);
            }

            $validator = Validator::make($programData, [
                'nama_program' => 'required|string|max:255',
                'deskripsi' => 'required|string',
                'kategori_program_id' => 'required|exists:kategori_program,id',
                'wilayah_id' => 'required|exists:wilayah,id',
                'tahun_anggaran' => 'required|integer|min:2020|max:2030',
                'prioritas' => 'required|in:rendah,sedang,tinggi,darurat',
                'tanggal_mulai' => 'required|date',
                'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
                'target_penerima_manfaat' => 'nullable|integer|min:0',
                'anggaran_total' => 'required|numeric|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            // ✅ SET USER DATA dengan benar
            $programData['created_by'] = Auth::id();
            $programData['penanggung_jawab_id'] = Auth::id();
            $programData['status_program'] = 'draft';
            $programData['kode_program'] = $this->generateKodeProgram();

            // \Log::info('💾 Creating program WITHOUT tahapan:', $programData);

            $program = ProgramModel::create($programData);

            // Jika ada RAB items
            if (isset($programData['rab_items']) && is_array($programData['rab_items'])) {
                foreach ($programData['rab_items'] as $index => $rabItem) {
                    ProgramRabModel::create([
                        'program_id' => $program->id,
                        'nama_item' => $rabItem['nama_item'],
                        'deskripsi' => $rabItem['deskripsi'] ?? null,
                        'volume' => $rabItem['volume'],
                        'satuan' => $rabItem['satuan'],
                        'harga_satuan' => $rabItem['harga_satuan'],
                        'total' => $rabItem['volume'] * $rabItem['harga_satuan'],
                        'urutan' => $index + 1,
                    ]);
                }
            }

            // ✅ TIDAK BUAT TAHAPAN DI SINI - tunggu user pilih metode roadmap

            // ✅ SIMPAN FILE DOKUMEN
            $uploadedDocs = $this->saveProgramDocuments($program->id, $request);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Program berhasil dibuat. Silakan pilih metode pembuatan roadmap.',
                'data' => $program->load(['kategori', 'wilayah', 'rabItems', 'dokumen'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            \Log::error('❌ Program creation without tahapan failed: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat program',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * 📋 ADD TAHAPAN — Tambah tahapan ke program yang sudah ada - FIXED VALIDATION
     */
    public function addTahapan(Request $request, $programId)
    {
        try {
            $program = ProgramModel::findOrFail($programId);

            // Cek ownership
            $user = Auth::user();
            if ($user->role === 'admin_desa' && $program->wilayah_id !== $user->alamat_lengkap) {
                return response()->json([
                    'success' => false,
                    'message' => 'Anda tidak memiliki akses untuk program ini.'
                ], 403);
            }

            // ✅ PERBAIKI: Validasi yang lebih fleksibel
            $validator = Validator::make($request->all(), [
                'tahapan' => 'required|array',
                'tahapan.*.nama_tahapan' => 'required|string|max:255',
                'tahapan.*.deskripsi' => 'nullable|string',
                'tahapan.*.persentase' => 'required|numeric|min:0|max:100',
                'tahapan.*.tanggal_mulai_rencana' => 'nullable|date', // ✅ Ubah jadi nullable
                'tahapan.*.tanggal_selesai_rencana' => 'nullable|date|after_or_equal:tahapan.*.tanggal_mulai_rencana', // ✅ Ubah jadi nullable
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi tahapan gagal',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Hapus tahapan lama jika ada
            ProgramTahapanModel::where('program_id', $programId)->delete();

            $tahapanData = $request->input('tahapan');
            $createdTahapan = [];

            foreach ($tahapanData as $index => $tahap) {
                // ✅ PERBAIKI: Handle tanggal yang null
                $tanggalMulai = $tahap['tanggal_mulai_rencana'] ?? null;
                $tanggalSelesai = $tahap['tanggal_selesai_rencana'] ?? null;

                // Jika tanggal null, hitung otomatis berdasarkan program
                if (empty($tanggalMulai) || empty($tanggalSelesai)) {
                    $dates = $this->calculateTahapDates(
                        $program->tanggal_mulai,
                        $program->tanggal_selesai,
                        $index,
                        count($tahapanData)
                    );
                    $tanggalMulai = $dates['mulai'];
                    $tanggalSelesai = $dates['selesai'];
                }

                $tahapan = ProgramTahapanModel::create([
                    'program_id' => $programId,
                    'nama_tahapan' => $tahap['nama_tahapan'],
                    'deskripsi' => $tahap['deskripsi'] ?? '',
                    'persentase' => $tahap['persentase'],
                    'tanggal_mulai_rencana' => $tanggalMulai,
                    'tanggal_selesai_rencana' => $tanggalSelesai,
                    'status' => 'menunggu',
                    'urutan' => $index + 1,
                ]);

                $createdTahapan[] = $tahapan;
            }

            // Update status program menjadi "diajukan" setelah tahapan selesai
            $program->update([
                'status_program' => 'diajukan'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Tahapan berhasil ditambahkan dan program siap diajukan',
                'data' => [
                    'program' => $program->load(['kategori', 'wilayah', 'rabItems', 'tahapan', 'dokumen']),
                    'tahapan' => $createdTahapan
                ]
            ], 201);

        } catch (\Exception $e) {
            \Log::error('❌ Add tahapan failed: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan tahapan: ' . $e->getMessage()
            ], 500);
        }
    }

    // ✅ TAMBAHKAN METHOD calculateTahapDates di ProgramController
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
     * 🔄 COMPLETE PROGRAM — Selesaikan program dengan tahapan dan submit
     */
    public function completeProgram(Request $request, $programId)
    {
        try {
            $program = ProgramModel::findOrFail($programId);

            // Cek ownership
            $user = Auth::user();
            if ($user->role === 'admin_desa' && $program->wilayah_id !== $user->alamat_lengkap) {
                return response()->json([
                    'success' => false,
                    'message' => 'Anda tidak memiliki akses untuk program ini.'
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
                'message' => 'Program berhasil diselesaikan dan diajukan untuk verifikasi',
                'data' => $program->load(['kategori', 'wilayah', 'rabItems', 'tahapan', 'dokumen'])
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('❌ Complete program failed: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal menyelesaikan program: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * 📊 GET DEFAULT TAHAPAN — Generate template tahapan default berdasarkan program
     */
    public function getDefaultTahapan($programId)
    {
        try {
            $program = ProgramModel::findOrFail($programId);

            // Cek ownership
            $user = Auth::user();
            if ($user->role === 'admin_desa' && $program->wilayah_id !== $user->alamat_lengkap) {
                return response()->json([
                    'success' => false,
                    'message' => 'Anda tidak memiliki akses untuk program ini.'
                ], 403);
            }

            $defaultTahapan = $this->generateDefaultTahapanTemplate($program);

            return response()->json([
                'success' => true,
                'message' => 'Template tahapan default berhasil digenerate',
                'data' => $defaultTahapan
            ], 200);

        } catch (\Exception $e) {
            \Log::error('❌ Get default tahapan failed: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal generate template tahapan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generate template tahapan default
     */
    private function generateDefaultTahapanTemplate($program)
    {
        $tanggalMulai = \Carbon\Carbon::parse($program->tanggal_mulai);
        $tanggalSelesai = \Carbon\Carbon::parse($program->tanggal_selesai);
        $totalDays = $tanggalMulai->diffInDays($tanggalSelesai);

        return [
            [
                'nama_tahapan' => 'Persiapan dan Perencanaan',
                'deskripsi' => 'Penyusunan dokumen perencanaan teknis, survey lokasi, pengukuran, koordinasi dengan pihak terkait, dan persiapan administrasi',
                'persentase' => 20,
                'tanggal_mulai_rencana' => $tanggalMulai->format('Y-m-d'),
                'tanggal_selesai_rencana' => $tanggalMulai->copy()->addDays(floor($totalDays * 0.2))->format('Y-m-d'),
            ],
            [
                'nama_tahapan' => 'Pengadaan Material dan Persiapan',
                'deskripsi' => 'Pengadaan material utama dan pendukung, transportasi material ke lokasi, quality control material, dan penyiapan peralatan',
                'persentase' => 25,
                'tanggal_mulai_rencana' => $tanggalMulai->copy()->addDays(floor($totalDays * 0.2) + 1)->format('Y-m-d'),
                'tanggal_selesai_rencana' => $tanggalMulai->copy()->addDays(floor($totalDays * 0.45))->format('Y-m-d'),
            ],
            [
                'nama_tahapan' => 'Pelaksanaan Utama',
                'deskripsi' => 'Pekerjaan fisik utama program, monitoring dan evaluasi harian, quality assurance, laporan progress mingguan, dan koordinasi lapangan',
                'persentase' => 35,
                'tanggal_mulai_rencana' => $tanggalMulai->copy()->addDays(floor($totalDays * 0.45) + 1)->format('Y-m-d'),
                'tanggal_selesai_rencana' => $tanggalMulai->copy()->addDays(floor($totalDays * 0.8))->format('Y-m-d'),
            ],
            [
                'nama_tahapan' => 'Finishing dan Penyerahan',
                'deskripsi' => 'Pekerjaan finishing, testing dan commissioning, serah terima pekerjaan, dokumentasi akhir, dan laporan akhir program',
                'persentase' => 20,
                'tanggal_mulai_rencana' => $tanggalMulai->copy()->addDays(floor($totalDays * 0.8) + 1)->format('Y-m-d'),
                'tanggal_selesai_rencana' => $tanggalSelesai->format('Y-m-d'),
            ]
        ];
    }

    /**
     * Simpan single document
     */
    private function saveSingleDocument($programId, $file, $jenisDokumen, $index = null)
    {
        $originalName = $file->getClientOriginalName();
        $filePath = $file->store('program_documents/' . $programId, 'public');

        $namaDokumen = $jenisDokumen;
        if ($jenisDokumen === 'foto_lokasi' && $index !== null) {
            $namaDokumen = 'foto_lokasi_' . ($index + 1);
        }

        ProgramDokumenModel::create([
            'program_id' => $programId,
            'jenis_dokumen' => $jenisDokumen,
            'nama_dokumen' => $namaDokumen,
            'file_path' => $filePath,
            'file_name' => $originalName,
            'mime_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
            'keterangan' => 'Dokumen ' . $jenisDokumen . ' program'
        ]);
    }

    /**
     * Generate kode program unik
     */
    private function generateKodeProgram()
    {
        $date = now()->format('YmdHis');
        $random = rand(100, 999);
        return "PRG-{$date}{$random}";
    }

    /**
     * ✏️ UPDATE — Mengupdate data program
     */
    public function update(Request $request, $id)
    {
        $program = ProgramModel::find($id);

        if (!$program) {
            return response()->json([
                'success' => false,
                'message' => 'Program tidak ditemukan.'
            ], 404);
        }

        // Cek ownership
        $user = Auth::user();
        if ($user->role === 'admin_desa' && $program->wilayah_id !== $user->alamat_lengkap) {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak memiliki akses untuk mengedit program ini.'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'nama_program' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'kategori_program_id' => 'required|exists:kategori_program,id',
            'jenis_program' => 'required|in:desa,kecamatan,dinas,kabupaten',
            'tingkat_pengusul' => 'required|in:desa,kecamatan,dinas,kabupaten',
            'wilayah_id' => 'required|exists:wilayah,id',
            'tahun_anggaran' => 'required|integer|min:2020|max:2030',
            'prioritas' => 'required|in:rendah,sedang,tinggi,darurat',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'target_penerima_manfaat' => 'nullable|integer|min:0',
            'anggaran_total' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        // Hanya bisa edit program dengan status draft
        if ($program->status_program !== 'draft') {
            return response()->json([
                'success' => false,
                'message' => 'Hanya program dengan status draft yang dapat diubah.'
            ], 400);
        }

        $program->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Program berhasil diperbarui',
            'data' => $program->load(['kategori', 'wilayah'])
        ], 200);
    }

    /**
     * 🗑️ DESTROY — Menghapus program
     */
    public function destroy($id)
    {
        $program = ProgramModel::find($id);

        if (!$program) {
            return response()->json([
                'success' => false,
                'message' => 'Program tidak ditemukan.'
            ], 404);
        }

        // Cek ownership
        $user = Auth::user();
        if ($user->role === 'admin_desa' && $program->wilayah_id !== $user->alamat_lengkap) {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak memiliki akses untuk menghapus program ini.'
            ], 403);
        }

        // Hanya bisa hapus program dengan status draft
        if ($program->status_program !== 'draft') {
            return response()->json([
                'success' => false,
                'message' => 'Hanya program dengan status draft yang dapat dihapus.'
            ], 400);
        }

        $program->delete();

        return response()->json([
            'success' => true,
            'message' => 'Program berhasil dihapus.'
        ], 200);
    }

    /**
     * 🚀 SUBMIT — Submit program untuk verifikasi
     */
    public function submit(Request $request, $id)
    {
        $program = ProgramModel::find($id);

        if (!$program) {
            return response()->json([
                'success' => false,
                'message' => 'Program tidak ditemukan.'
            ], 404);
        }

        // Cek ownership
        $user = Auth::user();
        if ($user->role === 'admin_desa' && $program->wilayah_id !== $user->alamat_lengkap) {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak memiliki akses untuk submit program ini.'
            ], 403);
        }

        if ($program->status_program !== 'draft') {
            return response()->json([
                'success' => false,
                'message' => 'Hanya program dengan status draft yang dapat diajukan.'
            ], 400);
        }

        $program->update([
            'status_program' => 'diajukan'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Program berhasil diajukan untuk verifikasi.',
            'data' => $program
        ], 200);
    }

    /**
     * ✅ VERIFY — Verifikasi program (admin_kecamatan)
     */
    public function verify(Request $request, $id)
    {
        $program = ProgramModel::find($id);

        if (!$program) {
            return response()->json([
                'success' => false,
                'message' => 'Program tidak ditemukan.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'catatan_verifikasi' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($program->status_program !== 'diajukan') {
            return response()->json([
                'success' => false,
                'message' => 'Hanya program dengan status diajukan yang dapat diverifikasi.'
            ], 400);
        }

        $program->update([
            'status_program' => 'diverifikasi_kecamatan',
            'verified_by' => Auth::id(),
            'tanggal_verifikasi' => now(),
            'catatan_verifikasi' => $request->catatan_verifikasi,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Program berhasil diverifikasi.',
            'data' => $program
        ], 200);
    }

    /**
     * 👍 APPROVE — Approve program (admin_kabupaten/dinas)
     */
    public function approve(Request $request, $id)
    {
        $program = ProgramModel::find($id);

        if (!$program) {
            return response()->json([
                'success' => false,
                'message' => 'Program tidak ditemukan.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'catatan_approval' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($program->status_program !== 'diverifikasi_kecamatan') {
            return response()->json([
                'success' => false,
                'message' => 'Hanya program dengan status diverifikasi_kecamatan yang dapat disetujui.'
            ], 400);
        }

        $program->update([
            'status_program' => 'approved',
            'approved_by' => Auth::id(),
            'tanggal_approval' => now(),
            'catatan_approval' => $request->catatan_approval,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Program berhasil disetujui.',
            'data' => $program
        ], 200);
    }

    /**
     * 👎 REJECT — Menolak program
     */
    public function reject(Request $request, $id)
    {
        $program = ProgramModel::find($id);

        if (!$program) {
            return response()->json([
                'success' => false,
                'message' => 'Program tidak ditemukan.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'catatan' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        $catatanField = $user->role === 'admin_kecamatan' ? 'catatan_verifikasi' : 'catatan_approval';

        $program->update([
            'status_program' => 'rejected',
            'verified_by' => $user->role === 'admin_kecamatan' ? $user->id : $program->verified_by,
            'approved_by' => $user->role === 'admin_kecamatan' ? null : $user->id,
            'tanggal_verifikasi' => $user->role === 'admin_kecamatan' ? now() : $program->tanggal_verifikasi,
            'tanggal_approval' => $user->role === 'admin_kecamatan' ? null : now(),
            $catatanField => $request->catatan,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Program berhasil ditolak.',
            'data' => $program
        ], 200);
    }

    /**
     * 🔄 CHANGE STATUS — Ubah status program (admin khusus)
     */
    public function changeStatus(Request $request, $id)
    {
        $program = ProgramModel::find($id);

        if (!$program) {
            return response()->json([
                'success' => false,
                'message' => 'Program tidak ditemukan.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'status_program' => 'required|in:draft,diajukan,diverifikasi_kecamatan,approved,rejected,berjalan,selesai',
            'catatan' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $updateData = ['status_program' => $request->status_program];

        // Set verified/approved berdasarkan status
        if ($request->status_program === 'diverifikasi_kecamatan') {
            $updateData['verified_by'] = Auth::id();
            $updateData['tanggal_verifikasi'] = now();
            $updateData['catatan_verifikasi'] = $request->catatan;
        } elseif ($request->status_program === 'approved') {
            $updateData['approved_by'] = Auth::id();
            $updateData['tanggal_approval'] = now();
            $updateData['catatan_approval'] = $request->catatan;
        }

        $program->update($updateData);

        return response()->json([
            'success' => true,
            'message' => 'Status program berhasil diubah.',
            'data' => $program
        ], 200);
    }

    public function updateProgress($id, Request $request)
    {
        try {
            $program = ProgramModel::findOrFail($id);
            $user = Auth::user();

            // ✅ CEK AKSES: User hanya bisa update program di desanya
            if ($user->role === 'admin_desa' && $program->wilayah_id !== $user->alamat_lengkap) {
                return response()->json([
                    'success' => false,
                    'message' => 'Forbidden. Anda hanya bisa mengakses program di desa Anda.'
                ], 403);
            }

            $validated = $request->validate([
                'tahapan_id' => 'required|exists:program_tahapan,id',
                'persentase' => 'required|integer|min:0|max:100',
                'deskripsi_progress' => 'required|string',
                'anggaran_terpakai' => 'nullable|numeric|min:0',
                'tanggal_progress' => 'required|date'
            ]);

            // Pastikan tahapan milik program yang benar
            $tahapan = ProgramTahapanModel::where('id', $validated['tahapan_id'])
                ->where('program_id', $program->id)
                ->first();

            if (!$tahapan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tahapan tidak ditemukan atau tidak sesuai dengan program.'
                ], 404);
            }

            // Update progress tahapan
            $tahapan->update([
                'persentase' => $validated['persentase'],
                'status' => $validated['persentase'] == 100 ? 'selesai' : 'dalam_pengerjaan',
                'tanggal_mulai_aktual' => $tahapan->tanggal_mulai_aktual ?: $validated['tanggal_progress'],
                'tanggal_selesai_aktual' => $validated['persentase'] == 100 ? $validated['tanggal_progress'] : null
            ]);

            // Create progress record
            $progress = ProgramProgressModel::create([
                'program_id' => $program->id,
                'tahapan_id' => $validated['tahapan_id'],
                'persentase' => $validated['persentase'],
                'deskripsi_progress' => $validated['deskripsi_progress'],
                'anggaran_terpakai' => $validated['anggaran_terpakai'] ?? 0,
                'dilaporkan_oleh' => auth()->id(),
                'tanggal_progress' => $validated['tanggal_progress']
            ]);

            // Update realisasi anggaran program
            $program->increment('realisasi_anggaran', $validated['anggaran_terpakai'] ?? 0);

            return response()->json([
                'success' => true,
                'message' => 'Progress berhasil diupdate',
                'data' => $progress->load(['pelapor', 'dokumentasi'])
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengupdate progress: ' . $e->getMessage()
            ], 500);
        }
    }

    public function uploadDokumentasi($id, Request $request)
    {
        try {
            $validated = $request->validate([
                'progress_id' => 'required|exists:program_progress,id',
                'file' => 'required|file|max:10240', // 10MB max
                'jenis' => 'required|in:foto,video,dokumen'
            ]);

            $file = $request->file('file');
            $path = $file->store('program-dokumentasi', 'public');

            $dokumentasi = ProgramDokumentasiModel::create([
                'progress_id' => $validated['progress_id'],
                'jenis' => $validated['jenis'],
                'file_path' => $path,
                'file_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'file_size' => $file->getSize()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Dokumentasi berhasil diupload',
                'data' => $dokumentasi
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal upload dokumentasi: ' . $e->getMessage()
            ], 500);
        }
    }
}