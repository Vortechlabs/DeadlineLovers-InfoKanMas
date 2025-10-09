<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProgramIssueModel extends Model
{
    use HasFactory;

    protected $table = 'program_issues';

    protected $fillable = [
        'program_id',
        'progress_id',
        'judul_issue',
        'deskripsi_issue',
        'tingkat_keparahan',
        'status',
        'dilaporkan_oleh',
        'ditugaskan_ke',
        'tanggal_deadline',
        'tindakan',
    ];

    protected $casts = [
        'tanggal_deadline' => 'date',
    ];

    public function program(): BelongsTo
    {
        return $this->belongsTo(ProgramModel::class);
    }

    public function progress(): BelongsTo
    {
        return $this->belongsTo(ProgramProgressModel::class, 'progress_id');
    }

    public function pelapor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'dilaporkan_oleh');
    }

    public function penanggungJawab(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ditugaskan_ke');
    }

    // Scopes
    public function scopeAktif($query)
    {
        return $query->whereIn('status', ['terbuka', 'dalam_penanganan']);
    }

    public function scopeKritis($query)
    {
        return $query->where('tingkat_keparahan', 'kritis');
    }
}