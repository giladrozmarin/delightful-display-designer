
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ApplicationFormData } from '../types';

interface ReviewStepProps {
  form: UseFormReturn<ApplicationFormData>;
}

export function ReviewStep({ form }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Application Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p>{form.getValues("name")}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Description</p>
            <p>{form.getValues("description") || "No description provided"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Payment Option</p>
            <p>
              {form.getValues("paymentOption") === "allInOne" && "All-in-One (Application + Screening)"}
              {form.getValues("paymentOption") === "customFee" && `Custom Fee: $${form.getValues("customFeeAmount")}`}
              {form.getValues("paymentOption") === "applicationOnly" && "Application Only"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Include Screening Costs</p>
            <p>{form.getValues("includeScreeningCosts") ? "Yes" : "No"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Allow Without Unit</p>
            <p>{form.getValues("allowWithoutUnit") ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Instructions</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm">{form.getValues("instructions")}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Terms and Conditions</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm">{form.getValues("termsAndConditions")}</p>
        </div>
      </div>
    </div>
  );
}
