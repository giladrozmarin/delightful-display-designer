
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { CustomQuestion } from './types';

interface CustomQuestionsTabContentProps {
  customQuestions: CustomQuestion[];
  addCustomQuestion: () => void;
  updateCustomQuestion: (id: number, question: string, required: boolean) => void;
  removeCustomQuestion: (id: number) => void;
}

export function CustomQuestionsTabContent({ 
  customQuestions, 
  addCustomQuestion, 
  updateCustomQuestion, 
  removeCustomQuestion 
}: CustomQuestionsTabContentProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Custom Questions</CardTitle>
          <CardDescription>
            Add custom questions to the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {customQuestions.map((question, index) => (
              <div key={question.id} className="space-y-4 border border-gray-200 rounded-md p-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Question #{index + 1}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeCustomQuestion(question.id)}
                    className="text-red-500 h-8 px-2"
                  >
                    Remove
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Question Text</label>
                    <Input 
                      value={question.question} 
                      onChange={(e) => updateCustomQuestion(question.id, e.target.value, question.required)}
                      placeholder="Enter your question here..."
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`required-${question.id}`}
                      checked={question.required}
                      onCheckedChange={(checked) => 
                        updateCustomQuestion(question.id, question.question, checked === true)
                      }
                    />
                    <label 
                      htmlFor={`required-${question.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      This question is required
                    </label>
                  </div>
                </div>
              </div>
            ))}

            <Button 
              type="button" 
              variant="outline" 
              onClick={addCustomQuestion}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Custom Question
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
