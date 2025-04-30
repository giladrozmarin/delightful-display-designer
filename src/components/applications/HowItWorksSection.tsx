
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, LinkIcon, ClipboardCheck } from 'lucide-react';

export const HowItWorksSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">How Rental Applications Work</CardTitle>
        <CardDescription>
          A simple workflow to create customized rental applications for prospective tenants
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Settings className="h-8 w-8" />
            </div>
            <h3 className="font-medium text-lg">1. Configure Your Application</h3>
            <p className="text-gray-600">
              Customize your application form fields, payment options, required documents, and
              terms & conditions in the application settings.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <LinkIcon className="h-8 w-8" />
            </div>
            <h3 className="font-medium text-lg">2. Share Application Link</h3>
            <p className="text-gray-600">
              Generate and share a general or property-specific application link with prospective tenants.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <ClipboardCheck className="h-8 w-8" />
            </div>
            <h3 className="font-medium text-lg">3. Review Applications</h3>
            <p className="text-gray-600">
              Receive completed applications, review applicant information, and make informed leasing decisions.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
