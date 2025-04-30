
import React from 'react';

export function HistoryTabContent() {
  return (
    <div className="border rounded-md p-4">
      <div className="flex items-start gap-3 mb-4 pb-4 border-b">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
          AB
        </div>
        <div>
          <p className="text-sm">
            <span className="font-medium">Arik Bidas</span> created this fault
          </p>
          <p className="text-xs text-gray-500 mt-1">2 months ago</p>
        </div>
      </div>
    </div>
  );
}
