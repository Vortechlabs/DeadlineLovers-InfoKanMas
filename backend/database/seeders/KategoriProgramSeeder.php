<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KategoriProgramSeeder extends Seeder
{
    public function run(): void
    {
        // Nonaktifkan foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        // Truncate tabel
        DB::table('kategori_program')->truncate();
        
        // Aktifkan kembali foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $kategori = [
            [
                'nama_kategori' => 'infrastruktur',
                'deskripsi' => 'Program pembangunan infrastruktur desa',
                'icon' => '🏗️',
                'warna' => 'blue',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_kategori' => 'bansos',
                'deskripsi' => 'Bantuan sosial untuk masyarakat',
                'icon' => '📦',
                'warna' => 'green',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_kategori' => 'pendidikan',
                'deskripsi' => 'Program bidang pendidikan',
                'icon' => '📚',
                'warna' => 'purple',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_kategori' => 'ekonomi',
                'deskripsi' => 'Program pengembangan ekonomi',
                'icon' => '💼',
                'warna' => 'orange',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_kategori' => 'kesehatan',
                'deskripsi' => 'Program bidang kesehatan',
                'icon' => '🏥',
                'warna' => 'red',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('kategori_program')->insert($kategori);

        $this->command->info('Kategori program seeded successfully!');
    }
}