
import React, { useEffect, useState } from 'react';

interface StatsCounterProps {
  end: number;
  label: string;
  suffix?: string;
}

export function StatsCounter({ end, label, suffix = '' }: StatsCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startValue = 0;
    const duration = 1500;
    const step = Math.max(1, Math.floor(end / (duration / 50)));
    
    const timer = setInterval(() => {
      startValue += step;
      if (startValue > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(startValue);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div>
      <p className="text-3xl font-bold text-[#7367f0] count-up">{count}{suffix}</p>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}
