// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle, Target, TrendingUp, XCircle, Zap } from "lucide-react";

function ProblemStatement() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-red-100 text-red-700 hover:bg-red-100">Tantangan Sistem Lama</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Manual Review vs AI-Powered Analysis
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dari proses manual yang lambat menuju otomasi intelligent yang akurat
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Before - Manual System */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="p-8 border-2 border-red-200 bg-red-50/50 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Sistem Manual</h3>
                  <p className="text-sm text-gray-600">Proses Tradisional</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "Review manual memakan waktu berhari-hari",
                  "Akurasi deteksi fraud hanya 35-40%",
                  "Terlambat mendeteksi penyimpangan",
                  "Beban kerja tinggi untuk reviewer",
                  "Tidak ada prediksi pola spending"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* After - AI System */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="p-8 border-2 border-green-200 bg-green-50/50 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">AI-Powered Platform</h3>
                  <p className="text-sm text-gray-600">Intelligent & Proactive</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "Real-time scoring dalam hitungan detik",
                  "Akurasi deteksi fraud mencapai 85%+",
                  "Deteksi anomali sebelum terjadi fraud",
                  "Otomasi membebaskan reviewer untuk fokus kasus kompleks",
                  "Prediksi pattern dengan machine learning"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12"
        >
          <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-blue-200 bg-blue-50/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-4xl font-bold text-blue-600">70%</span>
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-600 font-medium">Lebih Cepat</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-green-200 bg-green-50/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-4xl font-bold text-green-600">85%</span>
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-gray-600 font-medium">Accuracy Fraud Detection</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-all border-2 border-purple-200 bg-purple-50/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-4xl font-bold text-purple-600">3x</span>
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-gray-600 font-medium">Efisiensi Review</p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default ProblemStatement