
import React from 'react';
import { TabsList as ShadcnTabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabsListProps {
  activeTab: string;
  onChange: (value: string) => void;
}

export function TabsList({ activeTab, onChange }: TabsListProps) {
  return (
    <div className="w-full mb-6">
      <ShadcnTabsList className="w-full overflow-x-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
        <TabsTrigger 
          value="general"
          className={activeTab === "general" ? "data-[state=active]:bg-primary" : ""}
          onClick={() => onChange("general")}
        >
          General
        </TabsTrigger>
        <TabsTrigger 
          value="payment"
          className={activeTab === "payment" ? "data-[state=active]:bg-primary" : ""}
          onClick={() => onChange("payment")}
        >
          Payment
        </TabsTrigger>
        <TabsTrigger 
          value="applicant"
          className={activeTab === "applicant" ? "data-[state=active]:bg-primary" : ""}
          onClick={() => onChange("applicant")}
        >
          Applicant
        </TabsTrigger>
        <TabsTrigger 
          value="residence"
          className={activeTab === "residence" ? "data-[state=active]:bg-primary" : ""}
          onClick={() => onChange("residence")}
        >
          Residence
        </TabsTrigger>
        <TabsTrigger 
          value="employment"
          className={activeTab === "employment" ? "data-[state=active]:bg-primary" : ""}
          onClick={() => onChange("employment")}
        >
          Employment
        </TabsTrigger>
        <TabsTrigger 
          value="occupants"
          className={activeTab === "occupants" ? "data-[state=active]:bg-primary" : ""}
          onClick={() => onChange("occupants")}
        >
          Occupants
        </TabsTrigger>
        <TabsTrigger 
          value="pets"
          className={activeTab === "pets" ? "data-[state=active]:bg-primary" : ""}
          onClick={() => onChange("pets")}
        >
          Pets
        </TabsTrigger>
        <TabsTrigger 
          value="vehicles"
          className={activeTab === "vehicles" ? "data-[state=active]:bg-primary" : ""}
          onClick={() => onChange("vehicles")}
        >
          Vehicles
        </TabsTrigger>
        <TabsTrigger 
          value="background"
          className={activeTab === "background" ? "data-[state=active]:bg-primary" : ""}
          onClick={() => onChange("background")}
        >
          Background
        </TabsTrigger>
        <TabsTrigger 
          value="references"
          className={activeTab === "references" ? "data-[state=active]:bg-primary" : ""}
          onClick={() => onChange("references")}
        >
          References
        </TabsTrigger>
        <TabsTrigger 
          value="optional"
          className={activeTab === "optional" ? "data-[state=active]:bg-primary" : ""}
          onClick={() => onChange("optional")}
        >
          Optional
        </TabsTrigger>
        <TabsTrigger 
          value="custom"
          className={activeTab === "custom" ? "data-[state=active]:bg-primary" : ""}
          onClick={() => onChange("custom")}
        >
          Custom Questions
        </TabsTrigger>
        <TabsTrigger 
          value="documents"
          className={activeTab === "documents" ? "data-[state=active]:bg-primary" : ""}
          onClick={() => onChange("documents")}
        >
          Documents
        </TabsTrigger>
        <TabsTrigger 
          value="terms"
          className={activeTab === "terms" ? "data-[state=active]:bg-primary" : ""}
          onClick={() => onChange("terms")}
        >
          Terms
        </TabsTrigger>
        <TabsTrigger 
          value="notifications"
          className={activeTab === "notifications" ? "data-[state=active]:bg-primary" : ""}
          onClick={() => onChange("notifications")}
        >
          Notifications
        </TabsTrigger>
        <TabsTrigger 
          value="link"
          className={activeTab === "link" ? "data-[state=active]:bg-primary" : ""}
          onClick={() => onChange("link")}
        >
          Link
        </TabsTrigger>
      </ShadcnTabsList>
    </div>
  );
}
