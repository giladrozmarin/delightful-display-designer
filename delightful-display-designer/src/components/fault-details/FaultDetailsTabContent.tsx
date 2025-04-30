
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { GeneralTabContent } from './tabs/GeneralTabContent';
import { ImagesTabContent } from './tabs/ImagesTabContent';
import { DocumentsTabContent } from './tabs/DocumentsTabContent';
import { ChatTabContent } from './tabs/ChatTabContent';
import { NotesTabContent } from './tabs/NotesTabContent';
import { HistoryTabContent } from './tabs/HistoryTabContent';
import { FaultDetailsProps } from './types';

export function FaultDetailsTabContent({ fault }: FaultDetailsProps) {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left side - Shows General/Images/Documents content */}
      <div className="flex-1 overflow-auto p-6 border-r border-gray-200">
        {/* General tab content */}
        <TabsContent 
          value="general-chat" 
          className="h-full mt-0 p-0"
          forceMount={true}
        >
          <GeneralTabContent fault={fault} />
        </TabsContent>
        <TabsContent 
          value="general-notes" 
          className="h-full mt-0 p-0"
        >
          <GeneralTabContent fault={fault} />
        </TabsContent>
        <TabsContent 
          value="general-history" 
          className="h-full mt-0 p-0"
        >
          <GeneralTabContent fault={fault} />
        </TabsContent>

        {/* Images tab content */}
        <TabsContent 
          value="images-chat" 
          className="h-full mt-0 p-0"
        >
          <ImagesTabContent />
        </TabsContent>
        <TabsContent 
          value="images-notes" 
          className="h-full mt-0 p-0"
        >
          <ImagesTabContent />
        </TabsContent>
        <TabsContent 
          value="images-history" 
          className="h-full mt-0 p-0"
        >
          <ImagesTabContent />
        </TabsContent>

        {/* Documents tab content */}
        <TabsContent 
          value="documents-chat" 
          className="h-full mt-0 p-0"
        >
          <DocumentsTabContent />
        </TabsContent>
        <TabsContent 
          value="documents-notes" 
          className="h-full mt-0 p-0"
        >
          <DocumentsTabContent />
        </TabsContent>
        <TabsContent 
          value="documents-history" 
          className="h-full mt-0 p-0"
        >
          <DocumentsTabContent />
        </TabsContent>
      </div>
      
      {/* Right side - Shows Chat/Notes/History content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Chat tab content */}
        <TabsContent 
          value="general-chat" 
          className="h-full mt-0 p-0"
          forceMount={true}
        >
          <ChatTabContent fault={fault} />
        </TabsContent>
        <TabsContent 
          value="images-chat" 
          className="h-full mt-0 p-0"
        >
          <ChatTabContent fault={fault} />
        </TabsContent>
        <TabsContent 
          value="documents-chat" 
          className="h-full mt-0 p-0"
        >
          <ChatTabContent fault={fault} />
        </TabsContent>

        {/* Notes tab content */}
        <TabsContent 
          value="general-notes" 
          className="h-full mt-0 p-0"
        >
          <NotesTabContent />
        </TabsContent>
        <TabsContent 
          value="images-notes" 
          className="h-full mt-0 p-0"
        >
          <NotesTabContent />
        </TabsContent>
        <TabsContent 
          value="documents-notes" 
          className="h-full mt-0 p-0"
        >
          <NotesTabContent />
        </TabsContent>

        {/* History tab content */}
        <TabsContent 
          value="general-history" 
          className="h-full mt-0 p-0"
        >
          <HistoryTabContent />
        </TabsContent>
        <TabsContent 
          value="images-history" 
          className="h-full mt-0 p-0"
        >
          <HistoryTabContent />
        </TabsContent>
        <TabsContent 
          value="documents-history" 
          className="h-full mt-0 p-0"
        >
          <HistoryTabContent />
        </TabsContent>
      </div>
    </div>
  );
}
