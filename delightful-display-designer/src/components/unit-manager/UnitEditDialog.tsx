import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Home, Image, List, FileText, ExternalLink } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Unit {
  id: number;
  number: string;
  rooms: number;
  size: string;
  bathrooms: number;
  status: string;
  available: boolean;
  address: string;
  rent: number;
  description?: string;
}

interface Property {
  id: number;
  name: string;
  address: string;
  // Other property fields
}

interface UnitEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unit: Unit;
  property: Property;
}

export function UnitEditDialog({ open, onOpenChange, unit, property }: UnitEditDialogProps) {
  const [activeTab, setActiveTab] = useState("general");
  
  const form = useForm({
    defaultValues: {
      number: unit.number,
      rooms: unit.rooms.toString(),
      bathrooms: unit.bathrooms.toString(),
      size: unit.size.replace(' sqft', ''),
      rent: unit.rent.toString(),
      description: unit.description || '',
      isActive: unit.status === "Rented" || unit.available,
      sameAddress: true,
      enableApplications: false,
      requireId: false,
      requirePaystubs: false,
      requireBankStatements: false,
    },
  });
  
  const onSubmit = (data: any) => {
    console.log('Form data submitted:', data);
    // In a real app, this would update the unit in the database
    // For now, we'll just close the dialog
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col overflow-hidden p-0">
        <div className="flex h-full overflow-hidden">
          <div className="w-64 bg-blue-800 text-white p-4 flex flex-col">
            <h2 className="text-xl font-bold mb-6">Edit Unit</h2>
            
            <div className="space-y-1">
              <button 
                className={`w-full text-left p-2 rounded-lg flex items-center ${activeTab === 'general' ? 'bg-blue-700' : 'hover:bg-blue-700/50'}`}
                onClick={() => setActiveTab('general')}
              >
                <Home className="h-4 w-4 mr-2" />
                General Information
              </button>
              
              <button 
                className={`w-full text-left p-2 rounded-lg flex items-center ${activeTab === 'photos' ? 'bg-blue-700' : 'hover:bg-blue-700/50'}`}
                onClick={() => setActiveTab('photos')}
              >
                <Image className="h-4 w-4 mr-2" />
                Photos
              </button>
              
              <button 
                className={`w-full text-left p-2 rounded-lg flex items-center ${activeTab === 'amenities' ? 'bg-blue-700' : 'hover:bg-blue-700/50'}`}
                onClick={() => setActiveTab('amenities')}
              >
                <List className="h-4 w-4 mr-2" />
                Amenities
              </button>
              
              <button 
                className={`w-full text-left p-2 rounded-lg flex items-center ${activeTab === 'application' ? 'bg-blue-700' : 'hover:bg-blue-700/50'}`}
                onClick={() => setActiveTab('application')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Application Form
              </button>
              
              <button 
                className={`w-full text-left p-2 rounded-lg flex items-center ${activeTab === 'listing' ? 'bg-blue-700' : 'hover:bg-blue-700/50'}`}
                onClick={() => setActiveTab('listing')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Listing
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800 border-b border-blue-200 pb-2 mb-4">GENERAL INFORMATION</h3>
                      <p className="text-sm text-gray-600 mb-6">General information about your unit. Will be used in the listing as well.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Property</h4>
                      <div className="bg-gray-100 p-3 rounded text-gray-700">
                        {property.name} ({property.address})
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Unit Details</h4>
                      <div className="grid grid-cols-1 gap-4">
                        <FormField
                          control={form.control}
                          name="number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Unit Number</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="rent"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Market Rent</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                    <Input {...field} className="pl-8" />
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="size"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Size</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input {...field} />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">sqft</span>
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="rooms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Beds</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" min="0" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="bathrooms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Baths</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" min="0" step="0.5" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Detailed description of this property</FormLabel>
                              <FormControl>
                                <Textarea {...field} rows={6} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <FormField
                        control={form.control}
                        name="sameAddress"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Unit address is the same</FormLabel>
                              <FormDescription>
                                Toggle if the unit address is the same as the property address
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch 
                                checked={field.value} 
                                onCheckedChange={field.onChange} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="border-t pt-4">
                      <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">This unit is active</FormLabel>
                              <FormDescription>
                                Inactive units won't be shown in tenant portals or listings
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch 
                                checked={field.value} 
                                onCheckedChange={field.onChange} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
                
                {activeTab === 'photos' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800 border-b border-blue-200 pb-2 mb-4">PHOTOS</h3>
                      <p className="text-sm text-gray-600 mb-6">Upload photos of your unit to display in listings and tenant portals.</p>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                      <Image className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h4 className="text-lg font-medium text-gray-700 mb-2">Drop your images here</h4>
                      <p className="text-gray-500 mb-4">or click to browse from your computer</p>
                      <Button type="button" variant="outline">Upload Photos</Button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'amenities' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800 border-b border-blue-200 pb-2 mb-4">AMENITIES</h3>
                      <p className="text-sm text-gray-600 mb-6">Select amenities available in this unit.</p>
                    </div>
                    
                    <div className="text-center py-12">
                      <List className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h4 className="text-lg font-medium text-gray-700 mb-2">No amenities available</h4>
                      <p className="text-gray-500 mb-4">Amenities functionality will be added in a future update</p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'application' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800 border-b border-blue-200 pb-2 mb-4">APPLICATION SETTINGS</h3>
                      <p className="text-sm text-gray-600 mb-6">Configure the application form settings for this unit.</p>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="enableApplications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Enable Applications</FormLabel>
                            <FormDescription>
                              Allow prospective tenants to submit applications for this unit
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
                      <h4 className="font-medium">Application URL</h4>
                      <div className="flex">
                        <input 
                          readOnly
                          value={`https://apply.propertycare.com/${property.id}/units/${unit.id}`}
                          className="bg-white border flex-1 rounded-l-md px-3 py-2 text-sm"
                        />
                        <Button className="rounded-l-none">
                          Copy Link
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Share this link with prospective tenants to allow them to apply for this unit.
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border space-y-4">
                      <h4 className="font-medium flex items-center">
                        Create a New Application Form 
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </h4>
                      <p className="text-sm text-gray-500 mb-4">
                        Design a custom application form for this unit.
                      </p>
                      <Link 
                        to="/newApplications" 
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                      >
                        Create New Application Form
                      </Link>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Required Documents</CardTitle>
                        <CardDescription>Documents that applicants must provide</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="requireId"
                            render={({ field }) => (
                              <FormItem className="flex items-center gap-2">
                                <FormControl>
                                  <Checkbox 
                                    checked={field.value} 
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Government-issued ID</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="requirePaystubs"
                            render={({ field }) => (
                              <FormItem className="flex items-center gap-2">
                                <FormControl>
                                  <Checkbox 
                                    checked={field.value} 
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Last 3 months pay stubs</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="requireBankStatements"
                            render={({ field }) => (
                              <FormItem className="flex items-center gap-2">
                                <FormControl>
                                  <Checkbox 
                                    checked={field.value} 
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Bank statements</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {activeTab === 'listing' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800 border-b border-blue-200 pb-2 mb-4">LISTING</h3>
                      <p className="text-sm text-gray-600 mb-6">Configure how this unit appears in listings.</p>
                    </div>
                    
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h4 className="text-lg font-medium text-gray-700 mb-2">No listing configurations available</h4>
                      <p className="text-gray-500 mb-4">Listing functionality will be added in a future update</p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end gap-2 pt-4 border-t sticky bottom-0 bg-white">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
