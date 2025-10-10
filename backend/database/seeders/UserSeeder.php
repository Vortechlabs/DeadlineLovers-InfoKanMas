<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Nonaktifkan foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        // Truncate tabel users
        DB::table('users')->truncate();
        
        // Aktifkan kembali foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $users = [
            // ==================== ADMIN DINAS ====================
            [
                'nama' => 'Admin Dinas Purbalingga',
                'email' => 'dinas@purbalingga.id',
                'telepon' => '081234567801',
                'umur' => 45,
                'nik' => '3301014500010001',
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
                'nik' => '3301014200020002',
                'rt' => '001',
                'rw' => '001',
                'alamat_lengkap' => 2,
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
                'nik' => '3301013800030003',
                'rt' => '001',
                'rw' => '001',
                'alamat_lengkap' => 3,
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
                'nik' => '3301013900040004',
                'rt' => '001',
                'rw' => '001',
                'alamat_lengkap' => 4,
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
                'nik' => '3301014800050005',
                'rt' => '001',
                'rw' => '001',
                'alamat_lengkap' => 6,
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
                'nik' => '3301014200060006',
                'rt' => '002',
                'rw' => '001',
                'alamat_lengkap' => 7,
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
                'nik' => '3301013500070007',
                'rt' => '001',
                'rw' => '001',
                'alamat_lengkap' => 8,
                'role' => 'user',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Siti Rahayu',
                'email' => '     ',
                'telepon' => '081234567808',
                'umur' => 28,
                'nik' => '3301012800080008',
                'rt' => '002',
                'rw' => '001',
                'alamat_lengkap' => 9,
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
                'nik' => '3301013200090009',
                'rt' => '001',
                'rw' => '001',
                'alamat_lengkap' => 10,
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
