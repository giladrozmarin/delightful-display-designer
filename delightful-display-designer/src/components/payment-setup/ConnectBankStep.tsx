
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConnectBankStepProps {
  onNext: () => void;
}

export function ConnectBankStep({ onNext }: ConnectBankStepProps) {
  const [connecting, setConnecting] = useState(false);
  const { toast } = useToast();
  
  const handleConnectBank = () => {
    setConnecting(true);
    
    // Simulate API call to connect to bank
    setTimeout(() => {
      setConnecting(false);
      toast({
        title: "Bank account connected",
        description: "Your bank account has been successfully linked",
      });
    }, 1500);
  };
  
  const handleManualEntry = () => {
    toast({
      title: "Manual entry selected",
      description: "You can now enter your bank details manually",
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-bold text-gray-800">Connect A Bank Account</h2>
        <p className="text-gray-500 mt-2">This account will be used for processing payments</p>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex items-center gap-2">
        <div className="text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        </div>
        <p className="text-sm text-blue-800">
          This bank account must be connected to process payments.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 border-2 border-blue-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 px-2 py-1 bg-orange-500 text-white text-xs font-medium">
            RECOMMENDED
          </div>
          
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-20 h-20 flex items-center justify-center">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="64" height="64" rx="32" fill="#E6F0FF" />
                <rect x="16" y="16" width="32" height="24" rx="2" stroke="#0047AB" strokeWidth="2" />
                <rect x="16" y="40" width="32" height="8" rx="1" stroke="#0047AB" strokeWidth="2" />
                <rect x="20" y="44" width="8" height="1" rx="0.5" fill="#0047AB" />
                <rect x="32" y="44" width="12" height="1" rx="0.5" fill="#0047AB" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Use Your Bank Login</h3>
            <p className="text-center text-gray-600 text-sm">
              Securely connect your online account in seconds with Plaid
            </p>
            <Button 
              className="w-full bg-blue-800 hover:bg-blue-900 text-white"
              onClick={handleConnectBank}
              disabled={connecting}
            >
              {connecting ? "CONNECTING..." : "ADD VIA LOGIN"}
            </Button>
          </div>
        </Card>
        
        <Card className="p-6 border">
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-20 h-20 flex items-center justify-center">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="64" height="64" rx="32" fill="#F5F5F5" />
                <path d="M37 25C37 27.7614 34.7614 30 32 30C29.2386 30 27 27.7614 27 25C27 22.2386 29.2386 20 32 20C34.7614 20 37 22.2386 37 25Z" stroke="#333333" strokeWidth="2" />
                <path d="M42 44V42C42 37.5817 38.4183 34 34 34H30C25.5817 34 22 37.5817 22 42V44" stroke="#333333" strokeWidth="2" />
                <path d="M32 44H32.01" stroke="#333333" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Enter Bank Info Manually</h3>
            <p className="text-center text-gray-600 text-sm">
              Add your account and routing numbers in minutes
            </p>
            <Button 
              variant="outline"
              className="w-full border-blue-800 text-blue-800 hover:bg-blue-50"
              onClick={handleManualEntry}
            >
              ENTER MANUALLY
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="pt-4 flex justify-between">
        <div>
          <Button variant="outline" className="gap-2" onClick={() => history.back()}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </div>
        <Button onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  );
}
