import { Badge } from "@/components/ui/badge";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

function CompetitiveAdvantages() {
  const comparisons = [
    {
      aspect: "Deteksi Fraud",
      traditional: "Manual, reaktif setelah terjadi",
      ai: "Otomatis, proaktif sebelum terjadi",
    },
    {
      aspect: "Waktu Review",
      traditional: "Berhari-hari hingga berminggu-minggu",
      ai: "Real-time dalam hitungan detik",
    },
    {
      aspect: "Akurasi",
      traditional: "Tergantung expertise reviewer (35-40%)",
      ai: "Konsisten tinggi dengan ML (85%+)",
    },
    {
      aspect: "Skalabilitas",
      traditional: "Terbatas oleh jumlah reviewer",
      ai: "Unlimited, dapat handle ribuan RAB",
    },
    {
      aspect: "Learning",
      traditional: "Statis, tidak berkembang",
      ai: "Continuous learning dari data baru",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-100">Keunggulan</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mengapa Lebih Unggul?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Perbandingan sistem tradisional vs platform AI-powered
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto overflow-hidden rounded-xl border-2 border-gray-200">
          <div className="bg-gray-50 p-4 grid grid-cols-3 gap-4 border-b-2 border-gray-200">
            <div className="font-bold text-gray-900">Aspek</div>
            <div className="font-bold text-red-600">Sistem Tradisional</div>
            <div className="font-bold text-green-600">AI-Powered Platform</div>
          </div>
          {comparisons.map((comp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-4 grid grid-cols-3 gap-4 border-b border-gray-100 hover:bg-blue-50/50 transition-colors"
            >
              <div className="font-semibold text-gray-900">{comp.aspect}</div>
              <div className="text-gray-600 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-sm">{comp.traditional}</span>
              </div>
              <div className="text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm font-medium">{comp.ai}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CompetitiveAdvantages