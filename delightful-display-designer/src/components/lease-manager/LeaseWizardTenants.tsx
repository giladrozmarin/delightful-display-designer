
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, UserPlus, X, User, Phone, Mail } from "lucide-react";

interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface LeaseWizardTenantsProps {
  tenants: Tenant[];
  selectedTenants: Tenant[];
  onTenantsChange: (tenants: Tenant[]) => void;
}

export function LeaseWizardTenants({
  tenants,
  selectedTenants,
  onTenantsChange,
}: LeaseWizardTenantsProps) {
  const [newTenant, setNewTenant] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleAddExistingTenant = (tenantId: string) => {
    const tenant = tenants.find(t => t.id === parseInt(tenantId));
    if (tenant && !selectedTenants.some(t => t.id === tenant.id)) {
      onTenantsChange([...selectedTenants, tenant]);
    }
  };
  
  const handleRemoveTenant = (tenantId: number) => {
    onTenantsChange(selectedTenants.filter(t => t.id !== tenantId));
  };
  
  const handleNewTenantChange = (field: string, value: string) => {
    setNewTenant(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleAddNewTenant = () => {
    if (newTenant.name && newTenant.email) {
      // In a real app, you'd send this to the backend to create a new tenant
      // Here we're just simulating it with a temporary ID
      const newTenantWithId = {
        ...newTenant,
        id: Math.floor(Math.random() * -1000) // Negative ID to avoid conflicts with existing ones
      };
      
      onTenantsChange([...selectedTenants, newTenantWithId]);
      setNewTenant({ name: '', email: '', phone: '' });
      setDialogOpen(false);
    }
  };
  
  const filteredTenants = tenants.filter(
    tenant => !selectedTenants.some(selected => selected.id === tenant.id)
  );
  
  return (
    <div className="space-y-6">
      {/* Selected Tenants */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Selected Tenants</Label>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Add New Tenant
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Tenant</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="new-tenant-name">Name</Label>
                  <Input
                    id="new-tenant-name"
                    value={newTenant.name}
                    onChange={(e) => handleNewTenantChange('name', e.target.value)}
                    placeholder="Full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-tenant-email">Email</Label>
                  <Input
                    id="new-tenant-email"
                    type="email"
                    value={newTenant.email}
                    onChange={(e) => handleNewTenantChange('email', e.target.value)}
                    placeholder="Email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-tenant-phone">Phone</Label>
                  <Input
                    id="new-tenant-phone"
                    value={newTenant.phone}
                    onChange={(e) => handleNewTenantChange('phone', e.target.value)}
                    placeholder="Phone number"
                  />
                </div>
                <Button 
                  className="w-full mt-4"
                  onClick={handleAddNewTenant}
                  disabled={!newTenant.name || !newTenant.email}
                >
                  Add Tenant
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {selectedTenants.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>{tenant.email}</TableCell>
                  <TableCell>{tenant.phone}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRemoveTenant(tenant.id)}
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center p-6 border rounded-lg bg-gray-50">
            <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No tenants selected</p>
            <p className="text-sm text-gray-400 mt-1">Add tenants using the selector below or create a new tenant</p>
          </div>
        )}
      </div>
      
      {/* Add Existing Tenant */}
      {filteredTenants.length > 0 && (
        <div className="space-y-2 pt-4 border-t">
          <Label htmlFor="existing-tenant-select">Add Existing Tenant</Label>
          <Select onValueChange={handleAddExistingTenant}>
            <SelectTrigger id="existing-tenant-select">
              <SelectValue placeholder="Select a tenant" />
            </SelectTrigger>
            <SelectContent>
              {filteredTenants.map((tenant) => (
                <SelectItem key={tenant.id} value={tenant.id.toString()}>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{tenant.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      {/* Selected Tenants Summary */}
      {selectedTenants.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
          <h4 className="font-medium text-blue-800 mb-2">Tenant Summary</h4>
          <div className="space-y-3">
            {selectedTenants.map((tenant) => (
              <div key={tenant.id} className="flex items-start">
                <User className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">{tenant.name}</p>
                  <div className="text-sm text-gray-600 flex items-center mt-1">
                    <Mail className="h-3.5 w-3.5 mr-1" /> {tenant.email}
                  </div>
                  {tenant.phone && (
                    <div className="text-sm text-gray-600 flex items-center mt-0.5">
                      <Phone className="h-3.5 w-3.5 mr-1" /> {tenant.phone}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
