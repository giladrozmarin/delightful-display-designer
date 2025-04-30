import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Users, 
  Image as ImageIcon, 
  ArrowLeft, 
  Plus, 
  ChevronRight,
  DollarSign,
  Edit,
  CreditCard,
  Banknote,
  FileText
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PropertyHeader } from '@/components/property-manager/PropertyHeader';
import { PropertyBasicInfo } from '@/components/property-manager/PropertyBasicInfo';
import { OwnersList } from '@/components/property-manager/OwnersList';
import { PropertyPhotos } from '@/components/property-manager/PropertyPhotos';
import { UnitsList } from '@/components/property-manager/UnitsList';
import { PropertyLeases } from '@/components/property-manager/PropertyLeases';

// Mock data for property details
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
    units: [
      { id: 1, number: "A101", rooms: 3, size: "1200 sqft", bathrooms: 2, status: "Rented", available: false, address: "1 South Miami Street, Unit A101", rent: 1500 },
      { id: 2, number: "A102", rooms: 2, size: "950 sqft", bathrooms: 1, status: "Vacant", available: true, address: "1 South Miami Street, Unit A102", rent: 1300 },
      { id: 3, number: "B101", rooms: 4, size: "1500 sqft", bathrooms: 2, status: "Rented", available: false, address: "1 South Miami Street, Unit B101", rent: 1800 }
    ],
    owners: [
      { id: 1, name: "John Doe", percentage: 60, contact: "john.doe@example.com" },
      { id: 2, name: "Jane Smith", percentage: 40, contact: "jane.smith@example.com" }
    ],
    photos: [
      { id: 1, url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=500&auto=format&fit=crop", caption: "Front view" },
      { id: 2, url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=500&auto=format&fit=crop", caption: "Living room" },
      { id: 3, url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=500&auto=format&fit=crop", caption: "Kitchen" }
    ]
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
    units: [
      { id: 4, number: "101", rooms: 1, size: "800 sqft", bathrooms: 1, status: "Vacant", available: true, address: "573 Aspen Leaf Street, Unit 101", rent: 1200 },
      { id: 5, number: "102", rooms: 1, size: "850 sqft", bathrooms: 1, status: "Rented", available: false, address: "573 Aspen Leaf Street, Unit 102", rent: 1250 }
    ],
    owners: [
      { id: 3, name: "Robert Johnson", percentage: 100, contact: "robert.johnson@example.com" }
    ],
    photos: [
      { id: 4, url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=500&auto=format&fit=crop", caption: "Building exterior" },
      { id: 5, url: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=500&auto=format&fit=crop", caption: "Unit 101" }
    ]
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
    units: [
      { id: 6, number: "A1", rooms: 2, size: "1100 sqft", bathrooms: 1, status: "Rented", available: false, address: "573 Aspen Leaf Street, Unit A1", rent: 1400 }
    ],
    owners: [
      { id: 4, name: "Alice Brown", percentage: 50, contact: "alice.brown@example.com" },
      { id: 5, name: "David Williams", percentage: 50, contact: "david.williams@example.com" }
    ],
    photos: [
      { id: 6, url: "https://images.unsplash.com/photo-1624969862293-b749659611c4?q=80&w=500&auto=format&fit=crop", caption: "Exterior" }
    ]
  }
];

export default function PropertyManager() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  const property = propertiesData.find(p => p.id === Number(id));
  
  if (!property) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-[#f2f3f7]">
          <AppSidebar />
          <main className="flex-1 p-8 font-inter overflow-auto">
            <div className="max-w-7xl mx-auto">
              <Button 
                variant="outline" 
                className="mb-6" 
                onClick={() => navigate('/properties')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Properties
              </Button>
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Property Not Found</h1>
                <p className="text-gray-600">The property you're looking for doesn't exist or may have been removed.</p>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }
  
  const propertyLeases = [
    {
      id: 1,
      propertyId: 1,
      unitNumber: "A101",
      tenant: "John Smith",
      startDate: "01/15/2023",
      endDate: "01/15/2024",
      term: "Fixed Term",
      status: "active",
      rent: 1500,
      deposit: 1500,
      balance: 0
    },
    {
      id: 3,
      propertyId: 1,
      unitNumber: "B101",
      tenant: "Alex Johnson",
      startDate: "05/01/2023",
      endDate: "10/31/2023",
      term: "Fixed Term",
      status: "expired",
      rent: 1800,
      deposit: 1800,
      balance: 0
    },
    {
      id: 5,
      propertyId: 1,
      unitNumber: "A102",
      tenant: null,
      startDate: "10/15/2023",
      endDate: "10/14/2024",
      term: "Fixed Term",
      status: "draft",
      rent: 1300,
      deposit: 1300,
      balance: 0
    }
  ].filter(lease => lease.propertyId === Number(id));
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#f2f3f7]">
        <AppSidebar />
        <main className="flex-1 p-8 font-inter overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            <Button 
              variant="outline" 
              className="mb-4" 
              onClick={() => navigate('/properties')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Button>
            
            <PropertyHeader 
              name={property.name} 
              address={property.address} 
              type={property.type}
              unitCount={property.units.length}
            />
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full bg-white rounded-lg p-1 shadow-sm border">
                <TabsTrigger value="overview" className="flex-1">
                  <Building2 className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="units" className="flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  Units
                </TabsTrigger>
                <TabsTrigger value="leases" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Leases
                </TabsTrigger>
                <TabsTrigger value="owners" className="flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  Owners
                </TabsTrigger>
                <TabsTrigger value="photos" className="flex-1">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Photos
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium flex items-center text-blue-700">
                        <Users className="h-4 w-4 mr-2" />
                        Occupancy Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {Math.round((property.units.filter(u => u.status === "Rented").length / property.units.length) * 100)}%
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {property.units.filter(u => u.status === "Rented").length} of {property.units.length} units rented
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium flex items-center text-green-700">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Monthly Income
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ${property.units.filter(u => u.status === "Rented").reduce((sum, unit) => sum + unit.rent, 0)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        From {property.units.filter(u => u.status === "Rented").length} rented units
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium flex items-center text-purple-700">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Potential Income
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ${property.units.reduce((sum, unit) => sum + unit.rent, 0)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        If all units were rented
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <PropertyBasicInfo property={property} />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium text-blue-800 mb-2">Tenant Payments</h3>
                      <p className="text-sm text-blue-700 mb-4">Manage and track tenant payments</p>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Banknote className="h-4 w-4 mr-2" />
                        View Payments
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium text-green-800 mb-2">Deposit Management</h3>
                      <p className="text-sm text-green-700 mb-4">Manage tenant deposits and refunds</p>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Manage Deposits
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium text-purple-800 mb-2">Property Documents</h3>
                      <p className="text-sm text-purple-700 mb-4">Access and manage all property documents</p>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Edit className="h-4 w-4 mr-2" />
                        Manage Documents
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle>Units Overview</CardTitle>
                      <CardDescription>Quick summary of all units in this property</CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => setActiveTab("units")} className="flex items-center">
                      View All Units
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <UnitsList units={property.units} propertyId={property.id} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="units" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <div>
                      <CardTitle>Units Management</CardTitle>
                      <CardDescription>Manage all units in this property</CardDescription>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
                      <Plus className="h-4 w-4 mr-2" /> Add New Unit
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <UnitsList units={property.units} showActions={true} propertyId={property.id} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="leases" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <div>
                      <CardTitle>Property Leases</CardTitle>
                      <CardDescription>Manage all leases for this property</CardDescription>
                    </div>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 flex items-center" 
                      onClick={() => navigate('/leases/new')}
                    >
                      <Plus className="h-4 w-4 mr-2" /> New Lease
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <PropertyLeases leases={propertyLeases} propertyId={Number(id)} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="owners" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <div>
                      <CardTitle>Property Owners</CardTitle>
                      <CardDescription>Manage ownership details and percentages</CardDescription>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
                      <Plus className="h-4 w-4 mr-2" /> Add Owner
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <OwnersList owners={property.owners} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="photos" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <div>
                      <CardTitle>Property Photos</CardTitle>
                      <CardDescription>Manage and view property images</CardDescription>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
                      <Plus className="h-4 w-4 mr-2" /> Upload Photos
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <PropertyPhotos photos={property.photos} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
