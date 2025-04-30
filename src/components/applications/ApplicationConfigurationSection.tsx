
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Settings, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const ApplicationConfigurationSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Configuration</CardTitle>
        <CardDescription>
          Customize your rental application form to collect the information you need
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5 bg-white">
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Information Collection
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <Badge variant="blue" className="mt-0.5 mr-2">Personal</Badge>
                  <span>Name, contact details, ID verification</span>
                </li>
                <li className="flex items-start">
                  <Badge variant="blue" className="mt-0.5 mr-2">Residence</Badge>
                  <span>Current/previous addresses, rental history</span>
                </li>
                <li className="flex items-start">
                  <Badge variant="blue" className="mt-0.5 mr-2">Employment</Badge>
                  <span>Job details, income verification</span>
                </li>
                <li className="flex items-start">
                  <Badge variant="blue" className="mt-0.5 mr-2">Optional</Badge>
                  <span>Vehicles, pets, emergency contacts</span>
                </li>
              </ul>
              <div className="mt-4">
                <Link to="/settings/applications">
                  <Button variant="outline" size="sm" className="mt-2">
                    Configure Fields
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="border rounded-lg p-5 bg-white">
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-blue-600" />
                Additional Options
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <Badge variant="orange" className="mt-0.5 mr-2">Payment</Badge>
                  <span>Configure application fees and payment processing</span>
                </li>
                <li className="flex items-start">
                  <Badge variant="orange" className="mt-0.5 mr-2">Documents</Badge>
                  <span>Request ID, pay stubs, and other documentation</span>
                </li>
                <li className="flex items-start">
                  <Badge variant="orange" className="mt-0.5 mr-2">Custom</Badge>
                  <span>Add custom questions specific to your properties</span>
                </li>
                <li className="flex items-start">
                  <Badge variant="orange" className="mt-0.5 mr-2">Terms</Badge>
                  <span>Define terms & conditions for applicants</span>
                </li>
              </ul>
              <div className="mt-4">
                <Link to="/settings/applications">
                  <Button variant="outline" size="sm" className="mt-2">
                    Manage Options
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
