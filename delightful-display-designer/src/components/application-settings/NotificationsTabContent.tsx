
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Plus, Info } from 'lucide-react';
import { ApplicationSettingsFormValues } from './types';

interface NotificationsTabContentProps {
  form: UseFormReturn<ApplicationSettingsFormValues>;
  addNotificationEmail: () => void;
  removeNotificationEmail: (index: number) => void;
}

export function NotificationsTabContent({ 
  form, 
  addNotificationEmail, 
  removeNotificationEmail 
}: NotificationsTabContentProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Configure who gets notified when new applications are submitted.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              {form.getValues().notificationEmails?.map((email, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input 
                    type="email"
                    value={email} 
                    onChange={(e) => {
                      const newEmails = [...form.getValues().notificationEmails || []];
                      newEmails[index] = e.target.value;
                      form.setValue('notificationEmails', newEmails);
                    }}
                    placeholder="Email address"
                    className="flex-1"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeNotificationEmail(index)}
                    className="text-red-500 h-9 px-3"
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button 
                type="button" 
                variant="outline" 
                onClick={addNotificationEmail}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Email Address
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start gap-3 mt-6">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-700">
                  Email Notifications
                </p>
                <p className="text-sm text-blue-600">
                  Email notifications will be sent to these addresses whenever a new application is submitted.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
