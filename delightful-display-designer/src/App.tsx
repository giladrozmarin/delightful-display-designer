
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Faults from "./pages/Faults";
import Properties from "./pages/Properties";
import PropertyManager from "./pages/PropertyManager";
import UnitDetails from "./pages/UnitDetails";
import Leases from "./pages/Leases";
import NewLease from "./pages/NewLease";
import LeaseDetails from "./pages/LeaseDetails";
import Applications from "./pages/Applications";
import ApplicationSettings from "./pages/ApplicationSettings";
import ApplicationsOverview from "./pages/ApplicationsOverview";
import Tenants from "./pages/Tenants";
import TenantDetails from "./pages/TenantDetails";
import Contractors from "./pages/Contractors";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import NewApplication from "./pages/NewApplication";
import Payments from "./pages/Payments";
import Invoices from "./pages/Invoices";
import PaymentSetup from "./pages/PaymentSetup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/faults" element={<Faults />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyManager />} />
          <Route path="/properties/:propertyId/units/:unitId" element={<UnitDetails />} />
          <Route path="/leases" element={<Leases />} />
          <Route path="/leases/new" element={<NewLease />} />
          <Route path="/leases/:id" element={<LeaseDetails />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/overview" element={<ApplicationsOverview />} />
          <Route path="/settings/applications" element={<ApplicationSettings />} />
          <Route path="/newApplications" element={<NewApplication />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/tenants/:id" element={<TenantDetails />} />
          <Route path="/contractors" element={<Contractors />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/payment-setup" element={<PaymentSetup />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
