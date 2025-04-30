
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarClock, CalendarCheck, CalendarX } from "lucide-react";

interface LeaseWizardTermsProps {
  leaseType: string;
  startDate: string;
  endDate: string;
  rolloverToMonthToMonth: boolean;
  onLeaseTypeChange: (type: string) => void;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onRolloverChange: (value: boolean) => void;
}

export function LeaseWizardTerms({
  leaseType,
  startDate,
  endDate,
  rolloverToMonthToMonth,
  onLeaseTypeChange,
  onStartDateChange,
  onEndDateChange,
  onRolloverChange,
}: LeaseWizardTermsProps) {
  return (
    <div className="space-y-6">
      {/* Lease Type Selection */}
      <div className="space-y-4">
        <Label>Lease Type</Label>
        <RadioGroup 
          value={leaseType} 
          onValueChange={onLeaseTypeChange}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className={`border rounded-lg p-4 ${leaseType === 'fixed' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
            <RadioGroupItem 
              value="fixed" 
              id="fixed" 
              className="sr-only"
            />
            <Label 
              htmlFor="fixed" 
              className="flex items-start cursor-pointer"
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 ${leaseType === 'fixed' ? 'border-blue-500' : 'border-gray-300'}`}>
                {leaseType === 'fixed' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                )}
              </div>
              <div>
                <div className="flex items-center">
                  <CalendarCheck className={`h-5 w-5 mr-2 ${leaseType === 'fixed' ? 'text-blue-500' : 'text-gray-400'}`} />
                  <span className={`font-medium ${leaseType === 'fixed' ? 'text-blue-800' : 'text-gray-700'}`}>Fixed Term</span>
                </div>
                <p className={`text-sm mt-1 ${leaseType === 'fixed' ? 'text-blue-700' : 'text-gray-500'}`}>
                  Lease has a specific start and end date, typically for 6, 12, or 24 months.
                </p>
              </div>
            </Label>
          </div>
          
          <div className={`border rounded-lg p-4 ${leaseType === 'monthly' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
            <RadioGroupItem 
              value="monthly" 
              id="monthly"
              className="sr-only"
            />
            <Label 
              htmlFor="monthly"
              className="flex items-start cursor-pointer"
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 ${leaseType === 'monthly' ? 'border-blue-500' : 'border-gray-300'}`}>
                {leaseType === 'monthly' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                )}
              </div>
              <div>
                <div className="flex items-center">
                  <CalendarClock className={`h-5 w-5 mr-2 ${leaseType === 'monthly' ? 'text-blue-500' : 'text-gray-400'}`} />
                  <span className={`font-medium ${leaseType === 'monthly' ? 'text-blue-800' : 'text-gray-700'}`}>Month-to-Month</span>
                </div>
                <p className={`text-sm mt-1 ${leaseType === 'monthly' ? 'text-blue-700' : 'text-gray-500'}`}>
                  Lease automatically renews every month until terminated by either party.
                </p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      {/* Date Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="start-date">Start Date</Label>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
          />
        </div>
        
        {leaseType === 'fixed' && (
          <div className="space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              min={startDate}
            />
          </div>
        )}
      </div>
      
      {/* Rollover Option for Fixed Term */}
      {leaseType === 'fixed' && (
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="rollover-switch">Rollover to Month-to-Month</Label>
              <p className="text-sm text-gray-500">
                If enabled, the lease will automatically convert to month-to-month after the fixed term ends.
              </p>
            </div>
            <Switch
              id="rollover-switch"
              checked={rolloverToMonthToMonth}
              onCheckedChange={onRolloverChange}
            />
          </div>
        </div>
      )}
      
      {/* Lease Term Summary */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
        <h4 className="font-medium text-blue-800 mb-2">Lease Term Summary</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <CalendarCheck className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-gray-700">
              <span className="font-medium">Type:</span> {leaseType === 'fixed' ? 'Fixed Term' : 'Month-to-Month'}
            </span>
          </div>
          
          {startDate && (
            <div className="flex items-center">
              <CalendarClock className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-gray-700">
                <span className="font-medium">Start Date:</span> {startDate}
              </span>
            </div>
          )}
          
          {leaseType === 'fixed' && endDate && (
            <div className="flex items-center">
              <CalendarX className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-gray-700">
                <span className="font-medium">End Date:</span> {endDate}
              </span>
            </div>
          )}
          
          {leaseType === 'fixed' && (
            <div className="text-gray-700 ml-7">
              <span className="font-medium">Rollover:</span> {rolloverToMonthToMonth ? 'Yes' : 'No'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
