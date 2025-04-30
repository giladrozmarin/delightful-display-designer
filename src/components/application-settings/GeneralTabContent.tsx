
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { ApplicationSettingsFormValues } from './types';

interface GeneralTabContentProps {
  form: UseFormReturn<ApplicationSettingsFormValues>;
}

export function GeneralTabContent({ form }: GeneralTabContentProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Instructions for Applicants</CardTitle>
          <CardDescription>
            These instructions will be displayed at the beginning of the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter instructions for applicants..." 
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide clear instructions on how to complete the application.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Property Type Settings</CardTitle>
          <CardDescription>
            Customize the application based on property type.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">This setting can be customized at the property level.</p>
              <p className="text-sm text-muted-foreground">
                Default company settings apply to all properties, but can be overridden for individual properties.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-700">Company-Wide Settings</p>
                <p className="text-sm text-blue-600">
                  The settings configured here will apply to all properties by default. You can override these settings at the property level when needed.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
