import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Edit, Phone, Mail, MapPin, Calendar, FileText } from 'lucide-react';
import { Contractor } from '@/pages/Contractors';

interface ContractorDetailsProps {
  contractor: Contractor;
  onEdit: () => void;
}

export function ContractorDetails({ contractor, onEdit }: ContractorDetailsProps) {
  const getInsuranceStatusColor = (expirationDate?: string) => {
    if (!expirationDate) return 'bg-gray-100 text-gray-800';
    
    const expDate = new Date(expirationDate);
    const now = new Date();
    const daysUntilExpiration = Math.floor((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiration < 0) return 'bg-red-100 text-red-800';
    if (daysUntilExpiration <= 30) return 'bg-amber-100 text-amber-800';
    return 'bg-green-100 text-green-800';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Contractor Details</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {contractor.company}
              {contractor.isPreferred && (
                <Badge variant="secondary" className="bg-blue-50 text-blue-600 border border-blue-200">
                  Preferred
                </Badge>
              )}
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge 
                variant="secondary" 
                className={`
                  ${contractor.type === 'Plumbing' ? 'bg-blue-100 text-blue-800' : ''}
                  ${contractor.type === 'Appliance Repair' ? 'bg-green-100 text-green-800' : ''}
                  ${contractor.type === 'Electrical' ? 'bg-amber-100 text-amber-800' : ''}
                  ${contractor.type === 'HVAC' ? 'bg-red-100 text-red-800' : ''}
                  ${contractor.type === 'General' ? 'bg-gray-100 text-gray-800' : ''}
                  ${contractor.type === 'Cleaning' ? 'bg-purple-100 text-purple-800' : ''}
                  ${contractor.type === 'Landscaping' ? 'bg-emerald-100 text-emerald-800' : ''}
                  ${contractor.type === 'Pest Control' ? 'bg-orange-100 text-orange-800' : ''}
                `}
              >
                {contractor.type}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-5">
            <h3 className="text-lg font-medium border-b pb-2">Contact Information</h3>
            
            <div className="space-y-3">
              {contractor.name && (
                <div className="flex items-start">
                  <div className="w-5 mr-3 text-gray-500 mt-0.5">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact Name</p>
                    <p>{contractor.name}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start">
                <div className="w-5 mr-3 text-gray-500 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p>{contractor.address}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-5 mr-3 text-gray-500 mt-0.5">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{contractor.phone}</p>
                </div>
              </div>
              
              {contractor.email && (
                <div className="flex items-start">
                  <div className="w-5 mr-3 text-gray-500 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href={`mailto:${contractor.email}`} className="text-blue-600 hover:underline">
                      {contractor.email}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Compliance Information */}
          <div className="space-y-5">
            <h3 className="text-lg font-medium border-b pb-2">Insurance & Compliance</h3>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-5 mr-3 text-gray-500 mt-0.5">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Liability Insurance Expiration</p>
                  <div className="flex items-center mt-1">
                    <p>{formatDate(contractor.insuranceExpiration)}</p>
                    {contractor.insuranceExpiration && (
                      <Badge 
                        variant="secondary" 
                        className={`ml-2 ${getInsuranceStatusColor(contractor.insuranceExpiration)}`}
                      >
                        {new Date(contractor.insuranceExpiration) < new Date() 
                          ? 'Expired' 
                          : 'Valid'}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-5 mr-3 text-gray-500 mt-0.5">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Workers Comp Expiration</p>
                  <div className="flex items-center mt-1">
                    <p>{formatDate(contractor.workersCompExpiration)}</p>
                    {contractor.workersCompExpiration && (
                      <Badge 
                        variant="secondary" 
                        className={`ml-2 ${getInsuranceStatusColor(contractor.workersCompExpiration)}`}
                      >
                        {new Date(contractor.workersCompExpiration) < new Date() 
                          ? 'Expired' 
                          : 'Valid'}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Financial Information */}
          <div className="space-y-5">
            <h3 className="text-lg font-medium border-b pb-2">Financial Information</h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Taxpayer ID</p>
                  <p>{contractor.taxpayerId || 'Not specified'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Payment Terms</p>
                  <p>{contractor.paymentTerms || 'Not specified'}</p>
                </div>
                
                {contractor.billingCode && (
                  <div>
                    <p className="text-sm text-gray-500">Billing Code</p>
                    <p>{contractor.billingCode}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Notes */}
          {contractor.notes && (
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-medium border-b pb-2">Notes</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="whitespace-pre-line">{contractor.notes}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onEdit} className="flex items-center gap-2">
            <Edit size={16} />
            Edit Contractor
          </Button>
        </DialogFooter>
      </div>
    </>
  );
}
