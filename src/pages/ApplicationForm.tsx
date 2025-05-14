
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { applicationTemplates } from '@/components/application-settings/types';

// Define the application form schema based on configuration
const createApplicationSchema = (config: any) => {
  const schema: Record<string, any> = {};
  
  // Basic applicant fields
  if (config?.applicantFields?.fullName) {
    schema.fullName = z.string().min(1, "Full name is required");
  }
  if (config?.applicantFields?.email) {
    schema.email = z.string().email("Invalid email address");
  }
  if (config?.applicantFields?.phone) {
    schema.phone = z.string().min(10, "Valid phone number is required");
  }
  if (config?.applicantFields?.dateOfBirth) {
    schema.dateOfBirth = z.string().min(1, "Date of birth is required");
  }
  if (config?.applicantFields?.ssn) {
    schema.ssn = z.string().min(1, "SSN is required");
  }
  if (config?.applicantFields?.driverLicense) {
    schema.driverLicense = z.string().optional();
  }
  
  // Residential fields
  if (config?.residentialFields?.currentAddress) {
    schema.currentAddress = z.string().min(1, "Current address is required");
  }
  if (config?.residentialFields?.moveInDate) {
    schema.moveInDate = z.string().min(1, "Move-in date is required");
  }
  if (config?.residentialFields?.currentLandlord) {
    schema.currentLandlord = z.string().optional();
    schema.landlordPhone = z.string().optional();
  }
  if (config?.residentialFields?.reasonForMoving) {
    schema.reasonForMoving = z.string().optional();
  }
  
  // Employment fields
  if (config?.employmentFields?.employer) {
    schema.employer = z.string().min(1, "Employer name is required");
  }
  if (config?.employmentFields?.position) {
    schema.position = z.string().optional();
  }
  if (config?.employmentFields?.income) {
    schema.income = z.string().min(1, "Income information is required");
  }
  if (config?.employmentFields?.startDate) {
    schema.employmentStartDate = z.string().optional();
  }
  if (config?.employmentFields?.supervisorContact) {
    schema.supervisorName = z.string().optional();
    schema.supervisorPhone = z.string().optional();
  }
  
  // Optional sections
  if (config?.includeSections?.vehicleInformation) {
    schema.hasVehicle = z.boolean().default(false);
    schema.vehicleMake = z.string().optional();
    schema.vehicleModel = z.string().optional();
    schema.vehicleYear = z.string().optional();
    schema.vehicleLicense = z.string().optional();
  }
  
  if (config?.includeSections?.pets) {
    schema.hasPets = z.boolean().default(false);
    schema.petType = z.string().optional();
    schema.petBreed = z.string().optional();
    schema.petWeight = z.string().optional();
  }
  
  if (config?.includeSections?.emergencyContacts) {
    schema.emergencyContactName = z.string().optional();
    schema.emergencyContactPhone = z.string().optional();
    schema.emergencyContactRelation = z.string().optional();
  }
  
  // Terms acceptance (always required)
  schema.termsAccepted = z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  });

  return z.object(schema);
};

