
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Contractor, ContractorType } from '@/pages/Contractors';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check, CreditCard, Banknote } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ContractorFormProps {
  contractor: Contractor | null;
  onSave: (contractor: Contractor) => void;
  onCancel: () => void;
}

const contractorTypes: ContractorType[] = [
  'Plumbing',
  'Electrical',
  'HVAC',
  'Appliance Repair',
  'General',
  'Cleaning',
  'Landscaping',
  'Pest Control'
];

const paymentTermsOptions = [
  'Net 15',
  'Net 30',
  'Net 45',
  'Net 60',
  'Due on Receipt',
  '2% 10 Net 30',
  'Custom'
];

export function ContractorForm({ contractor, onSave, onCancel }: ContractorFormProps) {
  const form = useForm<Contractor>({
    defaultValues: contractor || {
      id: '',
      company: '',
      name: '',
      address: '',
      email: '',
      phone: '',
      type: 'General',
      insuranceExpiration: '',
      workersCompExpiration: '',
      taxpayerId: '',
      paymentTerms: 'Net 30',
      billingCode: '',
      notes: '',
      isPreferred: false,
      routingNumber: '',
      accountNumber: ''
    }
  });

  const handleSubmit = (data: Contractor) => {
    onSave({
      ...data,
      id: contractor?.id || '' // ID will be generated on the backend for new contractors
    });
  };

  const validateRoutingNumber = (value: string) => {
    if (!value) return true; // Allow empty
    
    // Check if exactly 9 digits
    if (!/^\d{9}$/.test(value)) {
      return "Routing number must be exactly 9 digits";
    }
    
    // Apply NACHA validation algorithm
    const weights = [3, 7, 1, 3, 7, 1, 3, 7, 1];
    const total = value.split('').reduce((sum, digit, index) => {
      return sum + parseInt(digit) * weights[index];
    }, 0);
    
    if (total % 10 !== 0) {
      return "Invalid routing number (checksum failed)";
    }
    
    return true;
  };

  const validateAccountNumber = (value: string) => {
    if (!value) return true; // Allow empty
    
    // Check if 4-17 digits only
    if (!/^\d{4,17}$/.test(value)) {
      return "Account number must be 4 to 17 digits";
    }
    
    return true;
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{contractor ? 'Edit Contractor' : 'Add New Contractor'}</DialogTitle>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company & Contact Info Section */}
            <div className="space-y-4 md:col-span-2">
              <Collapsible className="border rounded-md p-4" defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="text-lg font-medium">Company & Contact Info</h3>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Company name" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Person</FormLabel>
                          <FormControl>
                            <Input placeholder="Contact name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address*</FormLabel>
                        <FormControl>
                          <Input placeholder="Street address" {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone*</FormLabel>
                          <FormControl>
                            <Input placeholder="Phone number" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <FormField
                      control={form.control}
                      name="isPreferred"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Switch 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Preferred Contractor</FormLabel>
                            <FormDescription>
                              Mark as a preferred service provider
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            
            {/* Insurance & Compliance Section */}
            <div className="space-y-4 md:col-span-2">
              <Collapsible className="border rounded-md p-4" defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="text-lg font-medium">Insurance & Compliance</h3>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="insuranceExpiration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Liability Insurance Expiration</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="workersCompExpiration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Workers Comp Expiration</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            
            {/* Payment & Financial Section */}
            <div className="space-y-4 md:col-span-2">
              <Collapsible className="border rounded-md p-4" defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="text-lg font-medium">Payment & Financial Information</h3>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="taxpayerId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Taxpayer ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Tax ID or SSN" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="paymentTerms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Terms</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment terms" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white">
                              {paymentTermsOptions.map(term => (
                                <SelectItem key={term} value={term}>
                                  {term}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="billingCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Billing Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Billing code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CollapsibleContent>
              </Collapsible>
            </div>
            
            {/* Banking Information Section */}
            <div className="space-y-4 md:col-span-2">
              <Collapsible className="border rounded-md p-4">
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="text-lg font-medium">Banking Information</h3>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="routingNumber"
                    rules={{ validate: validateRoutingNumber }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Routing Number (ABA/RTN)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input 
                              placeholder="9-digit routing number" 
                              {...field} 
                              className="pl-10"
                              maxLength={9}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Enter exactly 9 digits (0-9)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="accountNumber"
                    rules={{ validate: validateAccountNumber }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input 
                              placeholder="Account number" 
                              {...field} 
                              className="pl-10"
                              maxLength={17}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Enter 4-17 digits (NACHA recommends digits only)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CollapsibleContent>
              </Collapsible>
            </div>
            
            {/* Contractor Type Section */}
            <div className="space-y-4 md:col-span-2">
              <Collapsible className="border rounded-md p-4" defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="text-lg font-medium">Contractor Type</h3>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contractor Type*</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select contractor type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            {contractorTypes.map(type => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CollapsibleContent>
              </Collapsible>
            </div>
            
            {/* Notes Section */}
            <div className="space-y-4 md:col-span-2">
              <Collapsible className="border rounded-md p-4" defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="text-lg font-medium">Notes</h3>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter any additional notes about this contractor" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              <Check className="mr-2 h-4 w-4" /> Save Contractor
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
