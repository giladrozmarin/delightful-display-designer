
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface PropertyBasicInfoProps {
  property: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    type: string;
    warranty: string;
  };
}

export function PropertyBasicInfo({ property }: PropertyBasicInfoProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Property Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Property Name</h3>
            <p className="mt-1">{property.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Property Type</h3>
            <p className="mt-1">{property.type}</p>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">Address</h3>
          <p className="mt-1">{property.address}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">City</h3>
            <p className="mt-1">{property.city}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">State</h3>
            <p className="mt-1">{property.state}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">ZIP Code</h3>
            <p className="mt-1">{property.zip}</p>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">Home Warranty</h3>
          <div className="mt-2">
            {property.warranty === "Yes" && (
              <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span>Active</span>
              </span>
            )}
            {property.warranty === "No" && (
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                <span>Not Available</span>
              </span>
            )}
            {property.warranty === "Expired" && (
              <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                <span>Expired</span>
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
