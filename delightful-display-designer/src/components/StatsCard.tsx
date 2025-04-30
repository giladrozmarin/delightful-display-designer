
import React, { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number;
  icon?: LucideIcon;
  linkText?: string;
  className?: string;
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  linkText, 
  className = '',
  variant = 'primary'
}: StatsCardProps) {
  const [count, setCount] = useState(0);
  
  // Card variants
  const variants = {
    primary: {
      cardClass: 'stat-card open-faults',
      valueColor: 'text-gray-800',
      iconColor: 'text-gray-600',
      bgColor: 'bg-white',
      indicator: 'bg-[#1e1e1e]',
      border: 'border-gray-200'
    },
    info: {
      cardClass: 'stat-card new-faults',
      valueColor: 'text-[#1c67ff]',
      iconColor: 'text-[#1c67ff]',
      bgColor: 'bg-white',
      indicator: 'bg-[#1c67ff]',
      border: 'border-gray-200'
    },
    success: {
      cardClass: 'stat-card resolved-faults',
      valueColor: 'text-[#56ca00]',
      iconColor: 'text-[#56ca00]',
      bgColor: 'bg-white',
      indicator: 'bg-[#56ca00]',
      border: 'border-gray-200'
    },
    danger: {
      cardClass: 'stat-card pending',
      valueColor: 'text-[#ff4d6b]',
      iconColor: 'text-[#ff4d6b]',
      bgColor: 'bg-white',
      indicator: 'bg-[#ff4d6b]',
      border: 'border-gray-200'
    },
    warning: {
      cardClass: 'stat-card sent-to-contractor',
      valueColor: 'text-[#e9b431]',
      iconColor: 'text-[#e9b431]',
      bgColor: 'bg-white',
      indicator: 'bg-[#e9b431]',
      border: 'border-gray-200'
    }
  };

  // Set variant based on title if not explicitly provided
  let cardVariant = variant;
  if (title === 'Open Faults') cardVariant = 'primary';
  if (title === 'New Faults') cardVariant = 'info';
  if (title === 'Resolved Faults') cardVariant = 'success';
  if (title === 'Pending') cardVariant = 'danger';
  if (title === 'Sent To Contractor') cardVariant = 'warning';
  
  const currentVariant = variants[cardVariant];
  
  // Counter animation effect
  useEffect(() => {
    let start = 0;
    if (value > 0) {
      const duration = 1500;
      const step = Math.max(1, Math.floor(value / (duration / 50)));
      
      const timer = setInterval(() => {
        start += step;
        if (start > value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 50);
      
      return () => clearInterval(timer);
    } else {
      setCount(0);
    }
  }, [value]);
  
  // Determine value styling based on title
  let valueSize = 'text-5xl';
  let valueAlignment = 'flex-grow flex items-center justify-center my-4';
  
  if (title === 'Open Faults') {
    valueSize = 'text-[120px]';
    valueAlignment = 'flex-grow flex items-center justify-center py-12';
  }

  return (
    <Card className={cn(
      'rounded-lg shadow-sm', 
      currentVariant.bgColor, 
      currentVariant.border,
      className
    )}>
      <div className="flex flex-col h-full p-6 relative z-10">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-gray-700 font-medium">{title}</h3>
          {Icon && <Icon className={cn("h-5 w-5", currentVariant.iconColor)} />}
        </div>
        
        <div className={valueAlignment}>
          <p className={cn(
            "font-bold count-up", 
            currentVariant.valueColor, 
            valueSize
          )}>
            {count}
          </p>
        </div>
        
        {linkText && (
          <div className="mt-auto">
            <a 
              href="#" 
              className="text-[#1c67ff] text-sm hover:text-[#0052e0] font-medium"
            >
              {linkText}
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}
