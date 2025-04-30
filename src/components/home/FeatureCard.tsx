
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
}

export function FeatureCard({ title, description, image }: FeatureCardProps) {
  return (
    <Card className="border-0 shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <Button 
          variant="ghost" 
          className="mt-4 text-[#7367f0] hover:text-[#6355e0] p-0 flex items-center"
        >
          Learn more <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </Card>
  );
}
