import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Plus, Download } from 'lucide-react';

export const Suppliers: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Fournisseurs</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Saisie et paiements fournisseurs
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus size={16} />}>
          Nouvelle facture
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Factures à saisir</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              Aucune facture en attente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paiements à effectuer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              Aucun paiement en attente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Postes ouverts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              Aucun poste ouvert
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};