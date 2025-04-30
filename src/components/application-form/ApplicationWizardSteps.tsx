
import React from 'react';
import { WIZARD_STEPS } from './types';

interface ApplicationWizardStepsProps {
  currentStep: number;
}

export function ApplicationWizardSteps({ currentStep }: ApplicationWizardStepsProps) {
  return (
    <div className="flex items-center justify-between">
      {WIZARD_STEPS.map((step, index) => (
        <div 
          key={step.id}
          className={`flex items-center ${index < WIZARD_STEPS.length - 1 ? 'flex-1' : ''}`}
        >
          <div 
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              index <= currentStep 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {index + 1}
          </div>
          {index < WIZARD_STEPS.length - 1 && (
            <div 
              className={`flex-1 h-1 mx-2 ${
                index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
