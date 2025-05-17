
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ApplicationSettingsFormValues } from './types';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VehiclesTabContentProps {
  form: UseFormReturn<ApplicationSettingsFormValues>;
}

export function VehiclesTabContent({ form }: VehiclesTabContentProps) {
  // Ensure the vehicleConfig object exists
  React.useEffect(() => {
    if (!form.getValues().vehicleConfig) {
      form.setValue('vehicleConfig', {
        collectMake: true,
        collectModel: true,
        collectYear: true,
        collectLicense: true,
        collectInsurance: false,
      });
    }
  }, [form]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Vehicle Information</h2>
        <p className="text-sm text-gray-500">
          Configure what information to collect about vehicles
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Enable Vehicles Section</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="includeSections.vehicleInformation"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Collect Vehicle Information</FormLabel>
                  <FormDescription>
                    Ask applicants to provide information about their vehicles
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

      {form.watch('includeSections.vehicleInformation') && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Vehicle Details to Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="vehicleConfig.collectMake"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-normal">Make/Brand</FormLabel>
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
              name="vehicleConfig.collectModel"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-normal">Model</FormLabel>
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
              name="vehicleConfig.collectYear"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-normal">Year</FormLabel>
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
              name="vehicleConfig.collectLicense"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-normal">License Plate Number</FormLabel>
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
              name="vehicleConfig.collectInsurance"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-normal">Insurance Information</FormLabel>
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
