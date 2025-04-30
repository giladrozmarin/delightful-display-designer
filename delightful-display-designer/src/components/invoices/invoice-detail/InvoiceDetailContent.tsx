import React, { useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CreditCard, ArrowRight } from 'lucide-react';
import { Invoice } from '@/pages/Invoices';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Contractor } from '@/pages/Contractors';
import { ContractorDetails } from '@/components/contractors/ContractorDetails';
import { useNavigate } from 'react-router-dom';

interface InvoiceDetailContentProps {
  invoice: Invoice;
  onConfigurePayment: () => void;
}

export function InvoiceDetailContent({ invoice, onConfigurePayment }: InvoiceDetailContentProps) {
  const [showContractorModal, setShowContractorModal] = useState(false);
  const navigate = useNavigate();
  
  // Mock contractor data based on the invoice's contractor information
  const mockContractor: Contractor = {
    id: '1',
    company: 'Ace Plumbing',
    address: '11 Miami Avenue, Fredericktown',
    email: 'info@aceplumbing.com',
    phone: '(951) 394-0252',
    type: 'Plumbing',
    insuranceExpiration: '2024-12-15',
    workersCompExpiration: '2024-11-30',
    taxpayerId: '53-8796421',
    paymentTerms: 'Net 30',
    isPreferred: true
  };
  
  const handleOpenContractorModal = () => {
    setShowContractorModal(true);
  };
  
  const handleEditContractor = () => {
    // Close the modal and navigate to the contractors page
    setShowContractorModal(false);
    // Navigate to contractors page
    navigate('/contractors');
  };

  return (
    <div className="flex-1 overflow-auto min-h-0">
      <ResizablePanelGroup 
        direction="horizontal" 
        className="h-full"
      >
        <ResizablePanel defaultSize={40} minSize={30}>
          <div className="h-full bg-gray-50 p-4 overflow-auto">
            {invoice.pdfUrl ? (
              <iframe 
                src={invoice.pdfUrl}
                className="w-full h-full border rounded shadow-sm"
                title={`Invoice ${invoice.invoiceNumber}`}
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
                      <p className="font-medium text-gray-800">{invoice.invoiceNumber}</p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <Label className="text-sm text-gray-500 block mb-1">Date Issued</Label>
                      <p className="font-medium text-gray-800">{invoice.date}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <Label className="text-sm text-gray-500 block mb-1">Amount</Label>
                      <p className="font-medium text-gray-800">${invoice.amount.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <Label className="text-sm text-gray-500 block mb-1">Estimated Amount</Label>
                      <p className="font-medium text-gray-800">${invoice.estimatedAmount?.toFixed(2) || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <Label className="text-sm text-gray-500 block mb-1">Unit ID</Label>
                      <p className="font-medium text-gray-800">{invoice.unitId}</p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <Label className="text-sm text-gray-500 block mb-1">Property</Label>
                      <p className="font-medium text-gray-800">{invoice.propertyName}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      className="bg-white p-3 rounded-md shadow-sm cursor-pointer hover:bg-blue-50 transition-colors"
                      onClick={handleOpenContractorModal}
                    >
                      <Label className="text-sm text-gray-500 block mb-1">Contractor</Label>
                      <p className="font-medium text-gray-800">{invoice.contractorName}</p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <Label className="text-sm text-gray-500 block mb-1">Fault Type</Label>
                      <p className="font-medium text-gray-800">{invoice.faultType}</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={onConfigurePayment}
                    >
                      <CreditCard className="h-4 w-4" /> Configure Payment
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {invoice.propertyDetails && (
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <Label className="text-sm text-gray-500 block mb-1">Property Details</Label>
                      <p className="text-sm text-gray-700">{invoice.propertyDetails}</p>
                    </div>
                  )}

                  {invoice.contractorDetails && (
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <Label className="text-sm text-gray-500 block mb-1">Contractor Details</Label>
                      <p className="text-sm text-gray-700">{invoice.contractorDetails}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      
      {/* Contractor Modal */}
      <Dialog open={showContractorModal} onOpenChange={setShowContractorModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <ContractorDetails 
            contractor={mockContractor} 
            onEdit={handleEditContractor}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
