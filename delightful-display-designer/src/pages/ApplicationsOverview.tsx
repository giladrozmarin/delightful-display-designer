
import React from 'react';
import { Link } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import {
  ApplicationConfigurationSection,
  HowItWorksSection,
  ApplicationLinksSection,
  LegalInformationSection
} from '@/components/applications';

export default function ApplicationsOverview() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#f2f3f7]">
        <AppSidebar />
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Rental Applications Overview</h1>
                <p className="text-gray-500 mt-2">
                  Configure, manage, and distribute rental applications for your properties
                </p>
              </div>
              <div className="flex gap-3">
                <Link to="/settings/applications">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Configure Application Settings
                  </Button>
                </Link>
              </div>
            </div>

            {/* How It Works Section */}
            <HowItWorksSection />

            {/* Application Configuration Card */}
            <ApplicationConfigurationSection />

            {/* Application Link Section */}
            <ApplicationLinksSection />

            {/* Legal Information */}
            <LegalInformationSection />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
