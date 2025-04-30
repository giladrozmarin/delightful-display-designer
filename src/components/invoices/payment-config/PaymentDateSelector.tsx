
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { usePaymentConfig } from './PaymentConfigContext';

export function PaymentDateSelector() {
  const { config, updateConfig } = usePaymentConfig();
  
  return (
    <div>
      <Label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</Label>
      <Input
        id="dueDate"
        type="date"
        value={config.dueDate}
        onChange={(e) => updateConfig('dueDate', e.target.value)}
      />
    </div>
  );
}
