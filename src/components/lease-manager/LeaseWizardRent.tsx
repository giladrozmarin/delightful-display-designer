
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { DollarSign, Plus, X, CalendarClock, Trash } from "lucide-react";

interface AdditionalCharge {
  id: number;
  description: string;
  amount: string;
  frequency: string;
}

interface LeaseWizardRentProps {
  rentAmount: string;
  firstRentDate: string;
  paymentFrequency: string;
  additionalCharges: AdditionalCharge[];
  onRentAmountChange: (amount: string) => void;
  onFirstRentDateChange: (date: string) => void;
  onPaymentFrequencyChange: (frequency: string) => void;
  onAdditionalChargesChange: (charges: AdditionalCharge[]) => void;
}

export function LeaseWizardRent({
  rentAmount,
  firstRentDate,
  paymentFrequency,
  additionalCharges,
  onRentAmountChange,
  onFirstRentDateChange,
  onPaymentFrequencyChange,
  onAdditionalChargesChange,
}: LeaseWizardRentProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCharge, setNewCharge] = useState({
    description: '',
    amount: '',
    frequency: 'monthly',
  });
  
  const handleNewChargeChange = (field: string, value: string) => {
    setNewCharge(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleAddCharge = () => {
    if (newCharge.description && newCharge.amount) {
      const charge = {
        ...newCharge,
        id: Date.now(),
      };
      
      onAdditionalChargesChange([...additionalCharges, charge]);
      setNewCharge({ description: '', amount: '', frequency: 'monthly' });
      setDialogOpen(false);
    }
  };
  
  const handleRemoveCharge = (chargeId: number) => {
    onAdditionalChargesChange(additionalCharges.filter(charge => charge.id !== chargeId));
  };
  
  // Calculate total monthly rent
  const calculateTotalMonthly = () => {
    const baseRent = parseFloat(rentAmount) || 0;
    
    // Calculate additional charges converted to monthly
    const additionalTotal = additionalCharges.reduce((total, charge) => {
      const chargeAmount = parseFloat(charge.amount) || 0;
      
      // Convert to monthly equivalent
      if (charge.frequency === 'weekly') {
        return total + (chargeAmount * 52) / 12;
      } else if (charge.frequency === 'biweekly') {
        return total + (chargeAmount * 26) / 12;
      } else if (charge.frequency === 'monthly') {
        return total + chargeAmount;
      } else if (charge.frequency === 'quarterly') {
        return total + chargeAmount / 3;
      } else if (charge.frequency === 'annually') {
        return total + chargeAmount / 12;
      }
      
      return total + chargeAmount;
    }, 0);
    
    return baseRent + additionalTotal;
  };
  
  return (
    <div className="space-y-6">
      {/* Base Rent Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="rent-amount">Monthly Rent Amount</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              id="rent-amount"
              type="number"
              min="0"
              value={rentAmount}
              onChange={(e) => onRentAmountChange(e.target.value)}
              className="pl-10"
              placeholder="0.00"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="first-rent-date">First Rent Date</Label>
          <Input
            id="first-rent-date"
            type="date"
            value={firstRentDate}
            onChange={(e) => onFirstRentDateChange(e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="payment-frequency">Payment Frequency</Label>
        <Select 
          value={paymentFrequency} 
          onValueChange={onPaymentFrequencyChange}
        >
          <SelectTrigger id="payment-frequency">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="biweekly">Bi-weekly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="annually">Annually</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Additional Charges */}
      <div className="space-y-4 pt-6 border-t">
        <div className="flex items-center justify-between">
          <Label>Additional Recurring Charges</Label>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Charge
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Recurring Charge</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="charge-description">Description</Label>
                  <Input
                    id="charge-description"
                    value={newCharge.description}
                    onChange={(e) => handleNewChargeChange('description', e.target.value)}
                    placeholder="e.g., Pet Fee, Parking"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="charge-amount">Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      id="charge-amount"
                      type="number"
                      min="0"
                      value={newCharge.amount}
                      onChange={(e) => handleNewChargeChange('amount', e.target.value)}
                      className="pl-10"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="charge-frequency">Frequency</Label>
                  <Select 
                    value={newCharge.frequency} 
                    onValueChange={(value) => handleNewChargeChange('frequency', value)}
                  >
                    <SelectTrigger id="charge-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddCharge}
                  disabled={!newCharge.description || !newCharge.amount}
                >
                  Add Charge
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {additionalCharges.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {additionalCharges.map((charge) => (
                <TableRow key={charge.id}>
                  <TableCell className="font-medium">{charge.description}</TableCell>
                  <TableCell>${charge.amount}</TableCell>
                  <TableCell className="capitalize">{charge.frequency}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRemoveCharge(charge.id)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center p-4 border rounded-lg bg-gray-50">
            <p className="text-gray-500">No additional charges</p>
          </div>
        )}
      </div>
      
      {/* Rent Summary */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
        <h4 className="font-medium text-blue-800 mb-2">Rent Summary</h4>
        <div className="space-y-2">
          {rentAmount && (
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-gray-700">
                <span className="font-medium">Base Rent:</span> ${rentAmount}/month
              </span>
            </div>
          )}
          
          {firstRentDate && (
            <div className="flex items-center">
              <CalendarClock className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-gray-700">
                <span className="font-medium">First Rent Date:</span> {firstRentDate}
              </span>
            </div>
          )}
          
          <div className="flex items-center">
            <CalendarClock className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-gray-700">
              <span className="font-medium">Payment Frequency:</span> {paymentFrequency.charAt(0).toUpperCase() + paymentFrequency.slice(1)}
            </span>
          </div>
          
          {additionalCharges.length > 0 && (
            <div className="pl-7 mt-2">
              <p className="font-medium text-gray-700">Additional Charges:</p>
              <ul className="text-sm text-gray-600 space-y-1 mt-1">
                {additionalCharges.map((charge) => (
                  <li key={charge.id}>
                    {charge.description}: ${charge.amount}/{charge.frequency}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="pt-3 mt-3 border-t border-blue-200">
            <div className="flex items-center justify-between font-medium">
              <span className="text-blue-800">Total Monthly Equivalent:</span>
              <span className="text-blue-800">${calculateTotalMonthly().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
