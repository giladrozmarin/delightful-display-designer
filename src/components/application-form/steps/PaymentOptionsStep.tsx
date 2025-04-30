
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ApplicationFormData } from '../types';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface PaymentOptionsStepProps {
  form: UseFormReturn<ApplicationFormData>;
}

export function PaymentOptionsStep({ form }: PaymentOptionsStepProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="paymentOption"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Option</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment option" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="allInOne">All-in-One (Application + Screening)</SelectItem>
                <SelectItem value="customFee">Custom Fee</SelectItem>
                <SelectItem value="applicationOnly">Application Only</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Choose how applicants will pay for the application
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {form.watch("paymentOption") === "customFee" && (
        <FormField
          control={form.control}
          name="customFeeAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Fee Amount ($)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                The amount applicants will pay
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      
      <FormField
        control={form.control}
        name="includeScreeningCosts"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Include Screening Costs</FormLabel>
              <FormDescription>
                Include background and credit check costs in the application fee
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
