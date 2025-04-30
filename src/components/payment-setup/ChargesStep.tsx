
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Edit, Plus, Trash2 } from 'lucide-react';
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
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

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

interface MonthlyChargeFormProps {
  charge: ChargeItem;
  onChange: (updatedCharge: ChargeItem) => void;
  onDelete?: () => void;
  onSave?: () => void;
}

const MonthlyChargeForm: React.FC<MonthlyChargeFormProps> = ({ charge, onChange, onDelete, onSave }) => {
  const formattedFirstChargeDueDate = `May 01, 2025`;

  return (
    <div className="border rounded-md p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <Select
            value={charge.category}
            onValueChange={(value) => onChange({ ...charge, category: value })}
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
              value={charge.amount}
              onChange={(e) => onChange({ ...charge, amount: e.target.value })}
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
          value={charge.description}
          onChange={(e) => onChange({ ...charge, description: e.target.value })}
          placeholder="Add a description"
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          {charge.description?.length || 0} / 50 characters used
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <Select
            value={charge.dueDay}
            onValueChange={(value) => onChange({ ...charge, dueDay: value })}
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
              value={charge.firstMonth}
              onValueChange={(value) => onChange({ ...charge, firstMonth: value })}
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
              value={charge.firstYear}
              onValueChange={(value) => onChange({ ...charge, firstYear: value })}
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
          id={`createUntilLeaseEnds-${charge.id}`}
          checked={charge.createUntilLeaseEnds}
          onCheckedChange={(checked) => 
            onChange({ 
              ...charge, 
              createUntilLeaseEnds: checked === true 
            })
          }
          className="mt-1"
        />
        <div>
          <label
            htmlFor={`createUntilLeaseEnds-${charge.id}`}
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
        {onDelete ? (
          <Button variant="outline" onClick={onDelete} className="text-red-500 hover:text-red-700">
            <Trash2 className="h-4 w-4 mr-2" /> DELETE
          </Button>
        ) : (
          <Button variant="outline">
            CANCEL
          </Button>
        )}
        <Button onClick={onSave}>
          SAVE
        </Button>
      </div>
    </div>
  );
};

interface OneTimeChargeFormProps {
  charge: ChargeItem;
  onChange: (updatedCharge: ChargeItem) => void;
  onDelete?: () => void;
  onSave?: () => void;
}

