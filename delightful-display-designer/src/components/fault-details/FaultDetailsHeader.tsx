import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Printer, 
  Send, 
  MoreHorizontal,
  ChevronDown,
  FileText,
  Receipt,
  Trash,
  History,
  MessageSquare,
  Plus,
  Clock
} from 'lucide-react';
import { FaultDetailsProps } from './types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InvoiceDetailModal } from '@/components/invoices/InvoiceDetailModal';
import { Invoice } from '@/pages/Invoices';
import { useToast } from '@/hooks/use-toast';

export function FaultDetailsHeader({ fault }: FaultDetailsProps) {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const { toast } = useToast();
  
  if (!fault) return null;

  const handleNewWorkOrder = () => {
    console.log("Creating new work order");
    // Implementation for creating a new work order
  };

  const handleCreateInvoice = () => {
    // Create a mock invoice based on the fault data
    const mockInvoice: Invoice = {
      id: `inv-${fault.id}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${fault.id}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      amount: 249.99,
      unitId: fault.unitId || "U-" + fault.id,
      propertyName: fault.address || "Property Address",
      contractorName: "Sample Contractor",
      faultType: fault.issue,
      status: 'Pending Review',
      handler: "John Smith",
      estimatedAmount: 200.00,
      propertyDetails: fault.address,
      contractorDetails: "Sample Contractor LLC, contact: contractor@example.com"
    };
    
    setSelectedInvoice(mockInvoice);
    setShowInvoiceModal(true);
  };

  const handleCloseInvoiceModal = () => {
    setShowInvoiceModal(false);
    setSelectedInvoice(null);
  };

  const handleUpdateInvoice = (updatedInvoice: Invoice) => {
    console.log("Updated invoice:", updatedInvoice);
    setShowInvoiceModal(false);
    setSelectedInvoice(null);
    toast({
      title: "Invoice Updated",
      description: `Invoice #${updatedInvoice.invoiceNumber} has been updated`,
    });
  };

  const handleViewNotes = () => {
    console.log("Opening notes");
    // Implementation for viewing notes
  };

  const handlePrintWorkOrder = () => {
    console.log("Printing work order");
    // Implementation for printing
  };

  const handleDeleteWorkOrder = () => {
    console.log("Deleting work order");
    // Implementation for deletion with confirmation
  };

  const handleViewRepairHistory = () => {
    console.log("Viewing repair history");
    // Implementation for viewing repair history
  };

  const handleCreateStatementNote = () => {
    console.log("Creating statement note");
    // Implementation for creating a statement note
  };

  const handleAddTimeInitials = () => {
    console.log("Adding time and initials");
    // Implementation for adding time/initials stamp
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{fault.issue} <span className="text-gray-500">#{fault.id}</span></h2>
          <p className="text-gray-600 mt-1">{fault.tenant} - {fault.address}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Created {fault.createdAt.split(',')[0]} by {fault.tenant}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="outline" className="flex items-center gap-2 relative">
            <span className="h-2 w-2 rounded-full bg-blue-600 mr-1"></span>
            {fault.status} <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          
          <Button 
            variant="ghost" 
            className="text-blue-600 font-medium px-0 hover:bg-transparent hover:underline" 
            onClick={handlePrintWorkOrder}
          >
            <Printer className="h-5 w-5 mr-2" /> Generate and print work order PDF
          </Button>
          
          <Button 
            variant="ghost" 
            className="text-blue-600 font-medium px-0 hover:bg-transparent hover:underline"
          >
            <Send className="h-5 w-5 mr-2" /> Send work order to contractor
          </Button>

          <Button variant="outline" className="text-blue-600" onClick={handleNewWorkOrder}>
            <Plus className="h-4 w-4 mr-1" /> New Work Order
          </Button>

          <Button 
            variant="outline" 
            className="text-blue-600" 
            onClick={handleCreateInvoice}
          >
            <Receipt className="h-4 w-4 mr-1" /> Invoice
          </Button>

          <Button 
            variant="ghost" 
            className="text-blue-600 font-medium px-0 hover:bg-transparent hover:underline" 
            onClick={handleViewRepairHistory}
          >
            <History className="h-5 w-5 mr-2" /> Repair History
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleViewNotes}>
                <MessageSquare className="h-4 w-4 mr-2" /> Notes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCreateStatementNote}>
                <FileText className="h-4 w-4 mr-2" /> Create Statement Note
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAddTimeInitials}>
                <Clock className="h-4 w-4 mr-2" /> Add Time/Initials
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={handleDeleteWorkOrder}>
                <Trash className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {selectedInvoice && showInvoiceModal && (
        <InvoiceDetailModal 
          invoice={selectedInvoice}
          onClose={handleCloseInvoiceModal}
          onUpdate={handleUpdateInvoice}
          hasNext={false}
          hasPrevious={false}
        />
      )}
    </div>
  );
}
