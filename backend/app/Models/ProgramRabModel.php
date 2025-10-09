<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProgramRabModel extends Model
{
    use HasFactory;

    protected $table = 'program_rab';

    protected $fillable = [
        'program_id',
        'nama_item',
        'deskripsi',
        'volume',
        'satuan',
        'harga_satuan',
        'total',
        'urutan',
    ];

    protected $casts = [
        'volume' => 'decimal:2',
        'harga_satuan' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    public function program(): BelongsTo
    {
        return $this->belongsTo(ProgramModel::class);
    }
}