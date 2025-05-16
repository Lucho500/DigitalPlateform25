import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Download, Upload, ArrowUpRight, 
  ArrowDownRight, FileText, Check, X, AlertCircle, 
  CreditCard, Building2, Wallet, DollarSign, Receipt,
  FileSpreadsheet, Calendar, Clock, CheckCircle2,
  BarChart2, PieChart, TrendingUp, FileCheck
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

type TabType = 'clients' | 'suppliers' | 'bank_reconciliation' | 'interim_closing';

interface TabProps {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabProps[] = [
  { id: 'clients', label: 'Clients', icon: <Building2 size={20} /> },
  { id: 'suppliers', label: 'Fournisseurs', icon: <Receipt size={20} /> },
  { id: 'bank_reconciliation', label: 'Rapprochement bancaire', icon: <CreditCard size={20} /> },
  { id: 'interim_closing', label: 'Clôture Intermédiaire', icon: <FileCheck size={20} /> }
];

interface Transaction {
  id: string;
  date: string;
  description: string;
  reference: string;
  amount: number;
  type: 'debit' | 'credit';
  status: 'pending' | 'matched' | 'unmatched';
  matchedWith?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-04-15',
    description: 'Paiement fournisseur XYZ',
    reference: 'VIR-2025041501',
    amount: 1250.00,
    type: 'debit',
    status: 'matched',
    matchedWith: 'FAC-2025-123'
  },
  {
    id: '2',
    date: '2025-04-14',
    description: 'Règlement client ABC',
    reference: 'VIR-2025041402',
    amount: 3500.00,
    type: 'credit',
    status: 'pending'
  },
  {
    id: '3',
    date: '2025-04-13',
    description: 'Prélèvement automatique',
    reference: 'PRE-2025041303',
    amount: 450.00,
    type: 'debit',
    status: 'unmatched'
  }
];

interface AccountingEntry {
  id: string;
  date: string;
  journal: string;
  account: string;
  description: string;
  debit: number;
  credit: number;
  status: 'draft' | 'posted' | 'reconciled';
}

const mockAccountingEntries: AccountingEntry[] = [
  {
    id: '1',
    date: '2025-04-15',
    journal: 'BNQ',
    account: '512000',
    description: 'Paiement fournisseur',
    debit: 0,
    credit: 1250.00,
    status: 'posted'
  },
  {
    id: '2',
    date: '2025-04-14',
    journal: 'BNQ',
    account: '512000',
    description: 'Encaissement client',
    debit: 3500.00,
    credit: 0,
    status: 'draft'
  }
];

interface FinancialReport {
  id: string;
  period: string;
  type: 'monthly' | 'quarterly';
  status: 'draft' | 'in_progress' | 'completed';
  revenue: number;
  expenses: number;
  margin: number;
  lastUpdate: string;
}

const mockReports: FinancialReport[] = [
  {
    id: '1',
    period: 'Mars 2025',
    type: 'monthly',
    status: 'completed',
    revenue: 85000,
    expenses: 55000,
    margin: 30000,
    lastUpdate: '2025-04-05'
  },
  {
    id: '2',
    period: 'Q1 2025',
    type: 'quarterly',
    status: 'in_progress',
    revenue: 245000,
    expenses: 165000,
    margin: 80000,
    lastUpdate: '2025-04-15'
  },
  {
    id: '3',
    period: 'Février 2025',
    type: 'monthly',
    status: 'completed',
    revenue: 78000,
    expenses: 52000,
    margin: 26000,
    lastUpdate: '2025-03-05'
  }
];

interface Client {
  id: string;
  name: string;
  reference: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
}

interface Supplier {
  id: string;
  name: string;
  reference: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'processing';
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Tech Solutions SAS',
    reference: 'FAC-2025-001',
    amount: 12500,
    dueDate: '2025-04-30',
    status: 'pending'
  },
  {
    id: '2',
    name: 'Digital Services SARL',
    reference: 'FAC-2025-002',
    amount: 8750,
    dueDate: '2025-04-25',
    status: 'paid'
  },
  {
    id: '3',
    name: 'Innovation Corp',
    reference: 'FAC-2025-003',
    amount: 15000,
    dueDate: '2025-04-15',
    status: 'overdue'
  }
];

