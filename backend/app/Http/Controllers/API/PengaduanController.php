<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PengaduanModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PengaduanController extends Controller
{
    /**
     * 🧾 Menampilkan semua data pengaduan
     */
    public function index(Request $request)
    {
        $query = PengaduanModel::query()->with(['program', 'pelapor', 'petugas', 'lokasi']);

        // Filter opsional

        if ($request->has('status_pengaduan')) {
            $query->where('status_pengaduan', $request->status_pengaduan);
        }

        if ($request->has('prioritas')) {
            $query->where('prioritas', $request->prioritas);
        }

        $pengaduan = $query->latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar pengaduan berhasil diambil',
            'data' => $pengaduan,
        ]);
    }

    /**
     * ➕ Tambah pengaduan baru
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kode_pengaduan' => 'required|unique:pengaduan',
            'program_id' => 'required|exists:program,id',
            'pelapor' => 'required|exists:users,id',
            'kategori_pengaduan' => 'required|in:kejanggalan_rab,pelaksanaan_program,penyaluran_bantuan,lainnya',
            'judul_pengaduan' => 'required|string|max:255',
            'deskripsi_pengaduan' => 'required|string',
            'tanggal_kejadian' => 'required|date',
            'lokasi_kejadian' => 'required|exists:wilayah,id',
            'prioritas' => 'in:rendah,sedang,tinggi',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        $pengaduan = PengaduanModel::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Pengaduan berhasil dibuat',
            'data' => $pengaduan,
        ], 201);
    }

    /**
     * 🔍 Menampilkan detail pengaduan
     */
    public function show($id)
    {
        $pengaduan = PengaduanModel::with(['program', 'pelapor', 'petugas', 'lokasi'])->find($id);

        if (!$pengaduan) {
            return response()->json([
                'success' => false,
                'message' => 'Pengaduan tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail pengaduan berhasil diambil',
            'data' => $pengaduan,
        ]);
    }

    /**
     * ✏️ Update pengaduan
     */
    public function update(Request $request, $id)
    {
        $pengaduan = PengaduanModel::find($id);

        if (!$pengaduan) {
            return response()->json([
                'success' => false,
                'message' => 'Pengaduan tidak ditemukan!',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'status_pengaduan' => 'in:pending,diterima,diproses,ditindaklanjuti,selesai,ditolak',
            'prioritas' => 'in:rendah,sedang,tinggi',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        $pengaduan->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Pengaduan berhasil diperbarui',
            'data' => $pengaduan,
        ]);
    }

    /**
     * ❌ Hapus pengaduan
     */
    public function destroy($id)
    {
        $pengaduan = PengaduanModel::find($id);

        if (!$pengaduan) {
            return response()->json([
                'success' => false,
                'message' => 'Pengaduan tidak ditemukan',
            ], 404);
        }

        $pengaduan->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pengaduan berhasil dihapus',
        ]);
    }
}
