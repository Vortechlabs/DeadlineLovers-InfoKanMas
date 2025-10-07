# 🏛️ InfoKanMas

<div align="center">

**Informasi Keterbukaan Anggaran Masyarakat**

Platform Transparansi Anggaran Sosial Berbasis Kecerdasan Buatan untuk Meningkatkan Akuntabilitas Dana Publik

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Laravel](https://img.shields.io/badge/Laravel-10.x-FF2D20?logo=laravel)](https://laravel.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?logo=python)](https://www.python.org/)

</div>

---

## 📋 Daftar Isi

- [Tentang InfoKanMas](#-tentang-infokanmas)
- [Latar Belakang](#-latar-belakang)
- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Instalasi](#-instalasi)
- [Roadmap](#-roadmap)
- [Tim Pengembang](#-tim-pengembang)
- [Lisensi](#-lisensi)

---

## 🎯 Tentang InfoKanMas

InfoKanMas adalah platform monitoring real-time untuk semua jenis dana publik dengan sistem validasi berlapis menggunakan teknologi AI/ML. Platform ini dirancang untuk meningkatkan transparansi dan akuntabilitas dalam pengelolaan anggaran daerah di Indonesia.

### Stakeholder Utama

**Admin Kabupaten** - Monitoring dan approval anggaran dengan AI recommendation

**Admin Daerah** - Pengajuan RAB dan pelaporan realisasi program

**Masyarakat** - Akses informasi transparan dan pelaporan partisipatif

### Visi

Mewujudkan pengelolaan anggaran publik yang transparan, akuntabel, dan bebas korupsi melalui pemanfaatan teknologi AI/ML untuk Indonesia yang lebih baik.

---

## 📖 Latar Belakang

Pengelolaan anggaran publik di Indonesia masih menghadapi berbagai tantangan serius terkait transparansi dan akuntabilitas. Berdasarkan studi kasus di Kabupaten Purbalingga, Jawa Tengah, ditemukan beberapa pola penyimpangan yang umum terjadi.

### Kasus yang Terdokumentasi

**Pembangunan Jembatan Merah (2022-2023)**
- Nilai Proyek: Rp 13,2 miliar
- Masalah: Manipulasi laporan pekerjaan dan kualitas konstruksi tidak sesuai spesifikasi
- Dampak: Material di bawah standar, jembatan hanya dapat dilalui kendaraan kecil

**Dugaan Penggelembungan Dana MCK Desa Bojanegara (2024)**
- Nilai Proyek: Rp 30 juta (Dana Desa)
- Masalah: Ukuran bangunan (1,5 x 3 meter) tidak sebanding dengan anggaran
- Dampak: Tidak ada transparansi rincian penggunaan dana

**Mark-up Proyek Jalan Desa Sumberejo (2024)**
- Nilai Proyek: Rp 1 miliar
- Laporan: Jalan 2 km dengan ketebalan aspal 10 cm
- Realitas: Hanya 1,5 km terealisasi dengan ketebalan 3-4 cm
- Estimasi kerugian: Rp 400 juta

**Ketidaktepatan Data Penerima Bantuan Sosial (2020-2022)**
- Temuan: 7% data penerima tidak valid
- Masalah: Penerima sudah meninggal, nominal tidak sesuai laporan

### Pola Penyimpangan

Dari berbagai kasus di atas, teridentifikasi pola-pola berikut:
- Mark-up anggaran dan manipulasi volume pekerjaan
- Penyalahgunaan dana desa
- Kesalahan data penerima bantuan sosial
- Kurangnya dokumentasi dan verifikasi lapangan
- Minimnya partisipasi publik dalam pengawasan

---

## ✨ Fitur Utama

### 🔍 Cakupan Monitoring

Platform ini memonitor enam kategori utama anggaran daerah:

**Bantuan Sosial & Bantuan Langsung**

Sembako, bantuan tunai, beasiswa dengan validasi NIK dan konfirmasi penerima langsung

**Pembangunan Infrastruktur**

Jalan, jembatan, gedung publik dengan sistem milestone bertahap dan dokumentasi wajib

**Perjalanan Dinas**

Transport, akomodasi, uang harian dengan GPS tracking dan dokumentasi kegiatan

**Belanja Operasional**

ATK, konsumsi, utilitas dengan validasi harga pasar dan dokumentasi penggunaan

**Pengadaan Barang/Jasa**

Komputer, kendaraan, peralatan dengan e-tender transparan dan verifikasi barang

**Kegiatan/Event**

Seminar, pelatihan, festival dengan daftar hadir digital dan dokumentasi peserta

### 🛡️ Sistem Validasi Berlapis

**Layer 1: AI Price Check**

Membandingkan harga dengan HSPK dan harga pasar real-time, alert otomatis jika markup >20%

**Layer 2: Document Validation**

Verifikasi keaslian dokumen dengan computer vision, deteksi manipulasi dan dokumen palsu

**Layer 3: GPS & Location Tracking**

Memastikan kegiatan benar terjadi di lokasi yang diklaim dengan timeline tracking

**Layer 4: Photo/Video Evidence**

Dokumentasi visual setiap tahap dengan analisis before-after menggunakan AI

**Layer 5: Direct Confirmation**

Konfirmasi langsung dari penerima manfaat via SMS/WhatsApp dengan QR code tracking

**Layer 6: Public Monitoring**

Portal transparan untuk akses publik dengan sistem pelaporan partisipatif

**Layer 7: Independent Audit**

Random sampling untuk verifikasi lapangan oleh tim surveyor independen

### 🤖 Kecerdasan Buatan

**Fraud Detection System**

Deteksi otomatis untuk anggaran tidak wajar, dokumen palsu, duplikasi pengajuan, dan pola vendor mencurigakan

**Smart RAB Scoring**

Penilaian otomatis kelayakan RAB berdasarkan Completeness (30%), Feasibility (25%), Impact (20%), Track Record (15%), dan Urgency (10%)

Output berupa score 0-100 dengan rekomendasi: Auto-approve (≥80), Manual review (50-79), atau Reject (<50)

**Budget Forecasting**

Prediksi kebutuhan anggaran menggunakan time series analysis dengan confidence interval 85-92%

**Real-time Analytics**

Dashboard interaktif dengan alert otomatis untuk anomali spending dan perbandingan dengan daerah sejenis

---

## 🛠️ Teknologi

### Arsitektur Sistem

```
┌─────────────────────────────────────────────────────┐
│                  FRONTEND LAYER                     │
│      React.js + Tailwind CSS + Recharts             │
│  Admin Pusat | Admin Daerah | Public Portal         │
└────────────────────┬────────────────────────────────┘
                     │ REST API (JWT Auth)
┌────────────────────┴────────────────────────────────┐
│                  BACKEND LAYER                      │
│         Laravel 10 + MySQL + Redis                  │
│  Auth Service | RAB Management | Spending Tracker   │
└────────────────────┬────────────────────────────────┘
                     │ HTTP/REST
┌────────────────────┴────────────────────────────────┐
│                  AI/ML LAYER                        │
│      Python + Flask/FastAPI + Scikit-learn          │
│  Fraud Detection | RAB Scoring | Budget Prediction  │
└─────────────────────────────────────────────────────┘
```

### Tech Stack

**Frontend**
- Framework: React.js 18.x
- Styling: Tailwind CSS
- Charts: Recharts / Chart.js
- HTTP Client: Axios
- State Management: React Hooks

**Backend**
- Framework: Laravel 10
- Database: MySQL 8.0
- Cache: Redis
- Authentication: Laravel Sanctum (JWT)
- Queue: Laravel Queue

**AI/ML**
- Language: Python 3.9+
- API Framework: Flask / FastAPI
- ML Library: Scikit-learn
- Data Processing: Pandas + NumPy
- Models: Isolation Forest, Random Forest, ARIMA

---

## 📦 Instalasi

### Prerequisites

Pastikan sistem Anda telah terinstall:
- Node.js >= 16.x
- PHP >= 8.1
- Composer
- MySQL >= 8.0
- Python >= 3.9

### Setup Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

### Setup AI/ML Service

```bash
cd ai-service
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Akses Aplikasi

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- AI/ML API: http://localhost:5000

---

## 🗺️ Roadmap

### Phase 1: MVP Development

**Status**: Selesai dalam 6 hari (2 hari perencanaan + 4 hari development)

**Deliverables**:
- Multi-role authentication system
- Basic RAB submission dan approval workflow
- Simple fraud detection model
- Public transparency dashboard
- Core API endpoints

### Phase 2: AI Enhancement

**Fitur**:
- Advanced fraud detection dengan deep learning
- OCR untuk ekstraksi data otomatis
- NLP untuk analisis laporan masyarakat
- Computer vision untuk validasi foto
- Graph neural network untuk deteksi fraud network

### Phase 3: Mobile Application

**Fitur**:
- Mobile app untuk Admin Daerah
- Mobile app untuk penerima manfaat
- GPS tracking terintegrasi
- Offline mode

### Phase 4: Integration & Scale

**Fitur**:
- Integrasi dengan SIPD
- Integrasi dengan e-Budgeting
- API terbuka untuk peneliti
- Multi-region deployment

---

## 👥 Tim Pengembang

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/VortechLabs">
        <img 
          src="https://i.ibb.co.com/Lzc8y7jn/ibe.jpg" 
          width="100px" 
          alt="Al Zaki Ibra Ramadani"
        />
      </a>
      <br />
      <sub><b>Al Zaki Ibra Ramadani</b></sub>
      <br />
      <sub>Frontend Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/SyifaIsnan">
        <img 
          src="https://i.ibb.co.com/3ydwfDdM/Whats-App-Image-2025-10-04-at-16-23-13.jpg" 
          width="100px" 
          alt="Syifa Isnantyana Putri"
        />
      </a>
      <br />
      <sub><b>Syifa Isnantyana Putri</b></sub>
      <br />
      <sub>Backend Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/aisalth">
        <img 
          src="https://i.ibb.co.com/KjXQKTZf/Tak-berjudul17-20251004195320-2.png" 
          width="100px" 
          alt="Aisyah Altho Funisa"
        />
      </a>
      <br />
      <sub><b>Aisyah Altho Funisa</b></sub>
      <br />
      <sub>ML Engineer</sub>
    </td>
  </tr>
</table>

**Timeline Pengembangan**:
- Hari 1-2: Perencanaan dan diskusi konsep
- Hari 3-6: Development intensif (4 hari)

### Kontribusi

Proyek ini terbuka untuk kontribusi. Kami menyambut kontribusi dalam bentuk:
- Code contribution (frontend, backend, ML)
- Bug reports dan feature requests
- Dokumentasi dan tutorial
- Testing dan quality assurance

Lihat [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan lengkap.

---

## 📊 Dampak yang Diharapkan

### Dampak Finansial

Berdasarkan estimasi konservatif untuk kabupaten dengan APBD Rp 2 Triliun:

**Estimasi Kebocoran Tanpa Sistem**:
- Infrastruktur: 15-20% (Rp 90-120 M)
- Operasional: 10-15% (Rp 30-45 M)
- Bantuan Sosial: 20-25% (Rp 40-50 M)
- Perjalanan Dinas: 30-40% (Rp 30-40 M)
- Total kebocoran: Rp 190-255 Miliar per tahun

**Dengan InfoKanMas**:
- Total savings: Rp 135-220 Miliar per tahun
- Biaya implementasi: Rp 1 Miliar (one-time)
- Biaya operasional: Rp 800 Juta per tahun
- ROI tahun pertama: 7,400% - 12,100%
- Break-even time: 1 bulan

### Dampak Non-Finansial

**Peningkatan Transparansi**

Semua program dapat diakses publik dengan dokumentasi lengkap dan monitoring real-time

**Peningkatan Akuntabilitas**

Validasi berlapis mencegah penyimpangan dengan audit trail lengkap

**Peningkatan Kepercayaan Publik**

Partisipasi masyarakat dalam pengawasan dan transparansi total

**Efisiensi Birokrasi**

Otomasi proses approval dan pengurangan paperwork

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

```
Copyright (c) 2024 InfoKanMas Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Kontak

**Email**: info@infokanmas.id

**Website**: https://infokanmas.id (under construction)

**GitHub**: https://github.com/infokanmas

### Dokumentasi

- Dokumentasi lengkap: https://docs.infokanmas.id (coming soon)
- API Documentation: https://api.infokanmas.id/docs (coming soon)
- Video tutorial: https://youtube.com/@infokanmas (coming soon)

---

## 🙏 Ucapan Terima Kasih

Proyek ini terinspirasi dari berbagai inisiatif transparansi anggaran di Indonesia dan dunia. Terima kasih kepada:

- Komisi Pemberantasan Korupsi (KPK) untuk data dan insight
- Badan Pemeriksa Keuangan (BPK) untuk metodologi audit
- Open Government Partnership (OGP) Indonesia
- Komunitas open source
- Para peneliti dan aktivis anti-korupsi

---

<div align="center">

**Dibuat dengan komitmen untuk Indonesia yang lebih transparan dan akuntabel**

Jika Anda tertarik dengan transparansi anggaran dan teknologi untuk kebaikan sosial, beri kami ⭐

[⬆ Kembali ke Atas](#-infokanmas)

</div>
