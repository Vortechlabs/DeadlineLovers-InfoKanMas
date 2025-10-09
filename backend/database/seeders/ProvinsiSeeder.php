<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProvinsiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $provinsi = [
            ['id' => 1, 'nama_provinsi' => 'Aceh'],
            ['id' => 2, 'nama_provinsi' => 'Sumatera Utara'],
            ['id' => 3, 'nama_provinsi' => 'Sumatera Barat'],
            ['id' => 4, 'nama_provinsi' => 'Riau'],
            ['id' => 5, 'nama_provinsi' => 'Jambi'],
            ['id' => 6, 'nama_provinsi' => 'Sumatera Selatan'],
            ['id' => 7, 'nama_provinsi' => 'Bengkulu'],
            ['id' => 8, 'nama_provinsi' => 'Lampung'],
            ['id' => 9, 'nama_provinsi' => 'Kepulauan Bangka Belitung'],
            ['id' => 10, 'nama_provinsi' => 'Kepulauan Riau'],
            ['id' => 11, 'nama_provinsi' => 'DKI Jakarta'],
            ['id' => 12, 'nama_provinsi' => 'Jawa Barat'],
            ['id' => 13, 'nama_provinsi' => 'Jawa Tengah'],
            ['id' => 14, 'nama_provinsi' => 'DI Yogyakarta'],
            ['id' => 15, 'nama_provinsi' => 'Jawa Timur'],
            ['id' => 16, 'nama_provinsi' => 'Banten'],
            ['id' => 17, 'nama_provinsi' => 'Bali'],
            ['id' => 18, 'nama_provinsi' => 'Nusa Tenggara Barat'],
            ['id' => 19, 'nama_provinsi' => 'Nusa Tenggara Timur'],
            ['id' => 20, 'nama_provinsi' => 'Kalimantan Barat'],
            ['id' => 21, 'nama_provinsi' => 'Kalimantan Tengah'],
            ['id' => 22, 'nama_provinsi' => 'Kalimantan Selatan'],
            ['id' => 23, 'nama_provinsi' => 'Kalimantan Timur'],
            ['id' => 24, 'nama_provinsi' => 'Kalimantan Utara'],
            ['id' => 25, 'nama_provinsi' => 'Sulawesi Utara'],
            ['id' => 26, 'nama_provinsi' => 'Sulawesi Tengah'],
            ['id' => 27, 'nama_provinsi' => 'Sulawesi Selatan'],
            ['id' => 28, 'nama_provinsi' => 'Sulawesi Tenggara'],
            ['id' => 29, 'nama_provinsi' => 'Gorontalo'],
            ['id' => 30, 'nama_provinsi' => 'Sulawesi Barat'],
            ['id' => 31, 'nama_provinsi' => 'Maluku'],
            ['id' => 32, 'nama_provinsi' => 'Maluku Utara'],
            ['id' => 33, 'nama_provinsi' => 'Papua'],
            ['id' => 34, 'nama_provinsi' => 'Papua Barat'],
            ['id' => 35, 'nama_provinsi' => 'Papua Selatan'],
            ['id' => 36, 'nama_provinsi' => 'Papua Tengah'],
            ['id' => 37, 'nama_provinsi' => 'Papua Pegunungan'],
            ['id' => 38, 'nama_provinsi' => 'Papua Barat Daya'],
        ];

        DB::table('provinsi')->insert($provinsi);
    }
}
