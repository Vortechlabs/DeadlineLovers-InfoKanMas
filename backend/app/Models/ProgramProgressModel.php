<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProgramProgressModel extends Model
{
    use HasFactory;

    protected $table = 'program_progress';

    protected $fillable = [
        'program_id',
        'tahapan_id',
        'persentase',
        'deskripsi_progress',
        'anggaran_terpakai',
        'dilaporkan_oleh',
        'status_verifikasi',
        'divalidasi_oleh',
        'catatan_validasi',
        'tanggal_validasi',
        'metadata_ai',
    ];

    protected $casts = [
        'anggaran_terpakai' => 'decimal:2',
        'tanggal_validasi' => 'datetime',
        'metadata_ai' => 'array',
    ];

    public function program(): BelongsTo
    {
        return $this->belongsTo(ProgramModel::class);
    }

    public function tahapan(): BelongsTo
    {
        return $this->belongsTo(ProgramTahapanModel::class, 'tahapan_id');
    }

    public function pelapor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'dilaporkan_oleh');
    }

    public function validator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'divalidasi_oleh');
    }

    public function dokumentasi(): HasMany
    {
        return $this->hasMany(ProgramDokumentasiModel::class, 'progress_id');
    }

    // Scopes
    public function scopeTerverifikasi($query)
    {
        return $query->where('status_verifikasi', 'diverifikasi');
    }

    public function scopeMenungguVerifikasi($query)
    {
        return $query->where('status_verifikasi', 'menunggu');
    }
}