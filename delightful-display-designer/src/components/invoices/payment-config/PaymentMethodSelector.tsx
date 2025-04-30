
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { usePaymentConfig } from './PaymentConfigContext';

export function PaymentMethodSelector() {
  const { config, updateConfig } = usePaymentConfig();
  
  return (
    <div>
      <Label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">Payment Method</Label>
      <Select 
        value={config.paymentMethod}
        onValueChange={(value) => updateConfig('paymentMethod', value as 'bank' | 'card' | 'manual')}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select payment method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="bank">Bank Transfer (ACH)</SelectItem>
          <SelectItem value="card">Credit/Debit Card</SelectItem>
          <SelectItem value="manual">Manual (Cash/Check)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
