
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, FileText, MessageCircle, CreditCard, History, Edit, Printer, Download, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Mock data for the lease details
const getLeaseMockData = (id: string) => {
  const leases = [
    {
      id: 1,
      propertyName: "1 South Miami Street",
      unitNumber: "A101",
      tenant: "John Smith",
      email: "john.smith@example.com",
      phone: "(305) 555-1234",
      startDate: "01/15/2023",
      endDate: "01/15/2024",
      term: "Fixed Term",
      status: "active",
      rent: 1500,
      deposit: 1500,
      balance: 0,
      lateFeePolicy: "5% of rent after 5 days",
      documents: [
        { id: 1, name: "Lease Agreement.pdf", date: "01/10/2023" },
        { id: 2, name: "Move-in Inspection.pdf", date: "01/15/2023" }
      ],
      payments: [
        { id: 1, date: "01/15/2023", amount: 3000, type: "Initial Payment (Rent + Deposit)" },
        { id: 2, date: "02/15/2023", amount: 1500, type: "Monthly Rent" },
        { id: 3, date: "03/15/2023", amount: 1500, type: "Monthly Rent" }
      ]
    },
    {
      id: 2,
      propertyName: "573 Aspen Leaf Street",
      unitNumber: "102",
      tenant: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "(305) 555-5678",
      startDate: "03/01/2023",
      endDate: "02/28/2024",
      term: "Fixed Term",
      status: "active",
      rent: 1250,
      deposit: 1250,
      balance: 0,
      lateFeePolicy: "10% of rent after 3 days",
      documents: [
        { id: 1, name: "Lease Agreement.pdf", date: "02/25/2023" },
        { id: 2, name: "Move-in Inspection.pdf", date: "03/01/2023" }
      ],
      payments: [
        { id: 1, date: "02/28/2023", amount: 2500, type: "Initial Payment (Rent + Deposit)" },
        { id: 2, date: "04/01/2023", amount: 1250, type: "Monthly Rent" }
      ]
    },
    {
      id: 3,
      propertyName: "1 South Miami Street",
      unitNumber: "B101",
      tenant: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "(305) 555-9012",
      startDate: "05/01/2023",
      endDate: "10/31/2023",
      term: "Fixed Term",
      status: "expired",
      rent: 1800,
      deposit: 1800,
      balance: 0,
      lateFeePolicy: "7% of rent after 5 days",
      documents: [
        { id: 1, name: "Lease Agreement.pdf", date: "04/25/2023" },
        { id: 2, name: "Move-in Inspection.pdf", date: "05/01/2023" },
        { id: 3, name: "Move-out Inspection.pdf", date: "10/31/2023" }
      ],
      payments: [
        { id: 1, date: "04/30/2023", amount: 3600, type: "Initial Payment (Rent + Deposit)" },
        { id: 2, date: "06/01/2023", amount: 1800, type: "Monthly Rent" },
        { id: 3, date: "11/05/2023", amount: 1800, type: "Deposit Refund" }
      ]
    },
    {
      id: 4,
      propertyName: "573 Aspen Leaf Street",
      unitNumber: "101",
      tenant: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "(305) 555-3456",
      startDate: "06/15/2023",
      endDate: null,
      term: "Month-to-Month",
      status: "active",
      rent: 1200,
      deposit: 1200,
      balance: 150,
      lateFeePolicy: "10% of rent after 3 days",
      documents: [
        { id: 1, name: "Lease Agreement.pdf", date: "06/10/2023" },
        { id: 2, name: "Move-in Inspection.pdf", date: "06/15/2023" }
      ],
      payments: [
        { id: 1, date: "06/14/2023", amount: 2400, type: "Initial Payment (Rent + Deposit)" },
        { id: 2, date: "07/15/2023", amount: 1200, type: "Monthly Rent" },
        { id: 3, date: "08/15/2023", amount: 1200, type: "Monthly Rent" },
        { id: 4, date: "09/18/2023", amount: 1050, type: "Monthly Rent (Partial)" }
      ]
    },
    {
      id: 5,
      propertyName: "1 South Miami Street",
      unitNumber: "A102",
      tenant: null,
      email: null,
      phone: null,
      startDate: "10/15/2023",
      endDate: "10/14/2024",
      term: "Fixed Term",
      status: "draft",
      rent: 1300,
      deposit: 1300,
      balance: 0,
      lateFeePolicy: "5% of rent after 5 days",
      documents: [
        { id: 1, name: "Draft Lease Agreement.pdf", date: "10/05/2023" }
      ],
      payments: []
    }
  ];
  
  return leases.find(lease => lease.id === parseInt(id)) || null;
};

