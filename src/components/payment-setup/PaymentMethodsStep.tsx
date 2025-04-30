
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface PaymentMethodsStepProps {
  onBack: () => void;
  onComplete: () => void;
}

export function PaymentMethodsStep({ onBack, onComplete }: PaymentMethodsStepProps) {
  const [allowACH, setAllowACH] = useState(true);
  const [allowCreditCard, setAllowCreditCard] = useState(true);
  const [allowCash, setAllowCash] = useState(false);
  
  return (
    <div className="space-y-8">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-bold text-gray-800">Payment Methods</h2>
        <p className="text-gray-500 mt-2">Select how tenants can pay their rent</p>
      </div>
      
      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="22" height="16" x="1" y="4" rx="2"/><circle cx="12" cy="12" r="3"/></svg>
                <h4 className="font-semibold text-lg">ACH Bank Transfer</h4>
              </div>
              <p className="text-gray-500 text-sm">Allow tenants to pay directly from their bank account.</p>
              <div className="mt-2">
                <span className="text-green-600 text-xs font-medium">No processing fee</span>
              </div>
            </div>
            <Switch
              checked={allowACH}
              onCheckedChange={setAllowACH}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                <h4 className="font-semibold text-lg">Credit Card</h4>
              </div>
              <p className="text-gray-500 text-sm">Allow tenants to pay with credit or debit cards.</p>
              <div className="mt-2">
                <span className="text-amber-600 text-xs font-medium">2.9% + $0.30 processing fee</span>
              </div>
            </div>
            <Switch
              checked={allowCreditCard}
              onCheckedChange={setAllowCreditCard}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"/><line x1="2" x2="22" y1="20" y2="20"/></svg>
                <h4 className="font-semibold text-lg">Cash/Check</h4>
              </div>
              <p className="text-gray-500 text-sm">Record cash or check payments manually.</p>
              <div className="mt-2">
                <span className="text-gray-500 text-xs font-medium">Manual recording required</span>
              </div>
            </div>
            <Switch
              checked={allowCash}
              onCheckedChange={setAllowCash}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
        </Card>
      </div>
      
      <div className="pt-4 flex justify-between">
        <Button variant="outline" className="gap-2" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button onClick={onComplete} className="bg-blue-600 hover:bg-blue-700">
          Complete Setup
        </Button>
      </div>
    </div>
  );
}
