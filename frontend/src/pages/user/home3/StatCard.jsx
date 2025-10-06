import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

function StatCard({ number, label, color, increase = false }) {
  // Mapping color ke class Tailwind yang valid
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600", 
    red: "text-red-600",
    yellow: "text-yellow-600",
    purple: "text-purple-600",
    indigo: "text-indigo-600"
  };

  const textColor = colorClasses[color] || "text-gray-600";

  return (
    <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className={`text-4xl font-bold ${textColor}`}>{number}</span>
        {increase !== undefined && (
          increase ? (
            <TrendingUp className={`w-6 h-6 ${textColor}`} />
          ) : (
            <span className="text-4xl font-bold text-red-600">↓</span>
          )
        )}
      </div>
      <p className="text-gray-600 font-medium">{label}</p>
    </Card>
  );
}

export default StatCard;