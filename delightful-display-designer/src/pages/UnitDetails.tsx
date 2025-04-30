import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Home, FileText, Users, File, Wrench, DollarSign, FilePlus, BookOpen, CheckCircle2, Clock, Wrench as WrenchIcon, Plus, X } from 'lucide-react';
import { UnitEditDialog } from '@/components/unit-manager/UnitEditDialog';
import { UnitOverview } from '@/components/unit-manager/UnitOverview';
import { TenantDetails } from '@/components/unit-manager/TenantDetails';
import { LeaseDetails } from '@/components/unit-manager/LeaseDetails';
import { PaymentManagement } from '@/components/unit-manager/PaymentManagement';
import { UnitLeases } from '@/components/unit-manager/UnitLeases';
import { UnitHeader } from '@/components/unit-manager/UnitHeader';
import { UnitStatCards } from '@/components/unit-manager/UnitStatCards';
import { toast } from "@/components/ui/use-toast";
import { ApplicationTemplateSelector } from '@/components/unit-manager/ApplicationTemplateSelector';
import { applicationTemplates } from '@/components/application-settings/types';

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
      { 
        id: 1, 
        number: "A101", 
        rooms: 3, 
        size: "1200 sqft", 
        bathrooms: 2, 
        status: "Rented", 
        available: false, 
        address: "1 South Miami Street, Unit A101", 
        rent: 1500, 
        description: "",
        tenant: {
          id: 1,
          name: "John Smith",
          email: "john.smith@example.com",
          phone: "555-123-4567",
          moveInDate: "01/15/2023",
          leaseExpirationDate: "01/15/2024",
          status: "active" as const
        },
        lease: {
          id: 1,
          startDate: "01/15/2023",
          endDate: "01/15/2024",
          moveInDate: "01/15/2023",
          rentalAmount: 1500,
          billingCode: "RES-A101",
          status: "active" as const,
          type: "Annual"
        },
        payments: [
          { 
            id: 1, 
            date: "05/01/2023", 
            amount: 1500, 
            type: "Rent", 
            status: "paid" as const, 
            description: "May 2023 Rent" 
          },
          { 
            id: 2, 
            date: "04/01/2023", 
            amount: 1500, 
            type: "Rent", 
            status: "paid" as const, 
            description: "April 2023 Rent" 
          },
          { 
            id: 3, 
            date: "03/01/2023", 
            amount: 1500, 
            type: "Rent", 
            status: "paid" as const, 
            description: "March 2023 Rent" 
          }
        ],
        securityDeposit: 1500
      },
      { id: 2, number: "A102", rooms: 2, size: "950 sqft", bathrooms: 1, status: "Vacant", available: true, address: "1 South Miami Street, Unit A102", rent: 1300, description: "" },
      { id: 3, number: "B101", rooms: 4, size: "1500 sqft", bathrooms: 2, status: "Rented", available: false, address: "1 South Miami Street, Unit B101", rent: 1800, description: "" }
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
      { id: 4, number: "101", rooms: 1, size: "800 sqft", bathrooms: 1, status: "Vacant", available: true, address: "573 Aspen Leaf Street, Unit 101", rent: 1200, description: "" },
      { id: 5, number: "102", rooms: 1, size: "850 sqft", bathrooms: 1, status: "Rented", available: false, address: "573 Aspen Leaf Street, Unit 102", rent: 1250, description: "" }
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
      { id: 6, number: "A1", rooms: 2, size: "1100 sqft", bathrooms: 1, status: "Rented", available: false, address: "573 Aspen Leaf Street, Unit A1", rent: 1400, description: "" }
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

