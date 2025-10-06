import { Clock, DollarSign, Shield, Target } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import AnimatedCounter from "./AnimatedCounter";

function MetricsImpact() {
  const metrics = [
    { 
      value: 150, 
      suffix: "%", 
      label: "Fraud Detection", 
      icon: Shield, 
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      borderColor: "border-red-200",
      bgColor: "bg-red-50/50",
      increase: true 
    },
    { 
      value: 70, 
      suffix: "%", 
      label: "Processing Time", 
      icon: Clock, 
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
      bgColor: "bg-blue-50/50",
      increase: false 
    },
    { 
      value: 20, 
      suffix: "%", 
      label: "Budget Savings", 
      icon: DollarSign, 
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
      bgColor: "bg-green-50/50",
      increase: true 
    },
    { 
      value: 90, 
      suffix: "%", 
      label: "Prediction Accuracy", 
      icon: Target, 
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
      bgColor: "bg-purple-50/50",
      increase: true 
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100">Impact</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dampak Terukur
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hasil nyata yang dapat diukur dan diverifikasi
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className={`p-6 text-center border-2 ${metric.borderColor} ${metric.bgColor} hover:shadow-xl transition-all`}>
                <div className={`w-14 h-14 rounded-full ${metric.iconBg} flex items-center justify-center mx-auto mb-4`}>
                  <metric.icon className={`w-7 h-7 ${metric.iconColor}`} />
                </div>
                <AnimatedCounter value={metric.value} suffix={metric.suffix} increase={metric.increase} />
                <p className="text-gray-600 font-medium mt-2">{metric.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MetricsImpact