import { AlertTriangle, CheckCircle, XCircle, ChevronRight } from "lucide-react";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function DemoScenarios() {
  const scenarios = [
    {
      id: "normal",
      title: "Scenario 1: Normal RAB",
      status: "Auto-Approved",
      statusColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      score: 92,
      scoreColor: "text-green-600",
      icon: CheckCircle,
      iconColor: "text-green-600",
      feedback: "RAB sesuai standar, fraud risk rendah (12%)",
      details: [
        "Harga sesuai standar regional",
        "Volume reasonable",
        "Dokumen lengkap & valid",
        "Track record daerah baik"
      ]
    },
    {
      id: "suspicious",
      title: "Scenario 2: Suspicious RAB",
      status: "Manual Review Required",
      statusColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-300",
      score: 58,
      scoreColor: "text-yellow-600",
      icon: AlertTriangle,
      iconColor: "text-yellow-600",
      feedback: "Ditemukan beberapa anomali, perlu review manual",
      details: [
        "⚠️ Harga 15% di atas standar",
        "⚠️ Volume tidak proporsional",
        "✓ Dokumen lengkap",
        "⚠️ Pattern pengeluaran tidak biasa"
      ]
    },
    {
      id: "fraudulent",
      title: "Scenario 3: Fraudulent RAB",
      status: "Auto-Rejected + Investigation",
      statusColor: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      score: 28,
      scoreColor: "text-red-600",
      icon: XCircle,
      iconColor: "text-red-600",
      feedback: "Multiple red flags detected - fraud probability tinggi (78%)",
      details: [
        "🚨 Markup harga ekstrem (40%)",
        "🚨 Duplikasi proyek terdeteksi",
        "🚨 Vendor blacklist",
        "🚨 Document metadata suspicious"
      ]
    }
  ];

  const [activeScenario, setActiveScenario] = useState(scenarios[0].id);

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100">Live Demo</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lihat AI Bekerja
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tiga skenario berbeda menunjukkan bagaimana AI menilai proposal anggaran
          </p>
        </motion.div>

        <Tabs value={activeScenario} onValueChange={setActiveScenario} className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {scenarios.map((scenario) => (
              <TabsTrigger key={scenario.id} value={scenario.id} className="text-sm">
                {scenario.title.split(":")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {scenarios.map((scenario) => (
            <TabsContent key={scenario.id} value={scenario.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`p-8 border-2 ${scenario.borderColor} ${scenario.bgColor}`}>
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Score Circle */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative w-40 h-40">
                        <svg className="w-40 h-40 transform -rotate-90">
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-gray-200"
                          />
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 70}`}
                            strokeDashoffset={`${2 * Math.PI * 70 * (1 - scenario.score / 100)}`}
                            className={scenario.scoreColor}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-4xl font-bold ${scenario.scoreColor}`}>
                            {scenario.score}
                          </span>
                          <span className="text-sm text-gray-600">/ 100</span>
                        </div>
                      </div>
                      <scenario.icon className={`w-12 h-12 ${scenario.iconColor} mt-4`} />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{scenario.title}</h3>
                        <Badge className={`${scenario.bgColor} ${scenario.statusColor}`}>
                          {scenario.status}
                        </Badge>
                      </div>

                      <div className={`p-4 rounded-lg ${scenario.bgColor} border ${scenario.borderColor} mb-6`}>
                        <p className="text-gray-700 font-medium">
                          <strong>AI Feedback:</strong> {scenario.feedback}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">Detail Analisis:</h4>
                        {scenario.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export default DemoScenarios;