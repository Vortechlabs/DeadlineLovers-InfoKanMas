<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriProgramModel extends Model
{
    use HasFactory;
    protected $table = 'kategori_program';

    protected $fillable = [
        'nama_kategori',
    ];

    public function program(){
        return $this->hasMany(ProgramModel::class);
    }
}
