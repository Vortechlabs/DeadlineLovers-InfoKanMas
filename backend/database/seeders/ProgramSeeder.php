<?php

namespace Database\Seeders;

use App\Models\KategoriProgramModel;
use App\Models\ProgramModel;
use App\Models\ProgramRabModel;
use App\Models\ProgramTahapanModel;
use App\Models\WilayahModel;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class ProgramSeeder extends Seeder
{
    public function run(): void
    {
        // Nonaktifkan foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Kosongkan tabel
        ProgramModel::truncate();
        ProgramRabModel::truncate();
        ProgramTahapanModel::truncate();

        // Aktifkan kembali foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Ambil data master
        $kategoriInfrastruktur = KategoriProgramModel::where('nama_kategori', 'infrastruktur')->first();
        $kategoriBansos = KategoriProgramModel::where('nama_kategori', 'bansos')->first();
        $kategoriPendidikan = KategoriProgramModel::where('nama_kategori', 'pendidikan')->first();
        $kategoriEkonomi = KategoriProgramModel::where('nama_kategori', 'ekonomi')->first();

        $desaKalimanahKulon = WilayahModel::where('nama_wilayah', 'Desa Kalimanah Kulon')->first();
        $desaKalimanahWetan = WilayahModel::where('nama_wilayah', 'Desa Kalimanah Wetan')->first();
        $desaKarangmanyar = WilayahModel::where('nama_wilayah', 'Desa Karangmanyar')->first();

        $adminDesa1 = User::where('email', 'kalimanahkulon@desa.id')->first();
        $adminDesa2 = User::where('email', 'kalimanahwetan@desa.id')->first();
        $adminKecamatan = User::where('email', 'kalimanah@purbalingga.id')->first();
        $adminKabupaten = User::where('email', 'kabupaten@purbalingga.id')->first();

        $programs = [
            // ==================== PROGRAM INFRASTRUKTUR ====================
            [
                'kode_program' => 'PRG-' . date('YmdHis') . '001',
                'nama_program' => 'Pembangunan Jalan Desa Kalimanah Kulon 2KM',
                'deskripsi' => 'Pembangunan jalan hotmix sepanjang 2km dengan ketebalan 10cm untuk akses transportasi warga desa Kalimanah Kulon. Program ini bertujuan meningkatkan konektivitas antar dusun dan memudahkan akses ekonomi warga.',
                'kategori_program_id' => $kategoriInfrastruktur->id,
                'jenis_program' => 'desa',
                'tingkat_pengusul' => 'desa',
                'wilayah_id' => $desaKalimanahKulon->id,
                'tahun_anggaran' => 2024,
                'status_program' => 'berjalan',
                'prioritas' => 'tinggi',
                'tanggal_mulai' => '2024-09-01',
                'tanggal_selesai' => '2024-12-31',
                'target_penerima_manfaat' => 1500,
                'anggaran_total' => 1000000000,
                'realisasi_anggaran' => 650000000,
                'penanggung_jawab_id' => $adminDesa1->id,
                'created_by' => $adminDesa1->id,
                'verified_by' => $adminKecamatan->id,
                'approved_by' => $adminKabupaten->id,
                'tanggal_verifikasi' => '2024-08-20 10:00:00',
                'tanggal_approval' => '2024-08-25 14:30:00',
                'catatan_verifikasi' => 'RAB sudah sesuai dengan standar, lokasi strategis untuk pengembangan ekonomi desa',
                'catatan_approval' => 'Disetujui dengan anggaran sesuai proposal',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_program' => 'PRG-' . date('YmdHis') . '002',
                'nama_program' => 'Renovasi MCK Desa Kalimanah Wetan',
                'deskripsi' => 'Renovasi 5 unit MCK umum di Desa Kalimanah Wetan yang sudah rusak. Dilengkapi dengan sistem sanitasi yang baik dan akses air bersih.',
                'kategori_program_id' => $kategoriInfrastruktur->id,
                'jenis_program' => 'desa',
                'tingkat_pengusul' => 'desa',
                'wilayah_id' => $desaKalimanahWetan->id,
                'tahun_anggaran' => 2024,
                'status_program' => 'draft',
                'prioritas' => 'sedang',
                'tanggal_mulai' => '2024-10-01',
                'tanggal_selesai' => '2024-11-30',
                'target_penerima_manfaat' => 500,
                'anggaran_total' => 75000000,
                'realisasi_anggaran' => 0,
                'penanggung_jawab_id' => $adminDesa2->id,
                'created_by' => $adminDesa2->id,
                'verified_by' => null,
                'approved_by' => null,
                'tanggal_verifikasi' => null,
                'tanggal_approval' => null,
                'catatan_verifikasi' => null,
                'catatan_approval' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_program' => 'PRG-' . date('YmdHis') . '003',
                'nama_program' => 'Pembangunan Drainase Jalan Utama',
                'deskripsi' => 'Pembangunan sistem drainase sepanjang 1.5km di jalan utama desa untuk mengatasi masalah banjir saat musim hujan.',
                'kategori_program_id' => $kategoriInfrastruktur->id,
                'jenis_program' => 'desa',
                'tingkat_pengusul' => 'desa',
                'wilayah_id' => $desaKalimanahKulon->id,
                'tahun_anggaran' => 2024,
                'status_program' => 'berjalan',
                'prioritas' => 'tinggi',
                'tanggal_mulai' => '2024-09-05',
                'tanggal_selesai' => '2024-11-30',
                'target_penerima_manfaat' => 800,
                'anggaran_total' => 450000000,
                'realisasi_anggaran' => 270000000,
                'penanggung_jawab_id' => $adminDesa1->id,
                'created_by' => $adminDesa1->id,
                'verified_by' => $adminKecamatan->id,
                'approved_by' => $adminKabupaten->id,
                'tanggal_verifikasi' => '2024-08-22 09:15:00',
                'tanggal_approval' => '2024-08-28 11:00:00',
                'catatan_verifikasi' => 'Desain drainase sudah memenuhi standar teknis',
                'catatan_approval' => 'Anggaran disetujui dengan revisi minor',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // ==================== PROGRAM BANSOS ====================
            [
                'kode_program' => 'PRG-' . date('YmdHis') . '004',
                'nama_program' => 'Bantuan Sembako untuk 100 KK Miskin',
                'deskripsi' => 'Program bantuan sembako bulanan untuk 100 Kepala Keluarga miskin di Desa Kalimanah Kulon selama 6 bulan.',
                'kategori_program_id' => $kategoriBansos->id,
                'jenis_program' => 'desa',
                'tingkat_pengusul' => 'desa',
                'wilayah_id' => $desaKalimanahKulon->id,
                'tahun_anggaran' => 2024,
                'status_program' => 'selesai',
                'prioritas' => 'tinggi',
                'tanggal_mulai' => '2024-01-15',
                'tanggal_selesai' => '2024-06-30',
                'target_penerima_manfaat' => 100,
                'anggaran_total' => 90000000,
                'realisasi_anggaran' => 90000000,
                'penanggung_jawab_id' => $adminDesa1->id,
                'created_by' => $adminDesa1->id,
                'verified_by' => $adminKecamatan->id,
                'approved_by' => $adminKabupaten->id,
                'tanggal_verifikasi' => '2024-01-10 08:30:00',
                'tanggal_approval' => '2024-01-12 14:00:00',
                'catatan_verifikasi' => 'Data penerima sudah diverifikasi dan valid',
                'catatan_approval' => 'Program sangat dibutuhkan masyarakat',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_program' => 'PRG-' . date('YmdHis') . '005',
                'nama_program' => 'Bantuan Pendidikan Anak Yatim',
                'deskripsi' => 'Bantuan biaya pendidikan dan perlengkapan sekolah untuk 25 anak yatim di Desa Kalimanah Wetan.',
                'kategori_program_id' => $kategoriBansos->id,
                'jenis_program' => 'desa',
                'tingkat_pengusul' => 'desa',
                'wilayah_id' => $desaKalimanahWetan->id,
                'tahun_anggaran' => 2024,
                'status_program' => 'diajukan',
                'prioritas' => 'sedang',
                'tanggal_mulai' => '2024-11-01',
                'tanggal_selesai' => '2025-06-30',
                'target_penerima_manfaat' => 25,
                'anggaran_total' => 37500000,
                'realisasi_anggaran' => 0,
                'penanggung_jawab_id' => $adminDesa2->id,
                'created_by' => $adminDesa2->id,
                'verified_by' => null,
                'approved_by' => null,
                'tanggal_verifikasi' => null,
                'tanggal_approval' => null,
                'catatan_verifikasi' => null,
                'catatan_approval' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // ==================== PROGRAM PENDIDIKAN ====================
            [
                'kode_program' => 'PRG-' . date('YmdHis') . '006',
                'nama_program' => 'Beasiswa Anak Berprestasi',
                'deskripsi' => 'Program beasiswa untuk 15 siswa berprestasi dari keluarga kurang mampu di tingkat SD, SMP, dan SMA.',
                'kategori_program_id' => $kategoriPendidikan->id,
                'jenis_program' => 'desa',
                'tingkat_pengusul' => 'desa',
                'wilayah_id' => $desaKarangmanyar->id,
                'tahun_anggaran' => 2024,
                'status_program' => 'berjalan',
                'prioritas' => 'sedang',
                'tanggal_mulai' => '2024-09-20',
                'tanggal_selesai' => '2024-10-30',
                'target_penerima_manfaat' => 15,
                'anggaran_total' => 25000000,
                'realisasi_anggaran' => 20000000,
                'penanggung_jawab_id' => $adminDesa1->id,
                'created_by' => $adminDesa1->id,
                'verified_by' => $adminKecamatan->id,
                'approved_by' => $adminKabupaten->id,
                'tanggal_verifikasi' => '2024-09-15 10:45:00',
                'tanggal_approval' => '2024-09-18 13:20:00',
                'catatan_verifikasi' => 'Kriteria penerima sudah jelas dan transparan',
                'catatan_approval' => 'Mendukung peningkatan kualitas pendidikan',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // ==================== PROGRAM EKONOMI ====================
            [
                'kode_program' => 'PRG-' . date('YmdHis') . '007',
                'nama_program' => 'Pelatihan UMKM Desa',
                'deskripsi' => 'Pelatihan kewirausahaan dan pengembangan produk untuk 50 pelaku UMKM di Desa Kalimanah Kulon. Meliputi pelatihan digital marketing, pengemasan produk, dan manajemen keuangan.',
                'kategori_program_id' => $kategoriEkonomi->id,
                'jenis_program' => 'desa',
                'tingkat_pengusul' => 'desa',
                'wilayah_id' => $desaKalimanahKulon->id,
                'tahun_anggaran' => 2024,
                'status_program' => 'berjalan',
                'prioritas' => 'tinggi',
                'tanggal_mulai' => '2024-08-20',
                'tanggal_selesai' => '2024-11-15',
                'target_penerima_manfaat' => 50,
                'anggaran_total' => 15000000,
                'realisasi_anggaran' => 12000000,
                'penanggung_jawab_id' => $adminDesa1->id,
                'created_by' => $adminDesa1->id,
                'verified_by' => $adminKecamatan->id,
                'approved_by' => $adminKabupaten->id,
                'tanggal_verifikasi' => '2024-08-15 11:30:00',
                'tanggal_approval' => '2024-08-18 15:45:00',
                'catatan_verifikasi' => 'Kurikulum pelatihan sudah komprehensif',
                'catatan_approval' => 'Mendukung pengembangan ekonomi kreatif desa',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode_program' => 'PRG-' . date('YmdHis') . '008',
                'nama_program' => 'Pemasangan Penerangan Jalan Umum',
                'deskripsi' => 'Pemasangan 30 titik lampu penerangan jalan umum (PJU) solar cell di area-area gelap dan strategis di Desa Kalimanah Wetan.',
                'kategori_program_id' => $kategoriInfrastruktur->id,
                'jenis_program' => 'desa',
                'tingkat_pengusul' => 'desa',
                'wilayah_id' => $desaKalimanahWetan->id,
                'tahun_anggaran' => 2024,
                'status_program' => 'rejected', // GANTI 'ditolak' MENJADI 'rejected'
                'prioritas' => 'sedang',
                'tanggal_mulai' => '2024-10-01',
                'tanggal_selesai' => '2024-11-30',
                'target_penerima_manfaat' => 800,
                'anggaran_total' => 120000000,
                'realisasi_anggaran' => 0,
                'penanggung_jawab_id' => $adminDesa2->id,
                'created_by' => $adminDesa2->id,
                'verified_by' => $adminKecamatan->id,
                'approved_by' => $adminKabupaten->id,
                'tanggal_verifikasi' => '2024-09-10 09:00:00',
                'tanggal_approval' => '2024-09-12 16:00:00',
                'catatan_verifikasi' => 'Teknis pemasangan sudah sesuai standar',
                'catatan_approval' => 'Ditolak karena RAB tidak sesuai standar, perlu revisi spesifikasi teknis',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert programs
        foreach ($programs as $programData) {
            $program = ProgramModel::create($programData);

            // Tambahkan RAB untuk program tertentu
            if (in_array($program->status_program, ['berjalan', 'selesai', 'approved'])) {
                $this->createRabItems($program);
            }

            // Tambahkan tahapan untuk program tertentu
            if (in_array($program->status_program, ['berjalan', 'selesai'])) {
                $this->createTahapan($program);
            }
        }

        $this->command->info('Program seeder berhasil dijalankan!');
        $this->command->info('Total: ' . count($programs) . ' program dummy dibuat');
    }

    /**
     * Membuat RAB items untuk program
     */
    private function createRabItems(ProgramModel $program)
    {
        $rabItems = [];

        if (str_contains($program->nama_program, 'Jalan')) {
            $rabItems = [
                ['Aspal Hotmix', 'Material aspal hotmix standar', 2000, 'm²', 250000, 500000000],
                ['Batu Base Course', 'Batu pondasi jalan', 1500, 'm³', 150000, 225000000],
                ['Pekerjaan Tanah', 'Pekerjaan galian dan urugan', 2000, 'm', 75000, 150000000],
                ['Alat Berat', 'Sewa alat berat dan operator', 60, 'hari', 1500000, 90000000],
                ['Tenaga Kerja', 'Honor tenaga kerja lokal', 120, 'HOK', 150000, 18000000],
                ['Administrasi & Pengawasan', 'Biaya administrasi dan pengawasan', 1, 'paket', 35000000, 35000000],
            ];
        } elseif (str_contains($program->nama_program, 'Drainase')) {
            $rabItems = [
                ['Pipa Drainase PVC', 'Pipa drainase diameter 30cm', 1500, 'm', 120000, 180000000],
                ['Beton Precast', 'Cover drainase beton precast', 1500, 'buah', 80000, 120000000],
                ['Pekerjaan Galian', 'Galian tanah untuk drainase', 1500, 'm³', 50000, 75000000],
                ['Tenaga Kerja', 'Honor tenaga kerja', 90, 'HOK', 150000, 13500000],
                ['Material Lainnya', 'Material pendukung lainnya', 1, 'paket', 61500000, 61500000],
            ];
        } elseif (str_contains($program->nama_program, 'Bantuan Sembako')) {
            $rabItems = [
                ['Beras Premium', 'Beras 5kg per KK per bulan', 600, 'paket', 60000, 36000000],
                ['Minyak Goreng', 'Minyak goreng 2 liter', 600, 'botol', 25000, 15000000],
                ['Gula Pasir', 'Gula pasir 2kg', 600, 'pack', 28000, 16800000],
                ['Telur Ayam', 'Telur ayam 1kg', 600, 'kg', 22000, 13200000],
                ['Mie Instan', 'Mie instan 1 dus', 600, 'dus', 15000, 9000000],
            ];
        } elseif (str_contains($program->nama_program, 'Pelatihan UMKM')) {
            $rabItems = [
                ['Honor Instruktur', 'Honor pelatih profesional', 10, 'sesi', 500000, 5000000],
                ['Modul Pelatihan', 'Bahan ajar dan modul', 50, 'set', 50000, 2500000],
                ['Konsumsi Peserta', 'Makan dan snack selama pelatihan', 250, 'paket', 25000, 6250000],
                ['Sertifikat', 'Sertifikat peserta', 50, 'lembar', 15000, 750000],
                ['Transportasi', 'Transportasi instruktur', 10, 'hari', 100000, 1000000],
            ];
        }

        foreach ($rabItems as $index => $item) {
            ProgramRabModel::create([
                'program_id' => $program->id,
                'nama_item' => $item[0],
                'deskripsi' => $item[1],
                'volume' => $item[2],
                'satuan' => $item[3],
                'harga_satuan' => $item[4],
                'total' => $item[5],
                'urutan' => $index + 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Membuat tahapan program
     */
    private function createTahapan(ProgramModel $program)
    {
        $tahapan = [];

        if (str_contains($program->nama_program, 'Jalan')) {
            $tahapan = [
                ['Persiapan dan Administrasi', 'Penyiapan dokumen dan perizinan', 10, '2024-09-01', '2024-09-10', 'selesai'],
                ['Pekerjaan Tanah', 'Galian dan perataan tanah', 20, '2024-09-11', '2024-09-25', 'selesai'],
                ['Pondasi Base Course', 'Pemasangan pondasi batu', 25, '2024-09-26', '2024-10-15', 'selesai'],
                ['Pengaspalan', 'Penuangan aspal hotmix', 30, '2024-10-16', '2024-11-10', 'dalam_pengerjaan'], // Ganti 'berjalan' menjadi 'dalam_pengerjaan'
                ['Finishing dan Marka Jalan', 'Pemasangan rambu dan marka jalan', 15, '2024-11-11', '2024-11-30', 'menunggu'],
            ];
        } elseif (str_contains($program->nama_program, 'Drainase')) {
            $tahapan = [
                ['Survey dan Persiapan', 'Survey lokasi dan persiapan material', 15, '2024-09-05', '2024-09-15', 'selesai'],
                ['Pekerjaan Galian', 'Galian tanah untuk saluran drainase', 25, '2024-09-16', '2024-10-05', 'selesai'],
                ['Pemasangan Pipa', 'Pemasangan pipa drainase', 30, '2024-10-06', '2024-10-31', 'dalam_pengerjaan'], // Ganti 'berjalan' menjadi 'dalam_pengerjaan'
                ['Pengecoran Cover', 'Pemasangan cover beton', 20, '2024-11-01', '2024-11-20', 'menunggu'],
                ['Finishing dan Uji Coba', 'Pembersihan dan uji coba sistem', 10, '2024-11-21', '2024-11-30', 'menunggu'],
            ];
        } elseif (str_contains($program->nama_program, 'Pelatihan UMKM')) {
            $tahapan = [
                ['Pendaftaran Peserta', 'Seleksi dan pendaftaran peserta', 20, '2024-08-20', '2024-09-05', 'selesai'],
                ['Pelatihan Batch 1', 'Pelatihan kewirausahaan dasar', 30, '2024-09-06', '2024-09-20', 'selesai'],
                ['Pelatihan Batch 2', 'Pelatihan digital marketing', 30, '2024-09-21', '2024-10-10', 'dalam_pengerjaan'], // Ganti 'berjalan' menjadi 'dalam_pengerjaan'
                ['Pendampingan', 'Pendampingan pasca pelatihan', 20, '2024-10-11', '2024-11-15', 'menunggu'],
            ];
        }

        foreach ($tahapan as $index => $item) {
            ProgramTahapanModel::create([
                'program_id' => $program->id,
                'nama_tahapan' => $item[0],
                'deskripsi' => $item[1],
                'persentase' => $item[2],
                'tanggal_mulai_rencana' => $item[3],
                'tanggal_selesai_rencana' => $item[4],
                'status' => $item[5],
                'urutan' => $index + 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}