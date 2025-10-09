<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProgramDokumenModel extends Model
{
    use HasFactory;

    protected $table = 'program_dokumen';

    protected $fillable = [
        'program_id',
        'jenis_dokumen',
        'nama_dokumen',
        'file_path',
        'file_name',
        'mime_type',
        'file_size',
        'keterangan',
    ];

    protected $casts = [
        'file_size' => 'decimal:2',
    ];

    public function program(): BelongsTo
    {
        return $this->belongsTo(ProgramModel::class);
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