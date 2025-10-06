import { ArrowRight, CheckCircle, Shield, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-blue-500/5" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Platform AI/ML Pertama di Indonesia</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Transformasi{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Transparansi Anggaran
            </span>{" "}
            dengan Kecerdasan Buatan
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Platform pertama di Indonesia yang mengintegrasikan AI/ML untuk deteksi fraud, 
            prediksi anggaran, dan monitoring real-time dana sosial
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
              <Zap className="w-5 h-5 mr-2" />
              Demo Live
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-blue-200 hover:bg-blue-50">
              Lihat Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Shield, text: "Deteksi Fraud Otomatis", color: "text-red-600", bg: "bg-red-50" },
              { icon: TrendingUp, text: "Prediksi Anggaran AI", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: Zap, text: "Monitoring Real-time", color: "text-green-600", bg: "bg-green-50" },
              { icon: Users, text: "Transparansi Publik", color: "text-purple-600", bg: "bg-purple-50" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`flex flex-col items-center gap-3 p-4 rounded-xl ${feature.bg} backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all cursor-pointer`}
              >
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
                <span className="text-sm font-medium text-gray-700 text-center">{feature.text}</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection