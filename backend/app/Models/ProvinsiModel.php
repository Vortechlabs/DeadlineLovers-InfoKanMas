<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProvinsiModel extends Model
{
    use HasFactory;

    protected $table = 'provinsi';

    protected $fillable = [
        'nama_provinsi',
        'kode_provinsi',
    ];

      public function kabupaten()
    {
        return $this->hasMany(KabupatenModel::class);
    }

    // Relasi ke Wilayah
    public function wilayah()
    {
        return $this->hasMany(WilayahModel::class);
    }

}
