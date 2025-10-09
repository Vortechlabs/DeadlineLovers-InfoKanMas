<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProgramTahapanModel extends Model
{
    use HasFactory;

    protected $table = 'program_tahapan';

    protected $fillable = [
        'program_id',
        'nama_tahapan',
        'deskripsi',
        'persentase',
        'tanggal_mulai_rencana',
        'tanggal_selesai_rencana',
        'tanggal_mulai_aktual',
        'tanggal_selesai_aktual',
        'status',
        'urutan',
    ];

    protected $casts = [
        'tanggal_mulai_rencana' => 'date',
        'tanggal_selesai_rencana' => 'date',
        'tanggal_mulai_aktual' => 'date',
        'tanggal_selesai_aktual' => 'date',
    ];

    public function program(): BelongsTo
    {
        return $this->belongsTo(ProgramModel::class);
    }

    public function progress(): HasMany
    {
        return $this->hasMany(ProgramProgressModel::class, 'tahapan_id');
    }

    // Scopes
    public function scopeAktif($query)
    {
        return $query->where('status', 'dalam_pengerjaan');
    }

    public function scopeSelesai($query)
    {
        return $query->where('status', 'selesai');
    }
}