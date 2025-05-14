import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText, Plus, Download, Search, Filter, Upload, Eye, MoreVertical, ArrowUpRight, Clock } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

type TabType = 'offers' | 'invoices' | 'open-items' | 'reminders';

interface TabProps {
  id: TabType;
  label: string;
  count?: number;
}

const tabs: TabProps[] = [
  { id: 'offers', label: 'Offres', count: 3 },
  { id: 'invoices', label: 'Factures', count: 12 },
  { id: 'open-items', label: 'Postes ouverts débiteurs', count: 8 },
  { id: 'reminders', label: 'Gestion des rappels', count: 2 }
];

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

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
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
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" leftIcon={<Upload size={16} />}>
            Importer
          </Button>
          <Button variant="outline" leftIcon={<Download size={16} />}>
            Exporter
          </Button>
        </div>
      </div>

      <Card>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-800 py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-10 ${
                  activeTab === tab.id
                    ? 'text-[#0046AD] border-b-2 border-[#0046AD]'
                    : 'text-gray-500 dark:text-gray-400 border-b border-transparent'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <CardContent className="p-6">
          {activeTab === 'offers' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Liste des offres</h3>
              <p className="text-gray-500">Contenu des offres à venir</p>
            </div>
          )}
          {activeTab === 'invoices' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Liste des factures</h3>
              <p className="text-gray-500">Contenu des factures à venir</p>
            </div>
          )}
          {activeTab === 'open-items' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Postes ouverts débiteurs</h3>
              <p className="text-gray-500">Liste des postes ouverts à venir</p>
            </div>
          )}
          {activeTab === 'reminders' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Gestion des rappels</h3>
              <p className="text-gray-500">Liste des rappels à venir</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};