const OneTimeChargeForm: React.FC<OneTimeChargeFormProps> = ({ charge, onChange, onDelete, onSave }) => {
  const [oneTimeDueDate, setOneTimeDueDate] = useState<Date | undefined>(
    charge.dueDate ? new Date(charge.dueDate) : undefined
  );

  // Format the due date for display
  const formattedOneTimeDueDate = oneTimeDueDate 
    ? format(oneTimeDueDate, 'MM/dd/yyyy') 
    : charge.dueDate || '';

  return (
    <div className="border rounded-md p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <Select
            value={charge.category}
            onValueChange={(value) => onChange({ ...charge, category: value })}
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
              value={charge.amount}
              onChange={(e) => onChange({ ...charge, amount: e.target.value })}
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
                    onChange({
                      ...charge,
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
          value={charge.description}
          onChange={(e) => onChange({ ...charge, description: e.target.value })}
          placeholder="Add a description"
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          {charge.description?.length || 0} / 50 characters used
        </p>
      </div>

      <div className="flex justify-between pt-4">
        {onDelete ? (
          <Button variant="outline" onClick={onDelete} className="text-red-500 hover:text-red-700">
            <Trash2 className="h-4 w-4 mr-2" /> DELETE
          </Button>
        ) : (
          <Button variant="outline">
            CANCEL
          </Button>
        )}
        <Button onClick={onSave}>
          SAVE
        </Button>
      </div>
    </div>
  );
};

// Charge card component to show saved charges
interface ChargeCardProps {
  charge: ChargeItem;
  onEdit: () => void;
  onDelete: () => void;
  type: 'monthly' | 'onetime';
}

const ChargeCard: React.FC<ChargeCardProps> = ({ charge, onEdit, onDelete, type }) => {
  const categoryMap = [...categoryOptions, ...oneTimeCategoryOptions].reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
  }, {} as Record<string, string>);

  const getMonthName = (monthNum: string) => {
    return monthOptions.find(m => m.value === monthNum)?.label || monthNum;
  };

  return (
    <div className="bg-blue-50 rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{categoryMap[charge.category] || charge.category}</h3>
          <p className="text-lg font-bold">${charge.amount}</p>
          {type === 'monthly' && (
            <p className="text-sm text-gray-600">
              Due on the {charge.dueDay}{charge.dueDay === '1' ? 'st' : 'th'} from {getMonthName(charge.firstMonth)} {charge.firstYear} onwards
            </p>
          )}
          {type === 'onetime' && charge.dueDate && (
            <p className="text-sm text-gray-600">
              Due on {charge.dueDate}
            </p>
          )}
          {charge.description && (
            <p className="text-sm mt-1">{charge.description}</p>
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={onEdit} className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete} className="h-8 w-8 text-red-500 hover:text-red-700">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export function ChargesStep({ monthlyCharges: initialMonthlyCharges, oneTimeCharges: initialOneTimeCharges, onSave }: ChargesStepProps) {
  const [monthlyCharges, setMonthlyCharges] = useState<ChargeItem[]>(initialMonthlyCharges);
  const [oneTimeCharges, setOneTimeCharges] = useState<ChargeItem[]>(initialOneTimeCharges);
  
  const [editingMonthly, setEditingMonthly] = useState<ChargeItem | null>(null);
  const [editingOneTime, setEditingOneTime] = useState<ChargeItem | null>(null);
  
  const [monthlyCollapsed, setMonthlyCollapsed] = useState(false);
  const [oneTimeCollapsed, setOneTimeCollapsed] = useState(false);
  
  // Create a new monthly charge template
  const createNewMonthlyCharge = (): ChargeItem => ({
    id: uuidv4(),
    category: 'rent',
    amount: '',
    description: '',
    dueDay: '1',
    firstMonth: '5', // May
    firstYear: '2025',
    createUntilLeaseEnds: true,
  });
  
  // Create a new one-time charge template
  const createNewOneTimeCharge = (): ChargeItem => ({
    id: uuidv4(),
    category: 'security_deposit',
    amount: '',
    description: '',
    dueDate: '',
  });

  const handleAddMonthlyCharge = () => {
    setEditingMonthly(createNewMonthlyCharge());
  };

  const handleAddOneTimeCharge = () => {
    setEditingOneTime(createNewOneTimeCharge());
  };

  const handleSaveMonthlyCharge = () => {
    if (editingMonthly) {
      const updatedCharges = editingMonthly.id && monthlyCharges.some(c => c.id === editingMonthly.id)
        ? monthlyCharges.map(c => c.id === editingMonthly.id ? editingMonthly : c)
        : [...monthlyCharges, editingMonthly];
      
      setMonthlyCharges(updatedCharges);
      setEditingMonthly(null);
    }
  };

  const handleSaveOneTimeCharge = () => {
    if (editingOneTime) {
      const updatedCharges = editingOneTime.id && oneTimeCharges.some(c => c.id === editingOneTime.id)
        ? oneTimeCharges.map(c => c.id === editingOneTime.id ? editingOneTime : c)
        : [...oneTimeCharges, editingOneTime];
      
      setOneTimeCharges(updatedCharges);
      setEditingOneTime(null);
    }
  };

  const handleEditMonthlyCharge = (charge: ChargeItem) => {
    setEditingMonthly(charge);
  };

  const handleEditOneTimeCharge = (charge: ChargeItem) => {
    setEditingOneTime(charge);
  };

  const handleDeleteMonthlyCharge = (id: string) => {
    setMonthlyCharges(monthlyCharges.filter(c => c.id !== id));
    if (editingMonthly?.id === id) {
      setEditingMonthly(null);
    }
  };

  const handleDeleteOneTimeCharge = (id: string) => {
    setOneTimeCharges(oneTimeCharges.filter(c => c.id !== id));
    if (editingOneTime?.id === id) {
      setEditingOneTime(null);
    }
  };

  const handleContinue = () => {
    onSave(monthlyCharges, oneTimeCharges);
  };

  const handleSkip = () => {
    onSave([], []);
  };

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
        <Collapsible open={!monthlyCollapsed} onOpenChange={(open) => setMonthlyCollapsed(!open)}>
          <div className="bg-gray-50 rounded-lg p-4">
            <CollapsibleTrigger className="flex items-center gap-2 w-full">
              <div className="bg-blue-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-blue-700" />
              </div>
              <h3 className="font-bold text-lg">Monthly Charges</h3>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="pt-4">
            {/* Display saved charges */}
            {monthlyCharges.length > 0 && !editingMonthly && (
              <div className="space-y-3 mb-4">
                {monthlyCharges.map(charge => (
                  <ChargeCard 
                    key={charge.id} 
                    charge={charge} 
                    type="monthly"
                    onEdit={() => handleEditMonthlyCharge(charge)}
                    onDelete={() => handleDeleteMonthlyCharge(charge.id)}
                  />
                ))}
              </div>
            )}

            {/* Editing form */}
            {editingMonthly && (
              <MonthlyChargeForm 
                charge={editingMonthly}
                onChange={setEditingMonthly}
                onDelete={editingMonthly.id && monthlyCharges.some(c => c.id === editingMonthly.id) 
                  ? () => handleDeleteMonthlyCharge(editingMonthly.id) 
                  : undefined}
                onSave={handleSaveMonthlyCharge}
              />
            )}

            {/* Add button when not editing */}
            {!editingMonthly && (
              <Button 
                variant="outline" 
                className="mt-2" 
                onClick={handleAddMonthlyCharge}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Monthly Charge
              </Button>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* One-time Charges Section */}
      <div className="space-y-4">
        <Collapsible open={!oneTimeCollapsed} onOpenChange={(open) => setOneTimeCollapsed(!open)}>
          <div className="bg-gray-50 rounded-lg p-4">
            <CollapsibleTrigger className="flex items-center gap-2 w-full">
              <div className="bg-blue-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-blue-700" />
              </div>
              <h3 className="font-bold text-lg">One-time Charges</h3>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="pt-2">
            <p className="text-gray-600 mb-4">Good for deposits, pro-rated rent, move-in fees, etc.</p>

            {/* Display saved charges */}
            {oneTimeCharges.length > 0 && !editingOneTime && (
              <div className="space-y-3 mb-4">
                {oneTimeCharges.map(charge => (
                  <ChargeCard 
                    key={charge.id} 
                    charge={charge} 
                    type="onetime"
                    onEdit={() => handleEditOneTimeCharge(charge)} 
                    onDelete={() => handleDeleteOneTimeCharge(charge.id)}
                  />
                ))}
              </div>
            )}

            {/* Editing form */}
            {editingOneTime && (
              <OneTimeChargeForm 
                charge={editingOneTime}
                onChange={setEditingOneTime}
                onDelete={editingOneTime.id && oneTimeCharges.some(c => c.id === editingOneTime.id) 
                  ? () => handleDeleteOneTimeCharge(editingOneTime.id) 
                  : undefined}
                onSave={handleSaveOneTimeCharge}
              />
            )}

            {/* Add button when not editing */}
            {!editingOneTime && (
              <Button 
                variant="outline" 
                className="mt-2" 
                onClick={handleAddOneTimeCharge}
              >
                <Plus className="h-4 w-4 mr-2" /> Add One-Time Charge
              </Button>
            )}
          </CollapsibleContent>
        </Collapsible>
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