export default function LeaseDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  
  const lease = getLeaseMockData(id || "");
  
  if (!lease) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-[#f2f3f7]">
          <AppSidebar />
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <Button variant="ghost" onClick={() => navigate('/leases')} className="mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Leases
              </Button>
              <Card>
                <CardContent className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Lease not found</h2>
                    <p className="text-gray-500">The lease you're looking for doesn't exist or has been removed.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#f2f3f7]">
        <AppSidebar />
        <main className="flex-1 p-8 font-inter overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Back button and header */}
            <div className="flex flex-col space-y-4">
              <Button variant="ghost" onClick={() => navigate('/leases')} className="self-start">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Leases
              </Button>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{lease.propertyName}</h1>
                  <p className="text-gray-500">Unit {lease.unitNumber} • Lease #{lease.id}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Printer className="h-4 w-4" />
                    Print
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <Edit className="h-4 w-4" />
                    Edit Lease
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
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
                
                <Badge variant="outline" className="font-medium px-3 py-1">
                  {lease.term}
                </Badge>
                
                {lease.balance > 0 && (
                  <Badge variant="destructive" className="font-medium px-3 py-1">
                    Balance Due: ${lease.balance}
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Main content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column - Lease Info */}
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Lease Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Property</h3>
                        <p className="mt-1">{lease.propertyName}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Unit</h3>
                        <p className="mt-1">{lease.unitNumber}</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
                        <p className="mt-1">{lease.startDate}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">End Date</h3>
                        <p className="mt-1">{lease.endDate || "No End Date (Month-to-Month)"}</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Monthly Rent</h3>
                        <p className="mt-1 font-medium">${lease.rent.toLocaleString()}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Security Deposit</h3>
                        <p className="mt-1 font-medium">${lease.deposit.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Late Fee Policy</h3>
                      <p className="mt-1">{lease.lateFeePolicy}</p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Tabs section */}
                <Card>
                  <CardContent className="p-0">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="w-full justify-start rounded-none border-b px-6 pt-4">
                        <TabsTrigger value="details" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                          <FileText className="h-4 w-4 mr-2" />
                          Details
                        </TabsTrigger>
                        <TabsTrigger value="payments" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Payments
                        </TabsTrigger>
                        <TabsTrigger value="documents" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                          <FileText className="h-4 w-4 mr-2" />
                          Documents
                        </TabsTrigger>
                        <TabsTrigger value="history" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                          <History className="h-4 w-4 mr-2" />
                          History
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="details" className="p-6">
                        <div className="space-y-4">
                          <h2 className="text-lg font-medium">Lease Details</h2>
                          <p className="text-gray-600">
                            This is a {lease.term} lease for {lease.propertyName}, Unit {lease.unitNumber}.
                            {lease.term === "Fixed Term" 
                              ? ` The lease runs from ${lease.startDate} to ${lease.endDate}.` 
                              : ` The lease started on ${lease.startDate} and continues on a month-to-month basis.`
                            }
                          </p>
                          <p className="text-gray-600">
                            The monthly rent is ${lease.rent.toLocaleString()} with a security deposit of ${lease.deposit.toLocaleString()}.
                            Late fees are applied as {lease.lateFeePolicy}.
                          </p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="payments" className="p-6">
                        <div className="space-y-4">
                          <h2 className="text-lg font-medium">Payment History</h2>
                          {lease.payments.length > 0 ? (
                            <div className="space-y-3">
                              {lease.payments.map(payment => (
                                <div key={payment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                  <div>
                                    <p className="font-medium">{payment.type}</p>
                                    <p className="text-sm text-gray-500">{payment.date}</p>
                                  </div>
                                  <div className="font-medium">${payment.amount.toLocaleString()}</div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500">No payment history available.</p>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="documents" className="p-6">
                        <div className="space-y-4">
                          <h2 className="text-lg font-medium">Lease Documents</h2>
                          {lease.documents.length > 0 ? (
                            <div className="space-y-3">
                              {lease.documents.map(doc => (
                                <div key={doc.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center">
                                    <FileText className="h-5 w-5 text-blue-600 mr-3" />
                                    <div>
                                      <p className="font-medium">{doc.name}</p>
                                      <p className="text-sm text-gray-500">Uploaded on {doc.date}</p>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="sm">Download</Button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500">No documents available.</p>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="history" className="p-6">
                        <div className="space-y-4">
                          <h2 className="text-lg font-medium">Lease History</h2>
                          <div className="space-y-3">
                            <div className="flex gap-3 items-start">
                              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <FileText className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">Lease created</p>
                                <p className="text-sm text-gray-500">Created on {lease.documents[0]?.date || lease.startDate}</p>
                              </div>
                            </div>
                            
                            {lease.status === "active" && (
                              <div className="flex gap-3 items-start">
                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                  <FileText className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                  <p className="font-medium">Lease activated</p>
                                  <p className="text-sm text-gray-500">Activated on {lease.startDate}</p>
                                </div>
                              </div>
                            )}
                            
                            {lease.status === "expired" && (
                              <div className="flex gap-3 items-start">
                                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                  <FileText className="h-4 w-4 text-red-600" />
                                </div>
                                <div>
                                  <p className="font-medium">Lease expired</p>
                                  <p className="text-sm text-gray-500">Expired on {lease.endDate}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right column - Tenant Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Tenant Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {lease.tenant ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                              {lease.tenant.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{lease.tenant}</p>
                            <p className="text-sm text-gray-500">Primary Tenant</p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                          <div className="mt-2 space-y-2">
                            <p className="text-sm">
                              <span className="text-gray-500">Email:</span> {lease.email}
                            </p>
                            <p className="text-sm">
                              <span className="text-gray-500">Phone:</span> {lease.phone}
                            </p>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <Button variant="outline" className="w-full">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message Tenant
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-gray-500">No tenant assigned</p>
                        <Button variant="outline" className="mt-4">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Tenant
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Balance Summary */}
                {lease.status === "active" && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Balance Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Current Rent</span>
                          <span className="font-medium">${lease.rent.toLocaleString()}</span>
                        </div>
                        {lease.balance > 0 && (
                          <div className="flex justify-between text-red-600">
                            <span>Outstanding Balance</span>
                            <span className="font-medium">${lease.balance.toLocaleString()}</span>
                          </div>
                        )}
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>Total Due</span>
                          <span>${(lease.rent + lease.balance).toLocaleString()}</span>
                        </div>
                        
                        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                          Record Payment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
