
import React from 'react';
import {
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Invoice } from '@/pages/Invoices';

interface InvoiceDetailHeaderProps {
  invoice: Invoice;
  onStatusChange: (value: string) => void;
  onHandlerChange: (value: string) => void;
}

export function InvoiceDetailHeader({ invoice, onStatusChange, onHandlerChange }: InvoiceDetailHeaderProps) {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Not Approved':
        return 'bg-red-100 text-red-800';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Mock list of possible handlers
  const handlers = [
    'John Smith',
    'Jane Doe',
    'Alex Johnson',
    'Sarah Williams',
  ];

  return (
    <DialogHeader className="border-b pb-4 p-6 bg-gradient-to-r from-blue-50 to-gray-50 shadow-sm relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pr-10">
        <div className="flex items-center space-x-4">
          <DialogTitle className="text-xl font-semibold text-gray-800">Invoice #{invoice.invoiceNumber}</DialogTitle>
          <Select
            value={invoice.status}
            onValueChange={onStatusChange}
          >
            <SelectTrigger className={`h-8 w-[140px] px-2 text-sm font-medium ${getStatusColor(invoice.status)} border-none shadow-sm transition-all duration-200 hover:opacity-90`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Not Approved">Not Approved</SelectItem>
              <SelectItem value="Pending Review">Pending Review</SelectItem>
              <SelectItem value="In Review">In Review</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Handler:</span>
          <Select
            value={invoice.handler}
            onValueChange={onHandlerChange}
          >
            <SelectTrigger className="h-8 w-[140px] px-2 text-sm border-gray-200 bg-white">
              <SelectValue placeholder="Select handler" />
            </SelectTrigger>
            <SelectContent>
              {handlers.map(handler => (
                <SelectItem key={handler} value={handler}>{handler}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogClose className="absolute right-4 top-4 text-gray-500 hover:text-gray-900 transition-colors hover:bg-gray-100/50 p-1 rounded-full">
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </DialogHeader>
  );
}
