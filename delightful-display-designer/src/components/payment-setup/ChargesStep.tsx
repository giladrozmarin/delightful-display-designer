
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Edit } from 'lucide-react';
import { ChargeItem } from './PaymentSetupWizard';
import { v4 as uuidv4 } from 'uuid';
import { Separator } from '@/components/ui/separator';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const categoryOptions = [
  { value: 'rent', label: 'Rent' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'parking', label: 'Parking' },
  { value: 'pet_fee', label: 'Pet Fee' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'other', label: 'Other' },
];

const oneTimeCategoryOptions = [
  { value: 'security_deposit', label: 'Security Deposit' },
  { value: 'first_month_rent', label: 'First Month Rent' },
  { value: 'last_month_rent', label: 'Last Month Rent' },
  { value: 'move_in_fee', label: 'Move-in Fee' },
  { value: 'key_fee', label: 'Key Fee' },
  { value: 'other', label: 'Other' },
];

const dueDayOptions = [
  { value: '1', label: '1st' },
  { value: '2', label: '2nd' },
  { value: '5', label: '5th' },
  { value: '10', label: '10th' },
  { value: '15', label: '15th' },
  { value: '20', label: '20th' },
  { value: '25', label: '25th' },
  { value: 'last', label: 'Last day' },
];

const monthOptions = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const yearOptions = [
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
];

interface ChargesStepProps {
  monthlyCharges: ChargeItem[];
  oneTimeCharges: ChargeItem[];
  onSave: (monthlyCharges: ChargeItem[], oneTimeCharges: ChargeItem[]) => void;
}

