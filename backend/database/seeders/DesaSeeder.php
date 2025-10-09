<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DesaSeeder extends Seeder
{
    public function run(): void
    {
        $desa = [

            // 🌄 1. Kecamatan Bobotsari
            ['nama_desa' => 'Bobotsari', 'kecamatan' => 1],
            ['nama_desa' => 'Gunungkarang', 'kecamatan' => 1],
            ['nama_desa' => 'Talagening', 'kecamatan' => 1],
            ['nama_desa' => 'Karangduren', 'kecamatan' => 1],
            ['nama_desa' => 'Pakuncen', 'kecamatan' => 1],
            ['nama_desa' => 'Limbasari', 'kecamatan' => 1],
            ['nama_desa' => 'Karangtalun', 'kecamatan' => 1],
            ['nama_desa' => 'Karanggedang', 'kecamatan' => 1],
            ['nama_desa' => 'Tegalpingen', 'kecamatan' => 1],
            ['nama_desa' => 'Majapura', 'kecamatan' => 1],
            ['nama_desa' => 'Palumbungan', 'kecamatan' => 1],

            // 🌳 2. Kecamatan Bojongsari
            ['nama_desa' => 'Bojongsari', 'kecamatan' => 2],
            ['nama_desa' => 'Galuh', 'kecamatan' => 2],
            ['nama_desa' => 'Metenggeng', 'kecamatan' => 2],
            ['nama_desa' => 'Kedungwuluh', 'kecamatan' => 2],
            ['nama_desa' => 'Karangbanjar', 'kecamatan' => 2],
            ['nama_desa' => 'Banjaran', 'kecamatan' => 2],
            ['nama_desa' => 'Lembeng', 'kecamatan' => 2],
            ['nama_desa' => 'Lengkong', 'kecamatan' => 2],

            // 🌾 3. Kecamatan Bukateja
            ['nama_desa' => 'Bukateja', 'kecamatan' => 3],
            ['nama_desa' => 'Karangcengis', 'kecamatan' => 3],
            ['nama_desa' => 'Karangnangka', 'kecamatan' => 3],
            ['nama_desa' => 'Kedunglegok', 'kecamatan' => 3],
            ['nama_desa' => 'Kedungjati', 'kecamatan' => 3],
            ['nama_desa' => 'Kutawis', 'kecamatan' => 3],
            ['nama_desa' => 'Karanggedang', 'kecamatan' => 3],
            ['nama_desa' => 'Karangasem', 'kecamatan' => 3],
            ['nama_desa' => 'Karanganyar', 'kecamatan' => 3],
            ['nama_desa' => 'Kalikajar', 'kecamatan' => 3],

            // 🌾 4. Kecamatan Kaligondang
            ['nama_desa' => 'Kaligondang', 'kecamatan' => 4],
            ['nama_desa' => 'Kalikajar', 'kecamatan' => 4],
            ['nama_desa' => 'Sinduraja', 'kecamatan' => 4],
            ['nama_desa' => 'Kedungjati', 'kecamatan' => 4],
            ['nama_desa' => 'Arenan', 'kecamatan' => 4],
            ['nama_desa' => 'Brecek', 'kecamatan' => 4],
            ['nama_desa' => 'Kalikajar Kulon', 'kecamatan' => 4],
            ['nama_desa' => 'Pagerandong', 'kecamatan' => 4],
            ['nama_desa' => 'Sidareja', 'kecamatan' => 4],
            ['nama_desa' => 'Sumampir', 'kecamatan' => 4],

            // 🌳 5. Kecamatan Kalimanah
            ['nama_desa' => 'Kalimanah Wetan', 'kecamatan' => 5],
            ['nama_desa' => 'Kalimanah Kulon', 'kecamatan' => 5],
            ['nama_desa' => 'Karanganyar', 'kecamatan' => 5],
            ['nama_desa' => 'Selabaya', 'kecamatan' => 5],
            ['nama_desa' => 'Sidareja', 'kecamatan' => 5],
            ['nama_desa' => 'Dagan', 'kecamatan' => 5],
            ['nama_desa' => 'Kalimanah Kidul', 'kecamatan' => 5],

            // 🌿 6. Kecamatan Karanganyar
            ['nama_desa' => 'Karanganyar', 'kecamatan' => 6],
            ['nama_desa' => 'Banjarsari', 'kecamatan' => 6],
            ['nama_desa' => 'Tlahab', 'kecamatan' => 6],
            ['nama_desa' => 'Sumampir', 'kecamatan' => 6],
            ['nama_desa' => 'Pagerandong', 'kecamatan' => 6],
            ['nama_desa' => 'Candiwulan', 'kecamatan' => 6],
            ['nama_desa' => 'Sirau', 'kecamatan' => 6],
            ['nama_desa' => 'Pamijen', 'kecamatan' => 6],

            // 🌾 7. Kecamatan Karangjambu
            ['nama_desa' => 'Karangjambu', 'kecamatan' => 7],
            ['nama_desa' => 'Kutabawa', 'kecamatan' => 7],
            ['nama_desa' => 'Serang', 'kecamatan' => 7],
            ['nama_desa' => 'Sanguwatang', 'kecamatan' => 7],
            ['nama_desa' => 'Gondang', 'kecamatan' => 7],
            ['nama_desa' => 'Karangreja', 'kecamatan' => 7],

            // 🌳 8. Kecamatan Karangmoncol
            ['nama_desa' => 'Karangmoncol', 'kecamatan' => 8],
            ['nama_desa' => 'Kajongan', 'kecamatan' => 8],
            ['nama_desa' => 'Kalimanah Wetan', 'kecamatan' => 8],
            ['nama_desa' => 'Sirandu', 'kecamatan' => 8],
            ['nama_desa' => 'Kedungjati', 'kecamatan' => 8],
            ['nama_desa' => 'Karangsari', 'kecamatan' => 8],

            // 🌄 9. Kecamatan Karangreja
            ['nama_desa' => 'Serang', 'kecamatan' => 9],
            ['nama_desa' => 'Kutabawa', 'kecamatan' => 9],
            ['nama_desa' => 'Siwarak', 'kecamatan' => 9],
            ['nama_desa' => 'Sanguwatang', 'kecamatan' => 9],
            ['nama_desa' => 'Karangreja', 'kecamatan' => 9],
            ['nama_desa' => 'Gondang', 'kecamatan' => 9],

            // 🌳 10. Kecamatan Kertanegara
            ['nama_desa' => 'Kertanegara', 'kecamatan' => 10],
            ['nama_desa' => 'Kaliori', 'kecamatan' => 10],
            ['nama_desa' => 'Bojanegara', 'kecamatan' => 10],
            ['nama_desa' => 'Karanganyar', 'kecamatan' => 10],
            ['nama_desa' => 'Panican', 'kecamatan' => 10],
            ['nama_desa' => 'Sokaraja', 'kecamatan' => 10],

            // 🌾 11. Kecamatan Kejobong
            ['nama_desa' => 'Kejobong', 'kecamatan' => 11],
            ['nama_desa' => 'Tidu', 'kecamatan' => 11],
            ['nama_desa' => 'Lamuk', 'kecamatan' => 11],
            ['nama_desa' => 'Karanganyar', 'kecamatan' => 11],
            ['nama_desa' => 'Sumampir', 'kecamatan' => 11],
            ['nama_desa' => 'Bojanegara', 'kecamatan' => 11],

            // 🌳 12. Kecamatan Kemangkon
            ['nama_desa' => 'Kemangkon', 'kecamatan' => 12],
            ['nama_desa' => 'Gumiwang Lor', 'kecamatan' => 12],
            ['nama_desa' => 'Toyareka', 'kecamatan' => 12],
            ['nama_desa' => 'Karanganyar', 'kecamatan' => 12],
            ['nama_desa' => 'Panican', 'kecamatan' => 12],
            ['nama_desa' => 'Purbalingga Wetan', 'kecamatan' => 12],

            // 🌳 13. Kecamatan Kutasari
            ['nama_desa' => 'Kutasari', 'kecamatan' => 13],
            ['nama_desa' => 'Karangsentul', 'kecamatan' => 13],
            ['nama_desa' => 'Toyareka', 'kecamatan' => 13],
            ['nama_desa' => 'Karangmanyar', 'kecamatan' => 13],
            ['nama_desa' => 'Mewek', 'kecamatan' => 13],

            // 🌾 14. Kecamatan Mrebet
            ['nama_desa' => 'Mrebet', 'kecamatan' => 14],
            ['nama_desa' => 'Jladri', 'kecamatan' => 14],
            ['nama_desa' => 'Pagerandong', 'kecamatan' => 14],
            ['nama_desa' => 'Serayu Larangan', 'kecamatan' => 14],
            ['nama_desa' => 'Onje', 'kecamatan' => 14],
            ['nama_desa' => 'Linggamas', 'kecamatan' => 14],
            ['nama_desa' => 'Krenceng', 'kecamatan' => 14],
            ['nama_desa' => 'Tegalpingen', 'kecamatan' => 14],
            ['nama_desa' => 'Karanganyar', 'kecamatan' => 14],
            ['nama_desa' => 'Kandis', 'kecamatan' => 14],
            ['nama_desa' => 'Mangunegara', 'kecamatan' => 14],

            // 🌄 15. Kecamatan Padamara
            ['nama_desa' => 'Padamara', 'kecamatan' => 15],
            ['nama_desa' => 'Sidareja', 'kecamatan' => 15],
            ['nama_desa' => 'Karangjambe', 'kecamatan' => 15],
            ['nama_desa' => 'Karangsari', 'kecamatan' => 15],
            ['nama_desa' => 'Kedungjati', 'kecamatan' => 15],
            ['nama_desa' => 'Pagerandong', 'kecamatan' => 15],

            // 🌳 16. Kecamatan Pengadegan
            ['nama_desa' => 'Pengadegan', 'kecamatan' => 16],
            ['nama_desa' => 'Tegalpingen', 'kecamatan' => 16],
            ['nama_desa' => 'Karanganyar', 'kecamatan' => 16],
            ['nama_desa' => 'Kedungjati', 'kecamatan' => 16],
            ['nama_desa' => 'Purbalingga Kidul', 'kecamatan' => 16],

            // 🌇 17. Kecamatan Purbalingga
            ['nama_desa' => 'Purbalingga Wetan', 'kecamatan' => 17],
            ['nama_desa' => 'Purbalingga Kidul', 'kecamatan' => 17],
            ['nama_desa' => 'Purbalingga Lor', 'kecamatan' => 17],
            ['nama_desa' => 'Bojanegara', 'kecamatan' => 17],
            ['nama_desa' => 'Kembaran Kulon', 'kecamatan' => 17],
            ['nama_desa' => 'Kembaran Wetan', 'kecamatan' => 17],
            ['nama_desa' => 'Penaruban', 'kecamatan' => 17],
            ['nama_desa' => 'Kedungmenjangan', 'kecamatan' => 17],
            ['nama_desa' => 'Kalikabong', 'kecamatan' => 17],
            ['nama_desa' => 'Karangsentul', 'kecamatan' => 17],
            ['nama_desa' => 'Karangmanyar', 'kecamatan' => 17],
            ['nama_desa' => 'Toyareka', 'kecamatan' => 17],
            ['nama_desa' => 'Grecol', 'kecamatan' => 17],
            ['nama_desa' => 'Jatisaba', 'kecamatan' => 17],
            ['nama_desa' => 'Mewek', 'kecamatan' => 17],
            ['nama_desa' => 'Karanganyar', 'kecamatan' => 17],
            ['nama_desa' => 'Purbalingga Kulon', 'kecamatan' => 17],

            // 🌾 18. Kecamatan Rembang
            ['nama_desa' => 'Rembang', 'kecamatan' => 18],
            ['nama_desa' => 'Gunungwuled', 'kecamatan' => 18],
            ['nama_desa' => 'Tanalum', 'kecamatan' => 18],
            ['nama_desa' => 'Banjaran', 'kecamatan' => 18],
            ['nama_desa' => 'Bantarbarang', 'kecamatan' => 18],
            ['nama_desa' => 'Karangbawang', 'kecamatan' => 18],
            ['nama_desa' => 'Wlahar', 'kecamatan' => 18],
            ['nama_desa' => 'Losari', 'kecamatan' => 18],
        ];

        foreach ($desa as &$data) {
            $data['kabupaten'] = 20;
            $data['provinsi'] = 13;

            $data['created_at'] = Carbon::now();
            $data['updated_at'] = Carbon::now();
        }

        DB::table('desa')->insert($desa);
    }
}
