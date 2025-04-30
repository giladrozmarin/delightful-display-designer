
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { LeaseWizardSteps } from '@/components/lease-manager/LeaseWizardSteps';
import { LeaseWizardPropertyUnit } from '@/components/lease-manager/LeaseWizardPropertyUnit';
import { LeaseWizardTerms } from '@/components/lease-manager/LeaseWizardTerms';
import { LeaseWizardTenants } from '@/components/lease-manager/LeaseWizardTenants';
import { LeaseWizardRent } from '@/components/lease-manager/LeaseWizardRent';
import { LeaseWizardDeposit } from '@/components/lease-manager/LeaseWizardDeposit';
import { LeaseWizardLateFees } from '@/components/lease-manager/LeaseWizardLateFees';
import { LeaseWizardReview } from '@/components/lease-manager/LeaseWizardReview';

// Reusing the mock property data
const propertiesData = [
  {
    id: 1,
    name: "1 South Miami Street",
    address: "1 South Miami Street, Miamisburg, Ohio 45342, United States",
    city: "Miamisburg",
    state: "OH",
    zip: "45342",
    warranty: "No",
    type: "Residential",
    units: [
      { 
        id: 1, 
        number: "A101", 
        rooms: 3, 
        size: "1200 sqft", 
        bathrooms: 2, 
        status: "Rented", 
        available: false, 
        address: "1 South Miami Street, Unit A101", 
        rent: 1500, 
        description: "",
        tenant: {
          id: 1,
          name: "John Smith",
          email: "john.smith@example.com",
          phone: "555-123-4567",
          moveInDate: "01/15/2023",
          leaseExpirationDate: "01/15/2024",
          status: "active" as const
        },
        lease: {
          id: 1,
          startDate: "01/15/2023",
          endDate: "01/15/2024",
          moveInDate: "01/15/2023",
          rentalAmount: 1500,
          billingCode: "RES-A101",
          status: "active" as const,
          type: "Annual"
        },
      },
      { id: 2, number: "A102", rooms: 2, size: "950 sqft", bathrooms: 1, status: "Vacant", available: true, address: "1 South Miami Street, Unit A102", rent: 1300, description: "" },
      { id: 3, number: "B101", rooms: 4, size: "1500 sqft", bathrooms: 2, status: "Rented", available: false, address: "1 South Miami Street, Unit B101", rent: 1800, description: "" }
    ],
  },
  {
    id: 2,
    name: "573 Aspen Leaf Street",
    address: "573 Aspen Leaf Street, Las Vegas, Nevada 89144, United States",
    city: "Las Vegas",
    state: "NV",
    zip: "89144",
    warranty: "Yes",
    type: "Commercial",
    units: [
      { id: 4, number: "101", rooms: 1, size: "800 sqft", bathrooms: 1, status: "Vacant", available: true, address: "573 Aspen Leaf Street, Unit 101", rent: 1200, description: "" },
      { id: 5, number: "102", rooms: 1, size: "850 sqft", bathrooms: 1, status: "Rented", available: false, address: "573 Aspen Leaf Street, Unit 102", rent: 1250, description: "" }
    ],
  },
];

// Mock tenants data
const tenantsData = [
  { id: 1, name: "John Smith", email: "john.smith@example.com", phone: "555-123-4567" },
  { id: 2, name: "Jane Doe", email: "jane.doe@example.com", phone: "555-987-6543" },
  { id: 3, name: "Michael Brown", email: "michael.brown@example.com", phone: "555-555-5555" },
  { id: 4, name: "Sarah Johnson", email: "sarah.johnson@example.com", phone: "555-111-2222" },
];

// Steps for the lease wizard
const WIZARD_STEPS = [
  { id: 'property-unit', label: 'Property & Unit' },
  { id: 'lease-terms', label: 'Lease Terms' },
  { id: 'tenants', label: 'Tenants' },
  { id: 'rent', label: 'Rent' },
  { id: 'deposit', label: 'Security Deposit' },
  { id: 'late-fees', label: 'Late Fees' },
  { id: 'review', label: 'Review & Finalize' },
];

