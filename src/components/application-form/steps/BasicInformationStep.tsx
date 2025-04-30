
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ApplicationFormData } from '../types';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface BasicInformationStepProps {
  form: UseFormReturn<ApplicationFormData>;
}

export function BasicInformationStep({ form }: BasicInformationStepProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Application Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter application name" {...field} />
            </FormControl>
            <FormDescription>
              This name will be displayed to applicants
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description (Optional)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter application description" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              A brief description of this application
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="instructions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instructions</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter instructions for applicants" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Instructions that will be displayed to applicants
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
