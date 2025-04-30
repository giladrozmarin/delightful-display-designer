
import React from 'react';
import { Building2, MapPin, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyHeaderProps {
  name: string;
  address: string;
  type: string;
  unitCount: number;
}

export function PropertyHeader({ name, address, type, unitCount }: PropertyHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-start">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{address}</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                {type}
              </span>
              <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded">
                {unitCount} {unitCount === 1 ? 'Unit' : 'Units'}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center">
            <Edit className="h-4 w-4 mr-2" />
            Edit Property
          </Button>
        </div>
      </div>
    </div>
  );
}
