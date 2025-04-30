
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, FileText } from "lucide-react";

interface UnitLeasesProps {
  leases: any[];
  unitId: number;
  propertyId: number;
}

export function UnitLeases({ leases, unitId, propertyId }: UnitLeasesProps) {
  const navigate = useNavigate();

  const handleViewLease = (leaseId: number) => {
    navigate(`/leases/${leaseId}`);
  };

  return (
    <>
      {leases.length > 0 ? (
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-200">
              <TableHead>Tenant</TableHead>
              <TableHead>Term</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Deposit</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leases.map((lease) => (
              <TableRow
                key={lease.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleViewLease(lease.id)}
              >
                <TableCell>{lease.tenant || "—"}</TableCell>
                <TableCell>
                  {lease.term === "Fixed Term" ? (
                    <div>
                      <div className="font-medium">{lease.startDate} - {lease.endDate}</div>
                      <div className="text-sm text-gray-500">Fixed Term</div>
                    </div>
                  ) : (
                    <div>
                      <div className="font-medium">Started {lease.startDate}</div>
                      <div className="text-sm text-gray-500">Month-to-Month</div>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      lease.status === "active" ? "default" :
                        lease.status === "expired" ? "destructive" :
                          "secondary"
                    }
                    className="font-medium capitalize px-3 py-1"
                  >
                    {lease.status === "active" ? "Active" :
                      lease.status === "expired" ? "Expired" :
                        "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">${lease.rent.toLocaleString()}</TableCell>
                <TableCell className="font-medium">${lease.deposit.toLocaleString()}</TableCell>
                <TableCell className={`font-medium ${lease.balance > 0 ? "text-red-600" : ""}`}>
                  ${lease.balance.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Show options menu for the lease
                    }}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <div className="flex flex-col items-center justify-center gap-2">
            <FileText className="h-10 w-10 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-700">No leases found</h3>
            <p className="text-gray-500 max-w-md">
              This unit doesn't have any leases yet. Create a new lease to get started.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
