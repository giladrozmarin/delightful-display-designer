
import React from 'react';
import { Button } from "@/components/ui/button";
import { Image } from 'lucide-react';

export function ImagesTabContent() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
      <Image className="h-16 w-16 mb-4 opacity-30" />
      <p>No images uploaded yet</p>
      <Button variant="outline" className="mt-4">
        Upload images
      </Button>
    </div>
  );
}
