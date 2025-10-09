<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KategoriProgramSeeder extends Seeder
{
    public function run(): void
    {
        $kategori = [
            [
                'nama_kategori' => 'infrastruktur',
                'deskripsi' => 'Program pembangunan infrastruktur desa',
                'icon' => '🏗️',
                'warna' => 'blue',
            ],
            [
                'nama_kategori' => 'bansos',
                'deskripsi' => 'Bantuan sosial untuk masyarakat',
                'icon' => '📦',
                'warna' => 'green',
            ],
            [
                'nama_kategori' => 'pendidikan',
                'deskripsi' => 'Program bidang pendidikan',
                'icon' => '📚',
                'warna' => 'purple',
            ],
            [
                'nama_kategori' => 'ekonomi',
                'deskripsi' => 'Program pengembangan ekonomi',
                'icon' => '💼',
                'warna' => 'orange',
            ],
            [
                'nama_kategori' => 'kesehatan',
                'deskripsi' => 'Program bidang kesehatan',
                'icon' => '🏥',
                'warna' => 'red',
            ],
            [
                'nama_kategori' => 'lingkungan',
                'deskripsi' => 'Program pelestarian lingkungan',
                'icon' => '🌳',
                'warna' => 'teal',
            ],
        ];

        foreach ($kategori as $data) {
            DB::table('kategori_program')->insert($data);
        }

        $this->command->info('Kategori program seeded successfully!');
    }
}