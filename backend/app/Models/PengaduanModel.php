<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PengaduanModel extends Model
{
    use HasFactory;

    protected $table = 'pengaduan';

    protected $fillable = [
        'kode_pengaduan',
        'program_id',
        'pelapor',
        'kategori_pengaduan',
        'judul_pengaduan',
        'deskripsi_pengaduan',
        'bukti_pendukung',
        'lokasi_kejadian',
        'tanggal_kejadian',
        'status_pengaduan',
        'prioritas',
        'ditangani_oleh',
        'tanggal_ditangani',
        'hasil_tindak_lanjut',
        'tanggal_selesai',
    ];

    protected $casts = [
        'bukti_pendukung' => 'array',
        'tanggal_kejadian' => 'date',
        'tanggal_ditangani' => 'datetime',
        'tanggal_selesai' => 'datetime',
    ];

    // ===============================
    // 🔗 RELASI
    // ===============================

    /**
     * Relasi ke tabel Program
     */
    public function program()
    {
        return $this->belongsTo(ProgramModel::class, 'program_id');
    }

    /**
     * Relasi ke User yang membuat pengaduan
     */
    public function pelapor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Relasi ke User yang menangani pengaduan
     */
    public function petugas()
    {
        return $this->belongsTo(User::class, 'ditangani_oleh');
    }

    /**
     * Relasi ke tabel wilayah
     */
    public function lokasi()
    {
        return $this->belongsTo(WilayahModel::class, 'lokasi_kejadian');
    }
}
