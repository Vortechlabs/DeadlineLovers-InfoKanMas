<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DesaModel extends Model
{
    use HasFactory;

    protected $table = 'desa';

    protected $fillable = [
        'nama_desa',
        'kecamatan',
        'kabupaten',
        'provinsi',
    ];

    
    /**
     * Relasi ke Provinsi (Many to One)
     * Banyak kabupaten berada di satu provinsi
     */


    public function wilayah()
    {
        return $this->hasMany(WilayahModel::class);
    }

    public function kecamatan(){
        return $this->belongsTo(KecamatanModel::class);
    }

    public function kabupaten()
    {
        return $this->belongsTo(KabupatenModel::class);
    }

    public function provinsi()
    {
        return $this->belongsTo(KabupatenModel::class);
    }
}
