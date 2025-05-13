import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PieChart } from 'lucide-react';

export const AccountingAnalytics: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Comptabilité Analytique</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Analyse des coûts
          </p>
        </div>
        <Button variant="primary" leftIcon={<PieChart size={16} />}>
          Nouvelle analyse
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analyses en cours</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            Aucune analyse en cours
          </p>
        </CardContent>
      </Card>
    </div>
  );
};