import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Navigation } from "@/components/home/Navigation";
import { StatsCounter } from "@/components/home/StatsCounter";
import { FeaturesSection } from "@/components/home/FeaturesSection";

const features = [
  {
    title: "Lease Agreement Generator",
    description: "Create legally-binding lease agreements in minutes",
    image: "/images/luxury-home.png",
  },
  {
    title: "Tenant Pre-Screening",
    description: "Screen tenants before they even apply",
    image: "/images/elegant-house.png",
  },
  {
    title: "Lead Management",
    description: "Organize and track potential tenants in one place",
    image: "/images/villa-pool.png",
  },
  {
    title: "Property Listings",
    description: "List and showcase your properties to potential tenants",
    image: "/images/modern-apartment.jpg",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = React.useState(0);
  
  const handleCreateAccount = () => {
    navigate("/login");
  };
  
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation onLogin={handleLogin} onCreateAccount={handleCreateAccount} />

      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-[#f8f9fa] via-[#e9ecef] to-[#dee2e6]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-800 leading-tight">
                The one-stop shop for finding and managing tenants
              </h1>
              <p className="text-xl text-gray-600">
                Join over half a million landlords who use our platform to manage their properties efficiently
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  size="lg" 
                  onClick={handleCreateAccount}
                  className="bg-[#7367f0] hover:bg-[#6355e0] text-lg px-8"
                >
                  Create My Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={handleLogin}
                  className="text-lg"
                >
                  Learn More
                </Button>
              </div>
              <div className="pt-6 grid grid-cols-3 gap-8">
                <StatsCounter end={500} label="Landlords" suffix="K+" />
                <StatsCounter end={1200} label="Properties" suffix="K+" />
                <StatsCounter end={98} label="Satisfaction" suffix="%" />
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#7367f0] to-[#6355e0] rounded-xl blur-md opacity-30 animate-pulse"></div>
              <div className="relative bg-white p-2 rounded-xl shadow-xl">
                <img 
                  src="/images/luxury-home.png" 
                  alt="Property Management Dashboard" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection 
        features={features} 
        activeFeature={activeFeature} 
        onFeatureSelect={setActiveFeature} 
      />

      {/* CTA Section */}
      <section className="w-full py-16 md:py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-[#7367f0] to-[#6355e0] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to simplify your property management?
              </h2>
              <p className="text-xl opacity-90">
                Join thousands of property owners who have streamlined their rental process with our platform.
              </p>
              <Button 
                size="lg" 
                onClick={handleCreateAccount}
                className="bg-white text-[#7367f0] hover:bg-gray-100 text-lg px-8"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <p>Support available anytime you need help</p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur">
                <div className="text-3xl font-bold mb-2">Easy</div>
                <p>Simple and intuitive interface for all users</p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur">
                <div className="text-3xl font-bold mb-2">Fast</div>
                <p>Quick setup and immediate access to all features</p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur">
                <div className="text-3xl font-bold mb-2">Secure</div>
                <p>Enterprise-level security for your data</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-6 sm:px-8 lg:px-12 bg-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600">© 2025 PropertyManager. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-[#7367f0]">Terms</a>
            <a href="#" className="text-gray-600 hover:text-[#7367f0]">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-[#7367f0]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
