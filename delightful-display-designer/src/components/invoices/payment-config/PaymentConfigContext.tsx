
import React, { createContext, useContext, useState } from 'react';
import { Invoice } from '@/pages/Invoices';
import { PaymentConfigData } from './PaymentConfigModal';

interface PaymentConfigContextType {
  config: PaymentConfigData;
  updateConfig: <K extends keyof PaymentConfigData>(key: K, value: PaymentConfigData[K]) => void;
  invoice: Invoice;
}

const PaymentConfigContext = createContext<PaymentConfigContextType | undefined>(undefined);

interface PaymentConfigProviderProps {
  children: React.ReactNode;
  invoice: Invoice;
}

export function PaymentConfigProvider({ children, invoice }: PaymentConfigProviderProps) {
  const [config, setConfig] = useState<PaymentConfigData>({
    paymentMethod: 'bank',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
    sendReminders: true,
    reminderDays: 3,
    splitPayment: false
  });
  
  const updateConfig = <K extends keyof PaymentConfigData>(key: K, value: PaymentConfigData[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };
  
  return (
    <PaymentConfigContext.Provider value={{ config, updateConfig, invoice }}>
      {children}
    </PaymentConfigContext.Provider>
  );
}

export const usePaymentConfig = () => {
  const context = useContext(PaymentConfigContext);
  if (context === undefined) {
    throw new Error('usePaymentConfig must be used within a PaymentConfigProvider');
  }
  return context;
};
