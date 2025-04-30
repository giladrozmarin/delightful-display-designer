
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Receipt, CreditCard, Banknote, Plus, Download } from 'lucide-react';

interface Payment {
  id: number;
  date: string;
  amount: number;
  type: string;
  status: 'paid' | 'pending' | 'late' | 'overdue';
  description?: string;
}

interface PaymentManagementProps {
  payments: Payment[];
  securityDeposit?: number;
  onChargeRent: () => void;
  onRecordPayment: () => void;
  onManageDeposit: () => void;
}

export function PaymentManagement({ 
  payments, 
  securityDeposit = 0, 
  onChargeRent, 
  onRecordPayment, 
  onManageDeposit 
}: PaymentManagementProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Financial Management</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onRecordPayment}>
              <Receipt className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
            <Button size="sm" onClick={onChargeRent}>
              <Plus className="h-4 w-4 mr-2" />
              Charge Rent
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Receipt className="h-5 w-5 text-green-600 mr-1" />
                <span className="text-sm text-green-600">Next Payment</span>
              </div>
              <p className="text-lg font-bold text-green-700">Due in 14 days</p>
              <p className="text-sm text-green-600">June 1, 2023</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Banknote className="h-5 w-5 text-blue-600 mr-1" />
                <span className="text-sm text-blue-600">Payment Status</span>
              </div>
              <p className="text-lg font-bold text-blue-700">Current</p>
              <p className="text-sm text-blue-600">All payments up to date</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg" onClick={onManageDeposit} style={{ cursor: 'pointer' }}>
              <div className="flex items-center mb-2">
                <CreditCard className="h-5 w-5 text-purple-600 mr-1" />
                <span className="text-sm text-purple-600">Security Deposit</span>
              </div>
              <p className="text-lg font-bold text-purple-700">${securityDeposit}</p>
              <p className="text-sm text-purple-600">Click to manage</p>
            </div>
          </div>
          
          <h3 className="font-medium text-gray-700 mb-3">Recent Transactions</h3>
          
          {payments.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.description || payment.type}</TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell>${payment.amount}</TableCell>
                      <TableCell>
                        <Badge
                          className={`
                            ${payment.status === 'paid' ? 'bg-green-100 text-green-800' : ''}
                            ${payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${payment.status === 'late' ? 'bg-orange-100 text-orange-800' : ''}
                            ${payment.status === 'overdue' ? 'bg-red-100 text-red-800' : ''}
                          `}
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <DollarSign className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No Payment History</h3>
              <p className="text-gray-500 mb-6">This unit doesn't have any payment history.</p>
              <Button onClick={onRecordPayment}>
                Record First Payment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
