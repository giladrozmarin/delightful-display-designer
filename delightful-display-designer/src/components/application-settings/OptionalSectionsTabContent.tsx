
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ApplicationSettingsFormValues } from './types';

interface OptionalSectionsTabContentProps {
  form: UseFormReturn<ApplicationSettingsFormValues>;
}

export function OptionalSectionsTabContent({ form }: OptionalSectionsTabContentProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Optional Application Sections</CardTitle>
          <CardDescription>
            Enable or disable additional sections in the rental application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="includeSections.vehicleInformation"
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
                      Vehicle Information
                    </FormLabel>
                    <FormDescription>
                      Collect information about applicant's vehicles.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="includeSections.dependents"
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
                      Dependents
                    </FormLabel>
                    <FormDescription>
                      Information about children or other dependents who will live in the unit.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="includeSections.emergencyContacts"
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
                      Emergency Contacts
                    </FormLabel>
                    <FormDescription>
                      Emergency contact information.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="includeSections.pets"
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
                      Pets
                    </FormLabel>
                    <FormDescription>
                      Information about pets the applicant owns.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="includeSections.additionalIncome"
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
                      Additional Income Sources
                    </FormLabel>
                    <FormDescription>
                      Information about additional income sources beyond primary employment.
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
