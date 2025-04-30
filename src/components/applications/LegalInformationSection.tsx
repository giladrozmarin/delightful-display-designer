
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const LegalInformationSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal Considerations</CardTitle>
        <CardDescription>
          Important legal aspects of rental applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-1">Background & Credit Checks</h3>
            <p className="text-sm text-gray-600">
              Applicants must consent to background and credit checks. If using TransUnion, Social Security numbers are required and applicants must acknowledge the Fair Credit Reporting Act requirements.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Non-Discrimination</h3>
            <p className="text-sm text-gray-600">
              Comply with the federal Fair Housing Act, which prohibits discrimination based on religion, sex, nationality, race, disability, and familial status. Additional protections may apply under state laws.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