export function ChargesStep({ monthlyCharges, oneTimeCharges, onSave }: ChargesStepProps) {
  const [editingMonthly, setEditingMonthly] = useState<ChargeItem>({
    id: monthlyCharges.length > 0 ? monthlyCharges[0].id : uuidv4(),
    category: monthlyCharges.length > 0 ? monthlyCharges[0].category : 'rent',
    amount: monthlyCharges.length > 0 ? monthlyCharges[0].amount : '',
    description: monthlyCharges.length > 0 ? monthlyCharges[0].description : '',
    dueDay: monthlyCharges.length > 0 ? monthlyCharges[0].dueDay : '1',
    firstMonth: monthlyCharges.length > 0 ? monthlyCharges[0].firstMonth : '5', // May
    firstYear: monthlyCharges.length > 0 ? monthlyCharges[0].firstYear : '2025',
    createUntilLeaseEnds: monthlyCharges.length > 0 ? monthlyCharges[0].createUntilLeaseEnds : true,
  });

  const [editingOneTime, setEditingOneTime] = useState<ChargeItem>({
    id: oneTimeCharges.length > 0 ? oneTimeCharges[0].id : uuidv4(),
    category: oneTimeCharges.length > 0 ? oneTimeCharges[0].category : 'security_deposit',
    amount: oneTimeCharges.length > 0 ? oneTimeCharges[0].amount : '',
    description: oneTimeCharges.length > 0 ? oneTimeCharges[0].description : '',
    dueDate: oneTimeCharges.length > 0 ? oneTimeCharges[0].dueDate : '',
  });

  const [oneTimeDueDate, setOneTimeDueDate] = useState<Date | undefined>(
    editingOneTime.dueDate ? new Date(editingOneTime.dueDate) : undefined
  );

  const handleSaveMonthly = () => {
    // For simplicity, we'll just save the current editing monthly charge
    // In a real app, you'd want to manage an array of charges
    const updatedMonthlyCharges = [editingMonthly];
    setEditingMonthly({
      ...editingMonthly,
      id: uuidv4(), // Reset ID for next new charge
    });

    // In a real implementation, you'd add the charge to an array
    onSave(updatedMonthlyCharges, oneTimeCharges);
  };

  const handleSaveOneTime = () => {
    // For simplicity, we'll just save the current editing one-time charge
    const updatedOneTimeCharges = [editingOneTime];
    setEditingOneTime({
      ...editingOneTime,
      id: uuidv4(), // Reset ID for next new charge
    });

    // In a real implementation, you'd add the charge to an array
    onSave(monthlyCharges, updatedOneTimeCharges);
  };

  const handleContinue = () => {
    onSave(monthlyCharges.length > 0 ? monthlyCharges : [editingMonthly], 
           oneTimeCharges.length > 0 ? oneTimeCharges : [editingOneTime]);
  };

  const handleSkip = () => {
    onSave([], []);
  };

  // Format the due date for display
  const formattedOneTimeDueDate = oneTimeDueDate 
    ? format(oneTimeDueDate, 'MM/dd/yyyy') 
    : editingOneTime.dueDate || '';

  // Format the first monthly charge due date for display
  const formattedFirstChargeDueDate = `May 01, 2025`;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Add Your Charges</h2>
        <p className="text-gray-600 mb-6">
          We automatically send charges to tenants 15 days before the due date. You can add
          and edit charges later on too.
        </p>
      </div>

      {/* Monthly Charges Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-2 rounded-full">
            <Calendar className="h-5 w-5 text-blue-700" />
          </div>
          <h3 className="font-bold text-lg">Monthly Charges</h3>
        </div>

        <div className="border rounded-md p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Select
                value={editingMonthly.category}
                onValueChange={(value) => setEditingMonthly({ ...editingMonthly, category: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  $
                </span>
                <Input
                  value={editingMonthly.amount}
                  onChange={(e) => setEditingMonthly({ ...editingMonthly, amount: e.target.value })}
                  className="pl-8"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <Input
              value={editingMonthly.description}
              onChange={(e) => setEditingMonthly({ ...editingMonthly, description: e.target.value })}
              placeholder="Add a description"
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              {editingMonthly.description.length} / 50 characters used
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <Select
                value={editingMonthly.dueDay}
                onValueChange={(value) => setEditingMonthly({ ...editingMonthly, dueDay: value })}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Select due day" />
                </SelectTrigger>
                <SelectContent>
                  {dueDayOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">First Month</label>
              <div className="flex space-x-2">
                <Select
                  value={editingMonthly.firstMonth}
                  onValueChange={(value) => setEditingMonthly({ ...editingMonthly, firstMonth: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {monthOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={editingMonthly.firstYear}
                  onValueChange={(value) => setEditingMonthly({ ...editingMonthly, firstYear: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="createUntilLeaseEnds"
              checked={editingMonthly.createUntilLeaseEnds}
              onCheckedChange={(checked) => 
                setEditingMonthly({ 
                  ...editingMonthly, 
                  createUntilLeaseEnds: checked === true 
                })
              }
              className="mt-1"
            />
            <div>
              <label
                htmlFor="createUntilLeaseEnds"
                className="font-medium text-sm text-gray-700 cursor-pointer"
              >
                Create charges until the lease ends
              </label>
              <p className="text-sm text-gray-600 mt-1">
                The first monthly charge will be due on {formattedFirstChargeDueDate} and sent to your
                tenants every month until you delete this charge or the lease ends.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between items-center">
              <div className="font-medium text-sm">Late Fees</div>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" /> EDIT
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              A one-time initial fee of <span className="font-medium">$12</span> will be applied <span className="font-medium">1 day</span> after the rent due date.
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => {}}>
              CANCEL
            </Button>
            <Button onClick={handleSaveMonthly}>
              SAVE
            </Button>
          </div>
        </div>
      </div>

      {/* One-time Charges Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-2 rounded-full">
            <Calendar className="h-5 w-5 text-blue-700" />
          </div>
          <h3 className="font-bold text-lg">One-time Charges</h3>
        </div>
        <p className="text-gray-600">Good for deposits, pro-rated rent, move-in fees, etc.</p>

        <div className="border rounded-md p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Select
                value={editingOneTime.category}
                onValueChange={(value) => setEditingOneTime({ ...editingOneTime, category: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {oneTimeCategoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  $
                </span>
                <Input
                  value={editingOneTime.amount}
                  onChange={(e) => setEditingOneTime({ ...editingOneTime, amount: e.target.value })}
                  className="pl-8"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    {formattedOneTimeDueDate || "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={oneTimeDueDate}
                    onSelect={(date) => {
                      setOneTimeDueDate(date);
                      if (date) {
                        setEditingOneTime({
                          ...editingOneTime,
                          dueDate: format(date, 'MM/dd/yyyy')
                        });
                      }
                    }}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <Input
              value={editingOneTime.description}
              onChange={(e) => setEditingOneTime({ ...editingOneTime, description: e.target.value })}
              placeholder="Add a description"
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              {editingOneTime.description.length} / 50 characters used
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => {}}>
              CANCEL
            </Button>
            <Button onClick={handleSaveOneTime}>
              SAVE
            </Button>
          </div>
        </div>
      </div>

      {/* Helpful Info Box */}
      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 space-y-2">
        <div className="flex items-center">
          <h4 className="font-medium">Helpful info:</h4>
        </div>
        <ul className="pl-6 space-y-1">
          <li className="flex items-start">
            <span className="inline-block w-2 h-2 bg-orange-400 rounded-full mt-1.5 mr-2"></span>
            <span className="text-sm">
              Charges won't be sent until you add tenants to the lease. Make sure to
              double-check charge due dates before you add tenants.
            </span>
          </li>
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handleSkip}>
          SKIP FOR NOW
        </Button>
        <Button onClick={handleContinue} className="bg-blue-800 hover:bg-blue-900 text-white">
          NEXT
        </Button>
      </div>
    </div>
  );
}
