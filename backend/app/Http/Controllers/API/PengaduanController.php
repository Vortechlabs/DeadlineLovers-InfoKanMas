<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PengaduanModel;
use App\Models\ProgramModel;
use App\Models\WilayahModel;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PengaduanController extends Controller
{
    // Menampilkan seluruh data dengan search, filter, dan pagination
    public function index(Request $request): JsonResponse
    {
        $query = PengaduanModel::query();

        // Search berdasarkan judul, deskripsi, atau kode pengaduan
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('kode_pengaduan', 'like', "%{$search}%")
                  ->orWhere('judul_pengaduan', 'like', "%{$search}%")
                  ->orWhere('deskripsi_pengaduan', 'like', "%{$search}%");
            });
        }

        // Filter berdasarkan status pengaduan
        if ($request->has('status_pengaduan') && !empty($request->status_pengaduan)) {
            $query->where('status_pengaduan', $request->status_pengaduan);
        }

        // Filter berdasarkan kategori pengaduan
        if ($request->has('kategori_pengaduan') && !empty($request->kategori_pengaduan)) {
            $query->where('kategori_pengaduan', $request->kategori_pengaduan);
        }

        // Filter berdasarkan kategori program (dari tabel program)
        if ($request->has('kategori_program') && !empty($request->kategori_program)) {
            $query->whereHas('program', function($q) use ($request) {
                $q->where('kategori_program_id', $request->kategori_program);
            });
        }

        // Filter berdasarkan prioritas
        if ($request->has('prioritas') && !empty($request->prioritas)) {
            $query->where('prioritas', $request->prioritas);
        }

        // Filter berdasarkan wilayah
        if ($request->has('wilayah_id') && !empty($request->wilayah_id)) {
            $query->where('lokasi_kejadian', $request->wilayah_id);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 10);
        $data = $query->paginate($perPage);

        return response()->json([
            'status' => 'success',
            'message' => 'Data pengaduan berhasil diambil',
            'data' => $data->items(),
            'pagination' => [
                'total' => $data->total(),
                'per_page' => $data->perPage(),
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'from' => $data->firstItem(),
                'to' => $data->lastItem(),
            ]
        ], 200);
    }

    // Menampilkan data berdasarkan ID
    public function show($id): JsonResponse
    {
        $pengaduan = PengaduanModel::find($id);

        if (!$pengaduan) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data pengaduan tidak ditemukan',
                'data' => null
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Data pengaduan berhasil diambil',
            'data' => $pengaduan
        ], 200);
    }

    // Menambah data pengaduan
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'program_id' => 'required|exists:program,id',
            'pelapor' => 'required|exists:users,id',
            'kategori_pengaduan' => 'required|in:kejanggalan_rab,pelaksanaan_program,penyaluran_bantuan,lainnya',
            'judul_pengaduan' => 'required|string|max:255',
            'deskripsi_pengaduan' => 'required|string',
            'bukti_pendukung' => 'nullable|json',
            'lokasi_kejadian' => 'required|exists:wilayah,id',
            'tanggal_kejadian' => 'required|date',
            'prioritas' => 'required|in:rendah,sedang,tinggi',
        ]);

        // Generate kode pengaduan
        $kode = 'PGD-' . date('YmdHis') . rand(100, 999);

        $pengaduan = PengaduanModel::create([
            'kode_pengaduan' => $kode,
            'program_id' => $validated['program_id'],
            'pelapor' => $validated['pelapor'],
            'kategori_pengaduan' => $validated['kategori_pengaduan'],
            'judul_pengaduan' => $validated['judul_pengaduan'],
            'deskripsi_pengaduan' => $validated['deskripsi_pengaduan'],
            'bukti_pendukung' => $validated['bukti_pendukung'] ?? null,
            'lokasi_kejadian' => $validated['lokasi_kejadian'],
            'tanggal_kejadian' => $validated['tanggal_kejadian'],
            'status_pengaduan' => 'baru',
            'prioritas' => $validated['prioritas'],
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Data pengaduan berhasil ditambahkan',
            'data' => $pengaduan
        ], 201);
    }

    // Mengupdate data pengaduan
    public function update(Request $request, $id): JsonResponse
    {
        $pengaduan = PengaduanModel::find($id);

        if (!$pengaduan) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data pengaduan tidak ditemukan',
                'data' => null
            ], 404);
        }

        $validated = $request->validate([
            'program_id' => 'sometimes|exists:program,id',
            'pelapor' => 'sometimes|exists:users,id',
            'kategori_pengaduan' => 'sometimes|in:kejanggalan_rab,pelaksanaan_program,penyaluran_bantuan,lainnya',
            'judul_pengaduan' => 'sometimes|string|max:255',
            'deskripsi_pengaduan' => 'sometimes|string',
            'bukti_pendukung' => 'nullable|json',
            'lokasi_kejadian' => 'sometimes|exists:wilayah,id',
            'tanggal_kejadian' => 'sometimes|date',
            'prioritas' => 'sometimes|in:rendah,sedang,tinggi',
            'ditangani_oleh' => 'nullable|exists:users,id',
            'hasil_tindak_lanjut' => 'nullable|string',
        ]);

        $pengaduan->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Data pengaduan berhasil diupdate',
            'data' => $pengaduan
        ], 200);
    }

    // Mengupdate status pengaduan
    public function updateStatus(Request $request, $id): JsonResponse
    {
        $pengaduan = PengaduanModel::find($id);

        if (!$pengaduan) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data pengaduan tidak ditemukan',
                'data' => null
            ], 404);
        }

        $validated = $request->validate([
            'status_pengaduan' => 'required|in:baru,dalam investigasi,terverifikasi,dalam penyelidikan,selesai,ditolak',
            'ditangani_oleh' => 'nullable|exists:users,id',
            'hasil_tindak_lanjut' => 'nullable|string',
        ]);

        $updateData = [
            'status_pengaduan' => $validated['status_pengaduan'],
            'tanggal_ditangani' => now(),
        ];

        if (!empty($validated['ditangani_oleh'])) {
            $updateData['ditangani_oleh'] = $validated['ditangani_oleh'];
        }

        if (!empty($validated['hasil_tindak_lanjut'])) {
            $updateData['hasil_tindak_lanjut'] = $validated['hasil_tindak_lanjut'];
        }

        if ($validated['status_pengaduan'] === 'selesai') {
            $updateData['tanggal_selesai'] = now();
        }

        $pengaduan->update($updateData);

        return response()->json([
            'status' => 'success',
            'message' => 'Status pengaduan berhasil diupdate',
            'data' => $pengaduan
        ], 200);
    }

    // Menghapus data pengaduan
    public function destroy($id): JsonResponse
    {
        $pengaduan = PengaduanModel::find($id);

        if (!$pengaduan) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data pengaduan tidak ditemukan',
                'data' => null
            ], 404);
        }

        $pengaduan->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data pengaduan berhasil dihapus',
            'data' => null
        ], 200);
    }
}