
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { ApplicationSettingsFormValues } from './types';

interface TermsTabContentProps {
  form: UseFormReturn<ApplicationSettingsFormValues>;
}

export function TermsTabContent({ form }: TermsTabContentProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Terms & Conditions</CardTitle>
          <CardDescription>
            Set the terms and conditions that applicants must agree to.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="termsAndConditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Terms and Conditions Text</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter terms and conditions..." 
                    className="min-h-40"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Applicants will be required to accept these terms before submitting their application.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-yellow-700">
                Compliance Notice
              </p>
              <p className="text-sm text-yellow-600">
                Ensure your terms comply with fair housing laws and other local regulations. Consider having your terms reviewed by legal counsel.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
