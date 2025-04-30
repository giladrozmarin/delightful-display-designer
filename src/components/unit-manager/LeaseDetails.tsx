
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign, FileText, Clock, CalendarCheck } from 'lucide-react';

interface Lease {
  id?: number;
  startDate?: string;
  endDate?: string;
  moveInDate?: string;
  moveOutDate?: string;
  noticeGivenDate?: string;
  rentalAmount?: number;
  billingCode?: string;
  status?: 'active' | 'expired' | 'pending' | 'none';
  type?: string;
}

interface LeaseDetailsProps {
  lease: Lease | null;
  onCreateLease: () => void;
  onEditLease: () => void;
  onViewLease?: () => void;
}

export function LeaseDetails({ lease, onCreateLease, onEditLease, onViewLease }: LeaseDetailsProps) {
  if (!lease || lease.status === 'none') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lease Information</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <FileText className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Lease Available</h3>
          <p className="text-gray-500 mb-6">This unit doesn't have an active lease.</p>
          <Button onClick={onCreateLease}>
            Create New Lease
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Lease Information</CardTitle>
        <div className="flex gap-2">
          {onViewLease && (
            <Button variant="outline" size="sm" onClick={onViewLease}>
              View Document
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={onEditLease}>
            Edit Lease
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-2">
          <div className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${lease.status === 'active' ? 'bg-green-100 text-green-800' : ''}
            ${lease.status === 'expired' ? 'bg-red-100 text-red-800' : ''}
            ${lease.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
          `}>
            {lease.status === 'active' ? 'Active' : 
             lease.status === 'expired' ? 'Expired' : 'Pending'}
          </div>
          {lease.type && (
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              {lease.type}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {lease.rentalAmount !== undefined && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">Rental Amount</span>
              </div>
              <p className="text-xl font-bold text-green-700">${lease.rentalAmount}</p>
            </div>
          )}
          
          {lease.startDate && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-sm text-blue-600">Lease Start</span>
              </div>
              <p className="text-md font-medium text-blue-700">{lease.startDate}</p>
            </div>
          )}
          
          {lease.endDate && (
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 text-red-600 mr-1" />
                <span className="text-sm text-red-600">Lease End</span>
              </div>
              <p className="text-md font-medium text-red-700">{lease.endDate}</p>
            </div>
          )}
          
          {lease.moveInDate && (
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <CalendarCheck className="h-4 w-4 text-purple-600 mr-1" />
                <span className="text-sm text-purple-600">Move-in Date</span>
              </div>
              <p className="text-md font-medium text-purple-700">{lease.moveInDate}</p>
            </div>
          )}
        </div>

        {lease.billingCode && (
          <div className="pt-2">
            <div className="text-sm text-gray-500">Billing Code</div>
            <div className="font-medium">{lease.billingCode}</div>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button variant="outline" className="flex-1">
            <FileText className="h-4 w-4 mr-2" />
            Sign Request
          </Button>
          <Button variant="outline" className="flex-1">
            <Clock className="h-4 w-4 mr-2" />
            Renewal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
