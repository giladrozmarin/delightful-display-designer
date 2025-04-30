
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { InvoiceFilters } from '@/pages/Invoices';

interface FilterControlsProps {
  filters: InvoiceFilters;
  onFilterChange: (filters: Partial<InvoiceFilters>) => void;
}

export function FilterControls({ filters, onFilterChange }: FilterControlsProps) {
  const statusOptions = [
    { label: 'All Statuses', value: 'all_statuses' },
    { label: 'Approved', value: 'Approved' },
    { label: 'Not Approved', value: 'Not Approved' },
    { label: 'Pending Review', value: 'Pending Review' },
    { label: 'In Review', value: 'In Review' }
  ];

  // Mock data for demonstration
  const propertyOptions = [
    { label: 'All Properties', value: 'all_properties' },
    { label: 'Sunset Apartments', value: 'Sunset Apartments' },
    { label: 'Ocean View Condos', value: 'Ocean View Condos' },
    { label: 'Mountain Lodge', value: 'Mountain Lodge' }
  ];

  const faultTypes = [
    { label: 'All Types', value: 'all_types' },
    { label: 'Plumbing', value: 'Plumbing' },
    { label: 'Electrical', value: 'Electrical' },
    { label: 'Structural', value: 'Structural' },
    { label: 'Appliance', value: 'Appliance' }
  ];

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="property">Property</Label>
            <Select
              value={filters.property}
              onValueChange={(value) => onFilterChange({ property: value === 'all_properties' ? '' : value })}
            >
              <SelectTrigger id="property">
                <SelectValue placeholder="Select property" />
              </SelectTrigger>
              <SelectContent>
                {propertyOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="unit">Unit ID</Label>
            <Input
              id="unit"
              placeholder="Enter unit ID"
              value={filters.unit}
              onChange={(e) => onFilterChange({ unit: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contractor">Contractor</Label>
            <Input
              id="contractor"
              placeholder="Enter contractor name"
              value={filters.contractor}
              onChange={(e) => onFilterChange({ contractor: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="faultType">Fault Type</Label>
            <Select
              value={filters.faultType}
              onValueChange={(value) => onFilterChange({ faultType: value === 'all_types' ? '' : value })}
            >
              <SelectTrigger id="faultType">
                <SelectValue placeholder="Select fault type" />
              </SelectTrigger>
              <SelectContent>
                {faultTypes.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={filters.status}
              onValueChange={(value) => onFilterChange({ status: value === 'all_statuses' ? '' : value })}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amountMin">Min Amount</Label>
            <Input
              id="amountMin"
              type="number"
              placeholder="Min"
              value={filters.amountMin !== null ? filters.amountMin : ''}
              onChange={(e) => onFilterChange({ 
                amountMin: e.target.value ? parseFloat(e.target.value) : null 
              })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amountMax">Max Amount</Label>
            <Input
              id="amountMax"
              type="number"
              placeholder="Max"
              value={filters.amountMax !== null ? filters.amountMax : ''}
              onChange={(e) => onFilterChange({ 
                amountMax: e.target.value ? parseFloat(e.target.value) : null 
              })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
