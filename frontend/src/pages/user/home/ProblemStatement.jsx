// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AlertCircle, Eye, FileQuestion, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

const problems = [
  {
    icon: AlertCircle,
    title: "Kurangnya Transparansi",
    description: "Masyarakat kesulitan mengakses informasi detail penggunaan anggaran publik secara real-time",
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-50",
  },
  {
    icon: Eye,
    title: "Monitoring Manual",
    description: "Proses audit dan monitoring anggaran masih dilakukan secara manual dan memakan waktu lama",
    color: "from-orange-500 to-yellow-500",
    bgColor: "bg-orange-50",
  },
  {
    icon: FileQuestion,
    title: "Data Tidak Terstruktur",
    description: "Informasi anggaran tersebar di berbagai sistem dan format yang berbeda-beda",
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-50",
  },
  {
    icon: TrendingDown,
    title: "Potensi Kebocoran",
    description: "Sulitnya deteksi dini terhadap anomali dan potensi penyalahgunaan anggaran",
    color: "from-amber-500 to-red-500",
    bgColor: "bg-amber-50",
  },
];

export default function ProblemStatement() {
  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-50/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-red-600 font-semibold mb-4 text-sm uppercase tracking-wider">
            Tantangan yang Dihadapi
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Masalah dalam Pengelolaan{" "}
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Anggaran Publik
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sistem konvensional menghadapi berbagai kendala yang menghambat 
            transparansi dan akuntabilitas pengelolaan anggaran
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`${problem.bgColor} border-0 p-8 h-full hover:shadow-xl transition-shadow duration-300 group cursor-pointer`}>
                <div className="flex flex-col h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${problem.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <problem.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {problem.title}
                  </h3>
                  
                  <p className="text-gray-700 leading-relaxed flex-grow">
                    {problem.description}
                  </p>

                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={`h-1 bg-gradient-to-r ${problem.color} rounded-full mt-6`}
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
          className="text-center mt-16"
        >
          <div className="inline-block bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 max-w-3xl">
            <p className="text-2xl font-semibold text-gray-900 mb-2">
              Saatnya Berubah ke Sistem yang Lebih Baik
            </p>
            <p className="text-gray-600">
              Platform kami hadir untuk mengatasi semua masalah ini dengan teknologi AI terdepan
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}