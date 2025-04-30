
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter,
  CardDescription
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  User, 
  Calendar, 
  Home, 
  Phone, 
  Mail, 
  FileText, 
  DollarSign, 
  ShieldCheck, 
  AlertCircle, 
  Edit2, 
  Clock,
  MessageSquare,
  Paperclip,
  ArrowLeft
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Sample tenant data - in a real app, you would fetch this from an API
const TENANT_STATUS_MAP = {
  'current': { label: 'Current', color: 'bg-green-100 text-green-800 border-green-200' },
  'future': { label: 'Future', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  'notice': { label: 'Notice Given', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  'past': { label: 'Past', color: 'bg-gray-100 text-gray-800 border-gray-200' },
  'evicted': { label: 'Evicted', color: 'bg-red-100 text-red-800 border-red-200' },
};

const sampleTenants = {
  '1': {
    id: 1,
    name: "Gilad Rozmarin",
    phone: "(804) 413-6719",
    email: "19gilad@gmail.com",
    address: "573 Aspen Leaf Street, Las Vegas",
    status: "current",
    moveInDate: "2023-05-01",
    leaseEndDate: "2024-04-30",
    unit: "Unit 203, The Palms",
    unitId: "203-palms",
    rentAmount: 1450,
    depositAmount: 1450,
    creditBalance: 0,
    balance: 0,
    lateFeeSchedule: "10% after 5th of month",
    leaseDocuments: [
      { name: "Lease Agreement", date: "2023-04-15", url: "#" },
      { name: "Move-in Checklist", date: "2023-05-01", url: "#" }
    ],
    occupants: [
      { name: "Gilad Rozmarin", isPrimary: true },
      { name: "Sarah Rozmarin", isPrimary: false }
    ],
    transactions: [
      { id: "t001", date: "2023-05-01", type: "charge", amount: 1450, description: "May 2023 Rent" },
      { id: "t002", date: "2023-05-01", type: "payment", amount: -1450, description: "Payment - Check #1234" }
    ],
    notes: [
      { id: "n001", date: "2023-05-01", note: "Completed move-in inspection. All items in good condition.", author: "Admin" },
      { id: "n002", date: "2023-06-15", note: "Called about AC issue. Scheduled maintenance visit for 6/16.", author: "Admin" }
    ]
  },
  '2': {
    id: 2,
    name: "Arik Bidas",
    phone: "(702) 541-1751",
    email: "arik@example.com",
    address: "573 Aspen Leaf Street, Las Vegas",
    status: "current",
    moveInDate: "2022-07-01",
    leaseEndDate: "2023-06-30",
    unit: "Unit 301, Sunset Apartments",
    unitId: "301-sunset",
    rentAmount: 1250,
    depositAmount: 1250,
    creditBalance: 0,
    balance: 0,
    lateFeeSchedule: "$50 after 3rd of month",
    leaseDocuments: [
      { name: "Lease Agreement", date: "2022-06-15", url: "#" }
    ],
    occupants: [
      { name: "Arik Bidas", isPrimary: true }
    ],
    transactions: [
      { id: "t101", date: "2023-04-01", type: "charge", amount: 1250, description: "April 2023 Rent" },
      { id: "t102", date: "2023-04-02", type: "payment", amount: -1250, description: "Payment - Bank Transfer" }
    ],
    notes: [
      { id: "n101", date: "2022-07-01", note: "Move-in complete. Provided 2 sets of keys.", author: "Admin" }
    ]
  }
};

export default function TenantDetails() {
  const { id } = useParams<{id: string}>();
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  
  // Find the tenant by ID, or return null if not found
  const tenant = id && sampleTenants[id] ? sampleTenants[id] : null;

  // Handler for back button
  const handleBack = () => {
    navigate('/tenants');
  };

  if (!tenant) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-[#f2f3f7]">
          <AppSidebar />
          <main className="flex-1 p-6 md:p-8 overflow-auto">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center mb-6">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mr-2" 
                  onClick={handleBack}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Tenants
                </Button>
                <h1 className="text-2xl font-bold">Tenant Details</h1>
              </div>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Tenant not found. <Link to="/tenants" className="underline">Return to tenants list</Link>
                </AlertDescription>
              </Alert>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  const statusConfig = TENANT_STATUS_MAP[tenant.status as keyof typeof TENANT_STATUS_MAP] || TENANT_STATUS_MAP.past;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#f2f3f7]">
        <AppSidebar />
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header with actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBack}
                    className="mr-1"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                  <h1 className="text-2xl font-bold">{tenant.name}</h1>
                  <Badge 
                    variant="outline" 
                    className={`px-2 py-0.5 rounded-full ${statusConfig.color}`}
                  >
                    {statusConfig.label}
                  </Badge>
                </div>
                <p className="text-gray-500 ml-11">{tenant.unit}</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button size="sm" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Print Statement
                </Button>
                <Button size="sm" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Change Status
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Change Tenant Status</AlertDialogTitle>
                      <AlertDialogDescription>
                        Changing the tenant status may affect billing, reports, and access. Are you sure you want to proceed?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button size="sm">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Tenant
                </Button>
              </div>
            </div>
            
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="lease">Lease</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Personal Information */}
                  <Card className="md:col-span-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <User className="mr-2 h-5 w-5" /> Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{tenant.name}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium flex items-center">
                            <Phone className="h-4 w-4 mr-1 text-gray-500" />
                            {tenant.phone}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium flex items-center">
                            <Mail className="h-4 w-4 mr-1 text-gray-500" />
                            {tenant.email}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Unit</p>
                          <p className="font-medium flex items-center">
                            <Home className="h-4 w-4 mr-1 text-gray-500" />
                            {tenant.unit}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Additional Occupants</h4>
                        {tenant.occupants.length > 1 ? (
                          <ul className="list-disc list-inside">
                            {tenant.occupants.filter(o => !o.isPrimary).map((occupant, idx) => (
                              <li key={idx} className="text-gray-700">{occupant.name}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500">No additional occupants</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Financial Summary */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <DollarSign className="mr-2 h-5 w-5" /> Financial Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-gray-500">Monthly Rent:</span>
                        <span className="font-medium">${tenant.rentAmount}</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-gray-500">Security Deposit:</span>
                        <span className="font-medium">${tenant.depositAmount}</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-gray-500">Credit Balance:</span>
                        <span className="font-medium">${tenant.creditBalance}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 font-bold">
                        <span>Current Balance:</span>
                        <span className={tenant.balance > 0 ? "text-red-600" : "text-green-600"}>
                          ${Math.abs(tenant.balance)}
                          {tenant.balance > 0 ? " Due" : tenant.balance < 0 ? " Credit" : ""}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Key Dates */}
                  <Card className="md:col-span-3">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Calendar className="mr-2 h-5 w-5" /> Key Dates
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-blue-700 mb-1">Move-in Date</p>
                          <p className="text-lg font-bold">{tenant.moveInDate}</p>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-lg">
                          <p className="text-sm text-amber-700 mb-1">Lease End Date</p>
                          <p className="text-lg font-bold">{tenant.leaseEndDate}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="text-sm text-purple-700 mb-1">Next Rent Due</p>
                          <p className="text-lg font-bold">
                            {new Date().getDate() > 1 
                              ? `${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString().split('T')[0]}`
                              : `${new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]}`
                            }
                          </p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm text-green-700 mb-1">Lease Term</p>
                          <p className="text-lg font-bold">12 months</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Lease Tab */}
              <TabsContent value="lease">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5" /> Lease Details
                    </CardTitle>
                    <CardDescription>
                      Current lease information and terms
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Basic Information</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm text-gray-500">Unit</p>
                              <p className="font-medium">{tenant.unit}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-gray-500">Monthly Rent</p>
                              <p className="font-medium">${tenant.rentAmount}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-gray-500">Start Date</p>
                              <p className="font-medium">{tenant.moveInDate}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-gray-500">End Date</p>
                              <p className="font-medium">{tenant.leaseEndDate}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-2">Deposits</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Security Deposit</span>
                              <span className="font-medium">${tenant.depositAmount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Pet Deposit</span>
                              <span className="font-medium">$0</span>
                            </div>
                            <div className="flex justify-between border-t pt-1">
                              <span className="font-medium">Total Deposits</span>
                              <span className="font-medium">${tenant.depositAmount}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Payment Terms</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Due Date</span>
                              <span className="font-medium">1st of month</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Late Fee Schedule</span>
                              <span className="font-medium">{tenant.lateFeeSchedule}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-2">Lease Documents</h3>
                          <div className="space-y-3">
                            {tenant.leaseDocuments.map((doc, idx) => (
                              <div key={idx} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-blue-600" />
                                  <div>
                                    <p className="font-medium">{doc.name}</p>
                                    <p className="text-xs text-gray-500">Added: {doc.date}</p>
                                  </div>
                                </div>
                                <a 
                                  href={doc.url} 
                                  className="text-sm text-blue-600 hover:underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Download
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-medium mb-3">Special Provisions</h3>
                      <p className="text-gray-700">No special provisions for this lease.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Transactions Tab */}
              <TabsContent value="transactions">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <DollarSign className="mr-2 h-5 w-5" /> Transaction History
                      </CardTitle>
                      <CardDescription>
                        Record of charges and payments
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      Export CSV
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-slate-50">
                            <th className="px-4 py-3 text-left font-medium">Date</th>
                            <th className="px-4 py-3 text-left font-medium">Description</th>
                            <th className="px-4 py-3 text-right font-medium">Charge</th>
                            <th className="px-4 py-3 text-right font-medium">Payment</th>
                            <th className="px-4 py-3 text-right font-medium">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tenant.transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((transaction, idx) => {
                            const amount = transaction.amount;
                            // Calculate running balance (simplified for demo)
                            const runningBalance = tenant.transactions
                              .slice(0, tenant.transactions.length - idx)
                              .reduce((sum, t) => sum + t.amount, 0);
                              
                            return (
                              <tr key={transaction.id} className="border-b hover:bg-slate-50">
                                <td className="px-4 py-3">{transaction.date}</td>
                                <td className="px-4 py-3">{transaction.description}</td>
                                <td className="px-4 py-3 text-right">
                                  {amount > 0 ? `$${amount.toFixed(2)}` : '-'}
                                </td>
                                <td className="px-4 py-3 text-right">
                                  {amount < 0 ? `$${Math.abs(amount).toFixed(2)}` : '-'}
                                </td>
                                <td className="px-4 py-3 text-right font-medium">
                                  ${runningBalance.toFixed(2)}
                                </td>
                              </tr>
                            );
                          })}
                          {tenant.transactions.length === 0 && (
                            <tr>
                              <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                                No transactions found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Documents Tab */}
              <TabsContent value="documents">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Paperclip className="mr-2 h-5 w-5" /> Documents
                      </CardTitle>
                      <CardDescription>
                        Lease and other tenant-related documents
                      </CardDescription>
                    </div>
                    <Button size="sm">
                      Upload Document
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="lease-documents">
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-5 w-5 text-blue-600" />
                              <span>Lease Documents</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3 pl-7">
                              {tenant.leaseDocuments.map((doc, idx) => (
                                <div key={idx} className="flex items-center justify-between py-1">
                                  <div>
                                    <p className="font-medium">{doc.name}</p>
                                    <p className="text-xs text-gray-500">Added: {doc.date}</p>
                                  </div>
                                  <a 
                                    href={doc.url} 
                                    className="text-sm text-blue-600 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Download
                                  </a>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="statements">
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-5 w-5 text-green-600" />
                              <span>Statements</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="text-gray-500 pl-7">
                              No statements available.
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="notices">
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-5 w-5 text-red-600" />
                              <span>Notices</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="text-gray-500 pl-7">
                              No notices available.
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Notes Tab */}
              <TabsContent value="notes">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <MessageSquare className="mr-2 h-5 w-5" /> Notes & Activity
                      </CardTitle>
                      <CardDescription>
                        Communication history and tenant notes
                      </CardDescription>
                    </div>
                    <Button size="sm">
                      Add Note
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {tenant.notes.map((note) => (
                        <div key={note.id} className="border-b pb-4 last:border-0">
                          <div className="flex justify-between mb-2">
                            <p className="font-medium">{note.author}</p>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Clock className="h-3 w-3 mr-1" />
                              {note.date}
                            </div>
                          </div>
                          <p className="text-gray-700">{note.note}</p>
                        </div>
                      ))}
                      {tenant.notes.length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                          <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-20" />
                          <p>No notes available</p>
                        </div>
                      )}
                    </div>
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
