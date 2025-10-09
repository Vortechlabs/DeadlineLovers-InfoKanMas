<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramModel extends Model
{
    use HasFactory;

    protected $table = 'program';

    protected $fillable = [
        'nama_program',
        'deskripsi',
        'jenis_program',
        'tingkat_pengusul',
        'alamat',
        'tahun_anggaran',
        'status_program',
        'tanggal_mulai',
        'tanggal_selesai',
        'target_penerima_manfaat',
        'created_by',
        'verified_by',
        'approved_by',
        'tanggal_verifikasi',
        'tanggal_approval',
        'catatan_verifikasi',
        'catatan_approval',
    ];

    /**
     * 🔗 Relasi ke tabel wilayah (alamat program)
     * Satu program dimiliki oleh satu wilayah
     */
    public function wilayah()
    {
        return $this->belongsTo(WilayahModel::class,'alamat');
    }

    /**
     * 👤 Relasi ke User (pembuat program)
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * 👮 Relasi ke User (verifikator kecamatan atau dinas)
     */
    public function verifier()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    /**
     * 👔 Relasi ke User (penyetuju — biasanya Bupati/Admin Kabupaten)
     */
    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
