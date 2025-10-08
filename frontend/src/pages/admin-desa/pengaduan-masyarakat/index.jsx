import React, { useState } from 'react';
import PengaduanHeader from './PengaduanHeader';
import PengaduanStats from './PengaduanStats';
import PengaduanFilter from './PengaduanFilter';
import PengaduanTable from './PengaduanTable';
import PengaduanModal from './PengaduanModal';

const AdminDesaPengaduanWarga = () => {
  const [selectedStatus, setSelectedStatus] = useState('semua');
  const [selectedKategori, setSelectedKategori] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPengaduan, setSelectedPengaduan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Data pengaduan warga berdasarkan studi kasus Purbalingga
  const dataPengaduan = [
    {
      id: 'PGD-001',
      nama: 'Budi Santoso',
      nik: '3326123456789001',
      telepon: '081234567890',
      alamat: 'Dusun 1, Desa Sumberejo',
      kategori: 'infrastruktur',
      judul: 'Kualitas Jalan Tidak Sesuai Spek',
      deskripsi: 'Jalan yang dibangun hanya aspal tipis 3cm, seharusnya 10cm sesuai kontrak. Sudah ada retakan setelah 1 bulan.',
      lokasi: 'Jl. Desa Sumberejo KM 2',
      tanggal: '2024-10-15',
      status: 'dalam_investigasi',
      prioritas: 'tinggi',
      bukti: [
        { type: 'foto', url: '/bukti-jalan-1.jpg', description: 'Foto ketebalan aspal' },
        { type: 'foto', url: '/bukti-jalan-2.jpg', description: 'Retakan di permukaan jalan' }
      ],
      tindakan: [
        {
          tanggal: '2024-10-16',
          oleh: 'Admin Desa',
          deskripsi: 'Laporan diterima dan sedang diverifikasi tim teknis'
        }
      ],
      createdAt: '2024-10-15 14:30'
    },
    {
      id: 'PGD-002',
      nama: 'Siti Rahayu',
      nik: '3326123456789002',
      telepon: '081234567891',
      alamat: 'Dusun 2, Desa Bojanegara',
      kategori: 'infrastruktur',
      judul: 'MCK Berukuran Sangat Kecil',
      deskripsi: 'MCK yang dibangun hanya 1.5x3 meter, tidak sesuai dengan anggaran Rp 30 juta. Sangat sempit untuk digunakan.',
      lokasi: 'Area Kios Desa Bojanegara',
      tanggal: '2024-10-14',
      status: 'diverifikasi',
      prioritas: 'sedang',
      bukti: [
        { type: 'foto', url: '/bukti-mck-1.jpg', description: 'Ukuran MCK dari luar' },
        { type: 'foto', url: '/bukti-mck-2.jpg', description: 'Dokumen anggaran' }
      ],
      tindakan: [
        {
          tanggal: '2024-10-15',
          oleh: 'Tim Investigasi',
          deskripsi: 'Bukti foto dan dokumen telah diverifikasi'
        }
      ],
      createdAt: '2024-10-14 09:15'
    },
    {
      id: 'PGD-003',
      nama: 'Ahmad Wijaya',
      nik: '3326123456789003',
      telepon: '081234567892',
      alamat: 'Dusun 3, Desa Penaruban',
      kategori: 'bansos',
      judul: 'Penerima Bansos Tidak Sesuai',
      deskripsi: 'Ada warga yang sudah meninggal masih terdaftar sebagai penerima bansos, sedangkan warga yang layak tidak dapat.',
      lokasi: 'Desa Penaruban',
      tanggal: '2024-10-13',
      status: 'selesai',
      prioritas: 'tinggi',
      bukti: [
        { type: 'foto', url: '/bukti-bansos-1.jpg', description: 'Daftar penerima' },
        { type: 'dokumen', url: '/laporan-bansos.pdf', description: 'Laporan verifikasi' }
      ],
      tindakan: [
        {
          tanggal: '2024-10-14',
          oleh: 'Dinas Sosial',
          deskripsi: 'Data telah diperbaiki dan distribusi ulang dilakukan'
        },
        {
          tanggal: '2024-10-16',
          oleh: 'Admin Desa',
          deskripsi: 'Kasus telah ditutup dan dilaporkan ke atasan'
        }
      ],
      createdAt: '2024-10-13 16:45'
    },
    {
      id: 'PGD-004',
      nama: 'Anonim',
      nik: '-',
      telepon: '-',
      alamat: 'Desa Sumberejo',
      kategori: 'korupsi',
      judul: 'Dugaan Mark-up Proyek Jalan',
      deskripsi: 'Ada indikasi mark-up proyek jalan sebesar Rp 400 juta. Panjang jalan hanya 1.5km dari yang seharusnya 2km.',
      lokasi: 'Jl. Desa Sumberejo',
      tanggal: '2024-10-12',
      status: 'dalam_penyidikan',
      prioritas: 'sangat_tinggi',
      bukti: [
        { type: 'foto', url: '/bukti-markup-1.jpg', description: 'Pengukuran panjang jalan' },
        { type: 'dokumen', url: '/dokumen-kontrak.pdf', description: 'Dokumen kontrak proyek' }
      ],
      tindakan: [
        {
          tanggal: '2024-10-13',
          oleh: 'Tim Khusus',
          deskripsi: 'Laporan diteruskan ke pihak berwenang'
        }
      ],
      createdAt: '2024-10-12 11:20'
    },
    {
      id: 'PGD-005',
      nama: 'Maria Dewi',
      nik: '3326123456789004',
      telepon: '081234567893',
      alamat: 'Dusun 4, Desa Kaligondang',
      kategori: 'pengadaan',
      judul: 'Material Aspal Tidak Berkualitas',
      deskripsi: 'Material aspal yang digunakan kualitas rendah, berbeda dengan spesifikasi di kontrak. Sudah berubah warna dan lengket.',
      lokasi: 'Proyek Jalan Kaligondang',
      tanggal: '2024-10-11',
      status: 'baru',
      prioritas: 'tinggi',
      bukti: [
        { type: 'foto', url: '/bukti-aspal-1.jpg', description: 'Kondisi aspal' },
        { type: 'video', url: '/video-aspal.mp4', description: 'Test kualitas aspal' }
      ],
      tindakan: [],
      createdAt: '2024-10-11 08:30'
    },
    {
      id: 'PGD-006',
      nama: 'Rudi Hartono',
      nik: '3326123456789005',
      telepon: '081234567894',
      alamat: 'Dusun 1, Desa Padamara',
      kategori: 'operasional',
      judul: 'Pembelian ATK Overpriced',
      deskripsi: 'Printer yang dibeli seharga Rp 5 juta, padahal di pasaran hanya Rp 2.5 juta. Ada indikasi mark-up.',
      lokasi: 'Kantor Desa Padamara',
      tanggal: '2024-10-10',
      status: 'ditolak',
      prioritas: 'rendah',
      bukti: [
        { type: 'foto', url: '/bukti-printer-1.jpg', description: 'Printer dan faktur' },
        { type: 'dokumen', url: '/harga-pasar.pdf', description: 'Perbandingan harga' }
      ],
      tindakan: [
        {
          tanggal: '2024-10-11',
          oleh: 'Admin Desa',
          deskripsi: 'Laporan ditolak karena bukti tidak cukup'
        }
      ],
      createdAt: '2024-10-10 15:10'
    }
  ];

  // Filter data berdasarkan status, kategori, dan pencarian
  const filteredData = dataPengaduan.filter(pengaduan => {
    const statusMatch = selectedStatus === 'semua' || pengaduan.status === selectedStatus;
    const kategoriMatch = selectedKategori === 'semua' || pengaduan.kategori === selectedKategori;
    const searchMatch = pengaduan.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       pengaduan.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       pengaduan.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    
    return statusMatch && kategoriMatch && searchMatch;
  });

  const handleViewDetails = (pengaduan) => {
    setSelectedPengaduan(pengaduan);
    setShowModal(true);
  };

  const handleUpdateStatus = (pengaduanId, newStatus) => {
    console.log(`Update status pengaduan ${pengaduanId} menjadi ${newStatus}`);
    // Implementasi update status logic
  };

  const handleAddTindakan = (pengaduanId, tindakan) => {
    console.log(`Menambah tindakan untuk pengaduan ${pengaduanId}:`, tindakan);
    // Implementasi tambah tindakan logic
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="w-full max-w-full">
        {/* Header */}
        <PengaduanHeader 
          totalPengaduan={dataPengaduan.length}
          pengaduanBaru={dataPengaduan.filter(p => p.status === 'baru').length}
        />

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Statistics */}
          <PengaduanStats dataPengaduan={dataPengaduan} />

          {/* Filter */}
          <PengaduanFilter 
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedKategori={selectedKategori}
            setSelectedKategori={setSelectedKategori}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Table */}
          <PengaduanTable 
            dataPengaduan={filteredData}
            onViewDetails={handleViewDetails}
            onUpdateStatus={handleUpdateStatus}
          />

          {/* Modal Detail Pengaduan */}
          {showModal && selectedPengaduan && (
            <PengaduanModal
              pengaduan={selectedPengaduan}
              onClose={() => setShowModal(false)}
              onUpdateStatus={handleUpdateStatus}
              onAddTindakan={handleAddTindakan}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDesaPengaduanWarga;