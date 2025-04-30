
import React, { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PaymentSetupWizard } from '@/components/payment-setup/PaymentSetupWizard';

export default function PaymentSetup() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#f2f3f7]">
        <AppSidebar />
        <main className="flex-1 p-6 lg:p-8 font-inter overflow-auto">
          <div className="max-w-4xl mx-auto">
            <PaymentSetupWizard />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
