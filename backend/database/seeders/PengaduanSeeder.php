<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PengaduanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan ada data program, user, dan wilayah terlebih dahulu
        // Jika belum ada, pastikan run seeder untuk tabel tersebut terlebih dahulu

        $pengaduans = [
            [
                'kode_pengaduan' => 'PGD-' . date('YmdHis') . '001',
                'program_id' => 1,
                'pelapor' => 2,
                'kategori_pengaduan' => 'kejanggalan_rab',
                'judul_pengaduan' => 'Temuan Ketidaksesuaian RAB Program Pemberdayaan UMKM',
                'deskripsi_pengaduan' => 'Ditemukan ketidaksesuaian antara RAB yang diajukan dengan realisasi penggunaan dana. Biaya operasional melebihi alokasi yang disetujui.',
                'bukti_pendukung' => json_encode(['dokumen_rab.pdf', 'bukti_pengeluaran.pdf']),
                'lokasi_kejadian' => 1,
                'tanggal_kejadian' => Carbon::now()->subDays(10),
                'status_pengaduan' => 'terverifikasi',
                'prioritas' => 'tinggi',
                'ditangani_oleh' => 3,
                'tanggal_ditangani' => Carbon::now()->subDays(8),
                'hasil_tindak_lanjut' => 'Telah dilakukan koreksi RAB dan persetujuan revisi anggaran',
                'tanggal_selesai' => Carbon::now()->subDays(5),
                'created_at' => Carbon::now()->subDays(10),
                'updated_at' => Carbon::now()->subDays(5),
            ],
            [
                'kode_pengaduan' => 'PGD-' . date('YmdHis') . '002',
                'program_id' => 1,
                'pelapor' => 2,
                'kategori_pengaduan' => 'pelaksanaan_program',
                'judul_pengaduan' => 'Keterlambatan Pelaksanaan Program Pelatihan Keterampilan',
                'deskripsi_pengaduan' => 'Program pelatihan yang dijadwalkan bulan Agustus baru terlaksana di bulan September. Peserta mengeluh karena jadwal berubah tiba-tiba.',
                'bukti_pendukung' => json_encode(['jadwal_awal.pdf', 'foto_pelaksanaan.jpg']),
                'lokasi_kejadian' => 2,
                'tanggal_kejadian' => Carbon::now()->subDays(15),
                'status_pengaduan' => 'dalam investigasi',
                'prioritas' => 'sedang',
                'ditangani_oleh' => 4,
                'tanggal_ditangani' => Carbon::now()->subDays(13),
                'hasil_tindak_lanjut' => null,
                'tanggal_selesai' => null,
                'created_at' => Carbon::now()->subDays(15),
                'updated_at' => Carbon::now()->subDays(13),
            ],
            [
                'kode_pengaduan' => 'PGD-' . date('YmdHis') . '003',
                'program_id' => 2,
                'pelapor' => 5,
                'kategori_pengaduan' => 'penyaluran_bantuan',
                'judul_pengaduan' => 'Penerima Bantuan Tidak Sesuai Kriteria',
                'deskripsi_pengaduan' => 'Terdapat penerima bantuan sosial yang seharusnya tidak berhak karena pendapatan masih di atas batas maksimal. Dugaan ada intervensi dari oknum tertentu.',
                'bukti_pendukung' => json_encode(['surat_verifikasi.pdf', 'slip_gaji.jpg']),
                'lokasi_kejadian' => 3,
                'tanggal_kejadian' => Carbon::now()->subDays(20),
                'status_pengaduan' => 'dalam penyelidikan',
                'prioritas' => 'tinggi',
                'ditangani_oleh' => 3,
                'tanggal_ditangani' => Carbon::now()->subDays(18),
                'hasil_tindak_lanjut' => 'Masih dalam proses investigasi lebih lanjut bersama tim audit internal',
                'tanggal_selesai' => null,
                'created_at' => Carbon::now()->subDays(20),
                'updated_at' => Carbon::now()->subDays(18),
            ],
            [
                'kode_pengaduan' => 'PGD-' . date('YmdHis') . '004',
                'program_id' => 2,
                'pelapor' => 6,
                'kategori_pengaduan' => 'lainnya',
                'judul_pengaduan' => 'Keluhan Tentang Transparansi Informasi Program',
                'deskripsi_pengaduan' => 'Masyarakat sulit mendapatkan informasi tentang tahapan dan hasil program. Tidak ada komunikasi yang jelas dari penyelenggara program.',
                'bukti_pendukung' => null,
                'lokasi_kejadian' => 1,
                'tanggal_kejadian' => Carbon::now()->subDays(5),
                'status_pengaduan' => 'baru',
                'prioritas' => 'rendah',
                'ditangani_oleh' => null,
                'tanggal_ditangani' => null,
                'hasil_tindak_lanjut' => null,
                'tanggal_selesai' => null,
                'created_at' => Carbon::now()->subDays(5),
                'updated_at' => Carbon::now()->subDays(5),
            ],
            [
                'kode_pengaduan' => 'PGD-' . date('YmdHis') . '005',
                'program_id' => 3,
                'pelapor' => 2,
                'kategori_pengaduan' => 'kejanggalan_rab',
                'judul_pengaduan' => 'Pembelian Barang Melebihi Spesifikasi',
                'deskripsi_pengaduan' => 'Pembelian alat-alat kantor dengan spesifikasi premium padahal RAB menetapkan standar biasa. Kemungkinan ada markup harga yang tidak wajar.',
                'bukti_pendukung' => json_encode(['invoice.pdf', 'spesifikasi_barang.pdf']),
                'lokasi_kejadian' => 2,
                'tanggal_kejadian' => Carbon::now()->subDays(3),
                'status_pengaduan' => 'ditolak',
                'prioritas' => 'sedang',
                'ditangani_oleh' => 4,
                'tanggal_ditangani' => Carbon::now()->subDays(2),
                'hasil_tindak_lanjut' => 'Setelah verifikasi lebih lanjut, pembelian sesuai dengan kebutuhan dan harga pasaran. Pengaduan ditolak.',
                'tanggal_selesai' => Carbon::now()->subDays(1),
                'created_at' => Carbon::now()->subDays(3),
                'updated_at' => Carbon::now()->subDays(1),
            ],
            [
                'kode_pengaduan' => 'PGD-' . date('YmdHis') . '006',
                'program_id' => 1,
                'pelapor' => 7,
                'kategori_pengaduan' => 'pelaksanaan_program',
                'judul_pengaduan' => 'Kurangnya Peralatan Pendukung Program',
                'deskripsi_pengaduan' => 'Program pelatihan keterampilan kurang dilengkapi peralatan yang memadai, sehingga proses pembelajaran tidak optimal.',
                'bukti_pendukung' => json_encode(['foto_ruangan.jpg', 'daftar_kebutuhan.pdf']),
                'lokasi_kejadian' => 4,
                'tanggal_kejadian' => Carbon::now()->subDays(8),
                'status_pengaduan' => 'selesai',
                'prioritas' => 'sedang',
                'ditangani_oleh' => 3,
                'tanggal_ditangani' => Carbon::now()->subDays(7),
                'hasil_tindak_lanjut' => 'Telah disediakan peralatan tambahan dan ruangan diperluas untuk kenyamanan peserta',
                'tanggal_selesai' => Carbon::now()->subDays(2),
                'created_at' => Carbon::now()->subDays(8),
                'updated_at' => Carbon::now()->subDays(2),
            ],
        ];

        foreach ($pengaduans as $pengaduan) {
            DB::table('pengaduan')->insert($pengaduan);
        }

        $this->command->info('PengaduanSeeder berhasil dijalankan dengan 6 data dummy');
    }
}