<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class KabupatenSeeder extends Seeder
{
    /**
     * Jalankan seeder untuk mengisi data kabupaten Jawa Tengah.
     */
    public function run(): void
    {
        $kabupaten = [
            ['nama_kabupaten' => 'Kabupaten Banjarnegara'],
            ['nama_kabupaten' => 'Kabupaten Banyumas'],
            ['nama_kabupaten' => 'Kabupaten Batang'],
            ['nama_kabupaten' => 'Kabupaten Blora'],
            ['nama_kabupaten' => 'Kabupaten Boyolali'],
            ['nama_kabupaten' => 'Kabupaten Brebes'],
            ['nama_kabupaten' => 'Kabupaten Cilacap'],
            ['nama_kabupaten' => 'Kabupaten Demak'],
            ['nama_kabupaten' => 'Kabupaten Grobogan'],
            ['nama_kabupaten' => 'Kabupaten Jepara'],
            ['nama_kabupaten' => 'Kabupaten Karanganyar'],
            ['nama_kabupaten' => 'Kabupaten Kebumen'],
            ['nama_kabupaten' => 'Kabupaten Kendal'],
            ['nama_kabupaten' => 'Kabupaten Klaten'],
            ['nama_kabupaten' => 'Kabupaten Kudus'],
            ['nama_kabupaten' => 'Kabupaten Magelang'],
            ['nama_kabupaten' => 'Kabupaten Pati'],
            ['nama_kabupaten' => 'Kabupaten Pekalongan'],
            ['nama_kabupaten' => 'Kabupaten Pemalang'],
            ['nama_kabupaten' => 'Kabupaten Purbalingga'],
            ['nama_kabupaten' => 'Kabupaten Purworejo'],
            ['nama_kabupaten' => 'Kabupaten Rembang'],
            ['nama_kabupaten' => 'Kabupaten Semarang'],
            ['nama_kabupaten' => 'Kabupaten Sragen'],
            ['nama_kabupaten' => 'Kabupaten Sukoharjo'],
            ['nama_kabupaten' => 'Kabupaten Tegal'],
            ['nama_kabupaten' => 'Kabupaten Temanggung'],
            ['nama_kabupaten' => 'Kabupaten Wonogiri'],
            ['nama_kabupaten' => 'Kabupaten Wonosobo'],
            ['nama_kabupaten' => 'Kota Magelang'],
            ['nama_kabupaten' => 'Kota Pekalongan'],
            ['nama_kabupaten' => 'Kota Salatiga'],
            ['nama_kabupaten' => 'Kota Semarang'],
            ['nama_kabupaten' => 'Kota Surakarta'],
            ['nama_kabupaten' => 'Kota Tegal'],
        ];

        foreach ($kabupaten as &$data) {
            $data['provinsi'] = 13; // ID Provinsi Jawa Tengah
            $data['created_at'] = Carbon::now();
            $data['updated_at'] = Carbon::now();
        }

        DB::table('kabupaten')->insert($kabupaten);
    }
}
