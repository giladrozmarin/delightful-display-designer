
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

interface Application {
  id: number;
  propertyName: string;
  unitNumber: string;
  applicantName: string;
  email: string;
  phone: string;
  status: string;
  submittedDate: string;
  lastUpdated: string;
}

interface ApplicationsTableProps {
  applications: Application[];
}

export function ApplicationsTable({ applications }: ApplicationsTableProps) {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pending", variant: "warning" },
      approved: { label: "Approved", variant: "success" },
      rejected: { label: "Rejected", variant: "destructive" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: "default" };
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  if (applications.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={7} className="text-center py-10 text-gray-500">
          <div className="flex flex-col items-center justify-center gap-2">
            <FileText className="h-10 w-10 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-700">No applications found</h3>
            <p className="text-gray-500 max-w-md">
              Try adjusting your search criteria
            </p>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Card className="border-0 shadow-sm overflow-hidden rounded-xl">
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-200">
              <TableHead>Property</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow 
                key={app.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => navigate(`/applications/${app.id}`)}
              >
                <TableCell>{app.propertyName}</TableCell>
                <TableCell>{app.unitNumber}</TableCell>
                <TableCell>{app.applicantName}</TableCell>
                <TableCell>
                  <div>{app.email}</div>
                  <div className="text-sm text-gray-500">{app.phone}</div>
                </TableCell>
                <TableCell>{getStatusBadge(app.status)}</TableCell>
                <TableCell>{app.submittedDate}</TableCell>
                <TableCell>{app.lastUpdated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
