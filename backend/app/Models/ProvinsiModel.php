<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProvinsiModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_provinsi',
    ];

    public function kabupatens(): HasMany
    {
        return $this->hasMany(KabupatenModel::class, 'provinsi');
    }
}