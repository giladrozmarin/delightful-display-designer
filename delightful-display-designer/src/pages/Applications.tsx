import React, { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ApplicationsHeader } from '@/components/applications/ApplicationsHeader';
import { ApplicationsSearch } from '@/components/applications/ApplicationsSearch';
import { ApplicationsTable } from '@/components/applications/ApplicationsTable';

// Mock data for applications
const applicationsData = [
  {
    id: 1,
    propertyName: "1 South Miami Street",
    unitNumber: "A101",
    applicantName: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    status: "pending",
    submittedDate: "2024-03-15",
    lastUpdated: "2024-03-15"
  },
  {
    id: 2,
    propertyName: "573 Aspen Leaf Street",
    unitNumber: "102",
    applicantName: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "(555) 987-6543",
    status: "approved",
    submittedDate: "2024-03-14",
    lastUpdated: "2024-03-16"
  },
  {
    id: 3,
    propertyName: "1 South Miami Street",
    unitNumber: "B101",
    applicantName: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "(555) 456-7890",
    status: "rejected",
    submittedDate: "2024-03-13",
    lastUpdated: "2024-03-15"
  }
];

export default function Applications() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApplications = applicationsData.filter(app => 
    app.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.unitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.applicantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#f2f3f7]">
        <AppSidebar />
        <main className="flex-1 p-8 font-inter overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <ApplicationsHeader />
            <ApplicationsSearch 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <ApplicationsTable applications={filteredApplications} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
