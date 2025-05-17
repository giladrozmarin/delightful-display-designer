
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ApplicationSettingsFormValues } from './types';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PetsTabContentProps {
  form: UseFormReturn<ApplicationSettingsFormValues>;
}

export function PetsTabContent({ form }: PetsTabContentProps) {
  // Ensure the petConfig object exists
  React.useEffect(() => {
    if (!form.getValues().petConfig) {
      form.setValue('petConfig', {
        collectType: true,
        collectBreed: true,
        collectWeight: true,
        collectAge: false,
        collectVaccination: false,
      });
    }
  }, [form]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Pet Information</h2>
        <p className="text-sm text-gray-500">
          Configure what information to collect about pets
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Enable Pets Section</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="includeSections.pets"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Collect Pet Information</FormLabel>
                  <FormDescription>
                    Ask applicants to provide information about their pets
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

      {form.watch('includeSections.pets') && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pet Details to Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="petConfig.collectType"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-normal">Pet Type/Species</FormLabel>
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
              name="petConfig.collectBreed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-normal">Breed</FormLabel>
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
              name="petConfig.collectWeight"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-normal">Weight/Size</FormLabel>
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
              name="petConfig.collectAge"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-normal">Age</FormLabel>
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
              name="petConfig.collectVaccination"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-normal">Vaccination Status</FormLabel>
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
