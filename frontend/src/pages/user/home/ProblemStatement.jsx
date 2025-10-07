// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AlertCircle, Eye, FileQuestion, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

const problems = [
  {
    icon: AlertCircle,
    title: "Kasus Korupsi Infrastruktur",
    description: "Seperti Jembatan Merah Sungai Gintung dengan dugaan korupsi Rp 13,2 miliar dan kualitas di bawah standar",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-100"
  },
  {
    icon: Eye,
    title: "Penggelembungan Dana Proyek",
    description: "Seperti kasus MCK Desa Bojanegara dengan bangunan kecil tidak sebanding anggaran Rp 30 juta",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100"
  },
  {
    icon: FileQuestion,
    title: "Mark-up Proyek Jalan",
    description: "Seperti di Desa Sumberejo dengan selisih Rp 400 juta dari panjang dan ketebalan aspal tidak sesuai kontrak",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100"
  },
  {
    icon: TrendingDown,
    title: "Data Penerima Bansos Tidak Akurat",
    description: "7% data penerima bantuan sosial tidak valid, termasuk penerima yang sudah meninggal dunia",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-100"
  },
];

export default function ProblemStatement() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-blue-600 font-semibold mb-4 text-sm uppercase tracking-wider">
            Studi Kasus di Purbalingga
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Masalah Nyata Pengelolaan Anggaran di{" "}
            <span className="text-blue-600">
              Purbalingga
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Berdasarkan studi kasus nyata yang terjadi dalam beberapa tahun terakhir, 
            berikut beberapa masalah serius yang membutuhkan solusi teknologi
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`${problem.bgColor} border ${problem.borderColor} p-6 h-full hover:shadow-lg transition-all duration-300 group cursor-pointer hover:border-gray-300`}>
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${problem.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                      <problem.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">
                        {problem.title}
                      </h3>
                      
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {problem.description}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={`h-1 bg-gradient-to-r ${problem.color} rounded-full mt-4`}
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-block bg-blue-50 rounded-xl p-6 max-w-3xl border border-blue-100">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              InfoKanMas Hadir Sebagai Solusi Nyata
            </p>
            <p className="text-gray-600 text-sm">
              Dengan validasi multi-layer berbasis AI, kami mencegah kasus serupa terulang di masa depan
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}