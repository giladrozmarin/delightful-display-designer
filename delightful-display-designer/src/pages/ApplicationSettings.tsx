import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Form } from '@/components/ui/form';
import { Save } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

import { 
  formSchema, 
  TabsList,
  GeneralTabContent,
  PaymentTabContent,
  ApplicantTabContent,
  ResidentialTabContent,
  EmploymentTabContent,
  OptionalSectionsTabContent,
  CustomQuestionsTabContent,
  DocumentsTabContent,
  TermsTabContent,
  NotificationsTabContent,
  ApplicationLinkTabContent,
  CustomQuestion,
  ApplicationSettingsFormValues
} from '@/components/application-settings';

import { applicationTemplates, type ApplicationTemplate } from '@/components/application-settings/types';

export default function ApplicationSettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([
    { id: 1, question: "Have you ever been evicted?", required: true },
    { id: 2, question: "Do you smoke?", required: false },
  ]);

  const form = useForm<ApplicationSettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instructions: "Please complete all required fields in this application. Upload all requested documents to speed up the approval process.",
      paymentOption: 'allInOne',
      customFeeAmount: 25,
      includeScreeningCosts: true,
      applicantFields: {
        fullName: true,
        email: true,
        phone: true,
        ssn: true,
        dateOfBirth: true,
        driverLicense: false,
      },
      residentialFields: {
        currentAddress: true,
        moveInDate: true,
        currentLandlord: false,
        reasonForMoving: false,
        previousAddresses: false,
      },
      employmentFields: {
        employer: true,
        position: true,
        income: true,
        startDate: true,
        supervisorContact: false,
      },
      includeSections: {
        vehicleInformation: false,
        dependents: false,
        emergencyContacts: true,
        pets: true,
        additionalIncome: false,
      },
      requiredDocuments: ["Government ID", "Proof of Income"],
      allowLaterUploads: true,
      termsAndConditions: "By submitting this application, I acknowledge that all information provided is true and accurate. I understand that providing false information may result in rejection of my application. I authorize the landlord to verify all information provided and to conduct background and credit checks.",
      notificationEmails: ["admin@example.com"],
      allowWithoutUnit: false,
    },
  });

  const addCustomQuestion = () => {
    const newId = customQuestions.length > 0 
      ? Math.max(...customQuestions.map(q => q.id)) + 1 
      : 1;
    
    setCustomQuestions([
      ...customQuestions, 
      { id: newId, question: "", required: false }
    ]);
  };

  const updateCustomQuestion = (id: number, question: string, required: boolean) => {
    setCustomQuestions(customQuestions.map(q => 
      q.id === id ? { ...q, question, required } : q
    ));
  };

  const removeCustomQuestion = (id: number) => {
    setCustomQuestions(customQuestions.filter(q => q.id !== id));
  };

  const addDocument = () => {
    const currentDocs = form.getValues().requiredDocuments || [];
    form.setValue('requiredDocuments', [...currentDocs, ""]);
  };

  const removeDocument = (index: number) => {
    const currentDocs = form.getValues().requiredDocuments || [];
    form.setValue('requiredDocuments', currentDocs.filter((_, i) => i !== index));
  };

  const addNotificationEmail = () => {
    const currentEmails = form.getValues().notificationEmails || [];
    form.setValue('notificationEmails', [...currentEmails, ""]);
  };

  const removeNotificationEmail = (index: number) => {
    const currentEmails = form.getValues().notificationEmails || [];
    form.setValue('notificationEmails', currentEmails.filter((_, i) => i !== index));
  };

  const handleSaveTemplate = (values: ApplicationSettingsFormValues) => {
    const newTemplate: ApplicationTemplate = {
      id: applicationTemplates.length + 1,
      name: values.instructions || "New Template",
      description: "Custom application template",
      settings: values,
      createdAt: new Date().toISOString(),
    };
    
    applicationTemplates.push(newTemplate);
    
    toast({
      title: "Template Saved",
      description: "Your application template has been saved successfully.",
    });
    
    navigate('/settings/applications');
  };

  const onSubmit = (values: ApplicationSettingsFormValues) => {
    handleSaveTemplate(values);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#f2f3f7]">
        <AppSidebar />
        <main className="flex-1 p-8 font-inter overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Rental Application Settings</h1>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/properties')}
                  className="border-gray-300"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={form.handleSubmit(onSubmit)}
                  className="bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList activeTab={activeTab} onChange={setActiveTab} />
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <TabsContent value="general">
                      <GeneralTabContent form={form} />
                    </TabsContent>

                    <TabsContent value="payment">
                      <PaymentTabContent form={form} />
                    </TabsContent>

                    <TabsContent value="applicant">
                      <ApplicantTabContent form={form} />
                    </TabsContent>
                    
                    <TabsContent value="residence">
                      <ResidentialTabContent form={form} />
                    </TabsContent>
                    
                    <TabsContent value="employment">
                      <EmploymentTabContent form={form} />
                    </TabsContent>
                    
                    <TabsContent value="optional">
                      <OptionalSectionsTabContent form={form} />
                    </TabsContent>

                    <TabsContent value="custom">
                      <CustomQuestionsTabContent 
                        customQuestions={customQuestions}
                        addCustomQuestion={addCustomQuestion}
                        updateCustomQuestion={updateCustomQuestion}
                        removeCustomQuestion={removeCustomQuestion}
                      />
                    </TabsContent>

                    <TabsContent value="documents">
                      <DocumentsTabContent 
                        form={form}
                        addDocument={addDocument}
                        removeDocument={removeDocument}
                      />
                    </TabsContent>

                    <TabsContent value="terms">
                      <TermsTabContent form={form} />
                    </TabsContent>

                    <TabsContent value="notifications">
                      <NotificationsTabContent 
                        form={form}
                        addNotificationEmail={addNotificationEmail}
                        removeNotificationEmail={removeNotificationEmail}
                      />
                    </TabsContent>

                    <TabsContent value="link">
                      <ApplicationLinkTabContent form={form} />
                    </TabsContent>
                  </form>
                </Form>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
