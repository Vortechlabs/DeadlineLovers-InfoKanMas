// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Check, X, Sparkles } from "lucide-react";

const comparisonFeatures = [
  { feature: "Validasi Harga AI vs HSPK", us: true, others: false },
  { feature: "Monitoring Real-time Proyek", us: true, others: false },
  { feature: "Validasi Foto GPS & Timestamp", us: true, others: false },
  { feature: "Portal Transparansi Publik", us: true, others: false },
  { feature: "Deteksi Anomali Otomatis", us: true, others: false },
  { feature: "Konfirmasi Penerima Bansos via SMS", us: true, others: false },
  { feature: "Milestone-based Payment", us: true, others: false },
  { feature: "Rating System oleh Masyarakat", us: true, others: false },
  { feature: "Integrasi Data Dukcapil", us: true, others: false },
  { feature: "Laporan Masyarakat Real-time", us: true, others: false },
];

const advantages = [
  {
    title: "70% Lebih Cepat",
    description: "Proses monitoring proyek yang manual kini otomatis dengan validasi AI real-time",
    gradient: "from-blue-500 to-cyan-500",
    value: "70%",
  },
  {
    title: "95% Akurasi Data",
    description: "Validasi data penerima bansos dengan NIK Dukcapil mengurangi kesalahan data",
    gradient: "from-purple-500 to-pink-500",
    value: "95%",
  },
  {
    title: "40% Penghematan",
    description: "Deteksi mark-up dan penyimpangan anggaran menghemat APBD secara signifikan",
    gradient: "from-green-500 to-emerald-500",
    value: "40%",
  },
  {
    title: "100% Transparan",
    description: "Seluruh proses anggaran terbuka untuk dipantau masyarakat kapan saja",
    gradient: "from-orange-500 to-red-500",
    value: "100%",
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
            Keunggulan InfoKanMas
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Mengapa{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              InfoKanMas?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Perbandingan fitur unggulan InfoKanMas dengan sistem konvensional di Purbalingga
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold shadow-lg">
                  <Sparkles className="w-5 h-5" />
                  InfoKanMas
                </div>
              </div>
              <div className="text-center text-lg font-semibold text-gray-500">
                Sistem Konvensional
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
      </div>
    </section>
  );
}