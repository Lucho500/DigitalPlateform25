import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { RefreshCw } from 'lucide-react';

export const BankReconciliation: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Rapprochement Bancaire</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Acquittement et comptabilisation
          </p>
        </div>
        <Button variant="primary" leftIcon={<RefreshCw size={16} />}>
          Actualiser les relevés
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Écritures à acquitter</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              Aucune écriture en attente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comptabilisation COFI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              Aucune écriture à comptabiliser
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};