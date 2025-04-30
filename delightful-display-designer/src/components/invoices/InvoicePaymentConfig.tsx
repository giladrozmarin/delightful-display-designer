
import React from 'react';
import { Invoice } from '@/pages/Invoices';
import { PaymentConfigModal, PaymentConfigData } from './payment-config/PaymentConfigModal';
import { useToast } from '@/hooks/use-toast';

interface InvoicePaymentConfigProps {
  invoice: Invoice;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PaymentConfigData) => void;
}

export type { PaymentConfigData };

export function InvoicePaymentConfig({ invoice, isOpen, onClose, onSave }: InvoicePaymentConfigProps) {
  const { toast } = useToast();
  
  const handleSave = (data: PaymentConfigData) => {
    // Here you would typically save the data to your backend
    console.log("Saving payment configuration:", data);
    
    // Show success toast
    toast({
      title: "Payment settings saved",
      description: `Invoice #${invoice.invoiceNumber} payment configuration updated successfully`,
    });
    
    // Call the parent component's onSave callback
    onSave(data);
  };
  
  return (
    <PaymentConfigModal 
      invoice={invoice}
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
    />
  );
}
