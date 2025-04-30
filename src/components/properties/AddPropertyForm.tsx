import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building, 
  Home, 
  Store, 
  MapPin, 
  DoorClosed, 
  Building2, 
  ReceiptText, 
  PiggyBank, 
  Users, 
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Plus
} from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

// Property wizard schemas for each step
const propertyTypeSchema = z.object({
  type: z.enum(["residential", "commercial"]),
  subType: z.string().min(1, "Please select a sub-type"),
});

const addressSchema = z.object({
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(5, "Please enter a valid ZIP code"),
  propertyName: z.string().optional(),
});

// Updated unit schema to handle the single family home case
const unitSchema = z.object({
  units: z.array(z.object({
    name: z.string().min(1, "Unit name is required"),
    beds: z.string().optional(),
    baths: z.string().optional(),
    size: z.string().optional(),
    marketRent: z.string().optional(),
  })).min(1, "At least one unit is required"),
  // For single family homes
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  squareFootage: z.string().optional(),
  monthlyRent: z.string().optional(),
});

const bankAccountSchema = z.object({
  useDefaultAccount: z.boolean(),
  bankAccount: z.string().optional(),
  separateSecurityDeposits: z.boolean(),
  securityDepositAccount: z.string().optional(),
});

const reserveFundsSchema = z.object({
  setReserve: z.boolean(),
  reserveAmount: z.string().optional(),
});

const ownershipSchema = z.object({
  ownedByMe: z.boolean(),
  owners: z.array(z.object({
    name: z.string(),
    percentage: z.string(),
  })).optional(),
});

type PropertyFormData = {
  propertyType: z.infer<typeof propertyTypeSchema>;
  address: z.infer<typeof addressSchema>;
  units: z.infer<typeof unitSchema>;
  bankAccount: z.infer<typeof bankAccountSchema>;
  reserveFunds: z.infer<typeof reserveFundsSchema>;
  ownership: z.infer<typeof ownershipSchema>;
};

interface AddPropertyFormProps {
  onClose: () => void;
}

