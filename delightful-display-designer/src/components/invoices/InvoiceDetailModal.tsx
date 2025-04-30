
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Invoice } from '@/pages/Invoices';
import { X, ChevronLeft, ChevronRight, CreditCard, ArrowRight } from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { InvoicePaymentConfig, PaymentConfigData } from './InvoicePaymentConfig';
import { useToast } from '@/hooks/use-toast';

interface InvoiceDetailModalProps {
  invoice: Invoice;
  onClose: () => void;
  onUpdate: (updatedInvoice: Invoice) => void;
  onNavigate?: (direction: 'next' | 'previous') => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export function InvoiceDetailModal({ 
  invoice, 
  onClose, 
  onUpdate, 
  onNavigate,
  hasNext = true,
  hasPrevious = true
}: InvoiceDetailModalProps) {
  const [updatedInvoice, setUpdatedInvoice] = useState<Invoice>({ ...invoice });
  const [showPaymentConfig, setShowPaymentConfig] = useState(false);
  const { toast } = useToast();
  
  const handleStatusChange = (value: string) => {
    setUpdatedInvoice({
      ...updatedInvoice,
      status: value as Invoice['status']
    });
  };
  
  const handleHandlerChange = (value: string) => {
    setUpdatedInvoice({
      ...updatedInvoice,
      handler: value
    });
  };
  
  const handleSave = () => {
    onUpdate(updatedInvoice);
  };

  const handlePaymentConfigSave = (data: PaymentConfigData) => {
    toast({
      title: "Payment Configuration Saved",
      description: `Invoice #${updatedInvoice.invoiceNumber} payment settings updated`,
    });
    setShowPaymentConfig(false);
  };

  // Mock list of possible handlers
  const handlers = [
    'John Smith',
    'Jane Doe',
    'Alex Johnson',
    'Sarah Williams',
  ];

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

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden bg-white rounded-lg shadow-xl p-0">
        <div className="flex flex-col h-full max-h-[90vh]">
          <DialogHeader className="border-b pb-4 p-6 bg-gradient-to-r from-blue-50 to-gray-50 shadow-sm relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pr-10">
              <div className="flex items-center space-x-4">
                <DialogTitle className="text-xl font-semibold text-gray-800">Invoice #{updatedInvoice.invoiceNumber}</DialogTitle>
                <Select
                  value={updatedInvoice.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className={`h-8 w-[140px] px-2 text-sm font-medium ${getStatusColor(updatedInvoice.status)} border-none shadow-sm transition-all duration-200 hover:opacity-90`}>
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
                  value={updatedInvoice.handler}
                  onValueChange={handleHandlerChange}
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
          
          <div className="flex-1 overflow-auto min-h-0">
            <ResizablePanelGroup 
              direction="horizontal" 
              className="h-full"
            >
              <ResizablePanel defaultSize={40} minSize={30}>
                <div className="h-full bg-gray-50 p-4 overflow-auto">
                  {updatedInvoice.pdfUrl ? (
                    <iframe 
                      src={updatedInvoice.pdfUrl}
                      className="w-full h-full border rounded shadow-sm"
                      title={`Invoice ${updatedInvoice.invoiceNumber}`}
                    />
                  ) : (
                    <div className="text-center text-gray-500 p-6 h-full flex items-center justify-center">
                      <div>
                        <p className="font-medium mb-2">PDF Preview Not Available</p>
                        <p className="text-sm">PDF would be displayed here</p>
                      </div>
                    </div>
                  )}
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={60} minSize={30}>
                <div className="p-6 h-full overflow-auto">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Invoice Details</h3>
                      <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <Label className="text-sm text-gray-500 block mb-1">Invoice Number</Label>
                            <p className="font-medium text-gray-800">{updatedInvoice.invoiceNumber}</p>
                          </div>
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <Label className="text-sm text-gray-500 block mb-1">Date Issued</Label>
                            <p className="font-medium text-gray-800">{updatedInvoice.date}</p>
                          </div>
                        </div>
  
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <Label className="text-sm text-gray-500 block mb-1">Amount</Label>
                            <p className="font-medium text-gray-800">${updatedInvoice.amount.toFixed(2)}</p>
                          </div>
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <Label className="text-sm text-gray-500 block mb-1">Estimated Amount</Label>
                            <p className="font-medium text-gray-800">${updatedInvoice.estimatedAmount?.toFixed(2) || 'N/A'}</p>
                          </div>
                        </div>
  
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <Label className="text-sm text-gray-500 block mb-1">Unit ID</Label>
                            <p className="font-medium text-gray-800">{updatedInvoice.unitId}</p>
                          </div>
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <Label className="text-sm text-gray-500 block mb-1">Property</Label>
                            <p className="font-medium text-gray-800">{updatedInvoice.propertyName}</p>
                          </div>
                        </div>
  
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <Label className="text-sm text-gray-500 block mb-1">Contractor</Label>
                            <p className="font-medium text-gray-800">{updatedInvoice.contractorName}</p>
                          </div>
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <Label className="text-sm text-gray-500 block mb-1">Fault Type</Label>
                            <p className="font-medium text-gray-800">{updatedInvoice.faultType}</p>
                          </div>
                        </div>
  
                        <div className="flex justify-end">
                          <Button 
                            variant="outline" 
                            className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                            onClick={() => setShowPaymentConfig(true)}
                          >
                            <CreditCard className="h-4 w-4" /> Configure Payment
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
  
                        {updatedInvoice.propertyDetails && (
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <Label className="text-sm text-gray-500 block mb-1">Property Details</Label>
                            <p className="text-sm text-gray-700">{updatedInvoice.propertyDetails}</p>
                          </div>
                        )}
  
                        {updatedInvoice.contractorDetails && (
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <Label className="text-sm text-gray-500 block mb-1">Contractor Details</Label>
                            <p className="text-sm text-gray-700">{updatedInvoice.contractorDetails}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
          
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
                onClick={handleSave} 
                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
      
      {showPaymentConfig && (
        <InvoicePaymentConfig 
          invoice={updatedInvoice}
          isOpen={showPaymentConfig}
          onClose={() => setShowPaymentConfig(false)}
          onSave={handlePaymentConfigSave}
        />
      )}
    </Dialog>
  );
}
