<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\KategoriProgramModel;
use App\Models\ProgramDokumenModel;
use App\Models\ProgramModel;
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

        // Cek akses untuk user yang belum login
        $user = Auth::user();
        if (!$user && !in_array($program->status_program, ['approved', 'berjalan', 'selesai'])) {
            return response()->json([
                'success' => false,
                'message' => 'Anda tidak memiliki akses untuk melihat program ini.'
            ], 403);
        }

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
     * 💾 STORE — Menyimpan program baru dengan file upload
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

        // Parse program data dari JSON string
        $programData = json_decode($request->program_data, true);

        $validator = Validator::make($programData, [
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

        try {
            DB::beginTransaction();

            $programData['created_by'] = Auth::id();
            $programData['penanggung_jawab_id'] = Auth::id();
            $programData['status_program'] = 'draft';
            $programData['kode_program'] = $this->generateKodeProgram();

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
            }

            // ✅ SIMPAN FILE DOKUMEN
            $this->saveProgramDocuments($program->id, $request);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Program dan dokumen berhasil dibuat',
                'data' => $program->load(['kategori', 'wilayah', 'rabItems', 'tahapan', 'dokumen'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat program',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Simpan dokumen program
     */
    private function saveProgramDocuments($programId, $request)
    {
        $documentTypes = [
            'proposal' => 'proposal',
            'gambar_teknis' => 'gambar_teknis', 
            'surat_permohonan' => 'surat_permohonan'
        ];

        // Simpan file single
        foreach ($documentTypes as $fieldName => $jenisDokumen) {
            if ($request->hasFile($fieldName)) {
                $file = $request->file($fieldName);
                $this->saveSingleDocument($programId, $file, $jenisDokumen);
            }
        }

        // Simpan multiple foto lokasi
        if ($request->hasFile('foto_lokasi')) {
            foreach ($request->file('foto_lokasi') as $index => $foto) {
                $this->saveSingleDocument($programId, $foto, 'foto_lokasi', $index);
            }
        }
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
}