
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, User, Lock, ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [imagesLoaded, setImagesLoaded] = React.useState({});

  const backgroundImages = [
    '/images/villa-pool.png',
    '/images/luxury-home.png',
    '/images/elegant-house.png'
  ];

  React.useEffect(() => {
    backgroundImages.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [index]: true }));
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        toast.error(`Failed to load background image ${index + 1}`);
      };
    });
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      navigate('/dashboard');
    } else {
      // For signup, we'll just redirect to login form for now
      toast.success("Account created successfully! Please log in.");
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f9fa] via-[#e9ecef] to-[#dee2e6] animate-gradient">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(115,103,240,0.1),rgba(115,103,240,0.05))] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(94,114,228,0.1),rgba(94,114,228,0.05))] animate-pulse delay-75"></div>
        </div>
      </div>
      
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-30' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${image}')` }}
        />
      ))}
      
      <div className="container relative max-w-[1200px] px-4 mx-auto grid lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:flex flex-col space-y-4 p-8 animate-fade-in">
          <Button 
            variant="ghost" 
            className="w-fit flex items-center text-gray-600 hover:text-gray-900 mb-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
          </Button>
          
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to Your Property Management Solution
          </h1>
          <p className="text-lg text-gray-600">
            Streamline your property management with our comprehensive suite of tools.
          </p>
        </div>

        <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-white/90 shadow-xl border-0 animate-scale-in hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? "Enter your credentials to access your account" 
                : "Fill in your details to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10"
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#7367f0] hover:bg-[#6355e0]">
                {isLogin ? "Sign In" : "Create Account"}
              </Button>

              <div className="text-center text-sm">
                <span className="text-gray-600">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                </span>
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#7367f0] hover:underline font-medium"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
