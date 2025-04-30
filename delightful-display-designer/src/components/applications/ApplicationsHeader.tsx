
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Settings, LayoutDashboard } from "lucide-react";

export function ApplicationsHeader() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={() => navigate('/settings/applications')}
          className="border-gray-300"
        >
          <Settings className="h-4 w-4 mr-2" />
          Application Settings
        </Button>
        <Button 
          onClick={() => navigate('/applications/overview')}
          className="bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
        >
          <LayoutDashboard className="h-4 w-4 mr-2" />
          Applications Overview
        </Button>
      </div>
    </div>
  );
}
