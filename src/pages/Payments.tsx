
import React, { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Plus, Filter, ArrowRight, Banknote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BankAccountSetupDialog } from '@/components/payment/BankAccountSetupDialog';

export default function Payments() {
  const navigate = useNavigate();
  const [bankSetupOpen, setBankSetupOpen] = useState(false);
  
  const handleSetupPayments = () => {
    navigate('/payment-setup');
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#f2f3f7]">
        <AppSidebar />
        <main className="flex-1 p-8 font-inter overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
                <p className="text-gray-500">Manage tenant payments and transactions</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="gap-2" onClick={() => setBankSetupOpen(true)}>
                  <Banknote className="h-4 w-4" />
                  Setup Bank Account
                </Button>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  Record Payment
                </Button>
              </div>
            </div>
            
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-center md:text-left">
                    <h2 className="text-xl font-semibold text-blue-800 mb-2">Set Up Payment Processing</h2>
                    <p className="text-blue-700 max-w-md">
                      Connect your bank account to start accepting online payments from tenants
                    </p>
                  </div>
                  <Button 
                    className="bg-blue-800 hover:bg-blue-900 gap-2 whitespace-nowrap"
                    onClick={handleSetupPayments}
                  >
                    Setup Payments <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Recent Payments</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="bg-blue-50 p-4 rounded-full mb-4">
                    <CreditCard className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Payments Yet</h3>
                  <p className="text-gray-500 text-center max-w-sm mb-6">
                    Start recording payments from tenants by clicking the "Record Payment" button.
                  </p>
                  <Button>Record First Payment</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      
      <BankAccountSetupDialog 
        open={bankSetupOpen}
        onOpenChange={setBankSetupOpen}
      />
    </SidebarProvider>
  );
}
