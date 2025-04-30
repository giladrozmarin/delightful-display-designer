
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ApplicationSettingsFormValues } from './types';

interface ResidentialTabContentProps {
  form: UseFormReturn<ApplicationSettingsFormValues>;
}

export function ResidentialTabContent({ form }: ResidentialTabContentProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Residential Information Fields</CardTitle>
          <CardDescription>
            Configure which residential history fields are required or optional.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="residentialFields.currentAddress"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={true} // Mandatory field
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Current Address <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription>
                      This field is mandatory and cannot be disabled.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="residentialFields.moveInDate"
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
                      Move-in Date
                    </FormLabel>
                    <FormDescription>
                      When the applicant moved into their current residence.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="residentialFields.currentLandlord"
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
                      Current Landlord Contact Information
                    </FormLabel>
                    <FormDescription>
                      Contact details for current landlord reference.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="residentialFields.reasonForMoving"
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
                      Reason for Moving
                    </FormLabel>
                    <FormDescription>
                      Why the applicant is leaving their current residence.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="residentialFields.previousAddresses"
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
                      Previous Addresses
                    </FormLabel>
                    <FormDescription>
                      Request information about previous residences.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
