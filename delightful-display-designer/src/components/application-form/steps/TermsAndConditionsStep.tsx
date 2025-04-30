
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ApplicationFormData } from '../types';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface TermsAndConditionsStepProps {
  form: UseFormReturn<ApplicationFormData>;
}

export function TermsAndConditionsStep({ form }: TermsAndConditionsStepProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="termsAndConditions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Terms and Conditions</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter terms and conditions" 
                className="min-h-[200px]"
                {...field} 
              />
            </FormControl>
            <FormDescription>
              The terms and conditions that applicants must agree to
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="allowWithoutUnit"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Allow Applications Without Unit</FormLabel>
              <FormDescription>
                Allow applicants to submit applications without selecting a specific unit
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
