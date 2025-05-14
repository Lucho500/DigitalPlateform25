import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText, Plus, Download, Search, Filter, Upload } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

type TabType = 'offers' | 'invoices' | 'open-items' | 'reminders';

export const Clients: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('offers');
  const [searchTerm, setSearchTerm] = useState('');

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
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('offers')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'offers'
                    ? 'bg-[#0046AD] text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Offres
              </button>
              <button
                onClick={() => setActiveTab('invoices')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'invoices'
                    ? 'bg-[#0046AD] text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Factures
              </button>
              <button
                onClick={() => setActiveTab('open-items')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'open-items'
                    ? 'bg-[#0046AD] text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Postes ouverts débiteurs
              </button>
              <button
                onClick={() => setActiveTab('reminders')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'reminders'
                    ? 'bg-[#0046AD] text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Gestion des rappels
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent focus:border-[#0046AD] focus:ring-1 focus:ring-[#0046AD] text-sm w-64"
                />
              </div>
              <Button variant="outline" leftIcon={<Filter size={16} />}>
                Filtres
              </Button>
              <Button variant="outline" leftIcon={<Upload size={16} />}>
                Importer
              </Button>
              <Button variant="outline" leftIcon={<Download size={16} />}>
                Exporter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {activeTab === 'offers' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Liste des offres</h3>
              <p className="text-gray-500">Aucune offre en cours</p>
            </div>
          )}
          {activeTab === 'invoices' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Liste des factures</h3>
              <p className="text-gray-500">Aucune facture</p>
            </div>
          )}
          {activeTab === 'open-items' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Postes ouverts débiteurs</h3>
              <p className="text-gray-500">Aucun poste ouvert</p>
            </div>
          )}
          {activeTab === 'reminders' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Gestion des rappels</h3>
              <p className="text-gray-500">Aucun rappel en cours</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};