import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText } from 'lucide-react';

export const InterimClosing: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Clôture Intermédiaire</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Reporting périodique
          </p>
        </div>
        <Button variant="primary" leftIcon={<FileText size={16} />}>
          Générer le reporting
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reporting en cours</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            Aucun reporting en cours
          </p>
        </CardContent>
      </Card>
    </div>
  );
};