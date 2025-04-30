
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Invoice } from '@/pages/Invoices';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { PaymentDateSelector } from './PaymentDateSelector';
import { PaymentRemindersCard } from './PaymentRemindersCard';
import { SplitPaymentsToggle } from './SplitPaymentsToggle';
import { PaymentConfigProvider, usePaymentConfig } from './PaymentConfigContext';

export interface PaymentConfigData {
  paymentMethod: 'bank' | 'card' | 'manual';
  dueDate: string;
  sendReminders: boolean;
  reminderDays: number;
  splitPayment: boolean;
}

interface PaymentConfigModalProps {
  invoice: Invoice;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PaymentConfigData) => void;
}

export function PaymentConfigModal({ invoice, isOpen, onClose, onSave }: PaymentConfigModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader className="border-b pb-4">
          <div className="flex justify-between items-center">
            <DialogTitle>Payment Configuration</DialogTitle>
            <DialogClose className="text-gray-400 hover:text-gray-500">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </DialogHeader>
        
        <PaymentConfigProvider invoice={invoice}>
          <PaymentConfigContent invoice={invoice} onClose={onClose} onSave={onSave} />
        </PaymentConfigProvider>
      </DialogContent>
    </Dialog>
  );
}

interface PaymentConfigContentProps {
  invoice: Invoice;
  onClose: () => void;
  onSave: (data: PaymentConfigData) => void;
}

function PaymentConfigContent({ invoice, onClose, onSave }: PaymentConfigContentProps) {
  const { config } = usePaymentConfig();
  
  const handleSave = () => {
    onSave(config);
  };
  
  return (
    <>
      <div className="space-y-6 py-4">
        <div>
          <InvoiceInfoDisplay invoice={invoice} />
        </div>
        
        <PaymentMethodSelector />
        
        <PaymentDateSelector />
        
        <PaymentRemindersCard />
        
        <SplitPaymentsToggle />
      </div>
      
      <div className="border-t pt-4 flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save Configuration</Button>
      </div>
    </>
  );
}

interface InvoiceInfoDisplayProps {
  invoice: Invoice;
}

function InvoiceInfoDisplay({ invoice }: InvoiceInfoDisplayProps) {
  return (
    <div>
      <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700 mb-1">Invoice</label>
      <div className="flex items-center space-x-2">
        <span className="text-lg font-semibold">{invoice.invoiceNumber}</span>
        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-sm">${invoice.amount.toFixed(2)}</span>
      </div>
    </div>
  );
}
