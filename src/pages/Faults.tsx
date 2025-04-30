
import React, { useState, useEffect } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Plus,
  FileDown,
  ChevronDown,
  MoreHorizontal,
  X,
  Tag,
  MessageSquare
} from 'lucide-react';
import { FaultDetailsDialog } from '@/components/FaultDetailsDialog';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Mock data for faults
const faultData = [
  {
    id: 6,
    issue: "Check Compatibility for Android TV",
    tenant: "Arik Bidas",
    address: "573 Aspen Leaf Street, Las Vegas",
    workOrder: 6,
    type: "Carpentry",
    status: "New Issue",
    communicationStatus: "Tenant Responded",
    createdAt: "05/01/2025, 22:49:37 (2 months ago)"
  },
  {
    id: 5,
    issue: "Check Test Issue",
    tenant: "Arik Bidas",
    address: "573 Aspen Leaf Street, Las Vegas",
    workOrder: 5,
    type: "Flooring",
    status: "Email Sent To Contractor",
    communicationStatus: "Tenant Responded",
    createdAt: "05/01/2025, 08:31:47 (2 months ago)"
  },
  {
    id: 4,
    issue: "Air Conditioning Malfunction in Summer",
    tenant: "Arik Bidas",
    address: "573 Aspen Leaf Street, Las Vegas",
    workOrder: 4,
    type: "Appliance Repair",
    status: "In Progress",
    communicationStatus: "Tenant Responded",
    createdAt: "04/01/2025, 22:57:09 (2 months ago)"
  },
  {
    id: 3,
    issue: "Invalid Tenant Issue Description",
    tenant: "Arik Bidas",
    address: "573 Aspen Leaf Street, Las Vegas",
    workOrder: 3,
    type: "Carpentry",
    status: "New Issue",
    communicationStatus: "No Messages",
    createdAt: "01/01/2025, 10:14:17 (2 months ago)"
  },
  {
    id: 2,
    issue: "Invalid tenant issue description",
    tenant: "Arik Bidas",
    address: "573 Aspen Leaf Street, Las Vegas",
    workOrder: 2,
    type: "Carpentry",
    status: "New Issue",
    communicationStatus: "Tenant Responded",
    createdAt: "23/10/2024, 08:54:56 (5 months ago)"
  }
];

// Extract unique fault types and communication statuses from the data
const faultTypes = Array.from(new Set(faultData.map(fault => fault.type)));
const communicationStatuses = Array.from(new Set(faultData.map(fault => fault.communicationStatus)));

