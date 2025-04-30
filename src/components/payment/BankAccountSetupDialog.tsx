
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Banknote, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BankAccountSetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (accountId: string) => void;
}

export function BankAccountSetupDialog({
  open,
  onOpenChange,
  onSuccess
}: BankAccountSetupDialogProps) {
  const [connecting, setConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnectPlaid = () => {
    setConnecting(true);

    // This is where we would normally integrate with Plaid Link
    // For demonstration purposes, we're simulating a successful connection
    setTimeout(() => {
      setConnecting(false);
      toast({
        title: "Bank account connected",
        description: "Your bank account has been successfully linked via Plaid"
      });
      
      // Call onSuccess with a mock account ID
      if (onSuccess) {
        onSuccess("acct_12345");
      }
      
      onOpenChange(false);
    }, 2000);
  };
  
  const handleManualEntry = () => {
    toast({
      title: "Manual entry selected",
      description: "You can now enter your bank details manually"
    });

    // Here you would navigate to a manual entry form or open another dialog
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Connect a Bank Account</DialogTitle>
          <DialogDescription>
            Link your bank account to process payments securely. All connections are encrypted and secure.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex items-center gap-2 my-4">
          <div className="text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <p className="text-sm text-blue-800">
            Your bank connection is secured with bank-level encryption and your credentials are never stored.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="p-6 border-2 border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 px-2 py-1 text-white text-xs font-medium bg-blue-500">
              RECOMMENDED
            </div>
            
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-50 rounded-full">
                <Banknote className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Use Your Bank Login</h3>
              <p className="text-center text-gray-600 text-sm">
                Securely connect your online account in seconds with Plaid
              </p>
              <Button className="w-full bg-blue-800 hover:bg-blue-900 text-white" onClick={handleConnectPlaid} disabled={connecting}>
                {connecting ? "CONNECTING..." : "ADD VIA LOGIN"}
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 border">
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full">
                <CreditCard className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Enter Bank Info Manually</h3>
              <p className="text-center text-gray-600 text-sm">
                Add your account and routing numbers in minutes
              </p>
              <Button variant="outline" className="w-full border-blue-800 text-blue-800 hover:bg-blue-50" onClick={handleManualEntry}>
                ENTER MANUALLY
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="mt-4 text-xs text-center text-gray-500">
          By connecting your account, you agree to our Terms of Service and Privacy Policy.
          Secured by Plaid.
        </div>
      </DialogContent>
    </Dialog>
  );
}
