// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Brain, Cloud, Database, Lock, Zap, Globe } from "lucide-react";

const technologies = [
  {
    category: "AI & Machine Learning",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    items: [
      { name: "TensorFlow", description: "Deep learning framework" },
      { name: "PyTorch", description: "Neural network library" },
      { name: "Scikit-learn", description: "Machine learning tools" },
      { name: "Natural Language Processing", description: "Text analysis" },
    ],
  },
  {
    category: "Cloud Infrastructure",
    icon: Cloud,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    items: [
      { name: "AWS/Azure/GCP", description: "Multi-cloud support" },
      { name: "Kubernetes", description: "Container orchestration" },
      { name: "Docker", description: "Containerization" },
      { name: "Terraform", description: "Infrastructure as code" },
    ],
  },
  {
    category: "Database & Storage",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    items: [
      { name: "PostgreSQL", description: "Relational database" },
      { name: "MongoDB", description: "Document database" },
      { name: "Redis", description: "In-memory cache" },
      { name: "Apache Kafka", description: "Event streaming" },
    ],
  },
  {
    category: "Security & Compliance",
    icon: Lock,
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-50",
    items: [
      { name: "256-bit Encryption", description: "End-to-end security" },
      { name: "OAuth 2.0", description: "Authentication" },
      { name: "Blockchain", description: "Audit trail" },
      { name: "ISO 27001", description: "Compliance certified" },
    ],
  },
  {
    category: "Performance",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
    items: [
      { name: "CDN", description: "Global content delivery" },
      { name: "Load Balancing", description: "High availability" },
      { name: "Caching", description: "Fast response time" },
      { name: "Auto Scaling", description: "Dynamic resources" },
    ],
  },
  {
    category: "Integration",
    icon: Globe,
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50",
    items: [
      { name: "REST API", description: "Standard interface" },
      { name: "GraphQL", description: "Flexible queries" },
      { name: "Webhooks", description: "Real-time events" },
      { name: "SDK Support", description: "Multiple languages" },
    ],
  },
];

export default function TechnologyStack() {
  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-blue-600 font-semibold mb-4 text-sm uppercase tracking-wider">
            Technology Stack
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Dibangun dengan{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Teknologi Terbaik
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Menggunakan teknologi enterprise-grade untuk performa, keamanan, dan 
            skalabilitas yang optimal
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white border-2 border-gray-100 p-8 h-full hover:shadow-2xl hover:border-blue-200 transition-all duration-300 group">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                    >
                      <tech.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {tech.category}
                      </h3>
                    </div>
                  </div>

                  {/* Technologies list */}
                  <div className="space-y-4 flex-grow">
                    {tech.items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                        className={`${tech.bgColor} rounded-lg p-3 hover:shadow-md transition-shadow duration-200`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tech.color} mt-2 flex-shrink-0`} />
                          <div className="flex-grow min-w-0">
                            <div className="font-semibold text-gray-900 text-sm truncate">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-600 mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid md:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {[
            { label: "Uptime", value: "99.9%", color: "from-green-500 to-emerald-500" },
            { label: "Response Time", value: "<100ms", color: "from-blue-500 to-cyan-500" },
            { label: "Data Centers", value: "12", color: "from-purple-500 to-pink-500" },
            { label: "Daily Transactions", value: "10M+", color: "from-orange-500 to-red-500" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              className="text-center"
            >
              <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-block bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 max-w-3xl">
            <p className="text-2xl font-semibold text-gray-900 mb-2">
              Enterprise-Ready Infrastructure
            </p>
            <p className="text-gray-600">
              Teknologi yang sama digunakan oleh perusahaan Fortune 500 di seluruh dunia
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}