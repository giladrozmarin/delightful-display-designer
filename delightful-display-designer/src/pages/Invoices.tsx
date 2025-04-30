
import React, { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Filter } from 'lucide-react';
import { InvoiceTable } from '@/components/invoices/InvoiceTable';
import { FilterControls } from '@/components/invoices/FilterControls';
import { InvoiceDetailModal } from '@/components/invoices/invoice-detail/InvoiceDetailModal';
import { mockInvoices } from '@/components/invoices/mockData';
import { useToast } from '@/hooks/use-toast';

export type Invoice = {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  unitId: string;
  propertyName: string;
  contractorName: string;
  faultType: string;
  status: 'Approved' | 'Not Approved' | 'Pending Review' | 'In Review';
  handler: string;
  pdfUrl?: string;
  propertyDetails?: string;
  contractorDetails?: string;
  estimatedAmount?: number;
}

export type InvoiceFilters = {
  property: string;
  unit: string;
  contractor: string;
  faultType: string;
  status: string;
  amountMin: number | null;
  amountMax: number | null;
}

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [filters, setFilters] = useState<InvoiceFilters>({
    property: '',
    unit: '',
    contractor: '',
    faultType: '',
    status: '',
    amountMin: null,
    amountMax: null
  });
  // Changed to true so filter is visible by default
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const { toast } = useToast();

  const handleFilterChange = (newFilters: Partial<InvoiceFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const filteredInvoices = invoices.filter(invoice => {
    return (
      (!filters.property || invoice.propertyName.includes(filters.property)) &&
      (!filters.unit || invoice.unitId.includes(filters.unit)) &&
      (!filters.contractor || invoice.contractorName.includes(filters.contractor)) &&
      (!filters.faultType || invoice.faultType.includes(filters.faultType)) &&
      (!filters.status || invoice.status === filters.status) &&
      (!filters.amountMin || invoice.amount >= filters.amountMin) &&
      (!filters.amountMax || invoice.amount <= filters.amountMax)
    );
  });

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleCloseModal = () => {
    setSelectedInvoice(null);
  };

  const handleUpdateInvoice = (updatedInvoice: Invoice) => {
    setInvoices(invoices.map(inv => 
      inv.id === updatedInvoice.id ? updatedInvoice : inv
    ));
    setSelectedInvoice(null);
    toast({
      title: "Invoice Updated",
      description: `Invoice #${updatedInvoice.invoiceNumber} has been updated`,
    });
  };
  
  const handleNavigateInvoice = (direction: 'next' | 'previous') => {
    if (!selectedInvoice) return;
    
    const currentIndex = filteredInvoices.findIndex(inv => inv.id === selectedInvoice.id);
    if (currentIndex === -1) return;
    
    let nextIndex;
    if (direction === 'next') {
      nextIndex = currentIndex + 1 >= filteredInvoices.length ? 0 : currentIndex + 1;
    } else {
      nextIndex = currentIndex - 1 < 0 ? filteredInvoices.length - 1 : currentIndex - 1;
    }
    
    setSelectedInvoice(filteredInvoices[nextIndex]);
  };

  const handleUpdateStatus = (invoice: Invoice, newStatus: Invoice['status']) => {
    const updatedInvoice = { ...invoice, status: newStatus };
    setInvoices(invoices.map(inv => 
      inv.id === invoice.id ? updatedInvoice : inv
    ));
    toast({
      title: "Status Updated",
      description: `Invoice #${invoice.invoiceNumber} status changed to ${newStatus}`,
    });
  };
  
  const getCurrentInvoiceIndex = () => {
    if (!selectedInvoice) return -1;
    return filteredInvoices.findIndex(inv => inv.id === selectedInvoice.id);
  };
  
  const currentIndex = getCurrentInvoiceIndex();
  const hasNext = filteredInvoices.length > 1;
  const hasPrevious = filteredInvoices.length > 1;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#f2f3f7]">
        <AppSidebar />
        <main className="flex-1 p-6 lg:p-8 font-inter overflow-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
                <p className="text-gray-500">Manage and track all property invoices</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => setIsFilterVisible(!isFilterVisible)}
                >
                  <Filter className="h-4 w-4" />
                  {isFilterVisible ? 'Hide Filter' : 'Show Filter'}
                </Button>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  Create Invoice
                </Button>
              </div>
            </div>
            
            {isFilterVisible && (
              <FilterControls 
                filters={filters} 
                onFilterChange={handleFilterChange} 
              />
            )}
            
            <div className="flex justify-center w-full">
              <Card className="shadow-sm overflow-hidden w-full">
                <InvoiceTable 
                  invoices={filteredInvoices} 
                  onViewInvoice={handleViewInvoice}
                  onUpdateStatus={handleUpdateStatus}
                />
              </Card>
            </div>

            {selectedInvoice && (
              <InvoiceDetailModal 
                invoice={selectedInvoice}
                onClose={handleCloseModal}
                onUpdate={handleUpdateInvoice}
                onNavigate={handleNavigateInvoice}
                hasNext={hasNext}
                hasPrevious={hasPrevious}
              />
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
