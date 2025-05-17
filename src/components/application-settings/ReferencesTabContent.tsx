
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ApplicationSettingsFormValues } from './types';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReferencesTabContentProps {
  form: UseFormReturn<ApplicationSettingsFormValues>;
}

export function ReferencesTabContent({ form }: ReferencesTabContentProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Personal References</h2>
        <p className="text-sm text-gray-500">
          Configure personal or professional reference requirements
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Enable References Section</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="includeSections.references"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Collect References</FormLabel>
                  <FormDescription>
                    Ask applicants to provide personal or professional references
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
        </CardContent>
      </Card>

      {form.watch('includeSections.references') && (
        <div className="mt-4 bg-blue-50 p-4 rounded-md">
          <p className="text-sm text-blue-700">
            When enabled, applicants will be asked to provide up to 2 personal or professional references, including:
          </p>
          <ul className="list-disc list-inside text-sm text-blue-700 mt-2">
            <li>Reference name</li>
            <li>Relationship to applicant</li>
            <li>Contact phone number</li>
            <li>Contact email (optional)</li>
          </ul>
        </div>
      )}
    </div>
  );
}
