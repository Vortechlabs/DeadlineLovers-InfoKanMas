// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Clock, DollarSign, Award, Target } from "lucide-react";
import { useState, useEffect } from "react";

const metrics = [
  {
    icon: TrendingUp,
    label: "Peningkatan Transparansi",
    value: 95,
    suffix: "%",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Clock,
    label: "Pengurangan Waktu Audit",
    value: 75,
    suffix: "%",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: DollarSign,
    label: "Penghematan Biaya",
    value: 40,
    suffix: "%",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Users,
    label: "Kepuasan Stakeholder",
    value: 92,
    suffix: "%",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
  },
  {
    icon: Award,
    label: "Akurasi Data",
    value: 98,
    suffix: "%",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
  },
  {
    icon: Target,
    label: "Deteksi Anomali",
    value: 99,
    suffix: "%",
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50",
  },
];

const impactStats = [
  {
    title: "Institusi Terlayani",
    value: "100+",
    description: "Organisasi pemerintah dan swasta",
  },
  {
    title: "Data Terproses",
    value: "10M+",
    description: "Transaksi per hari",
  },
  {
    title: "Fraud Terdeteksi",
    value: "1,200+",
    description: "Kasus dalam setahun",
  },
  {
    title: "Penghematan Total",
    value: "$50M+",
    description: "Dalam 2 tahun terakhir",
  },
];

function AnimatedCounter({ end, duration = 2 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}</span>;
}

export default function MetricsImpact() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-green-600 font-semibold mb-4 text-sm uppercase tracking-wider">
            Dampak Nyata
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Hasil yang{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Terukur
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Data dan metrik yang membuktikan efektivitas platform kami dalam 
            meningkatkan transparansi dan akuntabilitas
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`${metric.bgColor} border-0 p-8 h-full hover:shadow-xl transition-all duration-300 group cursor-pointer`}>
                <div className="flex flex-col h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <metric.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <div className={`text-5xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-4`}>
                    <AnimatedCounter end={metric.value} />
                    {metric.suffix}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {metric.label}
                  </h3>

                  {/* Progress bar */}
                  <div className="mt-auto">
                    <div className="h-2 bg-white rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${metric.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-1 max-w-6xl mx-auto"
        >
          <div className="bg-white rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-center mb-12">
              Dampak Global Platform Kami
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    {stat.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-100 p-10">
            <div className="text-center">
              <div className="text-6xl mb-6">💬</div>
              <blockquote className="text-2xl font-medium text-gray-900 mb-6 italic">
                "Platform ini benar-benar mengubah cara kami mengelola anggaran. 
                Transparansi meningkat drastis dan proses audit menjadi jauh lebih efisien."
              </blockquote>
              <div className="font-semibold text-lg text-gray-900">Dr. Ahmad Budiman</div>
              <div className="text-gray-600">Direktur Keuangan, Kementerian ABC</div>
              <div className="flex justify-center gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
                    className="text-yellow-500 text-2xl"
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}