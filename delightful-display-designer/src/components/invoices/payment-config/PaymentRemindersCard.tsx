
import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { usePaymentConfig } from './PaymentConfigContext';

export function PaymentRemindersCard() {
  const { config, updateConfig } = usePaymentConfig();
  
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Label className="text-sm font-medium text-gray-700">Payment Reminders</Label>
          <p className="text-xs text-gray-500">Send automatic reminders before due date</p>
        </div>
        <Switch
          checked={config.sendReminders}
          onCheckedChange={(checked) => updateConfig('sendReminders', checked)}
          className="data-[state=checked]:bg-blue-600"
        />
      </div>
      
      {config.sendReminders && (
        <div className="pl-2 border-l-2 border-blue-200">
          <Label htmlFor="reminderDays" className="block text-sm font-medium text-gray-700 mb-1">Days before due date</Label>
          <Select 
            value={config.reminderDays.toString()}
            onValueChange={(value) => updateConfig('reminderDays', parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 day before</SelectItem>
              <SelectItem value="3">3 days before</SelectItem>
              <SelectItem value="5">5 days before</SelectItem>
              <SelectItem value="7">1 week before</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </Card>
  );
}
