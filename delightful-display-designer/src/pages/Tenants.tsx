
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Columns, 
  FileText, 
  Plus, 
  MoreHorizontal 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample tenant data
const sampleTenants = [
  {
    id: 1,
    name: "Gilad Rozmarin",
    phone: "(804) 413-6719",
    email: "19gilad@gmail.com",
    address: "573 Aspen Leaf Street, Las Vegas",
    status: "active"
  },
  {
    id: 2,
    name: "Arik Bidas",
    phone: "(702) 541-1751",
    email: "arik@example.com",
    address: "573 Aspen Leaf Street, Las Vegas",
    status: "active"
  }
];

export default function Tenants() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [tenants, setTenants] = useState(sampleTenants);
  
  // Filter tenants based on search term
  const filteredTenants = tenants.filter(tenant => 
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.phone.includes(searchTerm)
  );

  // Navigate to tenant details page
  const handleTenantClick = (tenantId: number) => {
    navigate(`/tenants/${tenantId}`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#f2f3f7]">
        <AppSidebar />
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tenants</h1>
              <p className="text-gray-500 mt-2">
                View and manage tenants in your portfolio.
              </p>
            </div>
            
            {/* Search and Actions */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name..."
                  className="pl-9 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Columns className="h-4 w-4 mr-2" />
                      Columns
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem>Name</DropdownMenuItem>
                    <DropdownMenuItem>Phone</DropdownMenuItem>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Address</DropdownMenuItem>
                    <DropdownMenuItem>Status</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tenant
                </Button>
              </div>
            </div>
            
            {/* Tenants Count */}
            <div className="text-sm text-gray-500">
              Total {filteredTenants.length} tenants
            </div>
            
            {/* Tenants Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NAME</TableHead>
                    <TableHead>PHONE</TableHead>
                    <TableHead>EMAIL</TableHead>
                    <TableHead>ADDRESS</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead className="text-right">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTenants.map((tenant) => (
                    <TableRow 
                      key={tenant.id} 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleTenantClick(tenant.id)}
                    >
                      <TableCell className="font-medium">{tenant.name}</TableCell>
                      <TableCell>{tenant.phone}</TableCell>
                      <TableCell>{tenant.email}</TableCell>
                      <TableCell>
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          {tenant.address}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`px-2 py-0.5 rounded-full flex items-center w-fit gap-1.5
                            ${tenant.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                          `}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${tenant.status === 'active' ? 'bg-green-500' : ''}`}></span>
                          {tenant.status === 'active' ? 'Active' : tenant.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={(e) => e.stopPropagation()} // Prevent row click when clicking dropdown
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenuItem onClick={() => navigate(`/tenants/${tenant.id}`)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Tenant</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete Tenant</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
