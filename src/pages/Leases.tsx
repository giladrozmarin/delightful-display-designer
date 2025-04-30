
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CalendarClock, FileText, Plus, Search, MoreVertical } from 'lucide-react';

// Mock data for leases
const leasesData = [
  {
    id: 1,
    propertyName: "1 South Miami Street",
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
    id: 2,
    propertyName: "573 Aspen Leaf Street",
    unitNumber: "102",
    tenant: "Jane Doe",
    startDate: "03/01/2023",
    endDate: "02/28/2024",
    term: "Fixed Term",
    status: "active",
    rent: 1250,
    deposit: 1250,
    balance: 0
  },
  {
    id: 3,
    propertyName: "1 South Miami Street",
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
    id: 4,
    propertyName: "573 Aspen Leaf Street",
    unitNumber: "101",
    tenant: "Michael Brown",
    startDate: "06/15/2023",
    endDate: null,
    term: "Month-to-Month",
    status: "active",
    rent: 1200,
    deposit: 1200,
    balance: 150
  },
  {
    id: 5,
    propertyName: "1 South Miami Street",
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
];

export default function Leases() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredLeases = leasesData.filter(lease => {
    if (activeTab === "active" && lease.status !== "active") return false;
    if (activeTab === "expired" && lease.status !== "expired") return false;
    if (activeTab === "draft" && lease.status !== "draft") return false;
    
    const query = searchQuery.toLowerCase();
    return (
      lease.propertyName.toLowerCase().includes(query) ||
      lease.unitNumber.toLowerCase().includes(query) ||
      (lease.tenant && lease.tenant.toLowerCase().includes(query))
    );
  });

  const handleNewLease = () => {
    navigate('/leases/new');
  };

  const handleViewLease = (leaseId: number) => {
    // Navigate to the lease details page
    navigate(`/leases/${leaseId}`);
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#f2f3f7]">
        <AppSidebar />
        <main className="flex-1 p-8 font-inter overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Leases</h1>
              <Button onClick={handleNewLease} className="bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
                <Plus className="h-4 w-4 mr-2" />
                New Lease
              </Button>
            </div>
            
            {/* Search and Tabs Section */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
              {/* Search */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search leases..."
                  className="pl-10 bg-gray-50 border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-gray-50 border shadow-sm w-full rounded-lg p-1">
                  <TabsTrigger value="active" className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <CalendarClock className="h-4 w-4 mr-2" />
                    Active Leases
                  </TabsTrigger>
                  <TabsTrigger value="expired" className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Expired Leases
                  </TabsTrigger>
                  <TabsTrigger value="draft" className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Draft Leases
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="active" className="mt-6">
                  <Card className="border-0 shadow-sm overflow-hidden rounded-xl">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader className="bg-gray-50">
                          <TableRow className="border-b border-gray-200">
                            <TableHead>Property / Unit</TableHead>
                            <TableHead>Tenant</TableHead>
                            <TableHead>Term</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Rent</TableHead>
                            <TableHead>Deposit</TableHead>
                            <TableHead>Balance</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredLeases.map((lease) => (
                            <TableRow 
                              key={lease.id}
                              className="cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() => handleViewLease(lease.id)}
                            >
                              <TableCell>
                                <div className="font-medium">{lease.propertyName}</div>
                                <div className="text-sm text-gray-500">Unit {lease.unitNumber}</div>
                              </TableCell>
                              <TableCell>{lease.tenant || "—"}</TableCell>
                              <TableCell>
                                {lease.term === "Fixed Term" ? (
                                  <div>
                                    <div className="font-medium">{lease.startDate} - {lease.endDate}</div>
                                    <div className="text-sm text-gray-500">Fixed Term</div>
                                  </div>
                                ) : (
                                  <div>
                                    <div className="font-medium">Started {lease.startDate}</div>
                                    <div className="text-sm text-gray-500">Month-to-Month</div>
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={
                                    lease.status === "active" ? "default" : 
                                    lease.status === "expired" ? "destructive" : 
                                    "secondary"
                                  }
                                  className="font-medium capitalize px-3 py-1"
                                >
                                  {lease.status === "active" ? "Active" : 
                                   lease.status === "expired" ? "Expired" : 
                                   "Draft"}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium">${lease.rent.toLocaleString()}</TableCell>
                              <TableCell className="font-medium">${lease.deposit.toLocaleString()}</TableCell>
                              <TableCell className={`font-medium ${lease.balance > 0 ? "text-red-600" : ""}`}>
                                ${lease.balance.toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-full"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Show options menu for the lease
                                  }}
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                          {filteredLeases.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                                <div className="flex flex-col items-center justify-center gap-2">
                                  <FileText className="h-10 w-10 text-gray-400" />
                                  <h3 className="text-lg font-medium text-gray-700">No leases found</h3>
                                  <p className="text-gray-500 max-w-md">
                                    Try adjusting your search criteria or create a new lease
                                  </p>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="expired" className="mt-6">
                  <Card className="border-0 shadow-sm overflow-hidden rounded-xl">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader className="bg-gray-50">
                          <TableRow className="border-b border-gray-200">
                            <TableHead>Property / Unit</TableHead>
                            <TableHead>Tenant</TableHead>
                            <TableHead>Term</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Rent</TableHead>
                            <TableHead>Deposit</TableHead>
                            <TableHead>Balance</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredLeases.map((lease) => (
                            <TableRow 
                              key={lease.id}
                              className="cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() => handleViewLease(lease.id)}
                            >
                              <TableCell>
                                <div className="font-medium">{lease.propertyName}</div>
                                <div className="text-sm text-gray-500">Unit {lease.unitNumber}</div>
                              </TableCell>
                              <TableCell>{lease.tenant || "—"}</TableCell>
                              <TableCell>
                                {lease.term === "Fixed Term" ? (
                                  <div>
                                    <div className="font-medium">{lease.startDate} - {lease.endDate}</div>
                                    <div className="text-sm text-gray-500">Fixed Term</div>
                                  </div>
                                ) : (
                                  <div>
                                    <div className="font-medium">Started {lease.startDate}</div>
                                    <div className="text-sm text-gray-500">Month-to-Month</div>
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={
                                    lease.status === "active" ? "default" : 
                                    lease.status === "expired" ? "destructive" : 
                                    "secondary"
                                  }
                                  className="font-medium capitalize px-3 py-1"
                                >
                                  {lease.status === "active" ? "Active" : 
                                   lease.status === "expired" ? "Expired" : 
                                   "Draft"}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium">${lease.rent.toLocaleString()}</TableCell>
                              <TableCell className="font-medium">${lease.deposit.toLocaleString()}</TableCell>
                              <TableCell className={`font-medium ${lease.balance > 0 ? "text-red-600" : ""}`}>
                                ${lease.balance.toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-full"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Show options menu for the lease
                                  }}
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                          {filteredLeases.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                                <div className="flex flex-col items-center justify-center gap-2">
                                  <FileText className="h-10 w-10 text-gray-400" />
                                  <h3 className="text-lg font-medium text-gray-700">No expired leases found</h3>
                                  <p className="text-gray-500 max-w-md">
                                    Expired leases will appear here
                                  </p>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="draft" className="mt-6">
                  <Card className="border-0 shadow-sm overflow-hidden rounded-xl">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader className="bg-gray-50">
                          <TableRow className="border-b border-gray-200">
                            <TableHead>Property / Unit</TableHead>
                            <TableHead>Tenant</TableHead>
                            <TableHead>Term</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Rent</TableHead>
                            <TableHead>Deposit</TableHead>
                            <TableHead>Balance</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredLeases.map((lease) => (
                            <TableRow 
                              key={lease.id}
                              className="cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() => handleViewLease(lease.id)}
                            >
                              <TableCell>
                                <div className="font-medium">{lease.propertyName}</div>
                                <div className="text-sm text-gray-500">Unit {lease.unitNumber}</div>
                              </TableCell>
                              <TableCell>{lease.tenant || "—"}</TableCell>
                              <TableCell>
                                {lease.term === "Fixed Term" ? (
                                  <div>
                                    <div className="font-medium">{lease.startDate} - {lease.endDate}</div>
                                    <div className="text-sm text-gray-500">Fixed Term</div>
                                  </div>
                                ) : (
                                  <div>
                                    <div className="font-medium">Started {lease.startDate}</div>
                                    <div className="text-sm text-gray-500">Month-to-Month</div>
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={
                                    lease.status === "active" ? "default" : 
                                    lease.status === "expired" ? "destructive" : 
                                    "secondary"
                                  }
                                  className="font-medium capitalize px-3 py-1"
                                >
                                  {lease.status === "active" ? "Active" : 
                                   lease.status === "expired" ? "Expired" : 
                                   "Draft"}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium">${lease.rent.toLocaleString()}</TableCell>
                              <TableCell className="font-medium">${lease.deposit.toLocaleString()}</TableCell>
                              <TableCell className={`font-medium ${lease.balance > 0 ? "text-red-600" : ""}`}>
                                ${lease.balance.toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-full"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Show options menu for the lease
                                  }}
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                          {filteredLeases.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                                <div className="flex flex-col items-center justify-center gap-2">
                                  <FileText className="h-10 w-10 text-gray-400" />
                                  <h3 className="text-lg font-medium text-gray-700">No draft leases found</h3>
                                  <p className="text-gray-500 max-w-md">
                                    Create a new lease to get started
                                  </p>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
