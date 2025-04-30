
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft, DollarSign } from 'lucide-react';

interface UnitStatCardsProps {
  rooms: number;
  bathrooms: number;
  size: string;
  rent: number;
  status: string;
}

export function UnitStatCards({ rooms, bathrooms, size, rent, status }: UnitStatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-white">
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <div className="bg-blue-50 p-3 rounded-full mb-3">
            <Home className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Beds / Baths</h3>
          <p className="font-semibold text-lg">{rooms} / {bathrooms}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <div className="bg-purple-50 p-3 rounded-full mb-3">
            <ArrowLeft className="h-6 w-6 text-purple-500 rotate-45" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Size</h3>
          <p className="font-semibold text-lg">{size}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <div className="bg-green-50 p-3 rounded-full mb-3">
            <DollarSign className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Market Rent</h3>
          <p className="font-semibold text-lg">${rent}.00</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <div className={`${status === 'Rented' ? 'bg-green-50' : 'bg-gray-50'} p-3 rounded-full mb-3`}>
            <div className={`h-6 w-6 rounded-full ${status === 'Rented' ? 'bg-green-500' : 'bg-gray-400'} flex items-center justify-center text-white`}>
              ✓
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Unit Status</h3>
          <p className={`font-semibold text-lg ${status === 'Rented' ? 'text-green-500' : 'text-gray-500'}`}>
            {status}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
