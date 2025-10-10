<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProgramDokumentasiModel extends Model
{
    use HasFactory;

    protected $table = 'program_dokumentasi';

    protected $fillable = [
        'progress_id',
        'jenis',
        'file_path',
        'file_name',
        'mime_type',
        'file_size',
        'latitude',
        'longitude',
        'waktu_pengambilan',
        'metadata_ai',
        'is_verified_ai',
        'keterangan',
    ];

    protected $casts = [
        'file_size' => 'decimal:2',
        'waktu_pengambilan' => 'datetime',
        'metadata_ai' => 'array',
        'is_verified_ai' => 'boolean',
    ];

    public function progress(): BelongsTo
    {
        return $this->belongsTo(ProgramProgressModel::class, 'progress_id');
    }

    // Methods
    public function getFileUrlAttribute(): string
    {
        return asset('storage/' . $this->file_path);
    }

    public function isImage(): bool
    {
        return in_array($this->mime_type, ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']);
    }

    public function isVideo(): bool
    {
        return strpos($this->mime_type, 'video/') === 0;
    }
}