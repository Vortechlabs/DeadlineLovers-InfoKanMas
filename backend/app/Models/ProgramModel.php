<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProgramModel extends Model
{
    use HasFactory;

    protected $table = 'program';

    protected $fillable = [
        'kode_program',
        'nama_program',
        'deskripsi',
        'kategori_program_id',
        'jenis_program',
        'tingkat_pengusul',
        'wilayah_id',
        'tahun_anggaran',
        'status_program',
        'prioritas',
        'tanggal_mulai',
        'tanggal_selesai',
        'target_penerima_manfaat',
        'anggaran_total',
        'realisasi_anggaran',
        'penanggung_jawab_id',
        'created_by',
        'verified_by',
        'approved_by',
        'tanggal_verifikasi',
        'tanggal_approval',
        'catatan_verifikasi',
        'catatan_approval',
    ];

    protected $casts = [
        'tanggal_mulai' => 'date',
        'tanggal_selesai' => 'date',
        'tanggal_verifikasi' => 'datetime',
        'tanggal_approval' => 'datetime',
        'anggaran_total' => 'decimal:2',
        'realisasi_anggaran' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($program) {
            if (empty($program->kode_program)) {
                $program->kode_program = self::generateKodeProgram();
            }
        });
    }

    public static function generateKodeProgram()
    {
        $date = now()->format('YmdHis');
        $random = rand(100, 999);
        return "PRG-{$date}{$random}";
    }

    // Relationships
    public function kategori(): BelongsTo
    {
        return $this->belongsTo(KategoriProgramModel::class, 'kategori_program_id');
    }

    public function wilayah(): BelongsTo
    {
        return $this->belongsTo(WilayahModel::class);
    }

    public function penanggungJawab(): BelongsTo
    {
        return $this->belongsTo(User::class, 'penanggung_jawab_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function rabItems(): HasMany
    {
        return $this->hasMany(ProgramRabModel::class, 'program_id');
    }

    public function tahapan(): HasMany
    {
        return $this->hasMany(ProgramTahapanModel::class, 'program_id');
    }

    public function progress(): HasMany
    {
        return $this->hasMany(ProgramProgressModel::class, 'program_id');
    }

    public function issues(): HasMany
    {
        return $this->hasMany(ProgramIssueModel::class, 'program_id');
    }

    public function dokumen(): HasMany
    {
        return $this->hasMany(ProgramDokumenModel::class, 'program_id');
    }

    // Scopes
    public function scopeBerjalan($query)
    {
        return $query->where('status_program', 'berjalan');
    }

    public function scopeSelesai($query)
    {
        return $query->where('status_program', 'selesai');
    }

    public function scopeDalamPengajuan($query)
    {
        return $query->whereIn('status_program', ['draft', 'diajukan', 'diverifikasi_kecamatan']);
    }

    // Methods
    public function getProgressPercentageAttribute(): float
    {
        $totalTahapan = $this->tahapan()->count();
        if ($totalTahapan === 0)
            return 0;

        $totalPersentase = $this->tahapan()->sum('persentase');
        $completedPersentase = $this->tahapan()->where('status', 'selesai')->sum('persentase');

        return $totalPersentase > 0 ? ($completedPersentase / $totalPersentase) * 100 : 0;
    }
}