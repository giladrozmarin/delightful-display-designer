
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ApplicationSettingsFormValues } from './types';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OccupantsTabContentProps {
  form: UseFormReturn<ApplicationSettingsFormValues>;
}

export function OccupantsTabContent({ form }: OccupantsTabContentProps) {
  // Ensure the occupantsConfig object exists
  React.useEffect(() => {
    if (!form.getValues().occupantsConfig) {
      form.setValue('occupantsConfig', {
        collectNames: true,
        collectAges: true,
        collectRelationship: false,
      });
    }
  }, [form]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Occupants Information</h2>
        <p className="text-sm text-gray-500">
          Configure what information to collect about additional occupants
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Enable Occupants Section</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="includeSections.occupants"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Collect Occupant Information</FormLabel>
                  <FormDescription>
                    Ask applicants to provide information about additional occupants
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

      {form.watch('includeSections.occupants') && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Occupants Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="occupantsConfig.collectNames"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-normal">Collect Full Names</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="occupantsConfig.collectAges"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-normal">Collect Ages</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="occupantsConfig.collectRelationship"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-normal">Collect Relationship to Applicant</FormLabel>
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
      )}
    </div>
  );
}
