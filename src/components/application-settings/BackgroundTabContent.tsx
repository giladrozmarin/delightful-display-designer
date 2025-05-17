
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ApplicationSettingsFormValues } from './types';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoCircle } from 'lucide-react';

interface BackgroundTabContentProps {
  form: UseFormReturn<ApplicationSettingsFormValues>;
}

export function BackgroundTabContent({ form }: BackgroundTabContentProps) {
  // Ensure the backgroundConfig object exists
  React.useEffect(() => {
    if (!form.getValues().backgroundConfig) {
      form.setValue('backgroundConfig', {
        askSmokingStatus: true,
        askEvictionHistory: true,
        askBankruptcyHistory: false,
        askCriminalHistory: true,
        askRentRefusal: false,
      });
    }
  }, [form]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Background Questions</h2>
        <p className="text-sm text-gray-500">
          Configure background questions to ask applicants
        </p>
      </div>

      <Alert>
        <InfoCircle className="h-4 w-4" />
        <AlertDescription>
          Please ensure all background questions comply with Fair Housing laws and your local regulations.
        </AlertDescription>
      </Alert>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Enable Background Questions Section</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="includeSections.backgroundQuestions"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Include Background Questions</FormLabel>
                  <FormDescription>
                    Ask applicants to answer questions about their background
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

      {form.watch('includeSections.backgroundQuestions') && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Background Questions to Include</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="backgroundConfig.askSmokingStatus"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-normal">Do you smoke?</FormLabel>
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
              name="backgroundConfig.askEvictionHistory"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-normal">Have you ever been evicted?</FormLabel>
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
              name="backgroundConfig.askBankruptcyHistory"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-normal">Have you ever filed for bankruptcy?</FormLabel>
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
              name="backgroundConfig.askCriminalHistory"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div>
                    <FormLabel className="font-normal">Have you ever been convicted of a felony?</FormLabel>
                    <FormDescription className="text-xs mt-1">
                      Ensure compliance with local laws restricting criminal background questions
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

            <FormField
              control={form.control}
              name="backgroundConfig.askRentRefusal"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <FormLabel className="font-normal">Have you ever refused to pay rent?</FormLabel>
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
