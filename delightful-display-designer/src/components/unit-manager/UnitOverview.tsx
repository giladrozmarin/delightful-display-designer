import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

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

interface UnitOverviewProps {
  unit: Unit;
  property: Property;
}

export function UnitOverview({ unit, property }: UnitOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-medium text-gray-700 mb-4">Unit Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Unit Number:</span>
                <span className="font-medium">{unit.number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Size:</span>
                <span className="font-medium">{unit.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bedrooms:</span>
                <span className="font-medium">{unit.rooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bathrooms:</span>
                <span className="font-medium">{unit.bathrooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="font-medium">{unit.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Available for Rent:</span>
                <span className="font-medium">{unit.available ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Monthly Rent:</span>
                <span className="font-medium">${unit.rent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Address:</span>
                <span className="font-medium">{unit.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="font-medium text-gray-700 mb-4">Property Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Property Name:</span>
                <span className="font-medium">{property.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Property Address:</span>
                <span className="font-medium">{property.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Financial Summary */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium text-gray-700 mb-4">Financial Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 mb-1">Monthly Rent</p>
              <p className="text-xl font-bold text-green-700">${unit.rent}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 mb-1">Annual Revenue</p>
              <p className="text-xl font-bold text-blue-700">${unit.rent * 12}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600 mb-1">Security Deposit</p>
              <p className="text-xl font-bold text-purple-700">Not Set</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Placeholder for future maintenance records */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium text-gray-700 mb-4">Recent Maintenance</h3>
          <div className="text-center py-8">
            <p className="text-gray-500">No maintenance records found for this unit.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
