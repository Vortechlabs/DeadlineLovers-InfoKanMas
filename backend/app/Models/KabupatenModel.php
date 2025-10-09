<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KabupatenModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_kabupaten',
        'provinsi',
    ];

    public function provinsiRel(): BelongsTo
    {
        return $this->belongsTo(ProvinsiModel::class, 'provinsi');
    }

    public function kecamatans(): HasMany
    {
        return $this->hasMany(KecamatanModel::class, 'kabupaten');
    }
}