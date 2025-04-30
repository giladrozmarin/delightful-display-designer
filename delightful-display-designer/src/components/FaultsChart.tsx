
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'New Faults', value: 3, color: '#1c67ff' },
  { name: 'Pending', value: 0, color: '#ff4d6b' },
  { name: 'Resolved', value: 0, color: '#56ca00' },
  { name: 'Sent to Contractor', value: 1, color: '#e9b431' },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-100">
        <p className="font-medium text-gray-900">{`${label}: ${payload[0].value}`}</p>
        <p className="text-sm text-gray-500">Current status</p>
      </div>
    );
  }

  return null;
};

export function FaultsChart() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Faults Overview</h3>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <defs>
              {data.map((entry, index) => (
                <linearGradient key={`gradient-${index}`} id={`gradient-${entry.name}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={entry.color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={entry.color} stopOpacity={0.4}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(0, 0, 0, 0.05)'}} />
            <Bar 
              dataKey="value" 
              radius={[6, 6, 0, 0]} 
              barSize={48}
              fill="#1c67ff"
              animationDuration={1500}
              animationEasing="ease-in-out"
            >
              {data.map((entry, index) => (
                <Bar 
                  key={`bar-${index}`} 
                  dataKey="value" 
                  fill={entry.color} 
                  name={entry.name}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
