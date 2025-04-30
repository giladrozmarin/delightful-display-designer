
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarClock, Users, MessageSquare, FileText, ShieldCheck, User, ArrowRight, Link as LinkIcon, ArrowLeft } from 'lucide-react';

interface Tenant {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  moveInDate?: string;
  leaseExpirationDate?: string;
  status?: 'active' | 'pending' | 'former' | 'none';
}

interface TenantDetailsProps {
  tenant: Tenant | null;
  onEditTenant: () => void;
  onCreateTenant: () => void;
  onScreenTenant?: () => void;
  onBack?: () => void;
}

export function TenantDetails({ tenant, onEditTenant, onCreateTenant, onScreenTenant, onBack }: TenantDetailsProps) {
  if (!tenant || tenant.status === 'none') {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          {onBack && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2" 
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          )}
          <CardTitle className="text-lg">Tenant Information</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <Users className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Tenant Associated</h3>
          <p className="text-gray-500 mb-6">This unit doesn't have any tenant assigned.</p>
          <Button onClick={onCreateTenant}>
            Add New Tenant
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          {onBack && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2" 
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          )}
          <CardTitle className="text-lg">Tenant Information</CardTitle>
        </div>
        <Button variant="outline" size="sm" onClick={onEditTenant}>
          Edit Tenant
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Link to={tenant.id ? `/tenants/${tenant.id}` : "#"} className="group">
              <h3 className="text-xl font-medium group-hover:text-blue-600 flex items-center gap-1">
                {tenant.name}
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
            </Link>
            <div className="text-gray-500 text-sm mt-1">
              {tenant.email && <div>{tenant.email}</div>}
              {tenant.phone && <div>{tenant.phone}</div>}
            </div>
          </div>
          <Badge 
            className={`
              ${tenant.status === 'active' ? 'bg-green-100 text-green-800' : ''}
              ${tenant.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
              ${tenant.status === 'former' ? 'bg-gray-100 text-gray-800' : ''}
            `}
          >
            {tenant.status === 'active' ? 'Active Tenant' : 
             tenant.status === 'pending' ? 'Pending' : 'Former Tenant'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {tenant.moveInDate && (
            <div className="flex items-start">
              <div className="bg-blue-50 p-2 rounded mr-3">
                <CalendarClock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Move-in Date</div>
                <div className="font-medium">{tenant.moveInDate}</div>
              </div>
            </div>
          )}
          
          {tenant.leaseExpirationDate && (
            <div className="flex items-start">
              <div className="bg-red-50 p-2 rounded mr-3">
                <CalendarClock className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Lease Expiration</div>
                <div className="font-medium">{tenant.leaseExpirationDate}</div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button variant="outline" className="flex-1">
            <FileText className="h-4 w-4 mr-2" />
            View Lease
          </Button>
          <Button variant="outline" className="flex-1">
            <MessageSquare className="h-4 w-4 mr-2" />
            Message
          </Button>
          {onScreenTenant && (
            <Button variant="outline" className="flex-1" onClick={onScreenTenant}>
              <ShieldCheck className="h-4 w-4 mr-2" />
              Screen
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