export default function UnitDetails() {
  const { propertyId, unitId } = useParams<{ propertyId: string; unitId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  
  const property = propertiesData.find(p => p.id === Number(propertyId));
  const unit = property?.units.find(u => u.id === Number(unitId));
  
  if (!property || !unit) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-[#f2f3f7]">
          <AppSidebar />
          <main className="flex-1 p-8 font-inter overflow-auto">
            <div className="max-w-7xl mx-auto">
              <Button 
                variant="outline" 
                className="mb-6" 
                onClick={() => navigate(`/properties/${propertyId}`)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Property
              </Button>
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Unit Not Found</h1>
                <p className="text-gray-600">The unit you're looking for doesn't exist or may have been removed.</p>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  const unitLeases = [
    {
      id: 1,
      propertyId: 1,
      unitId: 1,
      unitNumber: "A101",
      tenant: "John Smith",
      startDate: "01/15/2023",
      endDate: "01/15/2024",
      term: "Fixed Term",
      status: "active",
      rent: 1500,
      deposit: 1500,
      balance: 0
    }
  ].filter(lease => lease.unitId === Number(unitId));

  const handleCreateTenant = () => {
    toast({
      title: "Not Implemented",
      description: "Tenant creation functionality is not yet implemented.",
    });
  };

  const handleEditTenant = () => {
    toast({
      title: "Not Implemented",
      description: "Tenant editing functionality is not yet implemented.",
    });
  };

  const handleScreenTenant = () => {
    toast({
      title: "Not Implemented",
      description: "Tenant screening functionality is not yet implemented.",
    });
  };

  const handleCreateLease = () => {
    toast({
      title: "Not Implemented",
      description: "Lease creation functionality is not yet implemented.",
    });
  };

  const handleEditLease = () => {
    toast({
      title: "Not Implemented",
      description: "Lease editing functionality is not yet implemented.",
    });
  };

  const handleViewLease = () => {
    toast({
      title: "Not Implemented",
      description: "Lease viewing functionality is not yet implemented.",
    });
  };

  const handleChargeRent = () => {
    toast({
      title: "Not Implemented",
      description: "Rent charging functionality is not yet implemented.",
    });
  };

  const handleRecordPayment = () => {
    toast({
      title: "Not Implemented",
      description: "Payment recording functionality is not yet implemented.",
    });
  };

  const handleManageDeposit = () => {
    toast({
      title: "Not Implemented",
      description: "Deposit management functionality is not yet implemented.",
    });
  };

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplateId(templateId);
    
    // Display success message
    toast({
      title: "Template Applied",
      description: "The application template has been successfully applied to this unit.",
    });
  };

  const selectedTemplate = selectedTemplateId 
    ? applicationTemplates.find(t => t.id === selectedTemplateId)
    : null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#f2f3f7]">
        <AppSidebar />
        <main className="flex-1 p-8 font-inter overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <Button 
              variant="outline" 
              className="mb-4" 
              onClick={() => navigate(`/properties/${propertyId}`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Property
            </Button>
            
            <div className="bg-white rounded-lg shadow p-6">
              <UnitHeader 
                address={property.address}
                unitNumber={unit.number}
                status={unit.status}
                available={unit.available}
                onEditUnit={() => setEditDialogOpen(true)}
                onNavigateToNewLease={() => navigate('/leases/new')}
                onNavigateToNewApplication={() => navigate('/newApplications')}
              />
            </div>
            
            <UnitStatCards 
              rooms={unit.rooms}
              bathrooms={unit.bathrooms}
              size={unit.size}
              rent={unit.rent}
              status={unit.status}
            />
            
            {unit.status === 'Rented' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TenantDetails 
                  tenant={unit.tenant || null} 
                  onCreateTenant={handleCreateTenant}
                  onEditTenant={handleEditTenant} 
                  onScreenTenant={handleScreenTenant}
                />
                
                <LeaseDetails 
                  lease={unit.lease || null}
                  onCreateLease={handleCreateLease}
                  onEditLease={handleEditLease}
                  onViewLease={handleViewLease}
                />
              </div>
            )}
            
            {selectedTemplate && (
              <Card className="mt-4 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => setSelectedTemplateId(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <CardHeader>
                  <CardTitle>Application Template</CardTitle>
                  <CardDescription>
                    {selectedTemplate.name}
                    <Button
                      variant="link"
                      className="ml-2 text-blue-600"
                      onClick={() => navigate('/newApplications')}
                    >
                      View Template
                    </Button>
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
            
            {!selectedTemplate && (
              <div className="mt-4">
                <ApplicationTemplateSelector onSelect={handleTemplateSelect} />
              </div>
            )}
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full bg-white rounded-lg p-1 shadow-sm border">
                <TabsTrigger value="overview" className="flex-1">
                  <Home className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="leases" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Leases
                </TabsTrigger>
                <TabsTrigger value="tenants" className="flex-1">
                  <Users className="h-4 w-4 mr-2" />
                  Tenants
                </TabsTrigger>
                <TabsTrigger value="payments" className="flex-1">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Payments
                </TabsTrigger>
                <TabsTrigger value="maintenance" className="flex-1">
                  <WrenchIcon className="h-4 w-4 mr-2" />
                  Maintenance
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex-1">
                  <File className="h-4 w-4 mr-2" />
                  Documents
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <UnitOverview unit={unit} property={property} />
              </TabsContent>
              
              <TabsContent value="leases" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <div>
                      <CardTitle>Unit Leases</CardTitle>
                      <CardDescription>All leases for Unit {unit.number}</CardDescription>
                    </div>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => navigate('/leases/new')}
                    >
                      <Plus className="h-4 w-4 mr-2" /> New Lease
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <UnitLeases leases={unitLeases} unitId={Number(unitId)} propertyId={Number(propertyId)} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tenants" className="mt-6">
                {unit.tenant ? (
                  <TenantDetails 
                    tenant={unit.tenant} 
                    onCreateTenant={handleCreateTenant}
                    onEditTenant={handleEditTenant}
                    onScreenTenant={handleScreenTenant}
                  />
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center py-12">
                      <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">No Tenants</h3>
                      <p className="text-gray-500 mb-4">This unit doesn't have any tenants assigned.</p>
                      <Button onClick={handleCreateTenant}>Add New Tenant</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="payments" className="mt-6">
                <PaymentManagement 
                  payments={unit.payments || []}
                  securityDeposit={unit.securityDeposit}
                  onChargeRent={handleChargeRent}
                  onRecordPayment={handleRecordPayment}
                  onManageDeposit={handleManageDeposit}
                />
              </TabsContent>
              
              <TabsContent value="maintenance" className="mt-6">
                <Card>
                  <CardContent className="p-6 text-center py-12">
                    <WrenchIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Maintenance History</h3>
                    <p className="text-gray-500 mb-4">No maintenance records found for this unit.</p>
                    <Button>Create Maintenance Request</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="documents" className="mt-6">
                <Card>
                  <CardContent className="p-6 text-center py-12">
                    <File className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Unit Documents</h3>
                    <p className="text-gray-500 mb-4">No documents found for this unit.</p>
                    <Button>Upload Documents</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      
      <UnitEditDialog 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen} 
        unit={unit}
        property={property}
      />
    </SidebarProvider>
  );
}
