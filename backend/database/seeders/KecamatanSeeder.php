<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class KecamatanSeeder extends Seeder
{
    /**
     * Jalankan seeder untuk mengisi data kecamatan di Kabupaten Purbalingga.
     */
    public function run(): void
    {
        $kecamatan = [
            ['nama_kecamatan' => 'Kecamatan Bobotsari'],
            ['nama_kecamatan' => 'Kecamatan Bojongsari'],
            ['nama_kecamatan' => 'Kecamatan Bukateja'],
            ['nama_kecamatan' => 'Kecamatan Kaligondang'],
            ['nama_kecamatan' => 'Kecamatan Kalimanah'],
            ['nama_kecamatan' => 'Kecamatan Karanganyar'],
            ['nama_kecamatan' => 'Kecamatan Karangjambu'],
            ['nama_kecamatan' => 'Kecamatan Karangmoncol'],
            ['nama_kecamatan' => 'Kecamatan Karangreja'],
            ['nama_kecamatan' => 'Kecamatan Kertanegara'],
            ['nama_kecamatan' => 'Kecamatan Kemangkon'],
            ['nama_kecamatan' => 'Kecamatan Kejobong'],
            ['nama_kecamatan' => 'Kecamatan Kutasari'],
            ['nama_kecamatan' => 'Kecamatan Mrebet'],
            ['nama_kecamatan' => 'Kecamatan Padamara'],
            ['nama_kecamatan' => 'Kecamatan Pengadegan'],
            ['nama_kecamatan' => 'Kecamatan Purbalingga'],
            ['nama_kecamatan' => 'Kecamatan Rembang'],
        ];

        foreach ($kecamatan as &$data) {
            $data['kabupaten'] = 20;
            $data['provinsi'] = 13;
            $data['created_at'] = Carbon::now();
            $data['updated_at'] = Carbon::now();
        }

        DB::table('kecamatan')->insert($kecamatan);
    }
}
