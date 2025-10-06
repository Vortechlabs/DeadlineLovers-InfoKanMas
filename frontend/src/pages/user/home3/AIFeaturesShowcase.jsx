import { Brain, FileCheck, PieChart, Shield, Sparkles, TrendingUp, Users } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

function AIFeaturesShowcase() {
  const features = [
    {
      icon: Shield,
      title: "Fraud Detection System",
      badge: "PRIORITAS TINGGI",
      badgeClass: "bg-red-100 text-red-700",
      highlight: "Isolation Forest algorithm",
      metric: "Deteksi 150% lebih akurat",
      description: "Mendeteksi pola fraud secara otomatis menggunakan anomaly detection dengan Isolation Forest",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      borderColor: "hover:border-red-300",
      metricBg: "bg-red-50",
      metricText: "text-red-700",
      highlightColor: "text-red-500"
    },
    {
      icon: TrendingUp,
      title: "Budget Prediction AI",
      badge: "PREDIKSI REAL-TIME",
      badgeClass: "bg-blue-100 text-blue-700",
      highlight: "ARIMA Time Series",
      metric: "Akurasi 90% forecasting",
      description: "Prediksi kebutuhan anggaran masa depan dengan time series analysis",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "hover:border-blue-300",
      metricBg: "bg-blue-50",
      metricText: "text-blue-700",
      highlightColor: "text-blue-500"
    },
    {
      icon: Brain,
      title: "RAB Scoring Intelligence",
      badge: "OTOMASI REVIEW",
      badgeClass: "bg-purple-100 text-purple-700",
      highlight: "Weighted Scoring + ML",
      metric: "Processing time -70%",
      description: "Scoring otomatis RAB dengan kombinasi rule-based dan machine learning",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      borderColor: "hover:border-purple-300",
      metricBg: "bg-purple-50",
      metricText: "text-purple-700",
      highlightColor: "text-purple-500"
    },
    {
      icon: PieChart,
      title: "Spending Pattern Analytics",
      badge: "CLUSTERING AI",
      badgeClass: "bg-green-100 text-green-700",
      highlight: "K-Means pattern recognition",
      metric: "Early warning anomaly",
      description: "Analisis pola pengeluaran dan clustering untuk deteksi anomali dini",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "hover:border-green-300",
      metricBg: "bg-green-50",
      metricText: "text-green-700",
      highlightColor: "text-green-500"
    },
    {
      icon: FileCheck,
      title: "Document Authenticity Check",
      badge: "COMPUTER VISION",
      badgeClass: "bg-orange-100 text-orange-700",
      highlight: "Metadata validation",
      metric: "Validasi 2x lebih cepat",
      description: "Verifikasi keaslian dokumen menggunakan computer vision dan metadata analysis",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      borderColor: "hover:border-orange-300",
      metricBg: "bg-orange-50",
      metricText: "text-orange-700",
      highlightColor: "text-orange-500"
    },
    {
      icon: Users,
      title: "Public Report Validation",
      badge: "NLP ANALYSIS",
      badgeClass: "bg-indigo-100 text-indigo-700",
      highlight: "Text classification",
      metric: "Spam detection 95%",
      description: "Klasifikasi dan validasi laporan masyarakat dengan Natural Language Processing",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      borderColor: "hover:border-indigo-300",
      metricBg: "bg-indigo-50",
      metricText: "text-indigo-700",
      highlightColor: "text-indigo-500"
    }
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
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">AI/ML Capabilities</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            6 Fitur AI Unggulan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Teknologi kecerdasan buatan yang dirancang khusus untuk transparansi anggaran
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Card className={`p-6 h-full border-2 ${feature.borderColor} transition-all duration-300 hover:shadow-xl`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl ${feature.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                  </div>
                  <Badge className={`${feature.badgeClass} text-xs`}>{feature.badge}</Badge>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{feature.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className={`w-4 h-4 ${feature.highlightColor}`} />
                    <span className="text-gray-700 font-medium">{feature.highlight}</span>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${feature.metricBg} ${feature.metricText} text-sm font-semibold`}>
                    <TrendingUp className="w-4 h-4" />
                    {feature.metric}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AIFeaturesShowcase