// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Upload, Cpu, Eye, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Input Program & RAB",
    description: "Dinas menginput program anggaran dengan RAB detail, spesifikasi teknis, dan dokumen pendukung. AI langsung validasi harga vs HSPK.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Cpu,
    title: "Validasi Multi-Layer AI",
    description: "Sistem melakukan validasi berlapis: price check, spesifikasi material, timeline, dan kelayakan teknis. Deteksi potensi mark-up otomatis.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: Eye,
    title: "Monitoring Real-time",
    description: "Pantau progres fisik dengan bukti foto GPS+timestamp, video progress, dan laporan lapangan. Pembayaran bertahap berdasarkan milestone.",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
  },
  {
    icon: CheckCircle,
    title: "Transparansi & Laporan",
    description: "Publikasi real-time ke portal transparansi. Masyarakat bisa pantau, rating, dan lapor. Generate laporan audit otomatis.",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
  },
];

export default function HowItWorksTimeline() {
  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-blue-600 font-semibold mb-4 text-sm uppercase tracking-wider">
            Cara Kerja InfoKanMas
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Proses Transparansi dalam{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              4 Tahap
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dari perencanaan hingga pelaporan, setiap tahap divalidasi dengan teknologi AI dan bukti digital
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block max-w-7xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 transform -translate-y-1/2" />
            
            <div className="relative grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Connector dot */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl`}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <div className="mt-16 bg-white border-2 border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group cursor-pointer">
                    <div className={`inline-block px-4 py-1 rounded-full ${step.bgColor} text-sm font-semibold mb-4`}>
                      Tahap {index + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden max-w-2xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-green-200" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex gap-6"
                >
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl`}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow pb-8">
                    <div className={`inline-block px-4 py-1 rounded-full ${step.bgColor} text-sm font-semibold mb-3`}>
                      Tahap {index + 1}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="inline-block bg-blue-50 rounded-xl p-6 max-w-3xl border border-blue-100">
            <p className="text-2xl font-semibold text-gray-900 mb-2">
              Setiap Rupiah Terpantau, Setiap Proses Tervalidasi
            </p>
            <p className="text-gray-600">
              Dengan InfoKanMas, tidak ada ruang untuk manipulasi. Semua transparan dan akuntabel
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}