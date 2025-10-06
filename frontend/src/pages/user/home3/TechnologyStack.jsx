import { Cloud, Code2, Cpu, Database } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

function TechnologyStack() {
  const techStack = [
    { 
      category: "Frontend", 
      items: ["React.js", "Tailwind CSS", "Shadcn/ui"], 
      icon: Code2,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200"
    },
    { 
      category: "Backend", 
      items: ["Laravel 10", "MySQL", "Redis"], 
      icon: Database,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      borderColor: "border-red-200"
    },
    { 
      category: "AI/ML", 
      items: ["Python", "Scikit-learn", "Flask"], 
      icon: Cpu,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-200"
    },
    { 
      category: "Infrastructure", 
      items: ["Docker", "Cloud-ready", "CI/CD"], 
      icon: Cloud,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200"
    }
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
          <Badge className="mb-4 bg-gray-100 text-gray-700 hover:bg-gray-100">Technology</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tech Stack Modern
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dibangun dengan teknologi terkini untuk performa dan skalabilitas optimal
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {techStack.map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className={`p-6 text-center hover:shadow-lg transition-all border-2 ${tech.borderColor}`}>
                <div className={`w-14 h-14 rounded-full ${tech.iconBg} flex items-center justify-center mx-auto mb-4`}>
                  <tech.icon className={`w-7 h-7 ${tech.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{tech.category}</h3>
                <ul className="space-y-2">
                  {tech.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-gray-600 text-sm">{item}</li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechnologyStack