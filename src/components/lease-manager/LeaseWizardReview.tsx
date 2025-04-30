
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Building, 
  Home, 
  CalendarClock, 
  Users, 
  DollarSign,
  ShieldCheck,
  Clock,
  FileText,
  CheckCircle2,
  PenLine
} from "lucide-react";

interface LeaseWizardReviewProps {
  leaseData: any;
  onLeaseStatusChange: (status: string) => void;
}

export function LeaseWizardReview({
  leaseData,
  onLeaseStatusChange,
}: LeaseWizardReviewProps) {
  // Calculate total monthly rent
  const calculateTotalMonthly = () => {
    const baseRent = parseFloat(leaseData.rentAmount) || 0;
    
    // Calculate additional charges converted to monthly
    const additionalTotal = (leaseData.additionalCharges || []).reduce((total: number, charge: any) => {
      const chargeAmount = parseFloat(charge.amount) || 0;
      
      // Convert to monthly equivalent
      if (charge.frequency === 'weekly') {
        return total + (chargeAmount * 52) / 12;
      } else if (charge.frequency === 'biweekly') {
        return total + (chargeAmount * 26) / 12;
      } else if (charge.frequency === 'monthly') {
        return total + chargeAmount;
      } else if (charge.frequency === 'quarterly') {
        return total + chargeAmount / 3;
      } else if (charge.frequency === 'annually') {
        return total + chargeAmount / 12;
      }
      
      return total + chargeAmount;
    }, 0);
    
    return baseRent + additionalTotal;
  };
  
  return (
    <div className="space-y-6">
      {/* Lease Status */}
      <div className="space-y-2">
        <Label htmlFor="lease-status">Lease Status</Label>
        <Select 
          value={leaseData.leaseStatus} 
          onValueChange={onLeaseStatusChange}
        >
          <SelectTrigger id="lease-status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending-signature">Pending Signature</SelectItem>
            <SelectItem value="active">Active</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-500 mt-1">
          Select "Draft" to save this lease for later or "Pending Signature" if you're ready to send it for signature.
        </p>
      </div>
      
      {/* Review Summary */}
      <div className="bg-white border rounded-lg shadow-sm mt-4 overflow-hidden">
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <h3 className="text-lg font-medium text-blue-800 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Lease Agreement Summary
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary" className="capitalize">
              {leaseData.leaseStatus === 'draft' ? 'Draft' : 
               leaseData.leaseStatus === 'pending-signature' ? 'Pending Signature' : 'Active'}
            </Badge>
            <Badge variant="secondary" className="capitalize">
              {leaseData.leaseType === 'fixed' ? 'Fixed Term' : 'Month-to-Month'}
            </Badge>
          </div>
        </div>
        
        <Accordion type="multiple" defaultValue={["property-unit", "lease-terms"]}>
          {/* Property & Unit */}
          <AccordionItem value="property-unit">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center">
                <Building className="h-5 w-5 mr-2 text-blue-500" />
                <span>Property & Unit</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              {leaseData.property ? (
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Building className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">{leaseData.property.name}</p>
                      <p className="text-sm text-gray-600">{leaseData.property.address}</p>
                    </div>
                  </div>
                  
                  {leaseData.unit && (
                    <div className="flex items-start">
                      <Home className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Unit {leaseData.unit.number}</p>
                        <p className="text-sm text-gray-600">{leaseData.unit.address}</p>
                        <p className="text-sm font-medium text-green-600 mt-1">Market Rent: ${leaseData.unit.rent}/month</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-yellow-600">No property or unit selected</p>
              )}
            </AccordionContent>
          </AccordionItem>
          
          {/* Lease Terms */}
          <AccordionItem value="lease-terms">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center">
                <CalendarClock className="h-5 w-5 mr-2 text-blue-500" />
                <span>Lease Terms</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <CalendarClock className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-gray-700">
                    <span className="font-medium">Type:</span> {leaseData.leaseType === 'fixed' ? 'Fixed Term' : 'Month-to-Month'}
                  </span>
                </div>
                
                {leaseData.startDate && (
                  <div className="flex items-center">
                    <CalendarClock className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-700">
                      <span className="font-medium">Start Date:</span> {leaseData.startDate}
                    </span>
                  </div>
                )}
                
                {leaseData.leaseType === 'fixed' && leaseData.endDate && (
                  <div className="flex items-center">
                    <CalendarClock className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-700">
                      <span className="font-medium">End Date:</span> {leaseData.endDate}
                    </span>
                  </div>
                )}
                
                {leaseData.leaseType === 'fixed' && (
                  <div className="text-gray-700 ml-7">
                    <span className="font-medium">Rollover to Month-to-Month:</span> {leaseData.rolloverToMonthToMonth ? 'Yes' : 'No'}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Tenants */}
          <AccordionItem value="tenants">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-500" />
                <span>Tenants</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              {leaseData.tenants && leaseData.tenants.length > 0 ? (
                <div className="space-y-3">
                  {leaseData.tenants.map((tenant: any) => (
                    <div key={tenant.id} className="flex items-start">
                      <Users className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">{tenant.name}</p>
                        <p className="text-sm text-gray-600">{tenant.email}</p>
                        {tenant.phone && (
                          <p className="text-sm text-gray-600">{tenant.phone}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-yellow-600">No tenants added</p>
              )}
            </AccordionContent>
          </AccordionItem>
          
          {/* Rent */}
          <AccordionItem value="rent">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                <span>Rent Details</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-2">
                {leaseData.rentAmount && (
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-700">
                      <span className="font-medium">Base Rent:</span> ${leaseData.rentAmount}/month
                    </span>
                  </div>
                )}
                
                {leaseData.firstRentDate && (
                  <div className="flex items-center">
                    <CalendarClock className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-700">
                      <span className="font-medium">First Rent Date:</span> {leaseData.firstRentDate}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <CalendarClock className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-gray-700">
                    <span className="font-medium">Payment Frequency:</span> {leaseData.paymentFrequency?.charAt(0).toUpperCase() + (leaseData.paymentFrequency?.slice(1) || '')}
                  </span>
                </div>
                
                {leaseData.additionalCharges && leaseData.additionalCharges.length > 0 && (
                  <div className="pl-7 mt-2">
                    <p className="font-medium text-gray-700">Additional Charges:</p>
                    <ul className="text-sm text-gray-600 space-y-1 mt-1">
                      {leaseData.additionalCharges.map((charge: any) => (
                        <li key={charge.id}>
                          {charge.description}: ${charge.amount}/{charge.frequency}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="pt-3 mt-3 border-t">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-blue-800">Total Monthly Equivalent:</span>
                    <span className="text-blue-800">${calculateTotalMonthly().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Security Deposit */}
          <AccordionItem value="deposit">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-blue-500" />
                <span>Security Deposit</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              {leaseData.securityDeposit ? (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-700">
                      <span className="font-medium">Amount:</span> ${leaseData.securityDeposit}
                    </span>
                  </div>
                  
                  {leaseData.depositReceiveDate && (
                    <div className="flex items-center">
                      <CalendarClock className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-gray-700">
                        <span className="font-medium">Receive Date:</span> {leaseData.depositReceiveDate}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-yellow-600">No security deposit information</p>
              )}
            </AccordionContent>
          </AccordionItem>
          
          {/* Late Fees */}
          <AccordionItem value="late-fees">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                <span>Late Fees</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              {leaseData.lateFees ? (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-700">
                      <span className="font-medium">Apply Late Fees:</span> {leaseData.lateFees.applyLateFees ? 'Yes' : 'No'}
                    </span>
                  </div>
                  
                  {leaseData.lateFees.applyLateFees && (
                    <>
                      {leaseData.lateFees.usePropertyDefault ? (
                        <div className="text-gray-700 ml-7">
                          <span className="font-medium">Using Property Default Settings</span>
                        </div>
                      ) : (
                        <>
                          <div className="text-gray-700 ml-7">
                            <span className="font-medium">Grace Period:</span> {leaseData.lateFees.gracePeriod} days
                          </div>
                          
                          {leaseData.lateFees.lateFeeType === 'fixed' ? (
                            <div className="flex items-center ml-5">
                              <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
                              <span className="text-gray-700">
                                <span className="font-medium">Fixed Fee:</span> ${leaseData.lateFees.lateFeeAmount}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center ml-5">
                              <Clock className="h-5 w-5 text-blue-500 mr-2" />
                              <span className="text-gray-700">
                                <span className="font-medium">Percentage:</span> {leaseData.lateFees.lateFeePercentage}% of rent
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <p className="text-yellow-600">No late fee settings</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      {/* Next Steps */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
        <h4 className="font-medium text-blue-800 mb-2 flex items-center">
          <CheckCircle2 className="h-5 w-5 mr-2" />
          Next Steps
        </h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center">
            <PenLine className="h-4 w-4 text-blue-500 mr-2" />
            <span>Save as draft to continue editing later</span>
          </li>
          <li className="flex items-center">
            <PenLine className="h-4 w-4 text-blue-500 mr-2" />
            <span>Send for electronic signature to finalize the lease</span>
          </li>
          <li className="flex items-center">
            <PenLine className="h-4 w-4 text-blue-500 mr-2" />
            <span>Once signed, the lease will be automatically activated</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
