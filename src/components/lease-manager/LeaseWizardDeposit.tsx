
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, ShieldCheck, CalendarCheck } from "lucide-react";

interface LeaseWizardDepositProps {
  securityDeposit: string;
  depositReceiveDate: string;
  onSecurityDepositChange: (deposit: string) => void;
  onDepositReceiveDateChange: (date: string) => void;
}

export function LeaseWizardDeposit({
  securityDeposit,
  depositReceiveDate,
  onSecurityDepositChange,
  onDepositReceiveDateChange,
}: LeaseWizardDepositProps) {
  return (
    <div className="space-y-6">
      {/* Security Deposit Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="security-deposit">Security Deposit Amount</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              id="security-deposit"
              type="number"
              min="0"
              value={securityDeposit}
              onChange={(e) => onSecurityDepositChange(e.target.value)}
              className="pl-10"
              placeholder="0.00"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deposit-receive-date">Deposit Receive Date</Label>
          <Input
            id="deposit-receive-date"
            type="date"
            value={depositReceiveDate}
            onChange={(e) => onDepositReceiveDateChange(e.target.value)}
          />
        </div>
      </div>
      
      {/* Information Box */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-600">
        <p className="flex items-start">
          <ShieldCheck className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
          <span>
            Security deposits are typically held in a separate account until the lease ends. They may be used to cover unpaid rent or damages beyond normal wear and tear.
          </span>
        </p>
      </div>
      
      {/* Deposit Summary */}
      {(securityDeposit || depositReceiveDate) && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
          <h4 className="font-medium text-blue-800 mb-2">Security Deposit Summary</h4>
          <div className="space-y-2">
            {securityDeposit && (
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-700">
                  <span className="font-medium">Amount:</span> ${securityDeposit}
                </span>
              </div>
            )}
            
            {depositReceiveDate && (
              <div className="flex items-center">
                <CalendarCheck className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-700">
                  <span className="font-medium">Receive Date:</span> {depositReceiveDate}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
