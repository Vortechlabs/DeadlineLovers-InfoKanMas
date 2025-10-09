<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->truncate();

        $users = [
            // ==================== ADMIN DINAS ====================
            [
                'nama' => 'Admin Dinas Purbalingga',
                'email' => 'dinas@purbalingga.id',
                'telepon' => '081234567801',
                'umur' => 45,
                'rt' => '001',
                'rw' => '001',
                'alamat_lengkap' => 2, // Kabupaten Purbalingga
                'role' => 'admin_dinas',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // ==================== ADMIN KABUPATEN ====================
            [
                'nama' => 'Admin Kabupaten Purbalingga',
                'email' => 'kabupaten@purbalingga.id',
                'telepon' => '081234567802',
                'umur' => 42,
                'rt' => '001',
                'rw' => '001',
                'alamat_lengkap' => 2, // Kabupaten Purbalingga
                'role' => 'admin_kabupaten',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // ==================== ADMIN KECAMATAN ====================
            [
                'nama' => 'Admin Kecamatan Kalimanah',
                'email' => 'kalimanah@purbalingga.id',
                'telepon' => '081234567803',
                'umur' => 38,
                'rt' => '001',
                'rw' => '001',
                'alamat_lengkap' => 3, // Kecamatan Kalimanah
                'role' => 'admin_kecamatan',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Admin Kecamatan Kutasari',
                'email' => 'kutasari@purbalingga.id',
                'telepon' => '081234567804',
                'umur' => 39,
                'rt' => '001',
                'rw' => '001',
                'alamat_lengkap' => 4, // Kecamatan Kutasari
                'role' => 'admin_kecamatan',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // ==================== ADMIN DESA ====================
            [
                'nama' => 'Kepala Desa Kalimanah Kulon',
                'email' => 'kalimanahkulon@desa.id',
                'telepon' => '081234567805',
                'umur' => 48,
                'rt' => '001',
                'rw' => '001',
                'alamat_lengkap' => 8, // Desa Kalimanah Kulon
                'role' => 'admin_desa',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Sekretaris Desa Kalimanah Wetan',
                'email' => 'kalimanahwetan@desa.id',
                'telepon' => '081234567806',
                'umur' => 42,
                'rt' => '002',
                'rw' => '001',
                'alamat_lengkap' => 9, // Desa Kalimanah Wetan
                'role' => 'admin_desa',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // ==================== MASYARAKAT ====================
            [
                'nama' => 'Budi Santoso',
                'email' => 'budi@example.com',
                'telepon' => '081234567807',
                'umur' => 35,
                'rt' => '001',
                'rw' => '001',
                'alamat_lengkap' => 19, // Dusun Krajan, Kalimanah Kulon
                'role' => 'user',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Siti Rahayu',
                'email' => 'siti@example.com',
                'telepon' => '081234567808',
                'umur' => 28,
                'rt' => '002',
                'rw' => '001',
                'alamat_lengkap' => 20, // Dusun Kaliputih, Kalimanah Kulon
                'role' => 'user',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Ahmad Fauzi',
                'email' => 'ahmad@example.com',
                'telepon' => '081234567809',
                'umur' => 32,
                'rt' => '001',
                'rw' => '001',
                'alamat_lengkap' => 21, // Dusun Tengah, Kalimanah Wetan
                'role' => 'user',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('users')->insert($users);

        $this->command->info('Users Purbalingga seeded successfully!');
        $this->command->info('Total: ' . count($users) . ' users');
        $this->command->info('Default password: password123');
    }
}