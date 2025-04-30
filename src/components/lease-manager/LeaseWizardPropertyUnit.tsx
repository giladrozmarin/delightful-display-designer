
import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Home, Building } from "lucide-react";

interface Property {
  id: number;
  name: string;
  address: string;
  units: Unit[];
}

interface Unit {
  id: number;
  number: string;
  status: string;
  available: boolean;
  rent: number;
  address: string;
  lease?: {
    id: number;
    startDate: string;
    endDate: string;
    status: string;
  };
}

interface LeaseWizardPropertyUnitProps {
  properties: Property[];
  selectedProperty: Property | null;
  selectedUnit: Unit | null;
  onPropertyChange: (property: Property | null) => void;
  onUnitChange: (unit: Unit | null) => void;
}

export function LeaseWizardPropertyUnit({
  properties,
  selectedProperty,
  selectedUnit,
  onPropertyChange,
  onUnitChange,
}: LeaseWizardPropertyUnitProps) {
  const [hasActiveLeaseWarning, setHasActiveLeaseWarning] = useState(false);
  
  // When property changes, reset selected unit
  useEffect(() => {
    if (!selectedProperty) {
      onUnitChange(null);
    } else if (selectedUnit && selectedUnit.id) {
      // Check if the selected unit belongs to the selected property
      const unitExists = selectedProperty.units.some(unit => unit.id === selectedUnit.id);
      if (!unitExists) {
        onUnitChange(null);
      }
    }
  }, [selectedProperty]);
  
  // Check for active lease when unit changes
  useEffect(() => {
    if (selectedUnit && selectedUnit.lease && selectedUnit.lease.status === 'active') {
      setHasActiveLeaseWarning(true);
    } else {
      setHasActiveLeaseWarning(false);
    }
  }, [selectedUnit]);
  
  const handlePropertyChange = (propertyId: string) => {
    const property = properties.find(p => p.id === parseInt(propertyId)) || null;
    onPropertyChange(property);
  };
  
  const handleUnitChange = (unitId: string) => {
    if (!selectedProperty) return;
    
    const unit = selectedProperty.units.find(u => u.id === parseInt(unitId)) || null;
    onUnitChange(unit);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-6">
          {/* Property selection */}
          <div className="space-y-2">
            <Label htmlFor="property-select">Select Property</Label>
            <Select
              value={selectedProperty ? selectedProperty.id.toString() : ""}
              onValueChange={handlePropertyChange}
            >
              <SelectTrigger id="property-select" className="w-full">
                <SelectValue placeholder="Select a property" />
              </SelectTrigger>
              <SelectContent>
                {properties.map((property) => (
                  <SelectItem 
                    key={property.id} 
                    value={property.id.toString()}
                  >
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-blue-500" />
                      <span>{property.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedProperty && (
              <p className="text-sm text-gray-500 mt-1">
                {selectedProperty.address}
              </p>
            )}
          </div>
          
          {/* Unit selection */}
          {selectedProperty && (
            <div className="space-y-2">
              <Label htmlFor="unit-select">Select Unit</Label>
              <Select
                value={selectedUnit ? selectedUnit.id.toString() : ""}
                onValueChange={handleUnitChange}
              >
                <SelectTrigger id="unit-select" className="w-full">
                  <SelectValue placeholder="Select a unit" />
                </SelectTrigger>
                <SelectContent>
                  {selectedProperty.units.map((unit) => (
                    <SelectItem 
                      key={unit.id} 
                      value={unit.id.toString()}
                    >
                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Unit {unit.number}</span>
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100">
                          {unit.status}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedUnit && (
                <div className="text-sm mt-1">
                  <p className="text-gray-500">{selectedUnit.address}</p>
                  <p className="font-medium text-green-600 mt-1">Market Rent: ${selectedUnit.rent}/month</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Warning for existing active lease */}
      {hasActiveLeaseWarning && (
        <Alert variant="destructive" className="bg-yellow-50 text-yellow-800 border-yellow-300">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Active Lease Detected</AlertTitle>
          <AlertDescription>
            This unit already has an active lease. Creating a new lease may cause conflicts with the existing one.
          </AlertDescription>
        </Alert>
      )}
      
      {/* Selected property and unit summary */}
      {selectedProperty && selectedUnit && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
          <h4 className="font-medium text-blue-800 mb-2">Selected Property & Unit</h4>
          <div className="space-y-2">
            <div className="flex items-start">
              <Building className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium">{selectedProperty.name}</p>
                <p className="text-sm text-gray-600">{selectedProperty.address}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Home className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium">Unit {selectedUnit.number}</p>
                <p className="text-sm text-gray-600">{selectedUnit.address}</p>
                <p className="text-sm font-medium text-green-600 mt-1">Market Rent: ${selectedUnit.rent}/month</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
