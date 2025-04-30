
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, MoreHorizontal, FileDown, Columns, Trash2, Edit } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogTrigger, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { ContractorForm } from '@/components/contractors/ContractorForm';
import { ContractorDetails } from '@/components/contractors/ContractorDetails';

// Define contractor types
export type ContractorType = 'Plumbing' | 'Electrical' | 'HVAC' | 'Appliance Repair' | 'General' | 'Cleaning' | 'Landscaping' | 'Pest Control';

// Interface for contractor data
export interface Contractor {
  id: string;
  company: string;
  name?: string;
  address: string;
  email?: string;
  phone: string;
  type: ContractorType;
  // Additional fields based on requirements
  insuranceExpiration?: string;
  workersCompExpiration?: string;
  taxpayerId?: string;
  paymentTerms?: string;
  billingCode?: string;
  notes?: string;
  isPreferred?: boolean;
}

// Mock data for contractors
const mockContractors: Contractor[] = [
  {
    id: '1',
    company: 'Ace Plumbing',
    address: '11 Miami Avenue, Fredericktown',
    email: 'info@aceplumbing.com',
    phone: '(951) 394-0252',
    type: 'Plumbing',
    insuranceExpiration: '2024-12-15',
    workersCompExpiration: '2024-11-30',
    taxpayerId: '53-8796421',
    paymentTerms: 'Net 30',
    isPreferred: true
  },
  {
    id: '2',
    company: 'Bright Electric Ltd',
    address: '1 South Miami Street, Miamisburg',
    email: 'service@brightelectric.com',
    phone: '(804) 413-6719',
    type: 'Electrical',
    insuranceExpiration: '2025-03-22',
    workersCompExpiration: '2025-02-10',
    taxpayerId: '36-4512987',
    paymentTerms: 'Net 15',
    isPreferred: false
  },
  {
    id: '3',
    company: 'Comfort Air Systems',
    name: 'Arik Johnson',
    address: '111 Water Street, Sterling City',
    email: 'arik@comfortair.com',
    phone: '(702) 541-1751',
    type: 'HVAC',
    insuranceExpiration: '2024-08-05',
    workersCompExpiration: '2024-09-15',
    taxpayerId: '81-7236549',
    paymentTerms: 'Net 30',
    isPreferred: true
  }
];

