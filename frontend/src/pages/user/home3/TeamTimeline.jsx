// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { Card } from "@/components/ui/card";

function TeamTimeline() {
  const team = [
    { 
      role: "Frontend Developer", 
      name: "React + Tailwind Expert", 
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200"
    },
    { 
      role: "Backend Developer", 
      name: "Laravel + API Specialist", 
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      borderColor: "border-red-200"
    },
    { 
      role: "AI/ML Engineer", 
      name: "Python + ML Expert", 
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-200"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">Hackathon</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tim & Timeline
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dibangun dalam 21 jam intensif oleh tim profesional
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Team */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`p-6 text-center hover:shadow-lg transition-all border-2 ${member.borderColor}`}>
                  <div className={`w-16 h-16 rounded-full ${member.iconBg} flex items-center justify-center mx-auto mb-4`}>
                    <Users className={`w-8 h-8 ${member.iconColor}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{member.role}</h3>
                  <p className="text-sm text-gray-600">{member.name}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Timeline Progress */}
          <Card className="p-8 border-2 border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Hackathon Progress</h3>
              <Badge className="bg-green-100 text-green-700">21 Jam</Badge>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    Platform Development
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    100%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-blue-100">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-blue-600"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default TeamTimeline