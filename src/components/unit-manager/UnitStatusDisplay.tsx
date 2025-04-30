
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface UnitStatusDisplayProps {
  status: string;
  available: boolean;
}

export function UnitStatusDisplay({ status, available }: UnitStatusDisplayProps) {
  return (
    <div className="mt-2">
      <span className={`inline-flex items-center gap-1.5 ${status === "Rented" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"} text-xs font-medium px-2.5 py-0.5 rounded`}>
        <span className={`h-2 w-2 rounded-full ${status === "Rented" ? "bg-green-500" : "bg-gray-400"}`}></span>
        <span>{status}</span>
      </span>
      <span className={`ml-2 inline-flex items-center gap-1.5 ${available ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"} text-xs font-medium px-2.5 py-0.5 rounded`}>
        <span className={`h-2 w-2 rounded-full ${available ? "bg-blue-500" : "bg-gray-400"}`}></span>
        <span>{available ? "Available" : "Not Available"}</span>
      </span>
    </div>
  );
}
