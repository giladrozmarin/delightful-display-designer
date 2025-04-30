
import React from 'react';
import { 
  Building2, 
  Home, 
  MessageSquare, 
  Users, 
  Briefcase, 
  Building, 
  Users2, 
  Settings,
  LogOut,
  Menu,
  FileText,
  LayoutGrid,
  CreditCard,
  Receipt
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter
} from "@/components/ui/sidebar";
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: LayoutGrid, label: 'Applications', path: '/applications' },
  { icon: Building2, label: 'Faults', path: '/faults' },
  { icon: FileText, label: 'Leases', path: '/leases' },
  { icon: Users, label: 'Tenants', path: '/tenants' },
  { icon: Briefcase, label: 'Contractors', path: '/contractors' },
  { icon: Building, label: 'Properties', path: '/properties' },
  { icon: CreditCard, label: 'Payments', path: '/payments' },
  { icon: Receipt, label: 'Invoices', path: '/invoices' },
  { icon: MessageSquare, label: 'SMS', path: '/sms' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: Users2, label: 'Organizations', path: '/organizations' },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarContent>
        <div className="px-5 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Home className="h-4 w-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
              Property Care
            </span>
          </h2>
          <SidebarTrigger className="lg:hidden">
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
        </div>
        
        <div className="mt-6 px-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-10 pl-9 pr-4 rounded-lg bg-gray-100 border-0 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      
        <SidebarGroup className="mt-6">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton 
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                        isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' 
                        : 'hover:bg-gray-100 text-gray-700'
                      }`}
                      onClick={() => navigate(item.path)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                      {isActive && item.label === 'Faults' && (
                        <span className="ml-auto bg-white bg-opacity-20 text-xs px-2 py-0.5 rounded-full">
                          5
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="mt-6 px-3">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
            <h3 className="font-medium text-blue-900 mb-2">Pro Tip</h3>
            <p className="text-sm text-blue-700">
              Quick access to recent faults by clicking on 'Faults' in the sidebar.
            </p>
            <button className="mt-3 text-xs font-medium px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-gray-200 mt-auto p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-700 font-medium">
              G
            </div>
            <div>
              <p className="font-medium text-gray-900">Gilad Lotan</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