export default function ApplicationForm() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState<any>(null);
  
  // Find the selected template from our mock data
  useEffect(() => {
    if (templateId) {
      const foundTemplate = applicationTemplates.find(t => t.id === Number(templateId));
      if (foundTemplate) {
        setTemplate(foundTemplate);
      } else {
        toast({
          title: "Template Not Found",
          description: "The requested application template could not be found.",
          variant: "destructive",
        });
        navigate('/applications');
      }
    }
  }, [templateId, navigate, toast]);
  
  const applicationSchema = template ? createApplicationSchema(template.settings) : z.object({});
  
  const form = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: {},
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully.",
    });
    
    setLoading(false);
    navigate('/applications');
  };

  if (!template) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-[#f2f3f7]">
          <AppSidebar />
          <main className="flex-1 p-8 font-inter overflow-auto">
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#f2f3f7]">
        <AppSidebar />
        <main className="flex-1 p-8 font-inter overflow-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            <Button 
              variant="outline" 
              className="mb-4" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Applications
            </Button>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900">{template.name}</h1>
              <p className="text-gray-500 mt-1">{template.description}</p>
              
              {template.settings.instructions && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <h3 className="font-medium text-blue-800 mb-1">Instructions</h3>
                  <p className="text-blue-700 text-sm">{template.settings.instructions}</p>
                </div>
              )}
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Applicant Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Applicant Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {template.settings.applicantFields.fullName && (
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {template.settings.applicantFields.email && (
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {template.settings.applicantFields.phone && (
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {template.settings.applicantFields.dateOfBirth && (
                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {template.settings.applicantFields.ssn && (
                      <FormField
                        control={form.control}
                        name="ssn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Social Security Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your SSN" {...field} />
                            </FormControl>
                            <FormDescription>
                              This information is encrypted and used only for background checks.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {template.settings.applicantFields.driverLicense && (
                      <FormField
                        control={form.control}
                        name="driverLicense"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Driver's License Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your driver's license number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </CardContent>
                </Card>
                
                {/* Residential Information */}
                {(template.settings.residentialFields.currentAddress || 
                  template.settings.residentialFields.moveInDate || 
                  template.settings.residentialFields.currentLandlord || 
                  template.settings.residentialFields.reasonForMoving) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Residence Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {template.settings.residentialFields.currentAddress && (
                        <FormField
                          control={form.control}
                          name="currentAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Address</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Enter your current address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      {template.settings.residentialFields.moveInDate && (
                        <FormField
                          control={form.control}
                          name="moveInDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Move-in Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      {template.settings.residentialFields.currentLandlord && (
                        <>
                          <FormField
                            control={form.control}
                            name="currentLandlord"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Landlord Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter landlord name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="landlordPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Landlord Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter landlord phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                      
                      {template.settings.residentialFields.reasonForMoving && (
                        <FormField
                          control={form.control}
                          name="reasonForMoving"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Reason for Moving</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Explain why you're moving" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </CardContent>
                  </Card>
                )}
                
                {/* Employment Information */}
                {(template.settings.employmentFields.employer || 
                  template.settings.employmentFields.position || 
                  template.settings.employmentFields.income || 
                  template.settings.employmentFields.startDate || 
                  template.settings.employmentFields.supervisorContact) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Employment Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {template.settings.employmentFields.employer && (
                        <FormField
                          control={form.control}
                          name="employer"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Employer Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your employer's name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      {template.settings.employmentFields.position && (
                        <FormField
                          control={form.control}
                          name="position"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Position/Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your job title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      {template.settings.employmentFields.income && (
                        <FormField
                          control={form.control}
                          name="income"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Monthly Income ($)</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your monthly income" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      {template.settings.employmentFields.startDate && (
                        <FormField
                          control={form.control}
                          name="employmentStartDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Employment Start Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      {template.settings.employmentFields.supervisorContact && (
                        <>
                          <FormField
                            control={form.control}
                            name="supervisorName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Supervisor Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter supervisor name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="supervisorPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Supervisor Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter supervisor phone" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                    </CardContent>
                  </Card>
                )}
                
                {/* Vehicle Information */}
                {template.settings.includeSections.vehicleInformation && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Vehicle Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="hasVehicle"
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
                                I have a vehicle
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      {form.watch("hasVehicle") && (
                        <div className="space-y-4 mt-2">
                          <FormField
                            control={form.control}
                            name="vehicleMake"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Vehicle Make</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Toyota" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="vehicleModel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Vehicle Model</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Camry" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="vehicleYear"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Vehicle Year</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 2020" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="vehicleLicense"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>License Plate Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter license plate number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
                
                {/* Pet Information */}
                {template.settings.includeSections.pets && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Pet Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="hasPets"
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
                                I have pets
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      {form.watch("hasPets") && (
                        <div className="space-y-4 mt-2">
                          <FormField
                            control={form.control}
                            name="petType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Type of Pet</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Dog, Cat" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="petBreed"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Breed</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter pet breed" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="petWeight"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Weight (lbs)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter pet weight" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
                
                {/* Emergency Contact */}
                {template.settings.includeSections.emergencyContacts && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Emergency Contact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="emergencyContactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Emergency Contact Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter emergency contact name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="emergencyContactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Emergency Contact Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter emergency contact phone" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="emergencyContactRelation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relationship to Applicant</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Parent, Sibling, Friend" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                )}
                
                {/* Terms & Conditions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Terms & Conditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 p-4 bg-gray-50 border rounded-md text-sm max-h-40 overflow-y-auto">
                      {template.settings.termsAndConditions}
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="termsAccepted"
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
                              I accept the terms and conditions
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormMessage>{form.formState.errors.termsAccepted?.message}</FormMessage>
                  </CardContent>
                </Card>
                
                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
