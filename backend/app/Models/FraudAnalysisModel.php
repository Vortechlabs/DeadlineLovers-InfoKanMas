<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FraudAnalysisModel extends Model
{
    use HasFactory;

    protected $table = 'fraud_analysis';
    
    protected $fillable = [
        'program_id',
        'dokumen_id',
        'jenis_analisis',
        'jenis_dokumen',
        'hasil_analisis',
        'skor_risiko',
        'level_risiko',
        'rekomendasi',
        'flag_meragukan',
        'item_mencurigakan',
        'status',
        'processed_at'
    ];

    protected $casts = [
        'hasil_analisis' => 'array',
        'rekomendasi' => 'array',
        'item_mencurigakan' => 'array',
        'flag_meragukan' => 'boolean',
        'processed_at' => 'datetime'
    ];

    // Relasi dengan program
    public function program()
    {
        return $this->belongsTo(ProgramModel::class, 'program_id');
    }

    // Relasi dengan dokumen
    public function dokumen()
    {
        return $this->belongsTo(ProgramDokumenModel::class, 'dokumen_id');
    }

    // Scope untuk analisis berisiko tinggi
    public function scopeHighRisk($query)
    {
        return $query->where('level_risiko', 'high')->orWhere('level_risiko', 'critical');
    }

    // Scope untuk analisis yang mencurigakan
    public function scopeSuspicious($query)
    {
        return $query->where('flag_meragukan', true);
    }
}