export default function Contractors() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [contractors, setContractors] = useState<Contractor[]>(mockContractors);
  const [filteredContractors, setFilteredContractors] = useState<Contractor[]>(mockContractors);
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'view'>('view');

  // Filter contractors based on search term
  useEffect(() => {
    const filtered = contractors.filter(contractor =>
      contractor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contractor.name && contractor.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      contractor.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contractor.email && contractor.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      contractor.phone.includes(searchTerm) ||
      contractor.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContractors(filtered);
  }, [searchTerm, contractors]);

  const handleDelete = (id: string) => {
    setContractors(prevContractors => prevContractors.filter(contractor => contractor.id !== id));
    toast({
      title: "Contractor deleted",
      description: "The contractor has been successfully removed."
    });
  };

  const exportToCSV = () => {
    toast({
      title: "Export started",
      description: "Your CSV file is being generated."
    });
    // CSV export logic would go here
  };

  const openAddContractorDialog = () => {
    setSelectedContractor(null);
    setDialogMode('add');
    setIsDialogOpen(true);
  };

  const openEditContractorDialog = (contractor: Contractor) => {
    setSelectedContractor(contractor);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

  const openViewContractorDialog = (contractor: Contractor) => {
    setSelectedContractor(contractor);
    setDialogMode('view');
    setIsDialogOpen(true);
  };

  const handleSaveContractor = (contractor: Contractor) => {
    if (dialogMode === 'add') {
      // Add new contractor with generated ID
      const newContractor = {
        ...contractor,
        id: `${contractors.length + 1}`
      };
      setContractors([...contractors, newContractor]);
      toast({
        title: "Contractor added",
        description: "The new contractor has been successfully added."
      });
    } else if (dialogMode === 'edit') {
      // Update existing contractor
      setContractors(prevContractors => 
        prevContractors.map(c => c.id === contractor.id ? contractor : c)
      );
      toast({
        title: "Contractor updated",
        description: "The contractor has been successfully updated."
      });
    }
    setIsDialogOpen(false);
  };

  const getInsuranceStatus = (expirationDate?: string) => {
    if (!expirationDate) return 'unknown';
    const expDate = new Date(expirationDate);
    const now = new Date();
    
    // Calculate days until expiration
    const daysUntilExpiration = Math.floor((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiration < 0) return 'expired';
    if (daysUntilExpiration <= 30) return 'expiring-soon';
    return 'valid';
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <SidebarProvider>
      <div className="flex w-full h-screen overflow-hidden bg-gray-50">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Contractors</h1>
              <p className="text-gray-600">Manage all service providers and vendors</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mb-6 justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search contractors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Columns size={16} />
                      Columns
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white">
                    <DropdownMenuItem>Company</DropdownMenuItem>
                    <DropdownMenuItem>Contact Name</DropdownMenuItem>
                    <DropdownMenuItem>Address</DropdownMenuItem>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Phone</DropdownMenuItem>
                    <DropdownMenuItem>Type</DropdownMenuItem>
                    <DropdownMenuItem>Insurance Status</DropdownMenuItem>
                    <DropdownMenuItem>Payment Terms</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" onClick={exportToCSV} className="flex items-center gap-2">
                  <FileDown size={16} />
                  Export CSV
                </Button>
                
                <Button onClick={openAddContractorDialog} className="flex items-center gap-2">
                  <Plus size={16} />
                  Add Contractor
                </Button>
              </div>
            </div>

            <div className="text-sm text-gray-500 mb-4">
              Total {filteredContractors.length} contractors
            </div>

            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>COMPANY</TableHead>
                    <TableHead>CONTACT</TableHead>
                    <TableHead>EMAIL</TableHead>
                    <TableHead>PHONE</TableHead>
                    <TableHead>TYPE</TableHead>
                    <TableHead>INSURANCE</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead className="text-right">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContractors.map((contractor) => {
                    const insuranceStatus = getInsuranceStatus(contractor.insuranceExpiration);
                    
                    return (
                      <TableRow key={contractor.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {contractor.company}
                            {contractor.isPreferred && (
                              <Badge variant="secondary" className="bg-blue-50 text-blue-600 border border-blue-200">
                                Preferred
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{contractor.name || '-'}</TableCell>
                        <TableCell>
                          {contractor.email ? (
                            <a href={`mailto:${contractor.email}`} className="text-blue-600 hover:underline">
                              {contractor.email}
                            </a>
                          ) : '-'}
                        </TableCell>
                        <TableCell>{contractor.phone}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={`
                              ${contractor.type === 'Plumbing' ? 'bg-blue-100 text-blue-800' : ''}
                              ${contractor.type === 'Appliance Repair' ? 'bg-green-100 text-green-800' : ''}
                              ${contractor.type === 'Electrical' ? 'bg-amber-100 text-amber-800' : ''}
                              ${contractor.type === 'HVAC' ? 'bg-red-100 text-red-800' : ''}
                              ${contractor.type === 'General' ? 'bg-gray-100 text-gray-800' : ''}
                              ${contractor.type === 'Cleaning' ? 'bg-purple-100 text-purple-800' : ''}
                              ${contractor.type === 'Landscaping' ? 'bg-emerald-100 text-emerald-800' : ''}
                              ${contractor.type === 'Pest Control' ? 'bg-orange-100 text-orange-800' : ''}
                            `}
                          >
                            {contractor.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {contractor.insuranceExpiration ? (
                            <span>{new Date(contractor.insuranceExpiration).toLocaleDateString()}</span>
                          ) : '-'}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              insuranceStatus === 'expired' ? 'destructive' : 
                              insuranceStatus === 'expiring-soon' ? 'outline' : 
                              'secondary'
                            }
                            className={`
                              ${insuranceStatus === 'valid' ? 'bg-green-100 text-green-800' : ''}
                              ${insuranceStatus === 'expiring-soon' ? 'bg-amber-100 text-amber-800' : ''}
                              ${insuranceStatus === 'expired' ? 'bg-red-100 text-red-800' : ''}
                              ${insuranceStatus === 'unknown' ? 'bg-gray-100 text-gray-800' : ''}
                            `}
                          >
                            {insuranceStatus === 'valid' ? 'Valid' : 
                             insuranceStatus === 'expiring-soon' ? 'Expiring Soon' : 
                             insuranceStatus === 'expired' ? 'Expired' : 'Unknown'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal size={16} />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white">
                              <DropdownMenuItem 
                                onClick={() => openViewContractorDialog(contractor)}
                                className="flex items-center gap-2"
                              >
                                <Search size={14} />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => openEditContractorDialog(contractor)}
                                className="flex items-center gap-2"
                              >
                                <Edit size={14} />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDelete(contractor.id)}
                                className="flex items-center gap-2 text-red-600 focus:text-red-600"
                              >
                                <Trash2 size={14} />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {filteredContractors.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No contractors found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              {dialogMode === 'view' && selectedContractor ? (
                <ContractorDetails 
                  contractor={selectedContractor} 
                  onEdit={() => setDialogMode('edit')} 
                />
              ) : (
                <ContractorForm 
                  contractor={selectedContractor} 
                  onSave={handleSaveContractor}
                  onCancel={handleCloseDialog}
                />
              )}
              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </SidebarProvider>
  );
}
