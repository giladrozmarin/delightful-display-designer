
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertTriangle, Clock, DollarSign, Percent } from "lucide-react";

interface LateFees {
  applyLateFees: boolean;
  usePropertyDefault: boolean;
  gracePeriod: number;
  lateFeeType: string;
  lateFeeAmount: string;
  lateFeePercentage: string;
}

interface LeaseWizardLateFeesProps {
  lateFees: LateFees;
  onLateFeesChange: (lateFees: LateFees) => void;
}

export function LeaseWizardLateFees({
  lateFees,
  onLateFeesChange,
}: LeaseWizardLateFeesProps) {
  const handleChange = (field: string, value: any) => {
    onLateFeesChange({
      ...lateFees,
      [field]: value
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Apply Late Fees Toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="apply-late-fees">Apply Late Fees</Label>
          <p className="text-sm text-gray-500">
            Enable to charge fees for late rent payments
          </p>
        </div>
        <Switch
          id="apply-late-fees"
          checked={lateFees.applyLateFees}
          onCheckedChange={(checked) => handleChange('applyLateFees', checked)}
        />
      </div>
      
      {lateFees.applyLateFees && (
        <>
          {/* Use Property Default Toggle */}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="use-property-default">Use Property Default Settings</Label>
                <p className="text-sm text-gray-500">
                  Apply the default late fee settings configured for this property
                </p>
              </div>
              <Switch
                id="use-property-default"
                checked={lateFees.usePropertyDefault}
                onCheckedChange={(checked) => handleChange('usePropertyDefault', checked)}
              />
            </div>
          </div>
          
          {!lateFees.usePropertyDefault && (
            <div className="space-y-6 pt-4">
              {/* Grace Period */}
              <div className="space-y-2">
                <Label htmlFor="grace-period">Grace Period (Days)</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    id="grace-period"
                    type="number"
                    min="0"
                    value={lateFees.gracePeriod}
                    onChange={(e) => handleChange('gracePeriod', parseInt(e.target.value) || 0)}
                    className="pl-10"
                    placeholder="5"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Number of days after rent due date before late fees apply
                  </p>
                </div>
              </div>
              
              {/* Late Fee Type */}
              <div className="space-y-2">
                <Label>Late Fee Type</Label>
                <RadioGroup 
                  value={lateFees.lateFeeType} 
                  onValueChange={(value) => handleChange('lateFeeType', value)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className={`border rounded-lg p-4 ${lateFees.lateFeeType === 'fixed' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    <RadioGroupItem 
                      value="fixed" 
                      id="fixed-fee" 
                      className="sr-only"
                    />
                    <Label 
                      htmlFor="fixed-fee" 
                      className="flex items-start cursor-pointer"
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 ${lateFees.lateFeeType === 'fixed' ? 'border-blue-500' : 'border-gray-300'}`}>
                        {lateFees.lateFeeType === 'fixed' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <DollarSign className={`h-5 w-5 mr-2 ${lateFees.lateFeeType === 'fixed' ? 'text-blue-500' : 'text-gray-400'}`} />
                          <span className={`font-medium ${lateFees.lateFeeType === 'fixed' ? 'text-blue-800' : 'text-gray-700'}`}>Fixed Amount</span>
                        </div>
                        <p className={`text-sm mt-1 ${lateFees.lateFeeType === 'fixed' ? 'text-blue-700' : 'text-gray-500'}`}>
                          Charge a fixed dollar amount for late payments
                        </p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className={`border rounded-lg p-4 ${lateFees.lateFeeType === 'percentage' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    <RadioGroupItem 
                      value="percentage" 
                      id="percentage-fee"
                      className="sr-only"
                    />
                    <Label 
                      htmlFor="percentage-fee"
                      className="flex items-start cursor-pointer"
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 ${lateFees.lateFeeType === 'percentage' ? 'border-blue-500' : 'border-gray-300'}`}>
                        {lateFees.lateFeeType === 'percentage' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <Percent className={`h-5 w-5 mr-2 ${lateFees.lateFeeType === 'percentage' ? 'text-blue-500' : 'text-gray-400'}`} />
                          <span className={`font-medium ${lateFees.lateFeeType === 'percentage' ? 'text-blue-800' : 'text-gray-700'}`}>Percentage of Rent</span>
                        </div>
                        <p className={`text-sm mt-1 ${lateFees.lateFeeType === 'percentage' ? 'text-blue-700' : 'text-gray-500'}`}>
                          Charge a percentage of the monthly rent
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Fee Amount Input (based on type) */}
              {lateFees.lateFeeType === 'fixed' ? (
                <div className="space-y-2">
                  <Label htmlFor="late-fee-amount">Late Fee Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      id="late-fee-amount"
                      type="number"
                      min="0"
                      value={lateFees.lateFeeAmount}
                      onChange={(e) => handleChange('lateFeeAmount', e.target.value)}
                      className="pl-10"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="late-fee-percentage">Late Fee Percentage</Label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      id="late-fee-percentage"
                      type="number"
                      min="0"
                      max="100"
                      value={lateFees.lateFeePercentage}
                      onChange={(e) => handleChange('lateFeePercentage', e.target.value)}
                      className="pl-10"
                      placeholder="0"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
      
      {/* Warning/Information Box */}
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-sm text-amber-800 mt-4">
        <p className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
          <span>
            Ensure late fee policies comply with local tenant laws, which may limit fee amounts or require minimum grace periods.
          </span>
        </p>
      </div>
      
      {/* Late Fee Summary */}
      {lateFees.applyLateFees && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
          <h4 className="font-medium text-blue-800 mb-2">Late Fee Summary</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-gray-700">
                <span className="font-medium">Apply Late Fees:</span> Yes
              </span>
            </div>
            
            {lateFees.usePropertyDefault ? (
              <div className="text-gray-700 ml-7">
                <span className="font-medium">Using Property Default Settings</span>
              </div>
            ) : (
              <>
                <div className="text-gray-700 ml-7">
                  <span className="font-medium">Grace Period:</span> {lateFees.gracePeriod} days
                </div>
                
                {lateFees.lateFeeType === 'fixed' ? (
                  <div className="flex items-center ml-5">
                    <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-700">
                      <span className="font-medium">Fixed Fee:</span> ${lateFees.lateFeeAmount}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center ml-5">
                    <Percent className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-700">
                      <span className="font-medium">Percentage:</span> {lateFees.lateFeePercentage}% of rent
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
