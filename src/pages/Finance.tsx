import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Download, Upload, ArrowUpRight, 
  ArrowDownRight, FileText, Check, X, AlertCircle, 
  CreditCard, Building2, Wallet, DollarSign, Receipt,
  FileSpreadsheet, Calendar, Clock, CheckCircle2, Send,
  FileCheck, ArrowRight, FileInput, BellRing, BarChart2,
  TrendingUp, PieChart, FileArchive
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  { id: 'interim_closing', label: 'Clôture Intermédiaire', icon: <FileArchive size={20} /> }
];

// Interfaces for clients section
interface Invoice {
  id: string;
  number: string;
  client: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
}

interface OpenItem {
  id: string;
  reference: string;
  client: string;
  date: string;
  dueDate: string;
  amount: number;
  remainingAmount: number;
  status: 'open' | 'partial' | 'overdue';
}

// Interfaces for suppliers section
interface SupplierInvoice {
  id: string;
  number: string;
  supplier: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
}

interface PaymentProposal {
  id: string;
  supplier: string;
  invoices: string[];
  amount: number;
  dueDate: string;
  status: 'draft' | 'approved' | 'processed';
}

// Mock data for clients
const mockInvoices: Invoice[] = [
  {
    id: '1',
    number: 'FAC-2025-001',
    client: 'Tech Solutions',
    date: '2025-04-15',
    dueDate: '2025-05-15',
    amount: 12500,
    status: 'sent'
  },
  {
    id: '2',
    number: 'FAC-2025-002',
    client: 'Digital Services',
    date: '2025-04-14',
    dueDate: '2025-05-14',
    amount: 8750,
    status: 'paid'
  }
];

const mockOpenItems: OpenItem[] = [
  {
    id: '1',
    reference: 'FAC-2025-001',
    client: 'Tech Solutions',
    date: '2025-04-15',
    dueDate: '2025-05-15',
    amount: 12500,
    remainingAmount: 12500,
    status: 'open'
  },
  {
    id: '2',
    reference: 'FAC-2025-002',
    client: 'Digital Services',
    date: '2025-04-14',
    dueDate: '2025-05-14',
    amount: 8750,
    remainingAmount: 0,
    status: 'partial'
  }
];

// Mock data for suppliers
const mockSupplierInvoices: SupplierInvoice[] = [
  {
    id: '1',
    number: 'FSUP-2025-001',
    supplier: 'Office Supplies Co',
    date: '2025-04-15',
    dueDate: '2025-05-15',
    amount: 2500,
    status: 'pending'
  },
  {
    id: '2',
    number: 'FSUP-2025-002',
    supplier: 'IT Services Ltd',
    date: '2025-04-14',
    dueDate: '2025-05-14',
    amount: 4800,
    status: 'approved'
  }
];

const mockPaymentProposals: PaymentProposal[] = [
  {
    id: '1',
    supplier: 'Office Supplies Co',
    invoices: ['FSUP-2025-001'],
    amount: 2500,
    dueDate: '2025-05-15',
    status: 'draft'
  },
  {
    id: '2',
    supplier: 'IT Services Ltd',
    invoices: ['FSUP-2025-002'],
    amount: 4800,
    dueDate: '2025-05-14',
    status: 'approved'
  }
];

// Bank reconciliation interfaces and data
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
  }
];

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

