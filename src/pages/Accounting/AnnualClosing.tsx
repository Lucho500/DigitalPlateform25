import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { BookOpen } from 'lucide-react';

export const AnnualClosing: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Clôture Annuelle</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            États financiers et documentation
          </p>
        </div>
        <Button variant="primary" leftIcon={<BookOpen size={16} />}>
          Démarrer la clôture
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Écritures de clôture</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              Aucune écriture de clôture
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>États financiers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              Aucun état financier disponible
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};