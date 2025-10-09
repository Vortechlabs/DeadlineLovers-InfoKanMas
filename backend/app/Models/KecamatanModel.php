<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KecamatanModel extends Model
{
    use HasFactory;

    protected $table = 'kecamatan';

    protected $fillable = [
        'nama_kecamatan',
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

    public function kabupaten()
    {
        return $this->belongsTo(KabupatenModel::class);
    }

    public function provinsi()
    {
        return $this->belongsTo(KabupatenModel::class);
    }
}
