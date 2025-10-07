// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, TrendingUp } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Clean background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6 font-medium text-sm border border-blue-100"
            >
              <Sparkles className="w-4 h-4" />
              Solusi Transparansi Anggaran Kabupaten Purbalingga
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              InfoKanMas Purbalingga
              <span className="block text-blue-600 mt-2">Transparansi Total Anggaran Daerah</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Sistem monitoring real-time semua anggaran publik Kabupaten Purbalingga. 
              Dengan validasi AI multi-layer, pastikan setiap rupiah tepat sasaran 
              dan bebas dari penyimpangan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg shadow-sm hover:shadow-md transition-all">
                Mulai Eksplorasi
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-lg transition-all">
                Lihat Kasus Studi
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center lg:text-left"
              >
                <div className="text-xl 2xl:text-2xl font-bold text-blue-600">Rp 200M+</div>
                <div className="text-sm text-gray-600">APBD Terpantau</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-center lg:text-left"
              >
                <div className="text-xl 2xl:text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-gray-600">Transparansi</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-center lg:text-left"
              >
                <div className="text-xl 2xl:text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">Monitoring AI</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative "
          >
            <div className="relative">
              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-8 bg-white rounded-xl shadow-lg p-4 w-56 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Validasi Multi-Layer</div>
                    <div className="text-xs text-gray-500">AI + GPS + Dokumentasi</div>
                  </div>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "92%" }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="h-full bg-blue-500"
                  />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-8 left-8 bg-white rounded-xl shadow-lg p-4 w-56 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Deteksi Anomali</div>
                    <div className="text-xs text-gray-500">Real-time AI Analysis</div>
                  </div>
                </div>
                <div className="flex gap-1 h-16 items-end">
                  {[35, 65, 45, 80, 60, 85, 70].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
                      className="flex-1 bg-blue-500 rounded-sm opacity-80"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Center main visual */}
              <div className="w-full h-80 bg-gradient-to-br from-blue-50 to-white rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="font-semibold text-gray-900 mb-2">InfoKanMas Purbalingga</h3>
                  <p className="text-sm text-gray-600 max-w-xs">
                    Informasi Keterbukaan Masyarakat Purbalingga
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}