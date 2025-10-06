// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Building2, GraduationCap, Heart, Landmark } from "lucide-react";
import { useState } from "react";

const scenarios = [
  {
    icon: Landmark,
    title: "Pemerintah Daerah",
    subtitle: "Transparansi APBD Real-time",
    description: "Monitor dan publikasikan penggunaan APBD secara real-time. Tingkatkan kepercayaan masyarakat dengan transparansi penuh.",
    stats: [
      { label: "Efisiensi", value: "+40%" },
      { label: "Transparansi", value: "100%" },
      { label: "Response Time", value: "-60%" },
    ],
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Building2,
    title: "BUMN & Kementerian",
    subtitle: "Audit & Compliance Automation",
    description: "Otomatisasi proses audit internal dan eksternal. Deteksi dini potensi fraud dengan AI monitoring 24/7.",
    stats: [
      { label: "Akurasi Audit", value: "98%" },
      { label: "Waktu Proses", value: "-75%" },
      { label: "Cost Saving", value: "45%" },
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: GraduationCap,
    title: "Institusi Pendidikan",
    subtitle: "Budget Planning & Tracking",
    description: "Kelola anggaran pendidikan dengan optimal. Track pengeluaran per program, departemen, dan kegiatan dengan detail.",
    stats: [
      { label: "Budget Accuracy", value: "95%" },
      { label: "Waste Reduction", value: "-35%" },
      { label: "Planning Time", value: "-50%" },
    ],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Heart,
    title: "Organisasi Nirlaba",
    subtitle: "Donor Transparency Portal",
    description: "Berikan transparansi penuh kepada donor. Tunjukkan impact dari setiap donasi dengan visualisasi yang jelas.",
    stats: [
      { label: "Donor Trust", value: "+85%" },
      { label: "Report Speed", value: "10x" },
      { label: "Engagement", value: "+120%" },
    ],
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
    color: "from-orange-500 to-red-500",
  },
];

export default function DemoScenarios() {
  const [activeIndex, setActiveIndex] = useState(0);

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
          <span className="inline-block text-purple-600 font-semibold mb-4 text-sm uppercase tracking-wider">
            Use Cases
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Solusi untuk{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Setiap Kebutuhan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Platform kami telah dipercaya oleh berbagai institusi untuk meningkatkan 
            transparansi dan akuntabilitas
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {scenarios.map((scenario, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeIndex === index
                    ? `bg-gradient-to-r ${scenario.color} text-white shadow-lg scale-105`
                    : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
                }`}
              >
                <scenario.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{scenario.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Active Scenario Content */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left: Image */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src={scenarios[activeIndex].image}
                  alt={scenarios[activeIndex].title}
                  className="w-full h-[500px] object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${scenarios[activeIndex].color} opacity-20`} />
              </motion.div>

              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${scenarios[activeIndex].color} flex items-center justify-center`}>
                    {/* <scenarios[activeIndex].icon className="w-6 h-6 text-white" /> */}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{scenarios[activeIndex].title}</div>
                    <div className="text-sm text-gray-500">Success Story</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-100">
                  {scenarios[activeIndex].stats.map((stat, i) => (
                    <div key={i}>
                      <div className={`font-bold text-lg bg-gradient-to-r ${scenarios[activeIndex].color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${scenarios[activeIndex].color} text-white text-sm font-semibold mb-4`}>
                  {scenarios[activeIndex].subtitle}
                </div>
                <h3 className="text-4xl font-bold mb-6">
                  {scenarios[activeIndex].title}
                </h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {scenarios[activeIndex].description}
                </p>

                <div className="space-y-4">
                  {scenarios[activeIndex].stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100"
                    >
                      <span className="font-medium text-gray-700">{stat.label}</span>
                      <span className={`text-2xl font-bold bg-gradient-to-r ${scenarios[activeIndex].color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="mt-8"
                >
                  <button className={`px-8 py-4 rounded-full bg-gradient-to-r ${scenarios[activeIndex].color} text-white font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    Pelajari Lebih Lanjut
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}