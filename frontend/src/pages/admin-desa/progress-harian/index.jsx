import React, { useState } from 'react';
import ProgressHeader from './ProgressHeader';
import ProgressStats from './ProgressStats';
import ProgressTable from './ProgressTable';
import ProgressModal from './ProgressModal';
import ProgressTimeline from './ProgressTimeline';

const AdminDesaProgressHarian = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Data progress harian berdasarkan dokumen SiTRA
  const dailyProgress = [
    {
      id: 'PRJ-001',
      name: 'Pembangunan Jalan Desa Sumberejo 2km',
      location: 'Desa Sumberejo',
      tanggal: '2024-10-10',
      milestone: 'Milestone 1: Pekerjaan Tanah (20%)',
      progress: 85,
      status: 'selesai',
      dokumentasi: {
        foto: 5,
        video: 2,
        gps: true,
        timestamp: true
      },
      bukti: [
        {
          type: 'foto',
          url: '/foto-jalan-1.jpg',
          description: 'Foto sebelum - jalan tanah berbatu',
          timestamp: '2024-10-10 08:00',
          gps: '-7.388xxx, 109.361xxx'
        },
        {
          type: 'foto',
          url: '/foto-jalan-2.jpg',
          description: 'Progress penggalian tanah',
          timestamp: '2024-10-10 12:30',
          gps: '-7.388xxx, 109.361xxx'
        },
        {
          type: 'video',
          url: '/video-progress-1.mp4',
          description: 'Video 360° proses pekerjaan',
          duration: '5 menit'
        }
      ],
      validasi: {
        ai_verified: true,
        gps_match: true,
        timestamp_valid: true,
        duplicate_check: false
      }
    },
    {
      id: 'PRJ-002',
      name: 'Pembangunan MCK Dusun 1',
      location: 'Dusun 1',
      tanggal: '2024-10-10',
      milestone: 'Milestone 2: Fondasi (40%)',
      progress: 60,
      status: 'sedang_berjalan',
      dokumentasi: {
        foto: 3,
        video: 1,
        gps: true,
        timestamp: true
      },
      bukti: [
        {
          type: 'foto',
          url: '/foto-mck-1.jpg',
          description: 'Pondasi sudah dicor',
          timestamp: '2024-10-10 09:15',
          gps: '-7.389xxx, 109.362xxx'
        }
      ],
      validasi: {
        ai_verified: true,
        gps_match: true,
        timestamp_valid: true,
        duplicate_check: false
      }
    },
    {
      id: 'PRJ-003',
      name: 'Perbaikan Drainase',
      location: 'Jl. Desa Utama',
      tanggal: '2024-10-10',
      milestone: 'Milestone 1: Pembersihan (20%)',
      progress: 45,
      status: 'sedang_berjalan',
      dokumentasi: {
        foto: 2,
        video: 0,
        gps: true,
        timestamp: true
      },
      bukti: [
        {
          type: 'foto',
          url: '/foto-drainase-1.jpg',
          description: 'Area drainase sebelum dibersihkan',
          timestamp: '2024-10-10 07:45',
          gps: '-7.387xxx, 109.360xxx'
        }
      ],
      validasi: {
        ai_verified: false,
        gps_match: true,
        timestamp_valid: true,
        duplicate_check: false
      }
    },
    {
      id: 'PRJ-004',
      name: 'Penerangan Jalan Umum',
      location: 'Jl. Poros Desa',
      tanggal: '2024-10-10',
      milestone: 'Milestone 1: Pemasangan Tiang (30%)',
      progress: 30,
      status: 'tertunda',
      dokumentasi: {
        foto: 1,
        video: 0,
        gps: false,
        timestamp: true
      },
      bukti: [],
      validasi: {
        ai_verified: false,
        gps_match: false,
        timestamp_valid: true,
        duplicate_check: false
      }
    }
  ];

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleApproveProgress = (projectId) => {
    console.log(`Menyetujui progress untuk proyek ${projectId}`);
    // Implementasi approval logic
  };

  const handleRequestRevision = (projectId) => {
    console.log(`Meminta revisi untuk proyek ${projectId}`);
    // Implementasi revision request logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="w-full min-h-screen max-w-full">
        {/* Header */}
        <ProgressHeader 
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6 min-h-screen">
          {/* Statistics */}
          <ProgressStats progressData={dailyProgress} />

          {/* Progress Timeline */}
          <ProgressTimeline progressData={dailyProgress} />

          {/* Progress Table */}
          <ProgressTable 
            progressData={dailyProgress}
            onViewDetails={handleViewDetails}
            onApproveProgress={handleApproveProgress}
            onRequestRevision={handleRequestRevision}
          />

          {/* Modal Detail Progress */}
          {showModal && selectedProject && (
            <ProgressModal
              project={selectedProject}
              onClose={() => setShowModal(false)}
              onApprove={handleApproveProgress}
              onRequestRevision={handleRequestRevision}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDesaProgressHarian;