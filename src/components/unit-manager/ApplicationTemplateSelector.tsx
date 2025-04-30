
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { applicationTemplates } from '@/components/application-settings/types';
import { toast } from "@/components/ui/use-toast";
import { FilePlus } from 'lucide-react';

interface ApplicationTemplateSelectorProps {
  onSelect: (templateId: number) => void;
}

export function ApplicationTemplateSelector({ onSelect }: ApplicationTemplateSelectorProps) {
  const handleSelectTemplate = (templateId: number) => {
    onSelect(templateId);
    toast({
      title: "Template Selected",
      description: "The application template has been attached to this unit.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 w-auto">
          <FilePlus className="h-4 w-4 mr-2" />
          Add Application Form
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select Application Template</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {applicationTemplates.map((template) => (
            <Card key={template.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleSelectTemplate(template.id)}>
              <CardHeader>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
                <CardDescription className="text-xs text-gray-500">
                  Created: {new Date(template.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
