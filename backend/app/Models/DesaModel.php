<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DesaModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_desa',
        'kecamatan',
        'kabupaten',
        'provinsi',
    ];

    public function kecamatanRel(): BelongsTo
    {
        return $this->belongsTo(KecamatanModel::class, 'kecamatan');
    }

    public function kabupatenRel(): BelongsTo
    {
        return $this->belongsTo(KabupatenModel::class, 'kabupaten');
    }

    public function provinsiRel(): BelongsTo
    {
        return $this->belongsTo(ProvinsiModel::class, 'provinsi');
    }
}