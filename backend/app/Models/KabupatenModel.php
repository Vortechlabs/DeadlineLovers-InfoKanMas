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
        'jumlah_penduduk',
        'provinsi_id',
    ];

    
    /**
     * Relasi ke Provinsi (Many to One)
     * Banyak kabupaten berada di satu provinsi
     */
    public function provinsi()
    {
        return $this->belongsTo(ProvinsiModel::class);
    }


    public function wilayah()
    {
        return $this->hasMany(WilayahModel::class);
    }
}
