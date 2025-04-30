
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { ApplicationSettingsFormValues } from './types';

interface DocumentsTabContentProps {
  form: UseFormReturn<ApplicationSettingsFormValues>;
  addDocument: () => void;
  removeDocument: (index: number) => void;
}

export function DocumentsTabContent({ form, addDocument, removeDocument }: DocumentsTabContentProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
          <CardDescription>
            Specify which documents applicants need to upload.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              {form.getValues().requiredDocuments?.map((doc, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input 
                    value={doc} 
                    onChange={(e) => {
                      const newDocs = [...form.getValues().requiredDocuments || []];
                      newDocs[index] = e.target.value;
                      form.setValue('requiredDocuments', newDocs);
                    }}
                    placeholder="Document name"
                    className="flex-1"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeDocument(index)}
                    className="text-red-500 h-9 px-3"
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button 
                type="button" 
                variant="outline" 
                onClick={addDocument}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Document Type
              </Button>
            </div>

            <FormField
              control={form.control}
              name="allowLaterUploads"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Allow applicants to upload missing documents later
                    </FormLabel>
                    <FormDescription>
                      When enabled, applicants can complete the application even if they don't have all documents ready.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
