
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
}

interface UnitsListProps {
  units: Unit[];
  showActions?: boolean;
  propertyId?: number;
}

export function UnitsList({ units, showActions = false, propertyId }: UnitsListProps) {
  const navigate = useNavigate();

  const handleViewUnit = (unitId: number) => {
    if (propertyId) {
      navigate(`/properties/${propertyId}/units/${unitId}`);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Unit #</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Rooms</TableHead>
            <TableHead>Bathrooms</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Available</TableHead>
            <TableHead>Monthly Rent</TableHead>
            {showActions && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {units.map((unit) => (
            <TableRow 
              key={unit.id} 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => propertyId && handleViewUnit(unit.id)}
            >
              <TableCell className="font-medium">{unit.number}</TableCell>
              <TableCell>{unit.size}</TableCell>
              <TableCell>{unit.rooms}</TableCell>
              <TableCell>{unit.bathrooms}</TableCell>
              <TableCell>
                {unit.status === "Rented" ? (
                  <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Rented</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                    <span>Vacant</span>
                  </span>
                )}
              </TableCell>
              <TableCell>
                {unit.available ? (
                  <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    <span>Yes</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                    <span>No</span>
                  </span>
                )}
              </TableCell>
              <TableCell>${unit.rent}</TableCell>
              {showActions && (
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        propertyId && handleViewUnit(unit.id);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
