
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';

export function DocumentsTabContent() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
      <FileText className="h-16 w-16 mb-4 opacity-30" />
      <p>No documents uploaded yet</p>
      <Button variant="outline" className="mt-4">
        Upload documents
      </Button>
    </div>
  );
}
