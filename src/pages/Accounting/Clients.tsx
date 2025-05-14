import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText, Plus, Download, FileSpreadsheet, Clock, Ban, CreditCard } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

type TabType = 'offers' | 'invoices' | 'open-items' | 'reminders';

export const Clients: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('offers');

  const tabs: { id: TabType; label: string }[] = [
    { id: 'offers', label: 'Offres' },
    { id: 'invoices', label: 'Factures' },
    { id: 'open-items', label: 'Postes ouverts débiteurs' },
    { id: 'reminders', label: 'Gestion des rappels' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'offers':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center">
                <FileText size={20} className="text-green-500 mr-3" />
                <div>
                  <h4 className="font-medium">Devis en cours</h4>
                  <p className="text-sm text-gray-500">4 devis en attente</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Gérer</Button>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center">
                <FileText size={20} className="text-blue-500 mr-3" />
                <div>
                  <h4 className="font-medium">Offres commerciales</h4>
                  <p className="text-sm text-gray-500">2 offres à suivre</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Voir</Button>
            </div>
          </div>
        );

      case 'invoices':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center">
                <FileSpreadsheet size={20} className="text-blue-500 mr-3" />
                <div>
                  <h4 className="font-medium">Factures à établir</h4>
                  <p className="text-sm text-gray-500">3 factures en attente</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Voir</Button>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center">
                <Clock size={20} className="text-amber-500 mr-3" />
                <div>
                  <h4 className="font-medium">Factures en cours</h4>
                  <p className="text-sm text-gray-500">5 factures non réglées</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Gérer</Button>
            </div>
          </div>
        );

      case 'open-items':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <CreditCard size={20} className="text-blue-500 mr-3" />
                  <h4 className="font-medium">À échoir</h4>
                </div>
                <Badge variant="info">15 000 €</Badge>
              </div>
              <p className="text-sm text-gray-500">8 factures</p>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Détails
              </Button>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Clock size={20} className="text-amber-500 mr-3" />
                  <h4 className="font-medium">Échus</h4>
                </div>
                <Badge variant="warning">8 500 €</Badge>
              </div>
              <p className="text-sm text-gray-500">5 factures</p>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Traiter
              </Button>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Ban size={20} className="text-red-500 mr-3" />
                  <h4 className="font-medium">En contentieux</h4>
                </div>
                <Badge variant="error">3 200 €</Badge>
              </div>
              <p className="text-sm text-gray-500">2 factures</p>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Gérer
              </Button>
            </div>
          </div>
        );

      case 'reminders':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-medium mb-2">Premier rappel</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">3 clients</p>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  Envoyer les rappels
                </Button>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h4 className="font-medium mb-2">Deuxième rappel</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">2 clients</p>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  Envoyer les rappels
                </Button>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-medium mb-2">Mise en demeure</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">1 client</p>
                <Button variant="outline" size="sm" className="mt-3 w-full">
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
        );

      default:
        return null;
    }
  };

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

      <Card>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-1 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#0046AD] text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <CardContent className="p-6">
          {renderTabContent()}
        </CardContent>
      </Card>
    </div>
  );
};