export default function Faults() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFault, setSelectedFault] = useState<(typeof faultData)[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<'type' | 'communication'>('type');
  
  // Available tags based on selected filter category
  const availableTags = filterCategory === 'type' ? faultTypes : communicationStatuses;
  
  // Filter faults based on search query and selected tags
  const filteredFaults = faultData.filter(fault => {
    const matchesSearch = fault.issue.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTags.length === 0) {
      return matchesSearch;
    }
    
    const matchesTags = filterCategory === 'type' 
      ? selectedTags.includes(fault.type)
      : selectedTags.includes(fault.communicationStatus);
    
    return matchesSearch && matchesTags;
  });
  
  const handleRowClick = (fault: typeof faultData[0]) => {
    setSelectedFault(fault);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      // Remove the tag if already selected
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      // Add the tag if not already selected
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleClearTags = () => {
    setSelectedTags([]);
  };

  const handleCategoryChange = (category: 'type' | 'communication') => {
    setFilterCategory(category);
    setSelectedTags([]); // Clear selected tags when changing categories
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#f2f3f7]">
        <AppSidebar />
        <main className="flex-1 p-8 font-inter overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header with notification badges */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-600 rounded-full shadow-lg flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">G</span>
                </div>
                <span className="text-gray-800 font-medium">Welcome Back, gilad!</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full pulse-blue"></span>
                  <span className="text-blue-600 font-medium text-sm">3 New Faults</span>
                </div>
                <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-lg px-4 py-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full pulse-orange"></span>
                  <span className="text-orange-500 font-medium text-sm">4 Tenant Awaiting Response</span>
                </div>
              </div>
            </div>

            {/* Faults Title and List description */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Faults</h1>
              <p className="text-gray-600 mt-1">List of all faults</p>
            </div>

            {/* Search and tags section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search faults..."
                  className="pl-10 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter category selection */}
              <div className="mb-4">
                <RadioGroup 
                  className="flex gap-6" 
                  value={filterCategory}
                  onValueChange={(value) => handleCategoryChange(value as 'type' | 'communication')}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="type" id="type" />
                    <label htmlFor="type" className="flex items-center gap-1 cursor-pointer text-sm font-medium">
                      <Tag className="h-4 w-4" /> Type
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="communication" id="communication" />
                    <label htmlFor="communication" className="flex items-center gap-1 cursor-pointer text-sm font-medium">
                      <MessageSquare className="h-4 w-4" /> Communication Status
                    </label>
                  </div>
                </RadioGroup>
              </div>

              {/* Selected tags display */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedTags.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="blue" 
                      className="px-3 py-1 text-sm flex items-center gap-1"
                    >
                      <span>{tag}</span>
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                  {selectedTags.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-500 text-xs"
                      onClick={handleClearTags}
                    >
                      Clear all
                    </Button>
                  )}
                </div>
              )}
              
              {/* Available tags display */}
              <div className="flex gap-2 items-center">
                {filterCategory === 'type' ? (
                  <Tag className="h-4 w-4 text-gray-500" />
                ) : (
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {filterCategory === 'type' ? 'Type:' : 'Communication Status:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="outline"
                      className={`cursor-pointer ${
                        selectedTags.includes(tag) 
                          ? 'bg-blue-100 text-blue-700 border-blue-300' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => handleTagSelect(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Search and filters section */}
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  Status <ChevronDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  Columns <ChevronDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <FileDown className="h-4 w-4" /> Export CSV
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Fault
                </Button>
              </div>
            </div>

            {/* Total counter */}
            <div className="mt-2">
              <span className="text-gray-700">Total {filteredFaults.length} faults</span>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white border-b">
                  <tr>
                    <th className="p-4 font-medium text-gray-600 uppercase text-xs tracking-wider">Issue</th>
                    <th className="p-4 font-medium text-gray-600 uppercase text-xs tracking-wider">Tenant</th>
                    <th className="p-4 font-medium text-gray-600 uppercase text-xs tracking-wider">Address</th>
                    <th className="p-4 font-medium text-gray-600 uppercase text-xs tracking-wider">Work Order</th>
                    <th className="p-4 font-medium text-gray-600 uppercase text-xs tracking-wider">Type</th>
                    <th className="p-4 font-medium text-gray-600 uppercase text-xs tracking-wider">Status</th>
                    <th className="p-4 font-medium text-gray-600 uppercase text-xs tracking-wider">Communication Status</th>
                    <th className="p-4 font-medium text-gray-600 uppercase text-xs tracking-wider">Created At</th>
                    <th className="p-4 font-medium text-gray-600 uppercase text-xs tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredFaults.map((fault) => (
                    <tr 
                      key={fault.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleRowClick(fault)}
                    >
                      <td className="p-4 whitespace-normal break-words max-w-[200px]">{fault.issue}</td>
                      <td className="p-4">{fault.tenant}</td>
                      <td className="p-4 text-blue-600">{fault.address}</td>
                      <td className="p-4">{fault.workOrder}</td>
                      <td className="p-4">
                        <Badge 
                          variant="gray" 
                          className="px-3 py-1 text-xs font-medium"
                        >
                          {fault.type}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          {fault.status === "New Issue" && (
                            <><span className="h-2 w-2 rounded-full bg-blue-600 mr-2"></span>{fault.status}</>
                          )}
                          {fault.status === "Email Sent To Contractor" && (
                            <><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span>{fault.status}</>
                          )}
                          {fault.status === "In Progress" && (
                            <><span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span>{fault.status}</>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant={fault.communicationStatus === "Tenant Responded" ? "orange" : "gray"}
                          className="px-3 py-1 text-xs font-medium"
                        >
                          {fault.communicationStatus}
                        </Badge>
                      </td>
                      <td className="p-4 text-gray-600">{fault.createdAt}</td>
                      <td className="p-4">
                        <button 
                          className="text-gray-400 hover:text-gray-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRowClick(fault);
                          }}
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      
      <FaultDetailsDialog 
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        fault={selectedFault}
      />
    </SidebarProvider>
  );
}
