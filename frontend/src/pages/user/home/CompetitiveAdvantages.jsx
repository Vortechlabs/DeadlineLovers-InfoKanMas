// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Check, X, Sparkles } from "lucide-react";

const comparisonFeatures = [
  { feature: "AI-Powered Anomaly Detection", us: true, others: false },
  { feature: "Real-time Data Processing", us: true, others: false },
  { feature: "Blockchain Audit Trail", us: true, others: false },
  { feature: "Multi-language Support", us: true, others: true },
  { feature: "Custom Report Generation", us: true, others: true },
  { feature: "Mobile Application", us: true, others: false },
  { feature: "Predictive Analytics", us: true, others: false },
  { feature: "Automated Compliance Checking", us: true, others: false },
  { feature: "24/7 AI Monitoring", us: true, others: false },
  { feature: "API Integration", us: true, others: true },
];

const advantages = [
  {
    title: "10x Lebih Cepat",
    description: "Proses analisis data yang biasanya memakan waktu berhari-hari, kini hanya butuh beberapa menit dengan AI kami",
    gradient: "from-blue-500 to-cyan-500",
    value: "10x",
  },
  {
    title: "99.9% Akurat",
    description: "Tingkat akurasi deteksi anomali dan fraud detection tertinggi di industri berkat machine learning",
    gradient: "from-purple-500 to-pink-500",
    value: "99.9%",
  },
  {
    title: "40% Hemat Biaya",
    description: "Otomatisasi proses audit dan monitoring mengurangi biaya operasional secara signifikan",
    gradient: "from-green-500 to-emerald-500",
    value: "40%",
  },
  {
    title: "24/7 Monitoring",
    description: "Sistem AI yang tidak pernah tidur, memantau setiap transaksi dan aktivitas sepanjang waktu",
    gradient: "from-orange-500 to-red-500",
    value: "24/7",
  },
];

export default function CompetitiveAdvantages() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-blue-600 font-semibold mb-4 text-sm uppercase tracking-wider">
            Keunggulan Kompetitif
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Mengapa Memilih{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Platform Kami?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bandingkan fitur kami dengan solusi lain dan lihat perbedaan yang signifikan
          </p>
        </motion.div>

        {/* Key advantages grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white border-2 border-gray-100 p-6 h-full hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
                <div className={`text-5xl font-bold bg-gradient-to-r ${advantage.gradient} bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {advantage.value}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b-2 border-gray-100">
              <div className="text-lg font-semibold text-gray-700">Fitur</div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg">
                  <Sparkles className="w-5 h-5" />
                  Platform Kami
                </div>
              </div>
              <div className="text-center text-lg font-semibold text-gray-500">
                Solusi Lain
              </div>
            </div>

            {/* Comparison rows */}
            <div className="divide-y divide-gray-100">
              {comparisonFeatures.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="grid grid-cols-3 gap-4 p-6 hover:bg-blue-50/30 transition-colors duration-200"
                >
                  <div className="text-gray-700 font-medium flex items-center">
                    {item.feature}
                  </div>
                  <div className="flex justify-center items-center">
                    {item.us ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg"
                      >
                        <Check className="w-6 h-6 text-white" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
                      >
                        <X className="w-6 h-6 text-gray-400" />
                      </motion.div>
                    )}
                  </div>
                  <div className="flex justify-center items-center">
                    {item.others ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                        className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center"
                      >
                        <Check className="w-6 h-6 text-green-600" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                        className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"
                      >
                        <X className="w-6 h-6 text-red-500" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-1 max-w-3xl">
            <div className="bg-white rounded-2xl p-8">
              <p className="text-2xl font-semibold text-gray-900 mb-2">
                Siap untuk Upgrade ke Sistem Terbaik?
              </p>
              <p className="text-gray-600 mb-6">
                Join dengan 100+ institusi yang sudah mempercayai platform kami
              </p>
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Jadwalkan Demo Gratis
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}