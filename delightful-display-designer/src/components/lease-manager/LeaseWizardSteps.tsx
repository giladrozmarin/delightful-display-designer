
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  label: string;
}

interface LeaseWizardStepsProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function LeaseWizardSteps({ steps, currentStep, onStepClick }: LeaseWizardStepsProps) {
  return (
    <div className="w-full bg-white shadow rounded-lg p-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step indicator */}
              <div className="flex flex-col items-center cursor-pointer" onClick={() => onStepClick(index)}>
                <div 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2",
                    isCompleted ? "bg-blue-600 border-blue-600 text-white" : 
                    isCurrent ? "border-blue-600 text-blue-600" : 
                    "border-gray-300 text-gray-500"
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <span 
                  className={cn(
                    "mt-2 text-xs whitespace-nowrap",
                    isCompleted ? "text-blue-600" : 
                    isCurrent ? "text-blue-600 font-medium" : 
                    "text-gray-500"
                  )}
                >
                  {step.label}
                </span>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    "flex-1 h-0.5 mx-2",
                    index < currentStep ? "bg-blue-600" : "bg-gray-300"
                  )}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
