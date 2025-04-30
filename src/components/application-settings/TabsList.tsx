
import React from 'react';
import { TabsList as ShadcnTabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Info,
  CreditCard,
  User,
  Home,
  Briefcase,
  FileText,
  MessageSquare,
  Upload,
  BookOpen,
  Bell,
  Link
} from 'lucide-react';

interface TabsListProps {
  activeTab: string;
  onChange: (value: string) => void;
}

export function TabsList({ activeTab, onChange }: TabsListProps) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <ShadcnTabsList className="bg-gray-50 border shadow-sm w-full rounded-lg p-1 mb-2 flex flex-nowrap min-w-max">
        <TabsTrigger 
          value="general" 
          onClick={() => onChange('general')}
          className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap"
        >
          <Info className="h-4 w-4 mr-2" />
          General
        </TabsTrigger>
        <TabsTrigger 
          value="payment" 
          onClick={() => onChange('payment')}
          className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap"
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Payment Options
        </TabsTrigger>
        <TabsTrigger 
          value="applicant" 
          onClick={() => onChange('applicant')}
          className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap"
        >
          <User className="h-4 w-4 mr-2" />
          Applicant Info
        </TabsTrigger>
        <TabsTrigger 
          value="residence" 
          onClick={() => onChange('residence')}
          className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap"
        >
          <Home className="h-4 w-4 mr-2" />
          Residential
        </TabsTrigger>
        <TabsTrigger 
          value="employment" 
          onClick={() => onChange('employment')}
          className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap"
        >
          <Briefcase className="h-4 w-4 mr-2" />
          Employment
        </TabsTrigger>
        <TabsTrigger 
          value="optional" 
          onClick={() => onChange('optional')}
          className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap"
        >
          <FileText className="h-4 w-4 mr-2" />
          Optional Sections
        </TabsTrigger>
        <TabsTrigger 
          value="custom" 
          onClick={() => onChange('custom')}
          className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Custom Questions
        </TabsTrigger>
        <TabsTrigger 
          value="documents" 
          onClick={() => onChange('documents')}
          className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap"
        >
          <Upload className="h-4 w-4 mr-2" />
          Documents
        </TabsTrigger>
        <TabsTrigger 
          value="terms" 
          onClick={() => onChange('terms')}
          className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Terms & Conditions
        </TabsTrigger>
        <TabsTrigger 
          value="notifications" 
          onClick={() => onChange('notifications')}
          className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap"
        >
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </TabsTrigger>
        <TabsTrigger 
          value="link" 
          onClick={() => onChange('link')}
          className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap"
        >
          <Link className="h-4 w-4 mr-2" />
          Application Link
        </TabsTrigger>
      </ShadcnTabsList>
    </div>
  );
}
