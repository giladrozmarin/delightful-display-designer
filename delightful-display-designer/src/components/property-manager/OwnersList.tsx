
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
import { Edit, Trash2 } from 'lucide-react';

interface Owner {
  id: number;
  name: string;
  percentage: number;
  contact: string;
}

interface OwnersListProps {
  owners: Owner[];
}

export function OwnersList({ owners }: OwnersListProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Ownership %</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {owners.map((owner) => (
            <TableRow key={owner.id}>
              <TableCell className="font-medium">{owner.name}</TableCell>
              <TableCell>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${owner.percentage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-1">{owner.percentage}%</span>
              </TableCell>
              <TableCell>{owner.contact}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
