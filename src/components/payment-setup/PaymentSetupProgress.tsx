
import React from 'react';
import { PaymentSetupStep } from './PaymentSetupWizard';

interface PaymentSetupProgressProps {
  currentStep: PaymentSetupStep;
  onStepChange: (step: PaymentSetupStep) => void;
}

export function PaymentSetupProgress({ currentStep, onStepChange }: PaymentSetupProgressProps) {
  return (
    <div className="w-full py-4">
      <div className="relative">
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <button
              onClick={() => onStepChange('charges')}
              className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center z-10 
                ${currentStep === 'charges' 
                  ? 'border-blue-600 bg-blue-600 text-white' 
                  : 'border-blue-600 bg-white text-blue-600'
                }`}
            >
              1
            </button>
            <span className="mt-2 text-sm font-medium text-gray-700">CHARGES</span>
          </div>
          
          <div className="flex flex-col items-center">
            <button
              onClick={() => onStepChange('collection')}
              className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center z-10
                ${currentStep === 'collection' 
                  ? 'border-blue-600 bg-blue-600 text-white' 
                  : 'border-gray-400 bg-white text-gray-400'
                }`}
            >
              2
            </button>
            <span className="mt-2 text-sm font-medium text-gray-700">COLLECTION</span>
          </div>
        </div>
        <div className="absolute top-4 left-0 right-0 h-0.5 transform -translate-y-1/2 z-0">
          <div className="h-full bg-gray-300">
            <div 
              className="h-full bg-blue-600 transition-all" 
              style={{ width: currentStep === 'charges' ? '0%' : '100%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
