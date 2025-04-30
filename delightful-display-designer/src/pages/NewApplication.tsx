
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { applicationFormSchema, type ApplicationFormData, WIZARD_STEPS } from '@/components/application-form/types';
import { ApplicationWizardSteps } from '@/components/application-form/ApplicationWizardSteps';
import { BasicInformationStep } from '@/components/application-form/steps/BasicInformationStep';
import { PaymentOptionsStep } from '@/components/application-form/steps/PaymentOptionsStep';
import { TermsAndConditionsStep } from '@/components/application-form/steps/TermsAndConditionsStep';
import { ReviewStep } from '@/components/application-form/steps/ReviewStep';

export default function NewApplication() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      name: "",
      description: "",
      instructions: "Please complete all required fields in this application. Upload all requested documents to speed up the approval process.",
      paymentOption: 'allInOne',
      customFeeAmount: 25,
      includeScreeningCosts: true,
      allowWithoutUnit: false,
      termsAndConditions: "By submitting this application, I acknowledge that all information provided is true and accurate. I understand that providing false information may result in rejection of my application. I authorize the landlord to verify all information provided and to conduct background and credit checks.",
    },
  });

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
  
  const handleCancel = () => navigate('/settings/applications');
  
  const handleSaveAsDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your application has been saved as a draft.",
    });
    navigate('/settings/applications');
  };
  
  const handleSaveApplication = (values: ApplicationFormData) => {
    console.log("Form values:", values);
    toast({
      title: "Application Saved",
      description: "Your application has been saved successfully.",
    });
    navigate('/settings/applications');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BasicInformationStep form={form} />;
      case 1:
        return <PaymentOptionsStep form={form} />;
      case 2:
        return (
          <div className="text-center py-4">
            <h3 className="text-lg font-medium">Required Fields Configuration</h3>
            <p className="text-sm text-gray-500">
              This section will be implemented in the next phase
            </p>
          </div>
        );
      case 3:
        return (
          <div className="text-center py-4">
            <h3 className="text-lg font-medium">Document Requirements</h3>
            <p className="text-sm text-gray-500">
              This section will be implemented in the next phase
            </p>
          </div>
        );
      case 4:
        return <TermsAndConditionsStep form={form} />;
      case 5:
        return <ReviewStep form={form} />;
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
            <Button 
              variant="outline" 
              className="mb-4" 
              onClick={() => navigate('/settings/applications')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Application Settings
            </Button>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900">Create New Application</h1>
              <p className="text-gray-500 mt-1">
                Complete all steps to create a new rental application
              </p>
            </div>
            
            <ApplicationWizardSteps currentStep={currentStep} />
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>{WIZARD_STEPS[currentStep].label}</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSaveApplication)} className="space-y-6">
                    {renderStepContent()}
                  </form>
                </Form>
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
                  <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                  
                  {currentStep === WIZARD_STEPS.length - 1 ? (
                    <>
                      <Button variant="outline" onClick={handleSaveAsDraft}>
                        Save as Draft
                      </Button>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={form.handleSubmit(handleSaveApplication)}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Application
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
