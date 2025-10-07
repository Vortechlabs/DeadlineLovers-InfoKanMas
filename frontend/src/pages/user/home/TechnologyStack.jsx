// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Brain, Cloud, Database, Lock, Monitor, Globe } from "lucide-react";

const technologies = [
  {
    category: "AI & Machine Learning",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    items: [
      { name: "Computer Vision", description: "Analisis foto progress proyek" },
      { name: "Natural Language Processing", description: "Analisis laporan dan dokumen" },
      { name: "Anomaly Detection", description: "Deteksi penyimpangan anggaran" },
      { name: "Predictive Analytics", description: "Prediksi risiko proyek" },
    ],
  },
  {
    category: "Cloud & Infrastructure",
    icon: Cloud,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    items: [
      { name: "Cloud Hosting", description: "Hosting yang scalable dan reliable" },
      { name: "Real-time Database", description: "Database untuk data real-time" },
      { name: "API Integration", description: "Integrasi dengan sistem pemerintah" },
      { name: "Load Balancer", description: "Penyeimbang beban server" },
    ],
  },
  {
    category: "Web Development",
    icon: Monitor,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    items: [
      { name: "React.js", description: "Framework frontend modern" },
      { name: "Responsive Design", description: "Akses dari desktop & mobile" },
      { name: "Real-time Updates", description: "Update data secara live" },
      { name: "Progressive Web App", description: "Pengalaman seperti aplikasi" },
    ],
  },
  {
    category: "Security & Compliance",
    icon: Lock,
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-50",
    items: [
      { name: "Authentication System", description: "Sistem login yang aman" },
      { name: "Role-based Access", description: "Hak akses berdasarkan peran" },
      { name: "Audit Trail", description: "Riwayat aktivitas tercatat" },
      { name: "Data Encryption", description: "Enkripsi data sensitif" },
    ],
  },
  {
    category: "Data & Analytics",
    icon: Database,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
    items: [
      { name: "Data Validation", description: "Validasi data penerima bansos" },
      { name: "Real-time Dashboard", description: "Dashboard monitoring live" },
      { name: "Report Generation", description: "Generate laporan otomatis" },
      { name: "Data Visualization", description: "Visualisasi data interaktif" },
    ],
  },
  {
    category: "Public Transparency",
    icon: Globe,
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50",
    items: [
      { name: "Public Portal", description: "Akses terbuka untuk masyarakat" },
      { name: "Reporting System", description: "Sistem pelaporan masyarakat" },
      { name: "Rating System", description: "Sistem penilaian proyek" },
      { name: "Data Export", description: "Ekspor data untuk analisis" },
    ],
  },
];

export default function TechnologyStack() {
  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-blue-600 font-semibold mb-4 text-sm uppercase tracking-wider">
            Teknologi Website
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Dibangun dengan{" "}
            <span className="bg-gradient-to-r from-blue-600  to-blue-700 bg-clip-text text-transparent">
              Teknologi Modern
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Website InfoKanMas menggunakan teknologi terbaru untuk memastikan transparansi 
            anggaran Purbalingga dapat diakses dengan mudah dan aman
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white border-2 border-gray-100 p-8 h-full hover:shadow-2xl hover:border-blue-200 transition-all duration-300 group">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                    >
                      <tech.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {tech.category}
                      </h3>
                    </div>
                  </div>

                  {/* Technologies list */}
                  <div className="space-y-4 flex-grow">
                    {tech.items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                        className={`${tech.bgColor} rounded-lg p-3 hover:shadow-md transition-shadow duration-200`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tech.color} mt-2 flex-shrink-0`} />
                          <div className="flex-grow min-w-0">
                            <div className="font-semibold text-gray-900 text-sm truncate">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-600 mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Website Features Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 max-w-6xl mx-auto border border-blue-100"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Fitur Website InfoKanMas
              </h3>
              <p className="text-gray-600 mb-6">
                Website dengan fitur lengkap untuk transparansi anggaran:
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Dashboard Real-time",
                  "Monitoring Proyek", 
                  "Validasi Data Penerima",
                  "Laporan Masyarakat",
                  "Rating Kualitas",
                  "Export Data"
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    {feature}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <Monitor className="w-32 h-32 text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600">
                Akses mudah dari desktop dan mobile browser
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 grid md:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {[
            { label: "Uptime Website", value: "99.9%", color: "from-green-500 to-emerald-500" },
            { label: "Response Time", value: "<100ms", color: "from-blue-500 to-cyan-500" },
            { label: "Data Terproses", value: "1TB+", color: "from-purple-500 to-pink-500" },
            { label: "Pengguna Website", value: "10K+", color: "from-orange-500 to-red-500" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.0 + i * 0.1 }}
              className="text-center"
            >
              <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}