
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaultDetailsProps } from '../types';

export function ChatTabContent({ fault }: FaultDetailsProps) {
  const [message, setMessage] = useState("");
  
  if (!fault) return null;

  return (
    <div className="h-full mt-0 p-0 flex flex-col">
      {/* Chat header */}
      <div className="mb-4 pb-2 border-b border-gray-200">
        <h3 className="text-lg font-medium text-blue-600">Chat with Tenant</h3>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto mb-4">
        <div className="bg-blue-50 rounded-lg p-4 mb-4 max-w-[80%] ml-auto">
          <div className="flex justify-between items-start mb-1">
            <span className="font-medium">{fault.tenant}</span>
            <span className="text-xs text-gray-500">2 months ago</span>
          </div>
          <p className="text-sm">check from Android 8</p>
        </div>
      </div>
      
      {/* Chat input */}
      <div className="flex items-center mt-auto">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-sm mr-2">
          <span>Ari</span>
        </div>
        <div className="flex-1">
          <Input 
            placeholder="Send a message to tenant..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
        </div>
        <Button className="ml-2">Add</Button>
      </div>
    </div>
  );
}