export default function NewLease() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form state
  const [leaseData, setLeaseData] = useState({
    property: null,
    unit: null,
    leaseType: 'fixed',
    startDate: '',
    endDate: '',
    rolloverToMonthToMonth: false,
    tenants: [],
    rentAmount: '',
    firstRentDate: '',
    paymentFrequency: 'monthly',
    additionalCharges: [],
    securityDeposit: '',
    depositReceiveDate: '',
    lateFees: {
      applyLateFees: false,
      usePropertyDefault: true,
      gracePeriod: 5,
      lateFeeType: 'fixed',
      lateFeeAmount: '',
      lateFeePercentage: '',
    },
    leaseStatus: 'draft',
  });
  
  // Update lease data
  const updateLeaseData = (field, value) => {
    setLeaseData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Navigation functions
  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const goToNextStep = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleCancel = () => {
    navigate('/leases');
  };
  
  const handleSaveAsDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your lease has been saved as a draft.",
    });
    navigate('/leases');
  };
  
  const handleSendForSignature = () => {
    toast({
      title: "Signature Request Sent",
      description: "Your lease has been sent for electronic signature.",
    });
    navigate('/leases');
  };
  
  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <LeaseWizardPropertyUnit 
            properties={propertiesData}
            selectedProperty={leaseData.property}
            selectedUnit={leaseData.unit}
            onPropertyChange={(property) => updateLeaseData('property', property)}
            onUnitChange={(unit) => updateLeaseData('unit', unit)}
          />
        );
      case 1:
        return (
          <LeaseWizardTerms 
            leaseType={leaseData.leaseType}
            startDate={leaseData.startDate}
            endDate={leaseData.endDate}
            rolloverToMonthToMonth={leaseData.rolloverToMonthToMonth}
            onLeaseTypeChange={(type) => updateLeaseData('leaseType', type)}
            onStartDateChange={(date) => updateLeaseData('startDate', date)}
            onEndDateChange={(date) => updateLeaseData('endDate', date)}
            onRolloverChange={(value) => updateLeaseData('rolloverToMonthToMonth', value)}
          />
        );
      case 2:
        return (
          <LeaseWizardTenants 
            tenants={tenantsData}
            selectedTenants={leaseData.tenants}
            onTenantsChange={(tenants) => updateLeaseData('tenants', tenants)}
          />
        );
      case 3:
        return (
          <LeaseWizardRent 
            rentAmount={leaseData.rentAmount}
            firstRentDate={leaseData.firstRentDate}
            paymentFrequency={leaseData.paymentFrequency}
            additionalCharges={leaseData.additionalCharges}
            onRentAmountChange={(amount) => updateLeaseData('rentAmount', amount)}
            onFirstRentDateChange={(date) => updateLeaseData('firstRentDate', date)}
            onPaymentFrequencyChange={(freq) => updateLeaseData('paymentFrequency', freq)}
            onAdditionalChargesChange={(charges) => updateLeaseData('additionalCharges', charges)}
          />
        );
      case 4:
        return (
          <LeaseWizardDeposit 
            securityDeposit={leaseData.securityDeposit}
            depositReceiveDate={leaseData.depositReceiveDate}
            onSecurityDepositChange={(amount) => updateLeaseData('securityDeposit', amount)}
            onDepositReceiveDateChange={(date) => updateLeaseData('depositReceiveDate', date)}
          />
        );
      case 5:
        return (
          <LeaseWizardLateFees 
            lateFees={leaseData.lateFees}
            onLateFeesChange={(lateFees) => updateLeaseData('lateFees', lateFees)}
          />
        );
      case 6:
        return (
          <LeaseWizardReview 
            leaseData={leaseData}
            onLeaseStatusChange={(status) => updateLeaseData('leaseStatus', status)}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#f2f3f7]">
        <AppSidebar />
        <main className="flex-1 p-8 font-inter overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Back button */}
            <Button 
              variant="outline" 
              className="mb-4" 
              onClick={() => navigate('/leases')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Leases
            </Button>
            
            {/* Header */}
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900">Create New Lease</h1>
              <p className="text-gray-500 mt-1">
                Complete all steps to create a new lease agreement
              </p>
            </div>
            
            {/* Steps indicator */}
            <LeaseWizardSteps 
              steps={WIZARD_STEPS} 
              currentStep={currentStep} 
              onStepClick={setCurrentStep}
            />
            
            {/* Current step content */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>{WIZARD_STEPS[currentStep].label}</CardTitle>
              </CardHeader>
              <CardContent>
                {renderStepContent()}
              </CardContent>
              <CardFooter className="flex justify-between border-t p-6">
                <div>
                  {currentStep > 0 && (
                    <Button 
                      variant="outline" 
                      onClick={goToPrevStep}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  
                  {currentStep === WIZARD_STEPS.length - 1 ? (
                    <>
                      <Button 
                        variant="outline"
                        onClick={handleSaveAsDraft}
                      >
                        Save as Draft
                      </Button>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleSendForSignature}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Send for Signature
                      </Button>
                    </>
                  ) : (
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={goToNextStep}
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
