// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Brain, Zap, Shield, BarChart3, Bell, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analytics",
    description: "Machine learning untuk analisis pola pengeluaran dan deteksi anomali otomatis",
    gradient: "from-blue-500 to-cyan-500",
    features: ["Prediksi Trend", "Pattern Recognition", "Auto Classification"],
  },
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "Pemrosesan data anggaran secara real-time dengan performa tinggi",
    gradient: "from-purple-500 to-pink-500",
    features: ["Live Dashboard", "Instant Updates", "Fast Query"],
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description: "Keamanan berlapis dengan enkripsi end-to-end dan blockchain technology",
    gradient: "from-green-500 to-emerald-500",
    features: ["256-bit Encryption", "Blockchain Audit", "Access Control"],
  },
  {
    icon: BarChart3,
    title: "Smart Visualization",
    description: "Visualisasi data interaktif yang mudah dipahami untuk semua stakeholder",
    gradient: "from-orange-500 to-red-500",
    features: ["Interactive Charts", "Custom Reports", "Export Options"],
  },
  {
    icon: Bell,
    title: "Intelligent Alerts",
    description: "Notifikasi cerdas untuk anomali, deadline, dan perubahan penting",
    gradient: "from-yellow-500 to-orange-500",
    features: ["Smart Notifications", "Custom Triggers", "Multi-Channel"],
  },
  {
    icon: Lock,
    title: "Compliance Ready",
    description: "Memenuhi standar regulasi dan audit pemerintahan dengan dokumentasi lengkap",
    gradient: "from-indigo-500 to-purple-500",
    features: ["Auto Compliance", "Audit Trail", "Regulatory Updates"],
  },
];

export default function AIFeaturesShowcase() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full blur-3xl"
        />
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
            Fitur Unggulan
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Teknologi{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Terdepan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Solusi lengkap berbasis kecerdasan buatan untuk transparansi dan 
            akuntabilitas pengelolaan anggaran yang optimal
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white border-2 border-gray-100 p-8 h-full hover:shadow-2xl hover:border-blue-200 transition-all duration-300 group cursor-pointer">
                <div className="flex flex-col h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                    {feature.description}
                  </p>

                  <div className="space-y-2">
                    {feature.features.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`} />
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Center showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-1 max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">
              Semua Fitur Terintegrasi dalam Satu Platform
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Tidak perlu berpindah-pindah aplikasi. Kelola seluruh aspek transparansi 
              anggaran dari satu dashboard yang powerful dan mudah digunakan
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Dashboard Terpadu", "API Integration", "Mobile Ready", "Cloud Native"].map((tag, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 rounded-full font-medium text-sm"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}