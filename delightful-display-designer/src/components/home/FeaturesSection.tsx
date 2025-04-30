
import React, { useRef, useEffect } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';
import { FeatureCard } from './FeatureCard';

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface FeaturesSectionProps {
  features: Feature[];
  activeFeature: number;
  onFeatureSelect: (index: number) => void;
}

export function FeaturesSection({ features, activeFeature, onFeatureSelect }: FeaturesSectionProps) {
  const [api, setApi] = React.useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    
    const handleSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      onFeatureSelect(selectedIndex);
    };

    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api, onFeatureSelect]);

  return (
    <section className="w-full py-16 md:py-24 px-6 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Everything you need to manage your properties
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive tools make property management simple and efficient
          </p>
        </div>
        
        <div className="relative">
          <Carousel 
            opts={{ loop: true }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent>
              {features.map((feature, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <FeatureCard {...feature} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-6 bg-white shadow-md" />
            <CarouselNext className="-right-6 bg-white shadow-md" />
          </Carousel>
          <div className="flex justify-center gap-2 mt-8">
            {features.map((_, index) => (
              <button 
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === activeFeature ? 'bg-[#7367f0]' : 'bg-gray-300'
                }`}
                onClick={() => {
                  if (api) api.scrollTo(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
