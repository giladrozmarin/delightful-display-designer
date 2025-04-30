import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  FileDown, 
  Plus, 
  ChevronDown, 
  MoreHorizontal,
  Building,
  Home,
  MapPin,
  DoorClosed,
  Building2,
  ReceiptText,
  PiggyBank,
  Users
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AddPropertyForm } from "@/components/properties/AddPropertyForm";
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger
} from "@/components/ui/dialog";

const propertiesData = [
  {
    id: 1,
    name: "1 South Miami Street",
    address: "1 South Miami Street, Miamisburg, Ohio 45342, United States",
    city: "Miamisburg",
    state: "OH",
    zip: "45342",
    warranty: "No",
    type: "Residential",
    units: 3,
    status: "Occupied"
  },
  {
    id: 2,
    name: "573 Aspen Leaf Street",
    address: "573 Aspen Leaf Street, Las Vegas, Nevada 89144, United States",
    city: "Las Vegas",
    state: "NV",
    zip: "89144",
    warranty: "Yes",
    type: "Commercial",
    units: 2,
    status: "Vacant"
  },
  {
    id: 3,
    name: "573 Aspen Leaf Street",
    address: "573 Aspen Leaf Street, Las Vegas, Nevada 89144, United States",
    city: "Las Vegas",
    state: "NV",
    zip: "89144",
    warranty: "Expired",
    type: "Residential",
    units: 1,
    status: "Needs Repair"
  }
];

type PropertyStatus = "All" | "Occupied" | "Vacant" | "Needs Repair";

export default function Properties() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<PropertyStatus>("All");
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const navigate = useNavigate();
  
  const filteredProperties = propertiesData.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || property.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleRowClick = (propertyId: number) => {
    navigate(`/properties/${propertyId}`);
  };

  const handleStatusChange = (value: string) => {
    if (value) {
      setStatusFilter(value as PropertyStatus);
    } else {
      setStatusFilter("All");
    }
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#f2f3f7]">
        <AppSidebar />
        <main className="flex-1 p-8 font-inter overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-600 rounded-full shadow-lg flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">G</span>
                </div>
                <span className="text-gray-800 font-medium">Welcome Back, gilad!</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full pulse-blue"></span>
                  <span className="text-blue-600 font-medium text-sm">2 New Faults</span>
                </div>
                <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-lg px-4 py-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full pulse-orange"></span>
                  <span className="text-orange-500 font-medium text-sm">4 Tenant Awaiting Response</span>
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">Properties</h1>
              <p className="text-gray-600 mt-1">View and manage properties in your portfolio.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search properties (address, tenant, status...)"
                  className="pl-10 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <ToggleGroup 
                  type="single" 
                  value={statusFilter} 
                  onValueChange={handleStatusChange}
                  className="flex gap-2"
                >
                  <ToggleGroupItem 
                    value="All" 
                    className={`px-6 py-3 rounded-md ${statusFilter === "All" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                  >
                    All
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="Occupied" 
                    className={`px-6 py-3 rounded-md ${statusFilter === "Occupied" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                  >
                    Occupied
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="Vacant" 
                    className={`px-6 py-3 rounded-md ${statusFilter === "Vacant" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                  >
                    Vacant
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="Needs Repair" 
                    className={`px-6 py-3 rounded-md ${statusFilter === "Needs Repair" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                  >
                    Needs Repair
                  </ToggleGroupItem>
                </ToggleGroup>
                
                <Dialog open={isAddPropertyOpen} onOpenChange={setIsAddPropertyOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 h-12 px-6">
                      <Plus className="h-5 w-5" /> Add Property
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <AddPropertyForm onClose={() => setIsAddPropertyOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  Columns <ChevronDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <FileDown className="h-4 w-4" /> Export CSV
                </Button>
              </div>
            </div>

            <div className="mt-2">
              <span className="text-gray-700">Total {filteredProperties.length} properties</span>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium text-gray-600 uppercase text-xs tracking-wider">Name</TableHead>
                    <TableHead className="font-medium text-gray-600 uppercase text-xs tracking-wider">Address</TableHead>
                    <TableHead className="font-medium text-gray-600 uppercase text-xs tracking-wider">City</TableHead>
                    <TableHead className="font-medium text-gray-600 uppercase text-xs tracking-wider">State</TableHead>
                    <TableHead className="font-medium text-gray-600 uppercase text-xs tracking-wider">Zip</TableHead>
                    <TableHead className="font-medium text-gray-600 uppercase text-xs tracking-wider">Type</TableHead>
                    <TableHead className="font-medium text-gray-600 uppercase text-xs tracking-wider">Units</TableHead>
                    <TableHead className="font-medium text-gray-600 uppercase text-xs tracking-wider">Status</TableHead>
                    <TableHead className="font-medium text-gray-600 uppercase text-xs tracking-wider">Home Warranty</TableHead>
                    <TableHead className="font-medium text-gray-600 uppercase text-xs tracking-wider">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.map((property) => (
                    <TableRow 
                      key={property.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleRowClick(property.id)}
                    >
                      <TableCell>{property.name}</TableCell>
                      <TableCell className="text-blue-600">{property.address}</TableCell>
                      <TableCell>{property.city}</TableCell>
                      <TableCell>{property.state}</TableCell>
                      <TableCell>{property.zip}</TableCell>
                      <TableCell>{property.type}</TableCell>
                      <TableCell>{property.units}</TableCell>
                      <TableCell>
                        {property.status === "Occupied" && (
                          <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            Occupied
                          </span>
                        )}
                        {property.status === "Vacant" && (
                          <span className="inline-flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-medium">
                            <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                            Vacant
                          </span>
                        )}
                        {property.status === "Needs Repair" && (
                          <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs font-medium">
                            <span className="h-2 w-2 rounded-full bg-red-500"></span>
                            Needs Repair
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {property.warranty === "Yes" && (
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            <span>Yes</span>
                          </span>
                        )}
                        {property.warranty === "No" && (
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                            <span>No</span>
                          </span>
                        )}
                        {property.warranty === "Expired" && (
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-red-500"></span>
                            <span>Expired</span>
                          </span>
                        )}
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
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
