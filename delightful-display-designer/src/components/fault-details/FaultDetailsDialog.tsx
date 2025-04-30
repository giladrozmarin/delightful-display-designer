
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs } from "@/components/ui/tabs";
import { FaultDetailsHeader } from './FaultDetailsHeader';
import { FaultDetailsTabs } from './FaultDetailsTabs';
import { FaultDetailsTabContent } from './FaultDetailsTabContent';
import { Fault } from './types';

interface FaultDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fault: Fault | null;
}

export function FaultDetailsDialog({ isOpen, onClose, fault }: FaultDetailsDialogProps) {
  const [leftActiveTab, setLeftActiveTab] = useState("general");
  const [rightActiveTab, setRightActiveTab] = useState("chat");

  if (!fault) return null;

  // Combine both tab states for the UI
  const handleTabChange = (value: string) => {
    const [left, right] = value.split('-');
    
    if (left && ["general", "images", "documents"].includes(left)) {
      setLeftActiveTab(left);
    }
    
    if (right && ["chat", "notes", "history"].includes(right)) {
      setRightActiveTab(right);
    }
  };

  // Create combined value for Tabs component
  const activeTab = `${leftActiveTab}-${rightActiveTab}`;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[90vw] lg:max-w-[80vw] h-[90vh] flex flex-col p-0 gap-0">
        <DialogTitle className="sr-only">Fault Details</DialogTitle>
        
        <FaultDetailsHeader fault={fault} />

        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange} 
          className="flex-1 flex flex-col overflow-hidden"
        >
          <FaultDetailsTabs 
            leftActiveTab={leftActiveTab} 
            rightActiveTab={rightActiveTab} 
            onTabChange={handleTabChange}
          />
          <FaultDetailsTabContent fault={fault} />
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
