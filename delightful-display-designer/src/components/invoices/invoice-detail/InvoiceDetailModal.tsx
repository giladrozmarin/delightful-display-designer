import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Invoice } from '@/pages/Invoices';
import { InvoicePaymentConfig, PaymentConfigData } from '../InvoicePaymentConfig';
import { useToast } from '@/hooks/use-toast';
import { InvoiceDetailHeader } from './InvoiceDetailHeader';
import { InvoiceDetailContent } from './InvoiceDetailContent';
import { InvoiceDetailFooter } from './InvoiceDetailFooter';

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

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden bg-white rounded-lg shadow-xl p-0">
        <div className="flex flex-col h-full max-h-[90vh]">
          <InvoiceDetailHeader 
            invoice={updatedInvoice} 
            onStatusChange={handleStatusChange}
            onHandlerChange={handleHandlerChange}
          />
          
          <InvoiceDetailContent 
            invoice={updatedInvoice}
            onConfigurePayment={() => setShowPaymentConfig(true)}
          />
          
          <InvoiceDetailFooter
            onClose={onClose}
            onSave={handleSave}
            onNavigate={onNavigate}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
          />
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
