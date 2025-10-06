import { Brain, CheckCircle, FileCheck, PieChart, Sparkles, Users } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

function HowItWorksTimeline() {
  const steps = [
    {
      number: 1,
      title: "Pengajuan RAB",
      description: "Admin daerah submit proposal anggaran melalui dashboard",
      icon: FileCheck,
      gradient: "from-blue-400 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      number: 2,
      title: "AI Scoring",
      description: "Real-time fraud detection & scoring otomatis menggunakan ML",
      icon: Brain,
      gradient: "from-purple-400 to-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      number: 3,
      title: "Smart Review",
      description: "Admin pusat dengan AI recommendation untuk keputusan cepat",
      icon: Users,
      gradient: "from-indigo-400 to-indigo-600",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600"
    },
    {
      number: 4,
      title: "Approval & Cair",
      description: "Workflow otomatis untuk pencairan dana yang disetujui",
      icon: CheckCircle,
      gradient: "from-green-400 to-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      number: 5,
      title: "Monitoring",
      description: "Real-time spending tracking dengan anomaly detection",
      icon: PieChart,
      gradient: "from-orange-400 to-orange-600",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      number: 6,
      title: "Transparansi",
      description: "Public dashboard dengan AI insights untuk masyarakat",
      icon: Sparkles,
      gradient: "from-teal-400 to-teal-600",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">How It Works</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Alur Kerja Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            6 langkah menuju transparansi anggaran yang lebih baik
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-24 bg-gradient-to-b from-blue-300 to-purple-300 hidden md:block" />
              )}

              <div className="flex gap-6 mb-8">
                {/* Icon Circle */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {step.number}
                </div>

                {/* Content */}
                <Card className="flex-1 p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg ${step.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksTimeline