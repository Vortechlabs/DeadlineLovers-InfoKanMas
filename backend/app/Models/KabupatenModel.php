<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KabupatenModel extends Model
{
    use HasFactory;

    protected $table = 'kabupaten';

    protected $fillable = [
        'nama_kabupaten',
        'provinsi', // foreign key
    ];

    /**
     * 🔗 Relasi ke Provinsi
     * Setiap kabupaten berada di satu provinsi
     */
    public function provinsi()
    {
        return $this->belongsTo(ProvinsiModel::class);
    }

    /**
     * 🔗 Relasi ke Kecamatan
     * Satu kabupaten memiliki banyak kecamatan
     */
    public function wilayah()
    {
        return $this->hasMany(WilayahModel::class);
    }
}
