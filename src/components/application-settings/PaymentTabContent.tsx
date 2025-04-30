
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { ApplicationSettingsFormValues } from './types';

interface PaymentTabContentProps {
  form: UseFormReturn<ApplicationSettingsFormValues>;
}

export function PaymentTabContent({ form }: PaymentTabContentProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Application & Screening Fee Options</CardTitle>
          <CardDescription>
            Configure how applicants will pay for their application and background check.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="paymentOption"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <FormLabel>Payment Option</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    {/* All-in-One Option */}
                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        id="allInOne"
                        value="allInOne"
                        checked={field.value === 'allInOne'}
                        onChange={() => field.onChange('allInOne')}
                        className="mt-1"
                      />
                      <div>
                        <label htmlFor="allInOne" className="font-medium text-gray-900 block">
                          All-in-One Solution ($49.90)
                        </label>
                        <p className="text-sm text-gray-500">
                          The applicant pays $49.90 for the application and background screening. No merchant account needed.
                        </p>
                      </div>
                    </div>

                    {/* Custom Fee Option */}
                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        id="customFee"
                        value="customFee"
                        checked={field.value === 'customFee'}
                        onChange={() => field.onChange('customFee')}
                        className="mt-1"
                      />
                      <div className="w-full">
                        <label htmlFor="customFee" className="font-medium text-gray-900 block">
                          Custom Fee Plan
                        </label>
                        <p className="text-sm text-gray-500 mb-3">
                          Set your own application fee. Requires a merchant account. $3.50 processing fee deducted.
                        </p>
                        
                        {field.value === 'customFee' && (
                          <div className="ml-0 space-y-4">
                            <FormField
                              control={form.control}
                              name="customFeeAmount"
                              render={({ field: amountField }) => (
                                <FormItem>
                                  <FormLabel>Application Fee Amount ($)</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="25.00"
                                      value={amountField.value}
                                      onChange={(e) => amountField.onChange(parseFloat(e.target.value))}
                                      className="max-w-xs"
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    The amount you'll charge applicants for processing their application.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="includeScreeningCosts"
                              render={({ field: screeningField }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={screeningField.value}
                                      onCheckedChange={screeningField.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>
                                      Include screening costs in the fee by default
                                    </FormLabel>
                                    <FormDescription>
                                      When enabled, background screening will be automatically requested.
                                    </FormDescription>
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Application-Only Option */}
                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        id="applicationOnly"
                        value="applicationOnly"
                        checked={field.value === 'applicationOnly'}
                        onChange={() => field.onChange('applicationOnly')}
                        className="mt-1"
                      />
                      <div>
                        <label htmlFor="applicationOnly" className="font-medium text-gray-900 block">
                          Application-Only Plan
                        </label>
                        <p className="text-sm text-gray-500">
                          Does not charge the tenant an application fee or request screening reports automatically.
                        </p>
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-yellow-700">
                TransUnion Terms & Conditions
              </p>
              <p className="text-sm text-yellow-600">
                The applicant will be required to accept DoorLoop and TransUnion Terms and Conditions before submitting their application.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
