<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // HAPUS atau COMMENT baris ini:
        // \App\Models\User::factory(10)->create();

        // JALANKAN seeder custom kita:
        $this->call([
            ProvinsiSeeder::class,
            KabupatenSeeder::class, 
            KecamatanSeeder::class,
            DesaSeeder::class,
            WilayahSeeder::class,
            KategoriProgramSeeder::class,
            UserSeeder::class,
            ProgramSeeder::class,
        ]);
    }
}