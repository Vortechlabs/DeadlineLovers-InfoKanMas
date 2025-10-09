<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'nama',
        'email',
        'telepon',
        'umur',
        'rt',
        'rw',
        'alamat_lengkap',
        'role',
        'email_verified_at',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * 🔗 Relasi ke tabel wilayah
     * Setiap user punya satu alamat lengkap (FK ke tabel wilayah)
     */
    public function wilayah()
    {
        return $this->belongsTo(WilayahModel::class, 'alamat_lengkap');
    }

    public function program()
    {
        return $this->hasMany(ProgramModel::class);
    }

    /**
     * 🔐 Fungsi Role Check
     */
    public function isAdminKabupaten()
    {
        return $this->role === 'admin_kabupaten';
    }

    public function isAdminKecamatan()
    {
        return $this->role === 'admin_kecamatan';
    }

    public function isAdminDesa()
    {
        return $this->role === 'admin_desa';
    }

    public function isAdminDinas()
    {
        return $this->role === 'admin_dinas';
    }

    public function isUser()
    {
        return $this->role === 'user';
    }
}
