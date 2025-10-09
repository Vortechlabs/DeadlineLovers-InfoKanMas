<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WilayahModel extends Model
{
    use HasFactory;

    protected $table = 'wilayah';

    protected $fillable = [
        'desa',
        'kecamatan',
        'kabupaten',
        'provinsi',
    ];

    /**
     * 🔗 Relasi ke tabel desa
     * Satu wilayah berelasi dengan satu desa
     */
    public function desa()
    {
        return $this->belongsTo(DesaModel::class);
    }

    /**
     * 🔗 Relasi ke tabel kecamatan
     * Satu wilayah berelasi dengan satu kecamatan
     */
    public function kecamatan()
    {
        return $this->belongsTo(KecamatanModel::class);
    }

    /**
     * 🔗 Relasi ke tabel kabupaten
     * Satu wilayah berelasi dengan satu kabupaten
     */
    public function kabupaten()
    {
        return $this->belongsTo(KabupatenModel::class);
    }

    /**
     * 🔗 Relasi ke tabel provinsi
     * Satu wilayah berelasi dengan satu provinsi
     */
    public function provinsi()
    {
        return $this->belongsTo(ProvinsiModel::class);
    }

    /**
     * 🔗 Relasi ke tabel users
     * Banyak pengguna bisa berada di satu wilayah
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function program()
    {
        return $this->hasMany(ProgramModel::class);
    }
}
