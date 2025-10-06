// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Rocket, Users, Award, Target, TrendingUp, Globe } from "lucide-react";

const milestones = [
  {
    year: "2021",
    quarter: "Q1",
    title: "Ide & Konsep",
    description: "Tim research mengidentifikasi masalah transparansi anggaran di Indonesia",
    icon: Rocket,
    color: "from-blue-500 to-cyan-500",
    achievements: ["Market Research", "Problem Validation", "Initial Team"],
  },
  {
    year: "2021",
    quarter: "Q3",
    title: "MVP Development",
    description: "Membangun prototype pertama dengan fitur dasar AI analytics",
    icon: Users,
    color: "from-purple-500 to-pink-500",
    achievements: ["Core AI Engine", "Dashboard v1.0", "5 Beta Users"],
  },
  {
    year: "2022",
    quarter: "Q2",
    title: "Pilot Program",
    description: "Launch pilot program dengan 3 pemerintah daerah",
    icon: Target,
    color: "from-green-500 to-emerald-500",
    achievements: ["3 Cities Onboarded", "1M Transactions", "Positive Feedback"],
  },
  {
    year: "2022",
    quarter: "Q4",
    title: "Expansion",
    description: "Ekspansi ke 20+ institusi dengan tim yang berkembang",
    icon: TrendingUp,
    color: "from-orange-500 to-red-500",
    achievements: ["20+ Clients", "Series A Funding", "Team of 30"],
  },
  {
    year: "2023",
    quarter: "Q3",
    title: "Enterprise Ready",
    description: "Platform matang dengan fitur enterprise dan security certification",
    icon: Award,
    color: "from-yellow-500 to-orange-500",
    achievements: ["ISO 27001", "100+ Clients", "10M Daily Transactions"],
  },
  {
    year: "2024",
    quarter: "Q1",
    title: "Global Vision",
    description: "Persiapan ekspansi regional Asia Tenggara",
    icon: Globe,
    color: "from-indigo-500 to-purple-500",
    achievements: ["Regional Expansion", "Multi-language", "AI Innovation Award"],
  },
];

const teamStats = [
  { label: "Team Members", value: "50+", icon: Users },
  { label: "Years Experience", value: "15+", icon: Award },
  { label: "Countries", value: "3", icon: Globe },
  { label: "Success Rate", value: "98%", icon: Target },
];

export default function TeamTimeline() {
  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-purple-600 font-semibold mb-4 text-sm uppercase tracking-wider">
            Perjalanan Kami
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Dari Ide hingga{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Solusi Terdepan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Perjalanan tim kami dalam membangun platform transparansi anggaran 
            yang dipercaya oleh ratusan institusi
          </p>
        </motion.div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
          {teamStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-100 p-6 text-center hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4"
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-700 font-medium">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 transform -translate-x-1/2" />
            
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                    <Card className="inline-block bg-white border-2 border-gray-100 p-8 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 group text-left max-w-md">
                      <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${milestone.color} text-white text-sm font-semibold mb-4`}>
                        {milestone.year} {milestone.quarter}
                      </div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {milestone.description}
                      </p>
                      <div className="space-y-2">
                        {milestone.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${milestone.color}`} />
                            <span className="text-gray-700">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Center Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                      className={`w-20 h-20 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center shadow-2xl border-4 border-white`}
                    >
                      <milestone.icon className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden relative">
            <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex gap-6"
                >
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      className={`w-20 h-20 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center shadow-xl border-4 border-white`}
                    >
                      <milestone.icon className="w-9 h-9 text-white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow pb-8">
                    <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${milestone.color} text-white text-sm font-semibold mb-3`}>
                      {milestone.year} {milestone.quarter}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {milestone.description}
                    </p>
                    <div className="space-y-2">
                      {milestone.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${milestone.color}`} />
                          <span className="text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="inline-block bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 max-w-3xl">
            <p className="text-2xl font-semibold text-gray-900 mb-2">
              Bergabunglah dalam Perjalanan Kami
            </p>
            <p className="text-gray-600">
              Menjadi bagian dari transformasi transparansi anggaran di Indonesia
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}