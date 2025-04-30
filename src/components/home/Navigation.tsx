
import React from 'react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  onLogin: () => void;
  onCreateAccount: () => void;
}

export function Navigation({ onLogin, onCreateAccount }: NavigationProps) {
  return (
    <header className="w-full py-4 px-6 sm:px-8 lg:px-12 flex items-center justify-between bg-white/95 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center">
        <h2 className="text-xl font-bold text-[#7367f0]">PropertyManager</h2>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={onLogin}
          className="text-gray-600 hover:text-[#7367f0] font-medium transition-colors"
        >
          Login
        </button>
        <Button 
          onClick={onCreateAccount}
          className="bg-[#7367f0] hover:bg-[#6355e0] transition-colors"
        >
          Sign Up
        </Button>
      </div>
    </header>
  );
}
