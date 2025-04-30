import { z } from 'zod';

// Form schema for validation
export const formSchema = z.object({
  // General settings
  instructions: z.string().optional(),
  
  // Payment options
  paymentOption: z.enum(['allInOne', 'customFee', 'applicationOnly']),
  customFeeAmount: z.number().min(0).optional(),
  includeScreeningCosts: z.boolean().optional(),
  
  // Required fields configuration
  applicantFields: z.object({
    fullName: z.boolean().default(true),
    email: z.boolean().default(true),
    phone: z.boolean().default(true),
    ssn: z.boolean().default(true),
    dateOfBirth: z.boolean().default(true),
    driverLicense: z.boolean().default(false),
  }),
  
  residentialFields: z.object({
    currentAddress: z.boolean().default(true),
    moveInDate: z.boolean().default(true),
    currentLandlord: z.boolean().default(false),
    reasonForMoving: z.boolean().default(false),
    previousAddresses: z.boolean().default(false),
  }),
  
  employmentFields: z.object({
    employer: z.boolean().default(true),
    position: z.boolean().default(true),
    income: z.boolean().default(true),
    startDate: z.boolean().default(true),
    supervisorContact: z.boolean().default(false),
  }),
  
  // Optional sections
  includeSections: z.object({
    vehicleInformation: z.boolean().default(false),
    dependents: z.boolean().default(false),
    emergencyContacts: z.boolean().default(false),
    pets: z.boolean().default(false),
    additionalIncome: z.boolean().default(false),
  }),
  
  // Document requests
  requiredDocuments: z.array(z.string()).optional(),
  allowLaterUploads: z.boolean().default(true),
  
  // Terms and conditions
  termsAndConditions: z.string().min(1, "Terms and conditions are required"),
  
  // Notifications
  notificationEmails: z.array(z.string().email()).optional(),
  
  // Application link settings
  allowWithoutUnit: z.boolean().default(false),
});

export type ApplicationSettingsFormValues = z.infer<typeof formSchema>;

export interface CustomQuestion {
  id: number;
  question: string;
  required: boolean;
}

export interface ApplicationTemplate {
  id: number;
  name: string;
  description: string;
  settings: ApplicationSettingsFormValues;
  createdAt: string;
}

// Add this to mock data until we have a backend
export const applicationTemplates: ApplicationTemplate[] = [
  {
    id: 1,
    name: "Standard Residential Application",
    description: "Basic residential rental application template",
    createdAt: "2024-01-15",
    settings: {
      instructions: "Please complete all required fields in this application.",
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
      termsAndConditions: "Standard terms and conditions",
      notificationEmails: ["admin@example.com"],
      allowWithoutUnit: false,
    }
  }
];
