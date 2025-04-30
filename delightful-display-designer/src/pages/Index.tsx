
import React from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { StatsCard } from '@/components/StatsCard';
import { FaultsChart } from '@/components/FaultsChart';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { AlertCircle, Bell, Calendar, CheckCircle, Clock, Plus, Send } from 'lucide-react';

export default function Index() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#f2f3f7]">
        <AppSidebar />
        <main className="flex-1 p-8 font-inter overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#7367f0] rounded-full shadow-lg flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">G</span>
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold text-gray-900">Welcome Back, Gilad!</h2>
                  <p className="text-gray-500">Here's what's happening today</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex">
                  <Button variant="outline" className="rounded-full h-10 px-4 border-gray-200 text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-700">
                    <Calendar className="mr-2 h-4 w-4" />
                    Today: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </Button>
                  <Button className="ml-3 rounded-full h-10 px-4 bg-[#7367f0] hover:bg-[#6355e0]">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New
                  </Button>
                </div>
                <div className="relative">
                  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <Bell className="h-5 w-5 text-gray-600" />
                  </button>
                  <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 border-2 border-white"></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex items-center gap-2 animate-float shadow-sm">
                <span className="w-2 h-2 bg-[#1c67ff] rounded-full pulse-blue" />
                <span className="text-[#1c67ff] font-medium">3 New Faults</span>
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-lg px-4 py-3 flex items-center gap-2 animate-float shadow-sm">
                <span className="w-2 h-2 bg-[#e9b431] rounded-full pulse-orange" />
                <span className="text-[#e9b431] font-medium">4 Tenants Awaiting Response</span>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-800">Property Dashboard</h1>

              {/* Stats Grid - Modified to have 2 columns with second column being 2×2 */}
              <div className="grid grid-cols-2 gap-6">
                {/* First column - Open Faults */}
                <div>
                  <StatsCard 
                    title="Open Faults" 
                    value={5} 
                    icon={Clock}
                    linkText="View All Faults"
                    variant="primary"
                  />
                </div>
                
                {/* Second column - 2×2 grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <StatsCard 
                      title="New Faults" 
                      value={3} 
                      icon={AlertCircle}
                      variant="info"
                    />
                  </div>
                  <div>
                    <StatsCard 
                      title="Resolved Faults" 
                      value={0} 
                      icon={CheckCircle}
                      variant="success"
                    />
                  </div>
                  <div>
                    <StatsCard 
                      title="Pending" 
                      value={0} 
                      icon={AlertCircle}
                      variant="danger"
                    />
                  </div>
                  <div>
                    <StatsCard 
                      title="Sent To Contractor" 
                      value={1} 
                      icon={Send}
                      variant="warning"
                    />
                  </div>
                </div>
              </div>

              {/* Chart */}
              <FaultsChart />
              
              {/* Recent Activity Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                
                <div className="space-y-4">
                  {/* Activity items */}
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900">New Fault Reported</h4>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                      </div>
                      <p className="text-gray-600">Leaking faucet in bathroom at 123 Main St, Apt 4B</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Send className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900">Fault Assigned to Contractor</h4>
                        <span className="text-sm text-gray-500">Yesterday</span>
                      </div>
                      <p className="text-gray-600">Broken window repair assigned to GlassFix Ltd.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Bell className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900">Tenant Message Received</h4>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-gray-600">John Smith asked about the status of his maintenance request.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
