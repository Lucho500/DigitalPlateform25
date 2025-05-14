import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText, Plus, Download, Search, Filter, Upload, Eye, MoreVertical, ArrowUpRight, Clock } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

type TabType = 'offers' | 'invoices' | 'open-items' | 'reminders';

interface Invoice {
  id: string;
  number: string;
  client: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
}

interface Offer {
  id: string;
  number: string;
  client: string;
  date: string;
  validUntil: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    number: 'FACT-2025-001',
    client: 'Tech Solutions SAS',
    date: '2025-04-01',
    dueDate: '2025-05-01',
    amount: 12500,
    status: 'paid'
  },
  {
    id: '2',
    number: 'FACT-2025-002',
    client: 'Digital Services SARL',
    date: '2025-04-05',
    dueDate: '2025-05-05',
    amount: 8750,
    status: 'sent'
  },
  {
    id: '3',
    number: 'FACT-2025-003',
    client: 'Innovation Corp',
    date: '2025-04-10',
    dueDate: '2025-05-10',
    amount: 15000,
    status: 'overdue'
  }
];

const mockOffers: Offer[] = [
  {
    id: '1',
    number: 'DEV-2025-001',
    client: 'Future Tech SA',
    date: '2025-04-01',
    validUntil: '2025-05-01',
    amount: 18500,
    status: 'sent'
  },
  {
    id: '2',
    number: 'DEV-2025-002',
    client: 'Smart Solutions',
    date: '2025-04-03',
    validUntil: '2025-05-03',
    amount: 22000,
    status: 'draft'
  },
  {
    id: '3',
    number: 'DEV-2025-003',
    client: 'Digital Transform',
    date: '2025-04-07',
    validUntil: '2025-05-07',
    amount: 12800,
    status: 'accepted'
  }
];

export const Clients: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('offers');
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="default">Brouillon</Badge>;
      case 'sent':
        return <Badge variant="info">Envoyé</Badge>;
      case 'paid':
        return <Badge variant="success">Payé</Badge>;
      case 'overdue':
        return <Badge variant="error">En retard</Badge>;
      case 'accepted':
        return <Badge variant="success">Accepté</Badge>;
      case 'rejected':
        return <Badge variant="error">Refusé</Badge>;
      case 'expired':
        return <Badge variant="warning">Expiré</Badge>;
      default:
        return <Badge variant="default">Inconnu</Badge>;
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Validité
                    </th>
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
                  {mockOffers.map((offer) => (
                    <tr key={offer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {offer.number}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {offer.client}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(offer.date)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(offer.validUntil)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                        {formatCurrency(offer.amount)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {getStatusBadge(offer.status)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} className="mr-2" />
                          Voir
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 'invoices' && (
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Échéance
                    </th>
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
                  {mockInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {invoice.number}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {invoice.client}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(invoice.date)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(invoice.dueDate)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                        {formatCurrency(invoice.amount)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {getStatusBadge(invoice.status)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} className="mr-2" />
                          Voir
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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