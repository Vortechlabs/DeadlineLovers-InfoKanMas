<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramDokumenModel extends Model
{
    use HasFactory;

    protected $table = 'program_dokumen';
    protected $primaryKey = 'id';

    protected $fillable = [
        'program_id',
        'jenis_dokumen', 
        'nama_dokumen',
        'file_path',
        'file_name', 
        'mime_type',
        'file_size',
        'keterangan',
        'status_verifikasi_ai',
        'tahapan_generated',
        'catatan_ai',
        'resiko_kecurangan',
        'presentase_kecurangan', 
        'skor_ai',
        'processed_at'
    ];

    protected $casts = [
        'tahapan_generated' => 'array',
        'file_size' => 'decimal:2',
        'presentase_kecurangan' => 'decimal:2',
        'processed_at' => 'datetime'
    ];

    // Relasi ke Program
    public function program()
    {
        return $this->belongsTo(ProgramModel::class, 'program_id');
    }

    // Scope untuk dokumen rundown
    public function scopeRundown($query)
    {
        return $query->where('jenis_dokumen', 'rundown_tahapan');
    }

    // Scope untuk dokumen yang perlu diproses AI
    public function scopeNeedAiProcessing($query)
    {
        return $query->where('jenis_dokumen', 'rundown_tahapan')
                    ->where('status_verifikasi_ai', 'pending');
    }

    // Methods
    public function getFileUrlAttribute(): string
    {
        return asset('storage/' . $this->file_path);
    }

    public function isPdf(): bool
    {
        return $this->mime_type === 'application/pdf';
    }
}