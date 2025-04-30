
import * as z from 'zod';

export const applicationFormSchema = z.object({
  name: z.string().min(1, "Application name is required"),
  description: z.string().optional(),
  instructions: z.string().min(1, "Instructions are required"),
  paymentOption: z.enum(['allInOne', 'customFee', 'applicationOnly']),
  customFeeAmount: z.number().min(0).optional(),
  includeScreeningCosts: z.boolean().default(true),
  allowWithoutUnit: z.boolean().default(false),
  termsAndConditions: z.string().min(1, "Terms and conditions are required"),
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;

export const WIZARD_STEPS = [
  { id: 'basic-info', label: 'Basic Information' },
  { id: 'payment', label: 'Payment Options' },
  { id: 'fields', label: 'Required Fields' },
  { id: 'documents', label: 'Documents' },
  { id: 'terms', label: 'Terms & Conditions' },
  { id: 'review', label: 'Review & Finalize' },
] as const;
