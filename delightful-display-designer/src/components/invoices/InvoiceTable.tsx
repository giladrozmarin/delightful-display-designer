
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Invoice } from '@/pages/Invoices';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface InvoiceTableProps {
  invoices: Invoice[];
  onViewInvoice: (invoice: Invoice) => void;
  onUpdateStatus?: (invoice: Invoice, newStatus: Invoice['status']) => void;
}

export function InvoiceTable({ 
  invoices, 
  onViewInvoice, 
  onUpdateStatus 
}: InvoiceTableProps) {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Not Approved':
        return 'bg-red-100 text-red-800';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (invoice: Invoice, newStatus: Invoice['status']) => {
    if (onUpdateStatus) {
      onUpdateStatus(invoice, newStatus);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice No.</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="hidden md:table-cell">Unit ID</TableHead>
            <TableHead className="hidden lg:table-cell">Property</TableHead>
            <TableHead className="hidden lg:table-cell">Contractor</TableHead>
            <TableHead className="hidden xl:table-cell">Fault Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Handler</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="h-32 text-center text-gray-500">
                No invoices found
              </TableCell>
            </TableRow>
          ) : (
            invoices.map((invoice) => (
              <TableRow 
                key={invoice.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onViewInvoice(invoice)}
              >
                <TableCell className="font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">{invoice.invoiceNumber}</TableCell>
                <TableCell className="whitespace-nowrap">{invoice.date}</TableCell>
                <TableCell className="whitespace-nowrap">${invoice.amount.toFixed(2)}</TableCell>
                <TableCell className="hidden md:table-cell whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">{invoice.unitId}</TableCell>
                <TableCell className="hidden lg:table-cell whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{invoice.propertyName}</TableCell>
                <TableCell className="hidden lg:table-cell whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{invoice.contractorName}</TableCell>
                <TableCell className="hidden xl:table-cell whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{invoice.faultType}</TableCell>
                <TableCell 
                  className="whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)} cursor-pointer hover:opacity-80 transition-opacity inline-flex items-center`}>
                        {invoice.status}
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="bg-white shadow-md border border-gray-200 p-1 rounded-md">
                      {['Approved', 'Not Approved', 'Pending Review', 'In Review'].map((status) => (
                        <DropdownMenuItem
                          key={status}
                          className={`text-sm py-1.5 px-3 cursor-pointer ${invoice.status === status ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                          onClick={() => handleStatusChange(invoice, status as Invoice['status'])}
                        >
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColor(status)}`}></span>
                          {status}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell className="hidden md:table-cell whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">{invoice.handler}</TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewInvoice(invoice);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View invoice</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
