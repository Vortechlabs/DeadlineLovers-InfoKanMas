<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WilayahSeeder extends Seeder
{
    public function run(): void
    {
        // Nonaktifkan foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        // Truncate tabel wilayah
        DB::table('wilayah')->truncate();
        
        // Aktifkan kembali foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $wilayah = [
            // ==================== PROVINSI ====================
            [
                'kode_wilayah' => '33',
                'nama_wilayah' => 'Jawa Tengah',
                'tingkat' => 'provinsi',
                'parent_id' => null,
                'polygon' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // ==================== KABUPATEN ====================
            [
                'kode_wilayah' => '33.03',
                'nama_wilayah' => 'Kabupaten Purbalingga',
                'tingkat' => 'kabupaten',
                'parent_id' => 1, // Jawa Tengah
                'polygon' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // ==================== KECAMATAN ====================
            [
                'kode_wilayah' => '33.03.01',
                'nama_wilayah' => 'Kecamatan Kalimanah',
                'tingkat' => 'kecamatan',
                'parent_id' => 2, // Kabupaten Purbalingga
                'polygon' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_wilayah' => '33.03.02',
                'nama_wilayah' => 'Kecamatan Kutasari',
                'tingkat' => 'kecamatan',
                'parent_id' => 2, // Kabupaten Purbalingga
                'polygon' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_wilayah' => '33.03.03',
                'nama_wilayah' => 'Kecamatan Mrebet',
                'tingkat' => 'kecamatan',
                'parent_id' => 2, // Kabupaten Purbalingga
                'polygon' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // ==================== DESA ====================
            // Desa di Kecamatan Kalimanah
            [
                'kode_wilayah' => '33.03.01.2001',
                'nama_wilayah' => 'Desa Kalimanah Kulon',
                'tingkat' => 'desa',
                'parent_id' => 3, // Kecamatan Kalimanah
                'polygon' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_wilayah' => '33.03.01.2002',
                'nama_wilayah' => 'Desa Kalimanah Wetan',
                'tingkat' => 'desa',
                'parent_id' => 3, // Kecamatan Kalimanah
                'polygon' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_wilayah' => '33.03.01.2003',
                'nama_wilayah' => 'Desa Karangmanyar',
                'tingkat' => 'desa',
                'parent_id' => 3, // Kecamatan Kalimanah
                'polygon' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // ==================== DUSUN ====================
            // Dusun di Desa Kalimanah Kulon
            [
                'kode_wilayah' => '33.03.01.2001.001',
                'nama_wilayah' => 'Dusun Krajan',
                'tingkat' => 'dusun',
                'parent_id' => 6, // Desa Kalimanah Kulon
                'polygon' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_wilayah' => '33.03.01.2001.002',
                'nama_wilayah' => 'Dusun Kaliputih',
                'tingkat' => 'dusun',
                'parent_id' => 6, // Desa Kalimanah Kulon
                'polygon' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Dusun di Desa Kalimanah Wetan
            [
                'kode_wilayah' => '33.03.01.2002.001',
                'nama_wilayah' => 'Dusun Tengah',
                'tingkat' => 'dusun',
                'parent_id' => 7, // Desa Kalimanah Wetan
                'polygon' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_wilayah' => '33.03.01.2002.002',
                'nama_wilayah' => 'Dusun Wetan',
                'tingkat' => 'dusun',
                'parent_id' => 7, // Desa Kalimanah Wetan
                'polygon' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('wilayah')->insert($wilayah);

        $this->command->info('Wilayah Purbalingga seeded successfully!');
        $this->command->info('Total: ' . count($wilayah) . ' wilayah entries');
    }
}