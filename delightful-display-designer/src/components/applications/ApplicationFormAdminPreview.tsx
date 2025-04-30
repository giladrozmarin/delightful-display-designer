
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export const ApplicationFormAdminPreview = () => {
  const [activeTab, setActiveTab] = useState("personalInfo");

  return (
    <div className="border rounded-lg">
      <div className="bg-gray-50 p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Settings className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-medium">Admin Preview Mode</h3>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">All Fields Visible</Badge>
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Rental Application</h2>
        <p className="text-gray-600 mb-6">
          Please complete all required fields in this application. Upload all requested documents to speed up the approval process.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 w-full overflow-x-auto flex whitespace-nowrap">
            <TabsTrigger value="personalInfo">Personal Information</TabsTrigger>
            <TabsTrigger value="residence">Residential History</TabsTrigger>
            <TabsTrigger value="employment">Employment & Income</TabsTrigger>
            <TabsTrigger value="additional">Additional Information</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personalInfo" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Full Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="John Doe" className="w-full px-3 py-2 border rounded-md" readOnly />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Email Address <span className="text-red-500">*</span></label>
                <input type="email" placeholder="john@example.com" className="w-full px-3 py-2 border rounded-md" readOnly />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" placeholder="(555) 123-4567" className="w-full px-3 py-2 border rounded-md" readOnly />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Date of Birth <span className="text-red-500">*</span></label>
                <input type="date" className="w-full px-3 py-2 border rounded-md" readOnly />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">SSN <span className="text-red-500">*</span></label>
                <input type="text" placeholder="XXX-XX-XXXX" className="w-full px-3 py-2 border rounded-md" readOnly />
                <p className="text-xs text-gray-500">Admin note: Required for background check</p>
              </div>
            </div>
            <div className="mt-4 bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-blue-700">Admin: All fields in this section are required. SSN is used for background checks.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="residence">
            <div className="text-sm text-gray-500 italic">Preview for other tabs would be shown here.</div>
          </TabsContent>
          
          <TabsContent value="employment">
            <div className="text-sm text-gray-500 italic">Preview for other tabs would be shown here.</div>
          </TabsContent>
          
          <TabsContent value="additional">
            <div className="text-sm text-gray-500 italic">Preview for other tabs would be shown here.</div>
          </TabsContent>
          
          <TabsContent value="documents">
            <div className="text-sm text-gray-500 italic">Preview for other tabs would be shown here.</div>
          </TabsContent>
          
          <TabsContent value="terms">
            <div className="text-sm text-gray-500 italic">Preview for other tabs would be shown here.</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