// New interfaces and mock data for interim closing
interface FinancialMetric {
  id: string;
  name: string;
  currentValue: number;
  previousValue: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

interface MonthlyReport {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  margin: number;
}

interface QuarterlyReport {
  quarter: string;
  revenue: number;
  expenses: number;
  profit: number;
  margin: number;
}

const mockMonthlyReports: MonthlyReport[] = [
  { month: 'Janvier', revenue: 150000, expenses: 95000, profit: 55000, margin: 36.67 },
  { month: 'Février', revenue: 165000, expenses: 102000, profit: 63000, margin: 38.18 },
  { month: 'Mars', revenue: 180000, expenses: 108000, profit: 72000, margin: 40.00 }
];

const mockQuarterlyReports: QuarterlyReport[] = [
  { quarter: 'Q1 2025', revenue: 495000, expenses: 305000, profit: 190000, margin: 38.38 },
  { quarter: 'Q4 2024', revenue: 480000, expenses: 298000, profit: 182000, margin: 37.92 },
  { quarter: 'Q3 2024', revenue: 450000, expenses: 285000, profit: 165000, margin: 36.67 }
];

const mockMetrics: FinancialMetric[] = [
  {
    id: '1',
    name: 'Chiffre d\'affaires',
    currentValue: 180000,
    previousValue: 165000,
    change: 9.09,
    trend: 'up'
  },
  {
    id: '2',
    name: 'Marge brute',
    currentValue: 72000,
    previousValue: 63000,
    change: 14.29,
    trend: 'up'
  },
  {
    id: '3',
    name: 'Trésorerie',
    currentValue: 250000,
    previousValue: 220000,
    change: 13.64,
    trend: 'up'
  },
  {
    id: '4',
    name: 'BFR',
    currentValue: 85000,
    previousValue: 90000,
    change: -5.56,
    trend: 'down'
  }
];

export const Finance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('interim_closing');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReconciliationType, setSelectedReconciliationType] = useState<'suppliers_customers' | 'accounting'>('suppliers_customers');
  const [activeClientSection, setActiveClientSection] = useState<'invoices' | 'open_items' | 'reminders'>('invoices');
  const [activeSupplierSection, setActiveSupplierSection] = useState<'entry' | 'payment_proposal' | 'payment' | 'open_items'>('entry');
  const [reportingPeriod, setReportingPeriod] = useState<'monthly' | 'quarterly'>('monthly');

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
        return <Badge variant="warning">Brouillon</Badge>;
      case 'sent':
        return <Badge variant="info">Envoyée</Badge>;
      case 'paid':
        return <Badge variant="success">Payée</Badge>;
      case 'overdue':
        return <Badge variant="error">En retard</Badge>;
      case 'open':
        return <Badge variant="info">Ouvert</Badge>;
      case 'partial':
        return <Badge variant="warning">Partiel</Badge>;
      case 'pending':
        return <Badge variant="warning">En attente</Badge>;
      case 'approved':
        return <Badge variant="success">Approuvé</Badge>;
      case 'rejected':
        return <Badge variant="error">Rejeté</Badge>;
      case 'processed':
        return <Badge variant="info">Traité</Badge>;
      case 'matched':
        return <Badge variant="success">Rapproché</Badge>;
      case 'unmatched':
        return <Badge variant="error">Non rapproché</Badge>;
      case 'posted':
        return <Badge variant="info">Comptabilisé</Badge>;
      case 'reconciled':
        return <Badge variant="success">Rapproché</Badge>;
      default:
        return null;
    }
  };

  const renderClientsTab = () => {
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
          <Button variant="primary" leftIcon={<Plus size={16} />}>
            Nouvelle facture
          </Button>
        </div>

        <Card>
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <Button
                variant={activeClientSection === 'invoices' ? 'primary' : 'ghost'}
                onClick={() => setActiveClientSection('invoices')}
              >
                Factures
              </Button>
              <Button
                variant={activeClientSection === 'open_items' ? 'primary' : 'ghost'}
                onClick={() => setActiveClientSection('open_items')}
              >
                Postes ouverts
              </Button>
              <Button
                variant={activeClientSection === 'reminders' ? 'primary' : 'ghost'}
                onClick={() => setActiveClientSection('reminders')}
              >
                Rappels
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {activeClientSection === 'invoices' && (
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
                      <tr 
                        key={invoice.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                          {invoice.number}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                          {invoice.client}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(invoice.date)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(invoice.dueDate)}
                        </td>
                        <td className="px-4 py-4 text-sm text-right font-medium text-gray-900 dark:text-white">
                          {formatCurrency(invoice.amount)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          {getStatusBadge(invoice.status)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2 justify-end">
                            <Button variant="ghost" size="sm" leftIcon={<FileCheck size={16} />}>
                              Voir
                            </Button>
                            <Button variant="ghost" size="sm" leftIcon={<Send size={16} />}>
                              Envoyer
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeClientSection === 'open_items' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Référence
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Montant
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Reste à payer
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockOpenItems.map((item) => (
                      <tr 
                        key={item.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                          {item.reference}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                          {item.client}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(item.date)}
                        </td>
                        <td className="px-4 py-4 text-sm text-right font-medium text-gray-900 dark:text-white">
                          {formatCurrency(item.amount)}
                        </td>
                        <td className="px-4 py-4 text-sm text-right font-medium text-red-600 dark:text-red-400">
                          {formatCurrency(item.remainingAmount)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm" leftIcon={<ArrowRight size={16} />}>
                            Détails
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeClientSection === 'reminders' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Niveau 1</h3>
                          <p className="text-2xl font-bold mt-2">12</p>
                        </div>
                        <BellRing className="text-yellow-500" size={24} />
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        Voir la liste
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Niveau 2</h3>
                          <p className="text-2xl font-bold mt-2">5</p>
                        </div>
                        <BellRing className="text-orange-500" size={24} />
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        Voir la liste
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Niveau 3</h3>
                          <p className="text-2xl font-bold mt-2">2</p>
                        </div>
                        <BellRing className="text-red-500" size={24} />
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        Voir la liste
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Configuration des rappels</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium mb-2">Niveau 1 - Amiable</h4>
                        <p className="text-sm text-gray-500 mb-4">
                          Envoyé 15 jours après l'échéance
                        </p>
                        <Button variant="outline" size="sm">
                          Modifier le modèle
                        </Button>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium mb-2">Niveau 2 - Mise en demeure</h4>
                        <p className="text-sm text-gray-500 mb-4">
                          Envoyé 30 jours après l'échéance
                        </p>
                        <Button variant="outline" size="sm">
                          Modifier le modèle
                        </Button>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium mb-2">Niveau 3 - Contentieux</h4>
                        <p className="text-sm text-gray-500 mb-4">
                          Envoyé 45 jours après l'échéance
                        </p>
                        <Button variant="outline" size="sm">
                          Modifier le modèle
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderSuppliersTab = () => {
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
          <Button variant="primary" leftIcon={<Plus size={16} />}>
            Nouvelle facture
          </Button>
        </div>

        <Card>
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <Button
                variant={activeSupplierSection === 'entry' ? 'primary' : 'ghost'}
                onClick={() => setActiveSupplierSection('entry')}
              >
                Saisie
              </Button>
              <Button
                variant={activeSupplierSection === 'payment_proposal' ? 'primary' : 'ghost'}
                onClick={() => setActiveSupplierSection('payment_proposal')}
              >
                Proposition de paiement
              </Button>
              <Button
                variant={activeSupplierSection === 'payment' ? 'primary' : 'ghost'}
                onClick={() => setActiveSupplierSection('payment')}
              >
                Mise au paiement
              </Button>
              <Button
                variant={activeSupplierSection === 'open_items' ? 'primary' : 'ghost'}
                onClick={() => setActiveSupplierSection('open_items')}
              >
                Postes ouverts
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {activeSupplierSection === 'entry' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Numéro
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Fournisseur
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
                    {mockSupplierInvoices.map((invoice) => (
                      <tr 
                        key={invoice.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                          {invoice.number}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                          {invoice.supplier}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(invoice.date)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(invoice.dueDate)}
                        </td>
                        <td className="px-4 py-4 text-sm text-right font-medium text-gray-900 dark:text-white">
                          {formatCurrency(invoice.amount)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          {getStatusBadge(invoice.status)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2 justify-end">
                
                            <Button variant="ghost" size="sm" leftIcon={<FileCheck size={16} />}>
                              Voir
                            </Button>
                            {invoice.status === 'pending' && (
                              <Button variant="ghost" size="sm" leftIcon={<Check size={16} />}>
                                Approuver
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeSupplierSection === 'payment_proposal' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">À payer</p>
                          <p className="text-2xl font-semibold mt-1">45 000 €</p>
                        </div>
                        <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
                          <ArrowUpRight className="text-red-500" size={24} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Échéances proches</p>
                          <p className="text-2xl font-semibold mt-1">12</p>
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
                          <p className="text-sm font-medium text-gray-500">Propositions</p>
                          <p className="text-2xl font-semibold mt-1">3</p>
                        </div>
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                          <FileText className="text-blue-500" size={24} />
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
                          Factures
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
                      {mockPaymentProposals.map((proposal) => (
                        <tr 
                          key={proposal.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                            {proposal.supplier}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {proposal.invoices.join(', ')}
                          </td>
                          <td className="px-4 py-4 text-sm text-right font-medium text-gray-900 dark:text-white">
                            {formatCurrency(proposal.amount)}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(proposal.dueDate)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            {getStatusBadge(proposal.status)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex space-x-2 justify-end">
                              {proposal.status === 'draft' && (
                                <>
                                  <Button variant="ghost" size="sm" leftIcon={<Check size={16} />}>
                                    Approuver
                                  </Button>
                                  <Button variant="ghost" size="sm" leftIcon={<X size={16} />}>
                                    Rejeter
                                  </Button>
                                </>
                              )}
                              {proposal.status === 'approved' && (
                                <Button variant="primary" size="sm" leftIcon={<Send size={16} />}>
                                  Mettre au paiement
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
            )}

            {activeSupplierSection === 'payment' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-4">Fichier de paiement</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Format
                          </label>
                          <select className="w-full rounded-lg border-gray-300 dark:border-gray-600">
                            <option>SEPA</option>
                            <option>ISO 20022</option>
                            <option>Autre format</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Date d'exécution
                          </label>
                          <input
                            type="date"
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600"
                          />
                        </div>
                        <Button variant="primary" fullWidth>
                          Générer le fichier
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-4">Historique des paiements</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <div>
                            <p className="font-medium">SEPA_20250415.xml</p>
                            <p className="text-sm text-gray-500">15/04/2025</p>
                          </div>
                          <Button variant="ghost" size="sm" leftIcon={<Download size={16} />}>
                            Télécharger
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <div>
                            <p className="font-medium">SEPA_20250401.xml</p>
                            <p className="text-sm text-gray-500">01/04/2025</p>
                          </div>
                          <Button variant="ghost" size="sm" leftIcon={<Download size={16} />}>
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Paiements en attente</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                              Date paiement
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Mode
                            </th>
                            <th className="px-4 py-3"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                              Aucun paiement en attente
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSupplierSection === 'open_items' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Fournisseur
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Facture
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
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
                  <tbody>
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                        Aucun poste ouvert
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
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
            <select
              value={reportingPeriod}
              onChange={(e) => setReportingPeriod(e.target.value as 'monthly' | 'quarterly')}
              className="rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            >
              <option value="monthly">Reporting mensuel</option>
              <option value="quarterly">Reporting trimestriel</option>
            </select>
            <Button variant="outline" size="sm" leftIcon={<Filter size={16} />}>
              Filtrer
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" leftIcon={<FileSpreadsheet size={16} />}>
              Export Excel
            </Button>
            <Button variant="outline" leftIcon={<FileText size={16} />}>
              Export PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockMetrics.map((metric) => (
            <Card key={metric.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{metric.name}</p>
                    <p className="text-2xl font-semibold mt-1">
                      {formatCurrency(metric.currentValue)}
                    </p>
                  </div>
                  <div className={`p-2 rounded-full ${
                    metric.trend === 'up' 
                      ? 'bg-green-100 dark:bg-green-900' 
                      : 'bg-red-100 dark:bg-red-900'
                  }`}>
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="text-green-500" size={24} />
                    ) : (
                      <ArrowDownRight className="text-red-500" size={24} />
                    )}
                  </div>
                </div>
                <div className={`mt-2 text-sm ${
                  metric.trend === 'up' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {metric.trend === 'up' ? '+' : ''}{metric.change}% vs période précédente
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance financière</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={reportingPeriod === 'monthly' ? mockMonthlyReports : mockQuarterlyReports}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey={reportingPeriod === 'monthly' ? 'month' : 'quarter'} 
                    />
                    <YAxis tickFormatter={(value) => `${value/1000}k€`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="revenue" name="CA" fill="#0046AD" />
                    <Bar dataKey="expenses" name="Charges" fill="#FF6B35" />
                    <Bar dataKey="profit" name="Résultat" fill="#00A3A1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Évolution de la marge</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart 
                    data={reportingPeriod === 'monthly' ? mockMonthlyReports : mockQuarterlyReports}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey={reportingPeriod === 'monthly' ? 'month' : 'quarter'} 
                    />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Area 
                      type="monotone" 
                      dataKey="margin" 
                      stroke="#0046AD" 
                      fill="#0046AD" 
                      fillOpacity={0.2}
                      name="Marge"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {reportingPeriod === 'monthly' ? 'Détail mensuel' : 'Détail trimestriel'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {reportingPeriod === 'monthly' ? 'Mois' : 'Trimestre'}
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      CA
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Charges
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Résultat
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Marge
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {(reportingPeriod === 'monthly' ? mockMonthlyReports : mockQuarterlyReports)
                    .map((report, index) => (
                    <tr 
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {reportingPeriod === 'monthly' ? report.month : report.quarter}
                      </td>
                      <td className="px-4 py-4 text-sm text-right font-medium text-gray-900 dark:text-white">
                        {formatCurrency(report.revenue)}
                      </td>
                      <td className="px-4 py-4 text-sm text-right font-medium text-gray-900 dark:text-white">
                        {formatCurrency(report.expenses)}
                      </td>
                      <td className="px-4 py-4 text-sm text-right font-medium text-gray-900 dark:text-white">
                        {formatCurrency(report.profit)}
                      </td>
                      <td className="px-4 py-4 text-sm text-right font-medium text-gray-900 dark:text-white">
                        {report.margin.toFixed(2)}%
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm" leftIcon={<FileText size={16} />}>
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
          {activeTab === 'clients' && renderClientsTab()}
          {activeTab === 'suppliers' && renderSuppliersTab()}
          {activeTab === 'bank_reconciliation' && renderBankReconciliation()}
          {activeTab === 'interim_closing' && renderInterimClosing()}
        </CardContent>
      </Card>
    </div>
  );
};