const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Fournitures Pro SARL',
    reference: 'FCT-2025-001',
    amount: 5600,
    dueDate: '2025-04-28',
    status: 'pending'
  },
  {
    id: '2',
    name: 'Services IT SA',
    reference: 'FCT-2025-002',
    amount: 3200,
    dueDate: '2025-04-22',
    status: 'processing'
  },
  {
    id: '3',
    name: 'Maintenance Plus',
    reference: 'FCT-2025-003',
    amount: 4800,
    dueDate: '2025-04-20',
    status: 'paid'
  }
];

export default function Finance() {
  const [activeTab, setActiveTab] = useState<TabType>('interim_closing');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReconciliationType, setSelectedReconciliationType] = useState<'suppliers_customers' | 'accounting'>('suppliers_customers');
  const [selectedReportType, setSelectedReportType] = useState<'monthly' | 'quarterly'>('monthly');
  const [selectedSupplierSection, setSelectedSupplierSection] = useState<'input' | 'payment_proposal' | 'payment' | 'open_items'>('input');

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
      case 'matched':
      case 'reconciled':
        return <Badge variant="success">Rapproché</Badge>;
      case 'pending':
      case 'draft':
        return <Badge variant="warning">En attente</Badge>;
      case 'unmatched':
        return <Badge variant="error">Non rapproché</Badge>;
      case 'posted':
        return <Badge variant="info">Comptabilisé</Badge>;
      default:
        return null;
    }
  };

  const renderBankReconciliation = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
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
            <Button variant="outline" size="sm" leftIcon={<Filter size={16} />}>
              Filtrer
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" leftIcon={<Upload size={16} />}>
              Importer relevé
            </Button>
            <Button variant="primary" leftIcon={<Plus size={16} />}>
              Nouvelle écriture
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Solde bancaire</p>
                  <p className="text-2xl font-semibold mt-1">125 000,00 €</p>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <CreditCard className="text-blue-500" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Écritures à rapprocher</p>
                  <p className="text-2xl font-semibold mt-1">12</p>
                </div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                  <AlertCircle className="text-yellow-500" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Taux de rapprochement</p>
                  <p className="text-2xl font-semibold mt-1">85%</p>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <CheckCircle2 className="text-green-500" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <Button
                variant={selectedReconciliationType === 'suppliers_customers' ? 'primary' : 'ghost'}
                onClick={() => setSelectedReconciliationType('suppliers_customers')}
              >
                Acquittement Fournisseurs/Débiteurs
              </Button>
              <Button
                variant={selectedReconciliationType === 'accounting' ? 'primary' : 'ghost'}
                onClick={() => setSelectedReconciliationType('accounting')}
              >
                Comptabilisation
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {selectedReconciliationType === 'suppliers_customers' ? (
              <div className="space-y-4">
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
                          Référence
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
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(transaction.date)}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                            {transaction.description}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {transaction.reference}
                          </td>
                          <td className={`px-4 py-4 text-sm text-right font-medium ${
                            transaction.type === 'credit' 
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {formatCurrency(transaction.amount)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            {getStatusBadge(transaction.status)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {transaction.status === 'pending' && (
                              <div className="flex space-x-2 justify-end">
                                <Button variant="ghost" size="sm">
                                  <Check size={16} className="text-green-500" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <X size={16} className="text-red-500" />
                                </Button>
                              </div>
                            )}
                            {transaction.status === 'matched' && (
                              <span className="text-sm text-gray-500">
                                {transaction.matchedWith}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Journal
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Compte
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Débit
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Crédit
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {mockAccountingEntries.map((entry) => (
                        <tr 
                          key={entry.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(entry.date)}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                            {entry.journal}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {entry.account}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                            {entry.description}
                          </td>
                          <td className="px-4 py-4 text-sm text-right font-medium text-gray-900 dark:text-white">
                            {entry.debit > 0 ? formatCurrency(entry.debit) : '-'}
                          </td>
                          <td className="px-4 py-4 text-sm text-right font-medium text-gray-900 dark:text-white">
                            {entry.credit > 0 ? formatCurrency(entry.credit) : '-'}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            {getStatusBadge(entry.status)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {entry.status === 'draft' && (
                              <Button variant="ghost" size="sm">
                                Valider
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderInterimClosing = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un rapport..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent focus:border-[#0046AD] focus:ring-1 focus:ring-[#0046AD] text-sm w-64"
              />
            </div>
            <Button variant="outline" size="sm" leftIcon={<Filter size={16} />}>
              Filtrer
            </Button>
          </div>
          <Button variant="primary" leftIcon={<Plus size={16} />}>
            Nouveau rapport
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Chiffre d'affaires</p>
                  <p className="text-2xl font-semibold mt-1">85 000 €</p>
                  <p className="text-sm text-green-500 flex items-center mt-1">
                    <ArrowUpRight size={16} className="mr-1" />
                    +12% vs N-1
                  </p>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <TrendingUp className="text-blue-500" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Marge brute</p>
                  <p className="text-2xl font-semibold mt-1">30 000 €</p>
                  <p className="text-sm text-green-500 flex items-center mt-1">
                    <ArrowUpRight size={16} className="mr-1" />
                    +8% vs N-1
                  </p>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <PieChart className="text-green-500" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Taux de marge</p>
                  <p className="text-2xl font-semibold mt-1">35.3%</p>
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <ArrowDownRight size={16} className="mr-1" />
                    -2% vs N-1
                  </p>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <BarChart2 className="text-purple-500" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <Button
                variant={selectedReportType === 'monthly' ? 'primary' : 'ghost'}
                onClick={() => setSelectedReportType('monthly')}
              >
                Reporting mensuel
              </Button>
              <Button
                variant={selectedReportType === 'quarterly' ? 'primary' : 'ghost'}
                onClick={() => setSelectedReportType('quarterly')}
              >
                Reporting trimestriel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Période
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      CA
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Charges
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Marge
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Mise à jour
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockReports
                    .filter(report => report.type === selectedReportType)
                    .map((report) => (
                      <tr 
                        key={report.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {report.period}
                        </td>
                        <td className="px-4 py-4 text-right text-sm text-gray-900 dark:text-white">
                          {formatCurrency(report.revenue)}
                        </td>
                        <td className="px-4 py-4 text-right text-sm text-gray-900 dark:text-white">
                          {formatCurrency(report.expenses)}
                        </td>
                        <td className="px-4 py-4 text-right text-sm text-gray-900 dark:text-white">
                          {formatCurrency(report.margin)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          {report.status === 'completed' && (
                            <Badge variant="success">Terminé</Badge>
                          )}
                          {report.status === 'in_progress' && (
                            <Badge variant="warning">En cours</Badge>
                          )}
                          {report.status === 'draft' && (
                            <Badge variant="default">Brouillon</Badge>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(report.lastUpdate)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2 justify-end">
                            <Button variant="ghost" size="sm" leftIcon={<FileText size={16} />}>
                              Détails
                            </Button>
                            <Button variant="ghost" size="sm" leftIcon={<Download size={16} />}>
                              Export
                            </Button>
                          </div>
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

  const renderClients = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent focus:border-[#0046AD] focus:ring-1 focus:ring-[#0046AD] text-sm w-64"
              />
            </div>
            <Button variant="outline" size="sm" leftIcon={<Filter size={16} />}>
              Filtrer
            </Button>
          </div>
          <Button variant="primary" leftIcon={<Plus size={16} />}>
            Nouvelle facture
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total à encaisser</p>
                  <p className="text-2xl font-semibold mt-1">36 250 €</p>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Wallet className="text-blue-500" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Échéances dépassées</p>
                  
                  <p className="text-2xl font-semibold mt-1">15 000 €</p>
                </div>
                <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
                  <AlertCircle className="text-red-500" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Délai moyen de paiement</p>
                  <p className="text-2xl font-semibold mt-1">32 jours</p>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <Clock className="text-green-500" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Référence
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Montant
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Échéance
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockClients.map((client) => (
                    <tr 
                      key={client.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {client.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {client.reference}
                      </td>
                      <td className="px-4 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(client.amount)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(client.dueDate)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {client.status === 'paid' && (
                          <Badge variant="success">Payé</Badge>
                        )}
                        {client.status === 'pending' && (
                          <Badge variant="warning">En attente</Badge>
                        )}
                        {client.status === 'overdue' && (
                          <Badge variant="error">En retard</Badge>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2 justify-end">
                          <Button variant="ghost" size="sm" leftIcon={<FileText size={16} />}>
                            Détails
                          </Button>
                          {client.status !== 'paid' && (
                            <Button variant="ghost" size="sm" leftIcon={<DollarSign size={16} />}>
                              Encaisser
                            </Button>
                          )}
                        </div>
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

  const renderSuppliers = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <Button
                variant={selectedSupplierSection === 'input' ? 'primary' : 'ghost'}
                onClick={() => setSelectedSupplierSection('input')}
              >
                Saisie
              </Button>
              <Button
                variant={selectedSupplierSection === 'payment_proposal' ? 'primary' : 'ghost'}
                onClick={() => setSelectedSupplierSection('payment_proposal')}
              >
                Proposition de paiement
              </Button>
              <Button
                variant={selectedSupplierSection === 'payment' ? 'primary' : 'ghost'}
                onClick={() => setSelectedSupplierSection('payment')}
              >
                Mise au paiement
              </Button>
              <Button
                variant={selectedSupplierSection === 'open_items' ? 'primary' : 'ghost'}
                onClick={() => setSelectedSupplierSection('open_items')}
              >
                Postes ouverts créanciers
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher un fournisseur..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent focus:border-[#0046AD] focus:ring-1 focus:ring-[#0046AD] text-sm w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm" leftIcon={<Filter size={16} />}>
                    Filtrer
                  </Button>
                </div>
                <Button variant="primary" leftIcon={<Plus size={16} />}>
                  Nouvelle facture
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total à payer</p>
                        <p className="text-2xl font-semibold mt-1">13 600 €</p>
                      </div>
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <Wallet className="text-blue-500" size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">En traitement</p>
                        <p className="text-2xl font-semibold mt-1">3 200 €</p>
                      </div>
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                        <Clock className="text-yellow-500" size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Délai moyen de paiement</p>
                        <p className="text-2xl font-semibold mt-1">28 jours</p>
                      </div>
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                        <Calendar className="text-green-500" size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Fournisseur
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Référence
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Montant
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Échéance
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockSuppliers.map((supplier) => (
                      <tr 
                        key={supplier.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {supplier.name}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {supplier.reference}
                        </td>
                        <td className="px-4 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                          {formatCurrency(supplier.amount)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(supplier.dueDate)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          {supplier.status === 'paid' && (
                            <Badge variant="success">Payé</Badge>
                          )}
                          {supplier.status === 'pending' && (
                            <Badge variant="warning">En attente</Badge>
                          )}
                          {supplier.status === 'processing' && (
                            <Badge variant="info">En traitement</Badge>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2 justify-end">
                            <Button variant="ghost" size="sm" leftIcon={<FileText size={16} />}>
                              Détails
                            </Button>
                            {supplier.status === 'pending' && (
                              <Button variant="ghost" size="sm" leftIcon={<DollarSign size={16} />}>
                                Payer
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Finance</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gestion des opérations financières
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#0046AD] text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {activeTab === 'clients' && renderClients()}
          {activeTab === 'suppliers' && renderSuppliers()}
          {activeTab === 'bank_reconciliation' && renderBankReconciliation()}
          {activeTab === 'interim_closing' && renderInterimClosing()}
        </CardContent>
      </Card>
    </div>
  );
}

export { Finance }