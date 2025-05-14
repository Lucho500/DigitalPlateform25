import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText, Plus, Download, FileSpreadsheet, Clock, Ban } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

export const Clients: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Clients</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gestion des factures, devis et rappels
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" leftIcon={<FileText size={16} />}>
            Nouveau devis
          </Button>
          <Button variant="primary" leftIcon={<Plus size={16} />}>
            Nouvelle facture
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Factures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center">
                  <FileSpreadsheet size={20} className="text-blue-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Factures à établir</h4>
                    <p className="text-sm text-gray-500">3 factures en attente</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Voir</Button>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center">
                  <Clock size={20} className="text-amber-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Factures en cours</h4>
                    <p className="text-sm text-gray-500">5 factures non réglées</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Gérer</Button>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center">
                  <Ban size={20} className="text-red-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Factures impayées</h4>
                    <p className="text-sm text-gray-500">2 factures en retard</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Relancer</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Offres et devis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center">
                  <FileText size={20} className="text-green-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Devis en cours</h4>
                    <p className="text-sm text-gray-500">4 devis en attente</p>
                  </div>
                </div>
                <Badge variant="success">Nouveau</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center">
                  <FileText size={20} className="text-blue-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Propositions commerciales</h4>
                    <p className="text-sm text-gray-500">2 propositions à suivre</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Voir</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestion des rappels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-medium mb-2">Premier rappel</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">3 clients</p>
                <Button variant="outline" size="sm" className="mt-3">
                  Envoyer les rappels
                </Button>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h4 className="font-medium mb-2">Deuxième rappel</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">2 clients</p>
                <Button variant="outline" size="sm" className="mt-3">
                  Envoyer les rappels
                </Button>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-medium mb-2">Mise en demeure</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">1 client</p>
                <Button variant="outline" size="sm" className="mt-3">
                  Préparer le courrier
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" fullWidth leftIcon={<FileText size={16} />}>
                Historique des rappels
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};