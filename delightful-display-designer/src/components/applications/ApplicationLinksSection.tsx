
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ApplicationFormAdminPreview } from './ApplicationFormAdminPreview';
import { ApplicationFormTenantPreview } from './ApplicationFormTenantPreview';

export const ApplicationLinksSection = () => {
  const applicationUrl = "https://apply.propertycare.com/yourdomain";
  
  const handleOpenInNewTab = () => {
    window.open(applicationUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Links</CardTitle>
        <CardDescription>
          Generate and share application links with prospective tenants
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-medium mb-2">General Application Link</h3>
            <p className="text-sm text-gray-600 mb-3">
              Share this link with prospects to apply without selecting a specific property or unit.
            </p>
            <div className="flex mb-3">
              <input 
                readOnly
                value={applicationUrl} 
                className="bg-white border flex-1 rounded-l-md px-3 py-2 text-sm"
              />
              <Button className="rounded-l-none">
                Copy Link
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Form (Admin View)
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Application Form Preview (Admin View)</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <ApplicationFormAdminPreview />
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Preview Form (Tenant View)
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Application Form Preview (Tenant View)</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <ApplicationFormTenantPreview />
                  </div>
                </DialogContent>
              </Dialog>

              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center" 
                onClick={handleOpenInNewTab}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in New Tab
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-medium mb-2">Property-Specific Links</h3>
            <p className="text-sm text-gray-600 mb-3">
              Generate property-specific application links from each property's settings page.
            </p>
            <Link to="/properties">
              <Button variant="outline">
                Manage Property Links
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
