
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface InvoiceDetailFooterProps {
  onClose: () => void;
  onSave: () => void;
  onNavigate?: (direction: 'next' | 'previous') => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export function InvoiceDetailFooter({ 
  onClose, 
  onSave, 
  onNavigate, 
  hasNext = true, 
  hasPrevious = true 
}: InvoiceDetailFooterProps) {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate?.('previous')}
          disabled={!hasPrevious}
          className={`${!hasPrevious ? "opacity-50 cursor-not-allowed" : ""} hover:bg-blue-50 transition-colors`}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate?.('next')}
          disabled={!hasNext}
          className={`${!hasNext ? "opacity-50 cursor-not-allowed" : ""} hover:bg-blue-50 transition-colors`}
        >
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={onClose} className="hover:bg-red-50 hover:text-red-600 transition-colors">Cancel</Button>
        <Button 
          onClick={onSave} 
          className="bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
