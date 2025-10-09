<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KecamatanModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_kecamatan',
        'kabupaten',
    ];

    public function kabupatenRel(): BelongsTo
    {
        return $this->belongsTo(KabupatenModel::class, 'kabupaten');
    }

    public function desas(): HasMany
    {
        return $this->hasMany(DesaModel::class, 'kecamatan');
    }
}