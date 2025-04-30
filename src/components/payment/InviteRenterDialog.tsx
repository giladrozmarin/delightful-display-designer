
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Home, Mail, UserPlus, BookOpen, CreditCard, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface InviteRenterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  unit: {
    number: string;
    rent: number;
  };
}

export function InviteRenterDialog({
  open,
  onOpenChange,
  property,
  unit
}: InviteRenterDialogProps) {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactMethod, setContactMethod] = useState('email');
  const [renterEmail, setRenterEmail] = useState('');
  const [renterPhone, setRenterPhone] = useState('');
  const [securityDeposit, setSecurityDeposit] = useState(unit.rent);
  const [applicationType, setApplicationType] = useState('premium');

  const handleSendInvite = () => {
    // Validate form
    if (!firstName || !lastName) {
      toast({
        title: "Missing Information",
        description: "Please provide the renter's first and last name.",
        variant: "destructive"
      });
      return;
    }

    if (contactMethod === 'email' || contactMethod === 'both') {
      if (!renterEmail) {
        toast({
          title: "Missing Email",
          description: "Please provide the renter's email address.",
          variant: "destructive"
        });
        return;
      }
    }

    if (contactMethod === 'text' || contactMethod === 'both') {
      if (!renterPhone) {
        toast({
          title: "Missing Phone Number",
          description: "Please provide the renter's phone number.",
          variant: "destructive"
        });
        return;
      }
    }

    // Here you would typically send the invitation via API
    // For now, we'll just show a success message
    toast({
      title: "Invitation Sent",
      description: `Invitation has been sent to ${firstName} ${lastName}.`,
    });
    
    onOpenChange(false);
  };

  const fullAddress = `${property.address}, ${property.city}, ${property.state} ${property.zip}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Invite Renter To Apply</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Renter Info Section */}
          <Collapsible className="border rounded-md p-4" defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <UserPlus className="h-5 w-5 text-gray-700" />
                </div>
                <h3 className="text-lg font-medium">Renter Info</h3>
              </div>
              {/* Fixed TS error by using a React element instead of function */}
              <div className="transition-transform">
                <ChevronDown className="h-4 w-4 data-[state=open]:hidden" />
                <ChevronUp className="h-4 w-4 hidden data-[state=open]:block" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label className="mb-2 block">Send Invite By:</Label>
                <RadioGroup 
                  value={contactMethod} 
                  onValueChange={setContactMethod}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email-option" />
                    <Label htmlFor="email-option">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="text-option" />
                    <Label htmlFor="text-option">Text</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both-option" />
                    <Label htmlFor="both-option">Email & Text</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {(contactMethod === 'email' || contactMethod === 'both') && (
                <div>
                  <Label htmlFor="renterEmail">Renter's Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="renterEmail" 
                      type="email" 
                      value={renterEmail}
                      onChange={(e) => setRenterEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="pl-10"
                    />
                  </div>
                </div>
              )}
              
              {(contactMethod === 'text' || contactMethod === 'both') && (
                <div>
                  <Label htmlFor="renterPhone">Renter's Phone</Label>
                  <div className="relative mt-1">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="renterPhone" 
                      type="tel" 
                      value={renterPhone}
                      onChange={(e) => setRenterPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="pl-10"
                    />
                  </div>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
          
          {/* Property Section */}
          <Collapsible className="border rounded-md p-4" defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Home className="h-5 w-5 text-gray-700" />
                </div>
                <h3 className="text-lg font-medium">Rental Property</h3>
              </div>
              {/* Fixed TS error by using a React element instead of function */}
              <div className="transition-transform">
                <ChevronDown className="h-4 w-4 data-[state=open]:hidden" />
                <ChevronUp className="h-4 w-4 hidden data-[state=open]:block" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 space-y-4">
              <div>
                <Label htmlFor="propertyAddress">Property Applying To</Label>
                <div className="border rounded-md p-3 bg-gray-50 text-gray-700 mt-1">
                  {fullAddress} #{unit.number}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rentAmount">Rent Amount</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input 
                      id="rentAmount" 
                      type="number" 
                      value={unit.rent} 
                      className="pl-7"
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="securityDeposit">Security Deposit</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input 
                      id="securityDeposit" 
                      type="number" 
                      value={securityDeposit}
                      onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                      className="pl-7"
                    />
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Application Type Section */}
          <Collapsible className="border rounded-md p-4" defaultOpen>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-gray-700" />
                </div>
                <h3 className="text-lg font-medium">Application Type</h3>
              </div>
              {/* Fixed TS error by using a React element instead of function */}
              <div className="transition-transform">
                <ChevronDown className="h-4 w-4 data-[state=open]:hidden" />
                <ChevronUp className="h-4 w-4 hidden data-[state=open]:block" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 space-y-4">
              <RadioGroup 
                value={applicationType} 
                onValueChange={setApplicationType}
                className="space-y-4"
              >
                <div className={`border rounded-lg p-4 relative ${applicationType === 'premium' ? 'border-blue-600 bg-blue-50' : ''}`}>
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-0.5 rounded-bl-lg rounded-tr-lg text-xs font-medium">
                    INCLUDED WITH PREMIUM
                  </div>
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value="premium" id="premium-option" className="mt-1" />
                    <div>
                      <Label htmlFor="premium-option" className="text-base font-medium">Background, Eviction, Credit + Income Insights</Label>
                      <div>
                        <span className="text-gray-400 line-through">$55</span> 
                        <span className="font-semibold ml-1">$45 fee</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`border rounded-lg p-4 ${applicationType === 'standard' ? 'border-blue-600 bg-blue-50' : ''}`}>
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value="standard" id="standard-option" className="mt-1" />
                    <div>
                      <Label htmlFor="standard-option" className="text-base font-medium">
                        Standard Screening Report
                      </Label>
                      <div>
                        <div>Background, Eviction, Credit Only</div>
                        <span className="font-semibold">$55 fee</span>
                      </div>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Action Buttons */}
          <DialogFooter className="mt-4 pt-4 border-t flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSendInvite} 
              className="flex-1 bg-blue-800 hover:bg-blue-900"
            >
              <Check className="mr-2 h-4 w-4" /> Send Invitation
            </Button>
          </DialogFooter>
          
          {/* Demo Link */}
          <div className="text-center text-sm">
            <p className="text-gray-500">Want to see the application before you invite a renter to apply?</p>
            <Button variant="link" className="text-blue-600 font-medium p-0">
              Demo our test application.
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
