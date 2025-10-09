<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KategoriProgramModel extends Model
{
    use HasFactory;

    protected $table = 'kategori_program';

    protected $fillable = [
        'nama_kategori',
        'deskripsi',
        'icon',
        'warna',
    ];

    public function programs(): HasMany
    {
        return $this->hasMany(ProgramModel::class, 'kategori_program_id');
    }

    // Methods
    public function getTotalProgramAttribute(): int
    {
        return $this->programs()->count();
    }

    public function getTotalAnggaranAttribute(): float
    {
        return $this->programs()->sum('anggaran_total');
    }
}