import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText, Plus, Download, Search, Filter, Upload, Eye, MoreVertical, ArrowUpRight, Clock, CheckCircle, AlertCircle, ArrowDownRight } from 'lucide-react';
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

interface ClientDocument {
  id: string;
  number: string;
  client: string;
  date: string;
  dueDate?: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'paid' | 'overdue' | 'reminder1' | 'reminder2' | 'reminder3';
}

const mockOffers: ClientDocument[] = [
  {
    id: '1',
    number: 'OFF-2025-001',
    client: 'Tech Solutions SAS',
    date: '2025-04-15',
    amount: 12500,
    status: 'draft'
  },
  {
    id: '2',
    number: 'OFF-2025-002',
    client: 'Digital Services SARL',
    date: '2025-04-14',
    amount: 8750,
    status: 'sent'
  },
  {
    id: '3',
    number: 'OFF-2025-003',
    client: 'Innovation Corp',
    date: '2025-04-13',
    amount: 15000,
    status: 'accepted'
  }
];

const mockInvoices: ClientDocument[] = [
  {
    id: '1',
    number: 'FAC-2025-001',
    client: 'Tech Solutions SAS',
    date: '2025-04-15',
    dueDate: '2025-05-15',
    amount: 12500,
    status: 'paid'
  },
  {
    id: '2',
    number: 'FAC-2025-002',
    client: 'Digital Services SARL',
    date: '2025-04-10',
    dueDate: '2025-05-10',
    amount: 8750,
    status: 'sent'
  },
  {
    id: '3',
    number: 'FAC-2025-003',
    client: 'Innovation Corp',
    date: '2025-03-15',
    dueDate: '2025-04-15',
    amount: 15000,
    status: 'overdue'
  }
];

const mockOpenItems: ClientDocument[] = [
  {
    id: '1',
    number: 'FAC-2025-002',
    client: 'Digital Services SARL',
    date: '2025-04-10',
    dueDate: '2025-05-10',
    amount: 8750,
    status: 'sent'
  },
  {
    id: '2',
    number: 'FAC-2025-003',
    client: 'Innovation Corp',
    date: '2025-03-15',
    dueDate: '2025-04-15',
    amount: 15000,
    status: 'overdue'
  }
];

const mockReminders: ClientDocument[] = [
  {
    id: '1',
    number: 'FAC-2025-003',
    client: 'Innovation Corp',
    date: '2025-03-15',
    dueDate: '2025-04-15',
    amount: 15000,
    status: 'reminder1'
  },
  {
    id: '2',
    number: 'FAC-2025-004',
    client: 'Web Design Plus',
    date: '2025-03-01',
    dueDate: '2025-04-01',
    amount: 5600,
    status: 'reminder2'
  }
];

export const Clients: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('offers');
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="default">Brouillon</Badge>;
      case 'sent':
        return <Badge variant="info">Envoyé</Badge>;
      case 'accepted':
        return <Badge variant="success">Accepté</Badge>;
      case 'rejected':
        return <Badge variant="error">Refusé</Badge>;
      case 'paid':
        return <Badge variant="success">Payé</Badge>;
      case 'overdue':
        return <Badge variant="error">En retard</Badge>;
      case 'reminder1':
        return <Badge variant="warning">1er rappel</Badge>;
      case 'reminder2':
        return <Badge variant="warning">2ème rappel</Badge>;
      case 'reminder3':
        return <Badge variant="error">Mise en demeure</Badge>;
      default:
        return <Badge variant="default">Inconnu</Badge>;
    }
  };

  const renderTable = (documents: ClientDocument[]) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Numéro
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Client
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Date
            </th>
            {activeTab !== 'offers' && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Échéance
              </th>
            )}
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Montant
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Statut
            </th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {documents.map((doc) => (
            <tr 
              key={doc.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {doc.number}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {doc.client}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {formatDate(doc.date)}
              </td>
              {activeTab !== 'offers' && (
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {doc.dueDate ? formatDate(doc.dueDate) : '-'}
                </td>
              )}
              <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                {formatCurrency(doc.amount)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-center">
                {getStatusBadge(doc.status)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button variant="ghost" size="sm">
                  <Eye size={16} className="mr-2" />
                  Voir
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

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
          {activeTab === 'offers' && renderTable(mockOffers)}
          {activeTab === 'invoices' && renderTable(mockInvoices)}
          {activeTab === 'open-items' && renderTable(mockOpenItems)}
          {activeTab === 'reminders' && renderTable(mockReminders)}
        </CardContent>
      </Card>
    </div>
  );
};