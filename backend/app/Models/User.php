<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'nama',
        'email',
        'telepon',
        'umur',
        'rt',
        'rw',
        'alamat_lengkap',
        'role',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relationships
    public function alamat(): BelongsTo
    {
        return $this->belongsTo(WilayahModel::class, 'alamat_lengkap');
    }

    public function programsCreated(): HasMany
    {
        return $this->hasMany(ProgramModel::class, 'created_by');
    }

    public function programsPenanggungJawab(): HasMany
    {
        return $this->hasMany(ProgramModel::class, 'penanggung_jawab_id');
    }

    public function progressReports(): HasMany
    {
        return $this->hasMany(ProgramProgressModel::class, 'dilaporkan_oleh');
    }

    public function issuesReported(): HasMany
    {
        return $this->hasMany(ProgramIssueModel::class, 'dilaporkan_oleh');
    }

    public function issuesAssigned(): HasMany
    {
        return $this->hasMany(ProgramIssueModel::class, 'ditugaskan_ke');
    }

    public function pengaduanDibuat()
    {
        return $this->hasMany(PengaduanModel::class, 'pelapor');
    }

    public function pengaduanDitangani()
    {
        return $this->hasMany(PengaduanModel::class, 'ditangani_oleh');
    }

    // Scopes
    public function scopeAdminDesa($query)
    {
        return $query->where('role', 'admin_desa');
    }

    public function scopeAdminKecamatan($query)
    {
        return $query->where('role', 'admin_kecamatan');
    }

    public function scopeAdminKabupaten($query)
    {
        return $query->where('role', 'admin_kabupaten');
    }

    public function scopeAdminDinas($query)
    {
        return $query->where('role', 'admin_dinas');
    }

    public function scopeMasyarakat($query)
    {
        return $query->where('role', 'user');
    }

    // Methods
    public function isAdmin(): bool
    {
        return in_array($this->role, ['admin_desa', 'admin_kecamatan', 'admin_kabupaten', 'admin_dinas']);
    }

    public function canVerifyPrograms(): bool
    {
        return in_array($this->role, ['admin_kecamatan', 'admin_kabupaten', 'admin_dinas']);
    }

    public function canApprovePrograms(): bool
    {
        return in_array($this->role, ['admin_kabupaten', 'admin_dinas']);
    }

    // public function getAlamatLengkapAttribute(): string
    // {
    //     if (!$this->alamat) return '';

    //     $hierarchy = [];
    //     $current = $this->alamat;
        
    //     while ($current) {
    //         $hierarchy[] = $current->nama_wilayah;
    //         $current = $current->parent;
    //     }
        
    //     return implode(', ', array_reverse($hierarchy)) . " RT {$this->rt}/RW {$this->rw}";
    // }
}