export function AddPropertyForm({ onClose }: AddPropertyFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<PropertyFormData>>({});
  const { toast } = useToast();
  const [isSingleFamilyHome, setIsSingleFamilyHome] = useState(false);

  // Step 1: Property Type
  const typeForm = useForm<z.infer<typeof propertyTypeSchema>>({
    resolver: zodResolver(propertyTypeSchema),
    defaultValues: formData.propertyType || {
      type: "residential",
      subType: "",
    },
  });

  // Watch for changes to subType to detect single family homes
  useEffect(() => {
    const subType = typeForm.watch("subType");
    setIsSingleFamilyHome(subType === "single_family");
  }, [typeForm.watch("subType")]);

  // Step 2: Property Address
  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: formData.address || {
      address: "",
      city: "",
      state: "",
      zip: "",
      propertyName: "",
    },
  });

  // Step 3: Units
  const unitForm = useForm<z.infer<typeof unitSchema>>({
    resolver: zodResolver(unitSchema),
    defaultValues: formData.units || {
      units: [{ name: "", beds: "", baths: "", size: "", marketRent: "" }],
      bedrooms: "",
      bathrooms: "",
      squareFootage: "",
      monthlyRent: ""
    },
  });

  // Step 4: Bank Accounts
  const bankAccountForm = useForm<z.infer<typeof bankAccountSchema>>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: formData.bankAccount || {
      useDefaultAccount: true,
      bankAccount: "",
      separateSecurityDeposits: false,
      securityDepositAccount: "",
    },
  });

  // Step 5: Reserve Funds
  const reserveFundsForm = useForm<z.infer<typeof reserveFundsSchema>>({
    resolver: zodResolver(reserveFundsSchema),
    defaultValues: formData.reserveFunds || {
      setReserve: false,
      reserveAmount: "",
    },
  });

  // Step 6: Ownership
  const ownershipForm = useForm<z.infer<typeof ownershipSchema>>({
    resolver: zodResolver(ownershipSchema),
    defaultValues: formData.ownership || {
      ownedByMe: true,
      owners: [],
    },
  });

  const addUnit = () => {
    if (isSingleFamilyHome) return; // Don't add units for single family homes
    
    const currentUnits = unitForm.getValues().units || [];
    unitForm.setValue("units", [...currentUnits, { name: "", beds: "", baths: "", size: "", marketRent: "" }]);
  };

  const removeUnit = (index: number) => {
    if (isSingleFamilyHome) return; // Don't remove units for single family homes
    
    const currentUnits = unitForm.getValues().units || [];
    if (currentUnits.length > 1) {
      unitForm.setValue("units", currentUnits.filter((_, i) => i !== index));
    }
  };

  const addOwner = () => {
    const currentOwners = ownershipForm.getValues().owners || [];
    ownershipForm.setValue("owners", [...currentOwners, { name: "", percentage: "" }]);
  };

  const removeOwner = (index: number) => {
    const currentOwners = ownershipForm.getValues().owners || [];
    ownershipForm.setValue("owners", currentOwners.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    let isValid = false;

    switch (step) {
      case 1:
        isValid = await typeForm.trigger();
        if (isValid) {
          setFormData({ ...formData, propertyType: typeForm.getValues() });
          setStep(2);
        }
        break;
      case 2:
        isValid = await addressForm.trigger();
        if (isValid) {
          setFormData({ ...formData, address: addressForm.getValues() });
          setStep(3);
        }
        break;
      case 3:
        isValid = await unitForm.trigger();
        if (isValid) {
          // For single family homes, auto-create a unit with the property address
          if (isSingleFamilyHome) {
            const propertyAddress = addressForm.getValues().address;
            const propertyName = addressForm.getValues().propertyName || propertyAddress;
            
            // Create a single unit with the property data
            unitForm.setValue("units", [{
              name: propertyName,
              beds: unitForm.getValues().bedrooms,
              baths: unitForm.getValues().bathrooms,
              size: unitForm.getValues().squareFootage,
              marketRent: unitForm.getValues().monthlyRent
            }]);
          }
          
          setFormData({ ...formData, units: unitForm.getValues() });
          setStep(4);
        }
        break;
      case 4:
        isValid = await bankAccountForm.trigger();
        if (isValid) {
          setFormData({ ...formData, bankAccount: bankAccountForm.getValues() });
          setStep(5);
        }
        break;
      case 5:
        isValid = await reserveFundsForm.trigger();
        if (isValid) {
          setFormData({ ...formData, reserveFunds: reserveFundsForm.getValues() });
          setStep(6);
        }
        break;
      case 6:
        isValid = await ownershipForm.trigger();
        if (isValid) {
          setFormData({ ...formData, ownership: ownershipForm.getValues() });
          // Final submission - add property
          const finalFormData = { 
            ...formData, 
            propertyType: typeForm.getValues(),
            address: addressForm.getValues(),
            units: unitForm.getValues(),
            bankAccount: bankAccountForm.getValues(),
            reserveFunds: reserveFundsForm.getValues(),
            ownership: ownershipForm.getValues() 
          };
          
          console.log("Form data submitted:", finalFormData);
          
          toast({
            title: "Property created successfully",
            description: `${addressForm.getValues().propertyName || addressForm.getValues().address} has been added to your properties.`
          });
          
          onClose();
        }
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Render steps
  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6 space-x-1">
      {[1, 2, 3, 4, 5, 6].map((stepNum) => (
        <React.Fragment key={stepNum}>
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              stepNum === step ? 'bg-blue-600 text-white' : 
              stepNum < step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            {stepNum < step ? <CheckCircle2 className="w-5 h-5" /> : stepNum}
          </div>
          {stepNum < 6 && (
            <div className={`w-8 h-1 ${stepNum < step ? 'bg-green-500' : 'bg-gray-200'}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Select Property Type";
      case 2: return "Enter Property Address";
      case 3: return "Add Units";
      case 4: return "Set Bank Accounts";
      case 5: return "Set Reserve Funds";
      case 6: return "Set Property Ownership";
      default: return "";
    }
  };

  const getStepIcon = () => {
    switch (step) {
      case 1: return <Building className="w-6 h-6 text-blue-600" />;
      case 2: return <MapPin className="w-6 h-6 text-blue-600" />;
      case 3: return <DoorClosed className="w-6 h-6 text-blue-600" />;
      case 4: return <Building2 className="w-6 h-6 text-blue-600" />;
      case 5: return <PiggyBank className="w-6 h-6 text-blue-600" />;
      case 6: return <Users className="w-6 h-6 text-blue-600" />;
      default: return null;
    }
  };

  return (
    <div className="py-4">
      <div className="flex items-center gap-3 mb-6">
        {getStepIcon()}
        <h2 className="text-xl font-semibold">{getStepTitle()}</h2>
      </div>

      {renderStepIndicator()}

      <div className="mt-6">
        {/* Step 1: Property Type */}
        {step === 1 && (
          <Form {...typeForm}>
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <FormField
                    control={typeForm.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="text-base font-semibold">Property Type</FormLabel>
                        <FormDescription>
                          Select the property type that best describes your property.
                        </FormDescription>
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div 
                            className={`p-4 border rounded-lg cursor-pointer ${
                              field.value === 'residential' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                            }`}
                            onClick={() => typeForm.setValue('type', 'residential')}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <Home className="text-blue-600 h-5 w-5" />
                              <span className="font-medium">Residential</span>
                            </div>
                            <p className="text-sm text-gray-500">
                              For properties intended for individuals or families to live in.
                            </p>
                          </div>
                          <div 
                            className={`p-4 border rounded-lg cursor-pointer ${
                              field.value === 'commercial' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                            }`}
                            onClick={() => typeForm.setValue('type', 'commercial')}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <Store className="text-blue-600 h-5 w-5" />
                              <span className="font-medium">Commercial</span>
                            </div>
                            <p className="text-sm text-gray-500">
                              For businesses, offices, retail spaces, or other commercial purposes.
                            </p>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={typeForm.control}
                  name="subType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Property Sub-Type</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          setIsSingleFamilyHome(value === "single_family");
                        }} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property sub-type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {typeForm.watch("type") === "residential" ? (
                            <>
                              <SelectItem value="single_family">Single Family Home</SelectItem>
                              <SelectItem value="multi_family">Multi-Family Home</SelectItem>
                              <SelectItem value="apartment">Apartment</SelectItem>
                              <SelectItem value="condo">Condominium</SelectItem>
                              <SelectItem value="townhouse">Townhouse</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="office">Office Space</SelectItem>
                              <SelectItem value="retail">Retail Space</SelectItem>
                              <SelectItem value="industrial">Industrial Space</SelectItem>
                              <SelectItem value="mixed_use">Mixed Use</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select a more specific sub-type for your property. This helps with organization and reporting.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isSingleFamilyHome && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-4">
                    <p className="text-sm text-green-800">
                      <span className="font-semibold">Single Family Home Selected:</span> For single family homes, 
                      property details will be managed at the property level rather than creating separate units.
                    </p>
                  </div>
                )}

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                  <p className="text-sm text-yellow-800">
                    <span className="font-semibold">Tip:</span> If you manage a mixed-type property with both residential and commercial units, 
                    it is recommended to create separate, identical properties (one commercial and one residential) 
                    and divide the units between them.
                  </p>
                </div>
              </div>
            </form>
          </Form>
        )}

        {/* Step 2: Property Address */}
        {step === 2 && (
          <Form {...addressForm}>
            <form className="space-y-6">
              <FormField
                control={addressForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main Street" {...field} />
                    </FormControl>
                    <FormDescription>
                      As you type, autofill options will appear to ensure the address is valid.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={addressForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addressForm.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AL">Alabama</SelectItem>
                          <SelectItem value="AK">Alaska</SelectItem>
                          <SelectItem value="AZ">Arizona</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="CO">Colorado</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="GA">Georgia</SelectItem>
                          <SelectItem value="HI">Hawaii</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          {/* Add other states as needed */}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addressForm.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="ZIP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={addressForm.control}
                name="propertyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="My Rental Property" {...field} />
                    </FormControl>
                    <FormDescription>
                      By default, the property name is the same as its address, but you can customize it for better organization.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Tip:</span> Properties are organized numerically and alphabetically in your list.
                  Consider naming conventions that will help you easily locate properties.
                </p>
              </div>
            </form>
          </Form>
        )}

        {/* Step 3: Add Units */}
        {step === 3 && (
          <Form {...unitForm}>
            <form className="space-y-6">
              <div className="space-y-4">
                {isSingleFamilyHome ? (
                  <>
                    <h3 className="text-base font-semibold">Property Details</h3>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                      <div className="flex gap-2 items-start">
                        <div className="bg-blue-100 text-blue-800 p-1 rounded-full">
                          <Home className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm text-blue-800 font-medium">Single Family Home</p>
                          <p className="text-sm text-blue-800">
                            For single family homes, please enter property details directly. These details will be 
                            applied to the property as a whole rather than creating separate units.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Card className="border border-gray-200">
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={unitForm.control}
                            name="bedrooms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bedrooms</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="0" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={unitForm.control}
                            name="bathrooms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bathrooms</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="0" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={unitForm.control}
                            name="squareFootage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Square Footage</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="0" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={unitForm.control}
                            name="monthlyRent"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Monthly Rent ($)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="0" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold">Units</h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={addUnit}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" /> Add Another Unit
                      </Button>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                      <div className="flex gap-2 items-start">
                        <div className="bg-blue-100 text-blue-800 p-1 rounded-full">
                          <DoorClosed className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm text-blue-800 font-medium">What are Units?</p>
                          <p className="text-sm text-blue-800">
                            Units are leasable spaces within your property, such as homes, rooms, or apartments.
                            Adding at least one unit is required because leases are associated with units.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {unitForm.watch("units")?.map((_, index) => (
                      <Card key={index} className="border border-gray-200">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium">Unit {index + 1}</h4>
                            {unitForm.watch("units").length > 1 && (
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeUnit(index)}
                                className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={unitForm.control}
                              name={`units.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Unit Name <span className="text-red-500">*</span></FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Apt 101, Suite A" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="grid grid-cols-2 gap-2">
                              <FormField
                                control={unitForm.control}
                                name={`units.${index}.beds`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Beds</FormLabel>
                                    <FormControl>
                                      <Input type="number" placeholder="0" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={unitForm.control}
                                name={`units.${index}.baths`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Baths</FormLabel>
                                    <FormControl>
                                      <Input type="number" placeholder="0" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={unitForm.control}
                              name={`units.${index}.size`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Size (sq ft)</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="0" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={unitForm.control}
                              name={`units.${index}.marketRent`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Market Rent ($)</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="0" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                )}
                
                {!isSingleFamilyHome && (
                  <>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="flex gap-2 items-start">
                        <div className="bg-yellow-100 text-yellow-800 p-1 rounded-full">
                          <ReceiptText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm text-yellow-800 font-medium">What is Market Rent?</p>
                          <p className="text-sm text-yellow-800">
                            Market rent is the amount a landlord could reasonably expect to receive for a tenancy, 
                            similar to rents for comparable properties in the area.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <p className="text-sm text-amber-800">
                        <span className="font-semibold">Note:</span> Every unit added, even if vacant, counts as an active unit 
                        and may affect your subscription pricing.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </form>
          </Form>
        )}

        {/* Step 4: Bank Accounts */}
        {step === 4 && (
          <Form {...bankAccountForm}>
            <form className="space-y-6">
              <FormField
                control={bankAccountForm.control}
                name="useDefaultAccount"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-semibold">Property Bank Account</FormLabel>
                    <FormDescription>
                      Each property must have a bank account linked to it for rent collection and expense payments.
                    </FormDescription>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <input
                            type="radio"
                            checked={field.value}
                            onChange={() => bankAccountForm.setValue("useDefaultAccount", true)}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </FormControl>
                        <Label>Use Company Default Account</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <input
                            type="radio"
                            checked={!field.value}
                            onChange={() => bankAccountForm.setValue("useDefaultAccount", false)}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </FormControl>
                        <Label>Specify Bank Account</Label>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!bankAccountForm.watch("useDefaultAccount") && (
                <FormField
                  control={bankAccountForm.control}
                  name="bankAccount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Bank Account</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select bank account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="checking_1">Main Checking Account</SelectItem>
                          <SelectItem value="savings_1">Property Savings</SelectItem>
                          <SelectItem value="new">+ Create New Account</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={bankAccountForm.control}
                name="separateSecurityDeposits"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-semibold">Security Deposits Account</FormLabel>
                    <FormDescription>
                      Do you use a separate account for security deposits?
                    </FormDescription>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <input
                            type="radio"
                            checked={field.value}
                            onChange={() => bankAccountForm.setValue("separateSecurityDeposits", true)}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </FormControl>
                        <Label>Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <input
                            type="radio"
                            checked={!field.value}
                            onChange={() => bankAccountForm.setValue("separateSecurityDeposits", false)}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </FormControl>
                        <Label>No</Label>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {bankAccountForm.watch("separateSecurityDeposits") && (
                <FormField
                  control={bankAccountForm.control}
                  name="securityDepositAccount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Security Deposit Account</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select security deposit account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="deposits_1">Deposits Account</SelectItem>
                          <SelectItem value="savings_2">Security Deposits Savings</SelectItem>
                          <SelectItem value="new">+ Create New Account</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </form>
          </Form>
        )}

        {/* Step 5: Reserve Funds */}
        {step === 5 && (
          <Form {...reserveFundsForm}>
            <form className="space-y-6">
              <FormField
                control={reserveFundsForm.control}
                name="setReserve"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-semibold">Reserve Funds</FormLabel>
                    <FormDescription>
                      Specify whether to maintain a minimum balance (Reserve) for your property.
                      Setting a property reserve ensures there are sufficient funds to cover expenses.
                    </FormDescription>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <input
                            type="radio"
                            checked={field.value}
                            onChange={() => reserveFundsForm.setValue("setReserve", true)}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </FormControl>
                        <Label>Set Property Reserve</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <input
                            type="radio"
                            checked={!field.value}
                            onChange={() => reserveFundsForm.setValue("setReserve", false)}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </FormControl>
                        <Label>Don't Set Property Reserve</Label>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {reserveFundsForm.watch("setReserve") && (
                <FormField
                  control={reserveFundsForm.control}
                  name="reserveAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reserve Funds Amount ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        This is the minimum balance that should be maintained for this property.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  Learn more about Property Reserves in our "Set Your Property Reserve Funds" article.
                </p>
              </div>
            </form>
          </Form>
        )}

        {/* Step 6: Ownership */}
        {step === 6 && (
          <Form {...ownershipForm}>
            <form className="space-y-6">
              <FormField
                control={ownershipForm.control}
                name="ownedByMe"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-semibold">Property Ownership</FormLabel>
                    <FormDescription>
                      Specify whether you own the property or manage it for someone else.
                      Adding owners automates distributions and 1099 tax forms.
                    </FormDescription>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <input
                            type="radio"
                            checked={field.value}
                            onChange={() => ownershipForm.setValue("ownedByMe", true)}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </FormControl>
                        <Label>Owned by Me</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <input
                            type="radio"
                            checked={!field.value}
                            onChange={() => ownershipForm.setValue("ownedByMe", false)}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </FormControl>
                        <Label>Owned by Someone Else</Label>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!ownershipForm.watch("ownedByMe") && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">Property Owners</h3>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addOwner}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" /> Add Owner
                    </Button>
                  </div>
                  
                  {(ownershipForm.watch("owners") || []).map((_, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Owner {index + 1}</h4>
                          <Button 
                            type="button" 
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOwner(index)}
                            className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={ownershipForm.control}
                            name={`owners.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Owner Name</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select or add owner" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="john_doe">John Doe</SelectItem>
                                    <SelectItem value="jane_smith">Jane Smith</SelectItem>
                                    <SelectItem value="new">+ Add New Owner</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={ownershipForm.control}
                            name={`owners.${index}.percentage`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Ownership %</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="0" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <span className="font-semibold">Tip:</span> The total Ownership % should equal 100 if there is more than one owner.
                      If there is only one owner, set the Ownership to 100%.
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-800">
                      <span className="font-semibold">Note:</span> Starter accounts may not have access to adding Owners.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </Form>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleBack}
          disabled={step === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Button 
          type="button" 
          onClick={handleNext}
          className="flex items-center gap-2"
        >
          {step === 6 ? 'Finish' : 'Next'} {step !== 6 && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
