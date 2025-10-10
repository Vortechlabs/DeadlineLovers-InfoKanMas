<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WilayahModel extends Model
{
    use HasFactory;

    protected $table = 'wilayah';

    protected $fillable = [
        'kode_wilayah',
        'nama_wilayah',
        'tingkat',
        'parent_id',
        'polygon',
    ];

    // Relationships
    public function parent(): BelongsTo
    {
        return $this->belongsTo(WilayahModel::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(WilayahModel::class, 'parent_id');
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'alamat_lengkap');
    }

    public function programs(): HasMany
    {
        return $this->hasMany(ProgramModel::class, 'wilayah_id');
    }

     public function pengaduan()
    {
        return $this->hasMany(PengaduanModel::class, 'lokasi_kejadian');
    }

    // Scopes
    public function scopeProvinsi($query)
    {
        return $query->where('tingkat', 'provinsi');
    }

    public function scopeKabupaten($query)
    {
        return $query->where('tingkat', 'kabupaten');
    }

    public function scopeKecamatan($query)
    {
        return $query->where('tingkat', 'kecamatan');
    }

    public function scopeDesa($query)
    {
        return $query->where('tingkat', 'desa');
    }

    public function scopeDusun($query)
    {
        return $query->where('tingkat', 'dusun');
    }

    // Methods
    public function getHierarchyAttribute(): string
    {
        $hierarchy = [];
        $current = $this;
        
        while ($current) {
            $hierarchy[] = $current->nama_wilayah;
            $current = $current->parent;
        }
        
        return implode(' → ', array_reverse($hierarchy));
    }
}