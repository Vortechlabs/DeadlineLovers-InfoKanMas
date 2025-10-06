import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";

function AnimatedCounter({ value = 0, increase = true, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-4xl font-bold text-gray-900">
        {increase === false && count > 0 && "-"}
        {count}{suffix}
      </span>
      {increase ? (
        <TrendingUp className="w-6 h-6 text-green-600" />
      ) : (
        <span className="text-3xl text-red-600">↓</span>
      )}
    </div>
  );
}

export default AnimatedCounter;