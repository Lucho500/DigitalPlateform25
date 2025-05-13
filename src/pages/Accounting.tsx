import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Download, Upload, ArrowUpRight, 
  ArrowDownRight, TrendingUp, Calculator, FileSpreadsheet 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  category: string;
  status: 'pending' | 'reconciled' | 'verified';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-04-15',
    description: 'Facture client ABC Corp',
    type: 'income',
    amount: 12500,
    category: 'Ventes',
    status: 'reconciled'
  },
  {
    id: '2',
    date: '2025-04-14',
    description: 'Loyer bureau avril',
    type: 'expense',
    amount: 2800,
    category: 'Loyer',
    status: 'verified'
  },
  {
    id: '3',
    date: '2025-04-13',
    description: 'Achat fournitures',
    type: 'expense',
    amount: 450,
    category: 'Fournitures',
    status: 'pending'
  },
  {
    id: '4',
    date: '2025-04-12',
    description: 'Prestation conseil XYZ',
    type: 'income',
    amount: 5600,
    category: 'Services',
    status: 'reconciled'
  },
  {
    id: '5',
    date: '2025-04-11',
    description: 'Assurance professionnelle',
    type: 'expense',
    amount: 980,
    category: 'Assurance',
    status: 'verified'
  }
];

const accountingSummary = {
  income: 156000,
  expenses: 89000,
  balance: 67000,
  pendingTransactions: 12,
  lastReconciliation: '2025-04-10'
};

export const Accounting: React.FC = () => {
  const [viewMode, setViewMode] = useState<'all' | 'income' | 'expenses'>('all');
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
      case 'reconciled':
        return <Badge variant="success">Rapproché</Badge>;
      case 'verified':
        return <Badge variant="info">Vérifié</Badge>;
      case 'pending':
        return <Badge variant="warning">En attente</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'income':
        return <ArrowUpRight className="text-green-500" size={20} />;
      case 'expense':
        return <ArrowDownRight className="text-red-500" size={20} />;
      case 'transfer':
        return <TrendingUp className="text-blue-500" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Comptabilité</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gérez vos opérations comptables et suivez vos finances
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            leftIcon={<Calculator size={16} />}
          >
            Balance
          </Button>
          <Button 
            variant="outline" 
            leftIcon={<FileSpreadsheet size={16} />}
          >
            Grand Livre
          </Button>
          <Button 
            variant="primary" 
            leftIcon={<Plus size={16} />}
          >
            Nouvelle écriture
          </Button>
        </div>
      </div>

      {/* Résumé comptable */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Produits
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  {formatCurrency(accountingSummary.income)}
                </h3>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <ArrowUpRight className="text-green-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Charges
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  {formatCurrency(accountingSummary.expenses)}
                </h3>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                <ArrowDownRight className="text-red-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Solde
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  {formatCurrency(accountingSummary.balance)}
                </h3>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <TrendingUp className="text-blue-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Écritures en attente
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  {accountingSummary.pendingTransactions}
                </h3>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Calculator className="text-yellow-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Journal comptable */}
      <Card>
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <CardTitle>Journal comptable</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une écriture..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent focus:border-[#0046AD] focus:ring-1 focus:ring-[#0046AD] text-sm w-64"
                />
              </div>
              <Button 
                variant="outline" 
                leftIcon={<Filter size={16} />}
              >
                Filtres
              </Button>
              <Button 
                variant="outline" 
                leftIcon={<Upload size={16} />}
              >
                Importer
              </Button>
              <Button 
                variant="outline" 
                leftIcon={<Download size={16} />}
              >
                Exporter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Catégorie
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
                {mockTransactions.map((transaction) => (
                  <tr 
                    key={transaction.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        {getTransactionIcon(transaction.type)}
                        <span className="ml-2">{transaction.description}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.category}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium">
                      <span className={
                        transaction.type === 'income' 
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }>
                        {formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                      {getStatusBadge(transaction.status)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                      <Button variant="ghost" size="sm">
                        Détails
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};