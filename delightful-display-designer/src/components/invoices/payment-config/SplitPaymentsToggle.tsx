
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { usePaymentConfig } from './PaymentConfigContext';

export function SplitPaymentsToggle() {
  const { config, updateConfig } = usePaymentConfig();
  
  return (
    <div className="flex items-center justify-between">
      <div>
        <Label className="text-sm font-medium text-gray-700">Allow Split Payments</Label>
        <p className="text-xs text-gray-500">Let tenant pay in multiple installments</p>
      </div>
      <Switch
        checked={config.splitPayment}
        onCheckedChange={(checked) => updateConfig('splitPayment', checked)}
        className="data-[state=checked]:bg-blue-600"
      />
    </div>
  );
}
