import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Upload } from 'lucide-react';

export const PayrollImport: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Import Écritures Salaire</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Intégration comptable des salaires
          </p>
        </div>
        <Button variant="primary" leftIcon={<Upload size={16} />}>
          Importer les écritures
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique des imports</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            Aucun import récent
          </p>
        </CardContent>
      </Card>
    </div>
  );
};