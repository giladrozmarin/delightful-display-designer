
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Image,
  MessageSquare,
  History,
  Info
} from 'lucide-react';

export function FaultDetailsTabs({ 
  leftActiveTab, 
  rightActiveTab, 
  onTabChange 
}: { 
  leftActiveTab: string; 
  rightActiveTab: string; 
  onTabChange: (value: string) => void 
}) {
  // Create handler for left tabs
  const handleLeftTabClick = (value: string) => {
    onTabChange(`${value}-${rightActiveTab}`);
  };

  // Create handler for right tabs
  const handleRightTabClick = (value: string) => {
    onTabChange(`${leftActiveTab}-${value}`);
  };

  return (
    <div className="border-t border-b border-gray-200 flex justify-between bg-gray-50">
      {/* First group of tabs - Controls left side content */}
      <TabsList className="h-12 px-6 justify-start gap-6 bg-transparent rounded-none border-0">
        <TabsTrigger 
          value={`${leftActiveTab}-${rightActiveTab}`} 
          data-state={leftActiveTab === "general" ? "active" : "inactive"}
          onClick={() => handleLeftTabClick("general")}
          className="gap-2 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:rounded-none data-[state=active]:shadow-none"
        >
          <Info className="h-4 w-4" /> General
        </TabsTrigger>
        <TabsTrigger 
          value={`${leftActiveTab}-${rightActiveTab}`}
          data-state={leftActiveTab === "images" ? "active" : "inactive"}
          onClick={() => handleLeftTabClick("images")}
          className="gap-2 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:rounded-none data-[state=active]:shadow-none"
        >
          <Image className="h-4 w-4" /> Images
        </TabsTrigger>
        <TabsTrigger 
          value={`${leftActiveTab}-${rightActiveTab}`}
          data-state={leftActiveTab === "documents" ? "active" : "inactive"}
          onClick={() => handleLeftTabClick("documents")}
          className="gap-2 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:rounded-none data-[state=active]:shadow-none"
        >
          <FileText className="h-4 w-4" /> Documents
        </TabsTrigger>
      </TabsList>
      
      {/* Second group of tabs - Controls right side content */}
      <TabsList className="h-12 px-6 justify-end gap-6 bg-transparent rounded-none border-0">
        <TabsTrigger 
          value={`${leftActiveTab}-${rightActiveTab}`}
          data-state={rightActiveTab === "chat" ? "active" : "inactive"}
          onClick={() => handleRightTabClick("chat")}
          className="gap-2 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:rounded-none data-[state=active]:shadow-none"
        >
          <MessageSquare className="h-4 w-4" /> Chat
        </TabsTrigger>
        <TabsTrigger 
          value={`${leftActiveTab}-${rightActiveTab}`}
          data-state={rightActiveTab === "notes" ? "active" : "inactive"}
          onClick={() => handleRightTabClick("notes")}
          className="gap-2 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:rounded-none data-[state=active]:shadow-none"
        >
          <FileText className="h-4 w-4" /> Notes
        </TabsTrigger>
        <TabsTrigger 
          value={`${leftActiveTab}-${rightActiveTab}`}
          data-state={rightActiveTab === "history" ? "active" : "inactive"}
          onClick={() => handleRightTabClick("history")}
          className="gap-2 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:rounded-none data-[state=active]:shadow-none"
        >
          <History className="h-4 w-4" /> History
        </TabsTrigger>
      </TabsList>
    </div>
  );
}
