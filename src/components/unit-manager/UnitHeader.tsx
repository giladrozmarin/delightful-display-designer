
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, FilePlus } from 'lucide-react';
import { UnitStatusDisplay } from './UnitStatusDisplay';
interface UnitHeaderProps {
  address: string;
  unitNumber: string;
  status: string;
  available: boolean;
  onEditUnit: () => void;
  onNavigateToNewLease: () => void;
  onNavigateToNewApplication: () => void;
  onInviteRenter: () => void;
}
export function UnitHeader({
  address,
  unitNumber,
  status,
  available,
  onEditUnit,
  onNavigateToNewLease,
  onNavigateToNewApplication,
  onInviteRenter
}: UnitHeaderProps) {
  return <div className="flex flex-col md:flex-row md:items-center justify-between">
      <div>
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
          <span>{address}</span>
          <span>•</span>
          <span>Units</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Unit {unitNumber}</h1>
        <UnitStatusDisplay status={status} available={available} />
      </div>
      <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
        <Button onClick={onEditUnit} variant="outline">
          Edit Unit
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={onNavigateToNewLease}>
          <FileText className="h-4 w-4 mr-2" />
          New Lease
        </Button>
      </div>
    </div>;
}
