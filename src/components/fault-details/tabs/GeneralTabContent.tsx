
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit as EditIcon, ChevronDown } from 'lucide-react';
import { FaultDetailsProps } from '../types';

export function GeneralTabContent({ fault }: FaultDetailsProps) {
  if (!fault) return null;

  return (
    <div className="h-full flex flex-col">
      <Button variant="default" className="bg-blue-600 mb-6 w-full">
        <EditIcon className="h-4 w-4 mr-2" /> Edit fault details
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-blue-600 mb-1">Created By</label>
            <Input readOnly value={fault.tenant} className="bg-gray-50" />
          </div>
          
          <div className="mb-5">
            <label className="block text-sm font-medium text-blue-600 mb-1">Description</label>
            <div className="border rounded-md p-3 bg-gray-50 min-h-24">
              check from Android {fault.issue.includes('8.1') ? '8.1' : '8'}
            </div>
          </div>
          
          <div className="mb-5">
            <label className="block text-sm font-medium text-blue-600 mb-1">Priority *</label>
            <div className="relative">
              <Button variant="outline" className="w-full justify-between">
                Normal <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-blue-600 mb-1">Type *</label>
            <div className="relative">
              <Button variant="outline" className="w-full justify-between">
                {fault.type} <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
          
          <div className="mb-5">
            <label className="block text-sm font-medium text-blue-600 mb-1">Work Order Description</label>
            <div className="border rounded-md p-3 bg-gray-50 min-h-24">
              Tenant reported issue with Android {fault.issue.includes('8.1') ? '8.1' : '8'}
            </div>
          </div>
          
          <div className="mb-5">
            <label className="block text-sm font-medium text-blue-600 mb-1">Tenant</label>
            <Input readOnly value={fault.tenant} className="bg-gray-50" />
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center gap-4">
          <span className="text-gray-700">Home warranty status:</span>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
            <span>Yes</span>
          </div>
          <Button variant="outline" size="sm" className="text-sm h-7">
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
