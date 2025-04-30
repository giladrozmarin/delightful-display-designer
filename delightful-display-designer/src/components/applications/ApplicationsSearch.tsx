
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ApplicationsSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ApplicationsSearch({ searchQuery, onSearchChange }: ApplicationsSearchProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search applications..."
          className="pl-10 bg-gray-50 border-gray-200"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
