<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\ProgramModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ProgramController extends Controller
{
    /**
     * 📦 INDEX — Menampilkan semua data program dengan JOIN
     */
    public function index()
    {
        $programs = DB::table('program')
            ->leftJoin('users as creator', 'program.created_by', '=', 'creator.id')
            ->leftJoin('users as verifier', 'program.verified_by', '=', 'verifier.id')
            ->leftJoin('users as approver', 'program.approved_by', '=', 'approver.id')
            ->leftJoin('wilayah', 'program.alamat', '=', 'wilayah.id')
            ->leftJoin('desa', 'wilayah.desa', '=', 'desa.id')
            ->leftJoin('kecamatan', 'wilayah.kecamatan', '=', 'kecamatan.id')
            ->leftJoin('kabupaten', 'wilayah.kabupaten', '=', 'kabupaten.id')
            ->leftJoin('provinsi', 'wilayah.provinsi', '=', 'provinsi.id')
            ->select(
                'program.id',
                'program.nama_program',
                'program.deskripsi',
                'program.jenis_program',
                'program.tingkat_pengusul',
                'program.tahun_anggaran',
                'program.status_program',
                'program.tanggal_mulai',
                'program.tanggal_selesai',
                'program.target_penerima_manfaat',
                'program.catatan_verifikasi',
                'program.catatan_approval',
                'program.created_at',
                'program.updated_at',
                'creator.nama as dibuat_oleh',
                'verifier.nama as diverifikasi_oleh',
                'approver.nama as disetujui_oleh',
                'desa.nama_desa',
                'kecamatan.nama_kecamatan',
                'kabupaten.nama_kabupaten',
                'provinsi.nama_provinsi'
            )
            ->orderBy('program.created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $programs
        ], 200);
    }

    /**
     * 🔎 FILTER — Filter program berdasarkan role & status
     * FITUR BARU: Filter by status, wilayah, tahun, jenis program
     */
    public function filter(Request $request)
    {
        $query = DB::table('program')
            ->leftJoin('users as creator', 'program.created_by', '=', 'creator.id')
            ->leftJoin('wilayah', 'program.alamat', '=', 'wilayah.id')
            ->select(
                'program.id',
                'program.nama_program',
                'program.deskripsi',
                'program.status_program',
                'program.tahun_anggaran',
                'program.tanggal_mulai',
                'program.tanggal_selesai',
                'creator.nama as dibuat_oleh'
            );

        // Filter by status
        if ($request->has('status') && $request->status != '') {
            $query->where('program.status_program', $request->status);
        }

        // Filter by tahun anggaran
        if ($request->has('tahun') && $request->tahun != '') {
            $query->where('program.tahun_anggaran', $request->tahun);
        }

        // Filter by jenis program
        if ($request->has('jenis_program') && $request->jenis_program != '') {
            $query->where('program.jenis_program', $request->jenis_program);
        }

        // Filter by wilayah
        if ($request->has('wilayah_id') && $request->wilayah_id != '') {
            $query->where('program.alamat', $request->wilayah_id);
        }

        $programs = $query->orderBy('program.created_at', 'desc')->get();

        return response()->json([
            'status' => 'success',
            'data' => $programs
        ], 200);
    }

    /**
     * 🔍 SHOW — Menampilkan satu data program berdasarkan ID
     */
    public function show($id)
    {
        $program = DB::table('program')
            ->leftJoin('users as creator', 'program.created_by', '=', 'creator.id')
            ->leftJoin('users as verifier', 'program.verified_by', '=', 'verifier.id')
            ->leftJoin('users as approver', 'program.approved_by', '=', 'approver.id')
            ->select('program.*', 'creator.nama as dibuat_oleh', 'verifier.nama as diverifikasi_oleh', 'approver.nama as disetujui_oleh')
            ->where('program.id', $id)
            ->first();

        if (!$program) {
            return response()->json([
                'status' => 'error',
                'message' => 'Program tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $program
        ], 200);
    }

    /**
     * ➕ CREATE — Menampilkan form create (metadata untuk form)
     * FITUR BARU: Return enum options & wilayah list untuk form
     */
    public function create()
    {
        $wilayah = DB::table('wilayah')->select('id', 'nama')->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'wilayah' => $wilayah,
                'jenis_program' => ['desa', 'kecamatan', 'dinas', 'kabupaten'],
                'status_program' => ['draft', 'diajukan', 'diverifikasi_kecamatan', 'approved', 'rejected', 'berjalan', 'selesai']
            ]
        ], 200);
    }

    /**
     * 💾 STORE — Menyimpan program baru
     */
    public function store(Request $request)
    {
        $validation = $request->validate([
            'nama_program' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'jenis_program' => 'required|in:desa,kecamatan,dinas,kabupaten',
            'tingkat_pengusul' => 'required|in:desa,kecamatan,dinas,kabupaten',
            'alamat' => 'nullable|integer',
            'tahun_anggaran' => 'required|integer|min:2000|max:2100',
            'status_program' => 'in:draft,diajukan,diverifikasi_kecamatan,approved,rejected,berjalan,selesai',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'target_penerima_manfaat' => 'nullable|integer|min:0',
        ]);

        // Auto set created_by dari auth user
        $validation['created_by'] = Auth::id() ?? $request->created_by;
        $validation['status_program'] = $validation['status_program'] ?? 'draft';

        $program = ProgramModel::create($validation);

        return response()->json([
            'status' => 'success',
            'data' => $program,
            'message' => 'Program berhasil ditambahkan.'
        ], 201);
    }

    /**
     * ✏️ UPDATE — Mengubah data program
     */
    public function update(Request $request, $id)
    {
        $program = ProgramModel::find($id);

        if (!$program) {
            return response()->json([
                'status' => 'error',
                'message' => 'Program tidak ditemukan.'
            ], 404);
        }

        $validation = $request->validate([
            'nama_program' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'jenis_program' => 'required|in:desa,kecamatan,dinas,kabupaten',
            'tingkat_pengusul' => 'required|in:desa,kecamatan,dinas,kabupaten',
            'alamat' => 'nullable|integer|exists:wilayah,id',
            'tahun_anggaran' => 'required|integer|min:2000|max:2100',
            'status_program' => 'in:draft,diajukan,diverifikasi_kecamatan,approved,rejected,berjalan,selesai',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'target_penerima_manfaat' => 'nullable|integer|min:0',
        ]);

        $program->update($validation);

        return response()->json([
            'status' => 'success',
            'data' => $program,
            'message' => 'Program berhasil diperbarui.'
        ], 200);
    }

    /**
     * ✅ VERIFY — Verifikasi program (admin_kecamatan)
     * FITUR BARU: Perubahan status ke diverifikasi_kecamatan
     */
    public function verify(Request $request, $id)
    {
        $program = ProgramModel::find($id);

        if (!$program) {
            return response()->json([
                'status' => 'error',
                'message' => 'Program tidak ditemukan.'
            ], 404);
        }

        $validation = $request->validate([
            'catatan_verifikasi' => 'nullable|string',
        ]);

        $program->update([
            'status_program' => 'diverifikasi_kecamatan',
            'verified_by' => Auth::id(),
            'tanggal_verifikasi' => now(),
            'catatan_verifikasi' => $validation['catatan_verifikasi'] ?? null,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $program,
            'message' => 'Program berhasil diverifikasi.'
        ], 200);
    }

    /**
     * 👍 APPROVE — Approve program (admin_kabupaten)
     * FITUR BARU: Perubahan status ke approved
     */
    public function approve(Request $request, $id)
    {
        $program = ProgramModel::find($id);

        if (!$program) {
            return response()->json([
                'status' => 'error',
                'message' => 'Program tidak ditemukan.'
            ], 404);
        }

        $validation = $request->validate([
            'catatan_approval' => 'nullable|string',
        ]);

        $program->update([
            'status_program' => 'approved',
            'approved_by' => Auth::id(),
            'tanggal_approval' => now(),
            'catatan_approval' => $validation['catatan_approval'] ?? null,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $program,
            'message' => 'Program berhasil disetujui.'
        ], 200);
    }

    /**
     * 👎 REJECT — Reject program (admin_kabupaten)
     * FITUR BARU: Perubahan status ke rejected dengan alasan
     */
    public function reject(Request $request, $id)
    {
        $program = ProgramModel::find($id);

        if (!$program) {
            return response()->json([
                'status' => 'error',
                'message' => 'Program tidak ditemukan.'
            ], 404);
        }

        $validation = $request->validate([
            'catatan_approval' => 'required|string',
        ]);

        $program->update([
            'status_program' => 'rejected',
            'approved_by' => Auth::id(),
            'tanggal_approval' => now(),
            'catatan_approval' => $validation['catatan_approval'],
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $program,
            'message' => 'Program berhasil ditolak.'
        ], 200);
    }

    /**
     * 🚀 SUBMIT — Submit program ke level atas
     * FITUR BARU: Ubah status draft menjadi diajukan
     */
    public function submit(Request $request, $id)
    {
        $program = ProgramModel::find($id);

        if (!$program) {
            return response()->json([
                'status' => 'error',
                'message' => 'Program tidak ditemukan.'
            ], 404);
        }

        if ($program->status_program !== 'draft') {
            return response()->json([
                'status' => 'error',
                'message' => 'Hanya program dengan status draft yang dapat diajukan.'
            ], 400);
        }

        $program->update([
            'status_program' => 'diajukan',
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $program,
            'message' => 'Program berhasil diajukan.'
        ], 200);
    }

    /**
     * 🗑️ DESTROY — Menghapus data program
     * Hanya bisa hapus program dengan status draft
     */
    public function destroy($id)
    {
        $program = ProgramModel::find($id);

        if (!$program) {
            return response()->json([
                'status' => 'error',
                'message' => 'Program tidak ditemukan.'
            ], 404);
        }

        if ($program->status_program !== 'draft') {
            return response()->json([
                'status' => 'error',
                'message' => 'Hanya program dengan status draft yang dapat dihapus.'
            ], 400);
        }

        $program->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Program berhasil dihapus.'
        ], 200);
    }

    /**
     * 📊 STATISTICS — Statistik program
     * FITUR BARU: Tampilkan stat total, by status, by year
     */
    public function statistics()
    {
        $totalProgram = ProgramModel::count();
        $totalAnggaran = DB::table('program')->sum('total_anggaran') ?? 0;
        $byStatus = DB::table('program')
            ->groupBy('status_program')
            ->selectRaw('status_program, count(*) as total')
            ->get();
        $byYear = DB::table('program')
            ->groupBy('tahun_anggaran')
            ->selectRaw('tahun_anggaran, count(*) as total')
            ->orderBy('tahun_anggaran', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'total_program' => $totalProgram,
                'total_anggaran' => $totalAnggaran,
                'by_status' => $byStatus,
                'by_year' => $byYear,
            ]
        ], 200);
    }

    /**
     * 🔄 CHANGE STATUS — Ubah status program manual
     * FITUR BARU: Untuk admin_kabupaten update status
     */
    public function changeStatus(Request $request, $id)
    {
        $program = ProgramModel::find($id);

        if (!$program) {
            return response()->json([
                'status' => 'error',
                'message' => 'Program tidak ditemukan.'
            ], 404);
        }

        $validation = $request->validate([
            'status_program' => 'required|in:draft,diajukan,diverifikasi_kecamatan,approved,rejected,berjalan,selesai',
        ]);

        $program->update($validation);

        return response()->json([
            'status' => 'success',
            'data' => $program,
            'message' => 'Status program berhasil diubah.'
        ], 200);
    }
}