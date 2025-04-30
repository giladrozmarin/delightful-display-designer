
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ConnectBankStep } from './ConnectBankStep';
import { PaymentMethodsStep } from './PaymentMethodsStep';
import { ChargesStep } from './ChargesStep';
import { PaymentSetupProgress } from './PaymentSetupProgress';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export type PaymentSetupStep = 'charges' | 'collection';

export type ChargeItem = {
  id: string;
  category: string;
  amount: string;
  description: string;
  dueDay?: string;
  dueDate?: string;
  firstMonth?: string;
  firstYear?: string;
  createUntilLeaseEnds?: boolean;
};

export function PaymentSetupWizard() {
  const [currentStep, setCurrentStep] = useState<PaymentSetupStep>('charges');
  const [monthlyCharges, setMonthlyCharges] = useState<ChargeItem[]>([]);
  const [oneTimeCharges, setOneTimeCharges] = useState<ChargeItem[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleStepChange = (step: PaymentSetupStep) => {
    setCurrentStep(step);
  };
  
  const handleComplete = () => {
    toast({
      title: "Payment setup complete",
      description: "Your payment processing is now configured and ready to use",
    });
    navigate('/payments');
  };

  const handleSaveCharges = (monthly: ChargeItem[], oneTime: ChargeItem[]) => {
    setMonthlyCharges(monthly);
    setOneTimeCharges(oneTime);
    setCurrentStep('collection');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Payment Setup</h1>
        <p className="text-gray-500">Configure how you want to collect payments from tenants</p>
      </div>
      
      <PaymentSetupProgress currentStep={currentStep} onStepChange={handleStepChange} />
      
      <Card className="p-6">
        {currentStep === 'charges' && (
          <ChargesStep 
            monthlyCharges={monthlyCharges}
            oneTimeCharges={oneTimeCharges}
            onSave={handleSaveCharges}
          />
        )}
        
        {currentStep === 'collection' && (
          <PaymentMethodsStep 
            onBack={() => setCurrentStep('charges')} 
            onComplete={handleComplete}
          />
        )}
      </Card>
    </div>
  );
}
