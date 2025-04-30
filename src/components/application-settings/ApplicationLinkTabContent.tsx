
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { ApplicationSettingsFormValues } from './types';

interface ApplicationLinkTabContentProps {
  form: UseFormReturn<ApplicationSettingsFormValues>;
}

export function ApplicationLinkTabContent({ form }: ApplicationLinkTabContentProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Application Link Settings</CardTitle>
          <CardDescription>
            Configure how your application links work.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="allowWithoutUnit"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Allow applications without selecting a specific unit
                  </FormLabel>
                  <FormDescription>
                    When enabled, prospects can apply without choosing a specific unit.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-medium">General Application Link</h3>
            <div className="flex">
              <Input 
                readOnly
                value="https://apply.propertycare.com/yourdomain" 
                className="bg-gray-50 flex-1"
              />
              <Button className="ml-2">
                Copy Link
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Share this link with prospects to apply to any property without selecting a specific unit.
            </p>
          </div>
          
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-700">Property-Specific Links</p>
              <p className="text-sm text-blue-600">
                You can also generate property-specific application links from each property's settings page.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
