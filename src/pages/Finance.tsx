import React, { useState } from 'react';
import { 
  FileText, Users, CreditCard, Ban as Bank, BarChart, Calculator, 
  BookOpen, Archive, Package, Briefcase, HelpCircle, Download, 
  Upload, Plus, Search, Filter, Eye, Edit, Trash2, Clock,
  AlertCircle, CheckCircle, FileCheck, Send, Printer
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

type Section = 
  | 'clients'
  | 'fournisseurs'
  | 'rapprochement'
  | 'cloture_intermediaire'
  | 'compta_analytique'
  | 'cloture_annuelle'
  | 'import_salaires'
  | 'stocks'
  | 'titres'
  | 'immos'
  | 'support_audit';

type ClientSubSection = 'factures' | 'debiteurs' | 'rappels';

interface MenuItem {
  id: Section;
  title: string;
  icon: React.ReactNode;
  subsections?: { id: string; title: string }[];
}

interface Invoice {
  id: string;
  number: string;
  client: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  balance: number;
  status: 'active' | 'inactive';
}

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  balance: number;
  status: 'active' | 'inactive';
  iban: string;
  paymentTerms: number;
}

interface SupplierInvoice {
  id: string;
  number: string;
  supplier: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  paymentDate?: string;
}

interface PaymentProposal {
  id: string;
  supplier: string;
  invoices: string[];
  amount: number;
  dueDate: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'high' | 'medium' | 'low';
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    number: 'FA2025-001',
    client: 'Tech Solutions SA',
    date: '2025-04-01',
    dueDate: '2025-05-01',
    amount: 12500,
    status: 'sent'
  },
  {
    id: '2',
    number: 'FA2025-002',
    client: 'Digital Services SARL',
    date: '2025-04-05',
    dueDate: '2025-05-05',
    amount: 8750,
    status: 'overdue'
  },
  {
    id: '3',
    number: 'FA2025-003',
    client: 'Innovation Corp',
    date: '2025-04-10',
    dueDate: '2025-05-10',
    amount: 15000,
    status: 'paid'
  }
];

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Tech Solutions SA',
    email: 'contact@techsolutions.com',
    phone: '+41 22 123 45 67',
    address: '123 Rue de l\'Innovation, 1201 Genève',
    balance: 25000,
    status: 'active'
  },
  {
    id: '2',
    name: 'Digital Services SARL',
    email: 'info@digitalservices.com',
    phone: '+41 22 234 56 78',
    address: '456 Avenue Digitale, 1202 Genève',
    balance: 12500,
    status: 'active'
  }
];

const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Office Solutions SA',
    email: 'contact@officesolutions.ch',
    phone: '+41 22 345 67 89',
    address: '789 Rue du Commerce, 1204 Genève',
    balance: 15000,
    status: 'active',
    iban: 'CH93 0076 2011 6238 5295 7',
    paymentTerms: 30
  },
  {
    id: '2',
    name: 'IT Services SARL',
    email: 'finance@itservices.ch',
    phone: '+41 22 456 78 90',
    address: '321 Avenue Technique, 1205 Genève',
    balance: 8500,
    status: 'active',
    iban: 'CH58 0023 5678 1234 5678 9',
    paymentTerms: 45
  }
];

const mockSupplierInvoices: SupplierInvoice[] = [
  {
    id: '1',
    number: 'FV2025-001',
    supplier: 'Office Solutions SA',
    date: '2025-04-01',
    dueDate: '2025-05-01',
    amount: 5600,
    status: 'pending'
  },
  {
    id: '2',
    number: 'FV2025-002',
    supplier: 'IT Services SARL',
    date: '2025-04-05',
    dueDate: '2025-05-20',
    amount: 12800,
    status: 'approved'
  },
  {
    id: '3',
    number: 'FV2025-003',
    supplier: 'Office Solutions SA',
    date: '2025-04-10',
    dueDate: '2025-05-10',
    amount: 3200,
    status: 'paid',
    paymentDate: '2025-04-15'
  }
];

const mockPaymentProposals: PaymentProposal[] = [
  {
    id: '1',
    supplier: 'Office Solutions SA',
    invoices: ['FV2025-001'],
    amount: 5600,
    dueDate: '2025-05-01',
    status: 'pending',
    priority: 'high'
  },
  {
    id: '2',
    supplier: 'IT Services SARL',
    invoices: ['FV2025-002'],
    amount: 12800,
    dueDate: '2025-05-20',
    status: 'approved',
    priority: 'medium'
  }
];

export const Finance: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('clients');
  const [activeSubSection, setActiveSubSection] = useState<ClientSubSection>('factures');
  const [activeSupplierSection, setActiveSupplierSection] = useState('saisie');
  const [searchTerm, setSearchTerm] = useState('');

  const menuItems: MenuItem[] = [
    {
      id: 'clients',
      title: 'Clients',
      icon: <Users size={20} />,
      subsections: [
        { id: 'factures', title: 'Factures et offres' },
        { id: 'debiteurs', title: 'Postes ouverts débiteurs' },
        { id: 'rappels', title: 'Gestion des rappels' }
      ]
    },
    {
      id: 'fournisseurs',
      title: 'Fournisseurs',
      icon: <CreditCard size={20} />,
      subsections: [
        { id: 'saisie', title: 'Saisie' },
        { id: 'proposition', title: 'Proposition de paiement' },
        { id: 'paiement', title: 'Mise au paiement' },
        { id: 'creanciers', title: 'Postes ouverts créanciers' }
      ]
    },
    {
      id: 'rapprochement',
      title: 'Rapprochement Bancaire',
      icon: <Bank size={20} />,
      subsections: [
        { id: 'acquittement', title: 'Acquittement Fournisseurs / débiteurs' },
        { id: 'cofi', title: 'Comptabilisation COFI' }
      ]
    },
    {
      id: 'cloture_intermediaire',
      title: 'Clôture Intermédiaire',
      icon: <BarChart size={20} />,
      subsections: [
        { id: 'reporting', title: 'Reporting' }
      ]
    },
    {
      id: 'compta_analytique',
      title: 'Compta Analytique',
      icon: <Calculator size={20} />
    },
    {
      id: 'cloture_annuelle',
      title: 'Clôture Annuelle',
      icon: <BookOpen size={20} />,
      subsections: [
        { id: 'ecritures', title: 'Écritures' },
        { id: 'dossier', title: 'Dossier de clôture documenté' },
        { id: 'etats', title: 'États financiers' },
        { id: 'pvago', title: 'PVAGO' }
      ]
    },
    {
      id: 'import_salaires',
      title: 'Import Écritures Salaire',
      icon: <Upload size={20} />
    },
    {
      id: 'stocks',
      title: 'Gestion des Stocks',
      icon: <Package size={20} />
    },
    {
      id: 'titres',
      title: 'Gestion des titres',
      icon: <Archive size={20} />
    },
    {
      id: 'immos',
      title: 'Gestion des immos',
      icon: <Briefcase size={20} />
    },
    {
      id: 'support_audit',
      title: 'Support à l\'audit',
      icon: <HelpCircle size={20} />
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CH', {
      style: 'currency',
      currency: 'CHF'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-CH', {
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
      case 'active':
        return <Badge variant="success">Actif</Badge>;
      case 'inactive':
        return <Badge variant="error">Inactif</Badge>;
      case 'pending':
        return <Badge variant="warning">En attente</Badge>;
      case 'approved':
        return <Badge variant="success">Approuvé</Badge>;
      case 'rejected':
        return <Badge variant="error">Rejeté</Badge>;
      default:
        return null;
    }
  };

  const renderClientsContent = () => {
    switch (activeSubSection) {
      case 'factures':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une facture..."
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
                  Importer
                </Button>
                <Button variant="primary" leftIcon={<Plus size={16} />}>
                  Nouvelle facture
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Factures récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          N° Facture
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
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium">
                            {formatCurrency(invoice.amount)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            {getStatusBadge(invoice.status)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Send size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Printer size={16} />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total facturé</p>
                      <h3 className="text-2xl font-semibold mt-1">36'250 CHF</h3>
                    </div>
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                      <FileCheck size={24} className="text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">En attente</p>
                      <h3 className="text-2xl font-semibold mt-1">21'250 CHF</h3>
                    </div>
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                      <Clock size={24} className="text-yellow-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">En retard</p>
                      <h3 className="text-2xl font-semibold mt-1">8'750 CHF</h3>
                    </div>
                    <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                      <AlertCircle size={24} className="text-red-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'debiteurs':
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
                Nouveau client
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Postes ouverts débiteurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Adresse
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Solde
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
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {client.name}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {client.email}
                              <br />
                              {client.phone}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {client.address}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium">
                            {formatCurrency(client.balance)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            {getStatusBadge(client.status)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 size={16} />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total débiteurs</p>
                      <h3 className="text-2xl font-semibold mt-1">37'500 CHF</h3>
                    </div>
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <Users size={24} className="text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Clients actifs</p>
                      <h3 className="text-2xl font-semibold mt-1">12</h3>
                    </div>
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                      <CheckCircle size={24} className="text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">DSO</p>
                      <h3 className="text-2xl font-semibold mt-1">45 jours</h3>
                    </div>
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                      <Clock size={24} className="text-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'rappels':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un rappel..."
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
                <Button variant="outline" leftIcon={<Send size={16} />}>
                  Envoyer les rappels
                </Button>
                <Button variant="primary" leftIcon={<Plus size={16} />}>
                  Nouveau rappel
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>1er rappel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Nombre</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Montant total</span>
                      <span className="font-medium">12'500 CHF</span>
                    </div>
                    <Button variant="outline" fullWidth>
                      Voir les factures
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2ème rappel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Nombre</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Montant total</span>
                      <span className="font-medium">8'750 CHF</span>
                    </div>
                    <Button variant="outline" fullWidth>
                      Voir les factures
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3ème rappel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Nombre</span>
                      <span className="font-medium">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Montant total</span>
                      <span className="font-medium">2'500 CHF</span>
                    </div>
                    <Button variant="outline" fullWidth>
                      Voir les factures
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Historique des rappels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Facture
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Niveau
                        </th>
                        
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date d'envoi
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Montant
                        </th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                          Aucun rappel envoyé récemment
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const renderSuppliersContent = () => {
    switch (activeSupplierSection) {
      case 'saisie':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une facture..."
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
                  Scanner
                </Button>
                <Button variant="primary" leftIcon={<Plus size={16} />}>
                  Nouvelle facture
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Factures fournisseurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          N° Facture
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
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {invoice.number}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {invoice.supplier}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(invoice.date)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(invoice.dueDate)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium">
                            {formatCurrency(invoice.amount)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            {getStatusBadge(invoice.status)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 size={16} />
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

      case 'proposition':
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
                Nouvelle proposition
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Propositions de paiement</CardTitle>
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
                          Échéance
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Montant
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Priorité
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
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {proposal.supplier}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(proposal.dueDate)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium">
                            {formatCurrency(proposal.amount)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            <Badge 
                              variant={
                                proposal.priority === 'high' ? 'error' :
                                proposal.priority === 'medium' ? 'warning' : 'info'
                              }
                            >
                              {proposal.priority === 'high' ? 'Haute' :
                               proposal.priority === 'medium' ? 'Moyenne' : 'Basse'}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            {getStatusBadge(proposal.status)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 size={16} />
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

      case 'paiement':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mise au paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-4">Paiements en attente</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Nombre de paiements</span>
                          <span className="font-medium">5</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Montant total</span>
                          <span className="font-medium">18'400 CHF</span>
                        </div>
                      </div>
                      <Button variant="primary" className="w-full mt-4">
                        Préparer le fichier DTA
                      </Button>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-4">Dernier paiement</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Date</span>
                          <span className="font-medium">15.04.2025</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Montant</span>
                          <span className="font-medium">25'600 CHF</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        Voir le détail
                      </Button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Référence
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Montant
                          </th>
                          <th className="px-4 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                            Aucun paiement en attente
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'creanciers':
        return (
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
                Nouveau fournisseur
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Postes ouverts créanciers</CardTitle>
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
                          Contact
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          IBAN
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Solde
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
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {supplier.name}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {supplier.email}
                              <br />
                              {supplier.phone}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {supplier.iban}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium">
                            {formatCurrency(supplier.balance)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            {getStatusBadge(supplier.status)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 size={16} />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total créanciers</p>
                      <h3 className="text-2xl font-semibold mt-1">23'500 CHF</h3>
                    </div>
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <Users size={24} className="text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Fournisseurs actifs</p>
                      <h3 className="text-2xl font-semibold mt-1">8</h3>
                    </div>
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                      <CheckCircle size={24} className="text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">DPO</p>
                      <h3 className="text-2xl font-semibold mt-1">32 jours</h3>
                    </div>
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                      <Clock size={24} className="text-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderContent = () => {
    if (activeSection === 'clients') {
      return (
        <div className="space-y-6">
          <div className="flex space-x-2">
            {menuItems[0].subsections?.map((subsection) => (
              <Button
                key={subsection.id}
                variant={activeSubSection === subsection.id ? 'primary' : 'outline'}
                onClick={() => setActiveSubSection(subsection.id as ClientSubSection)}
              >
                {subsection.title}
              </Button>
            ))}
          </div>
          {renderClientsContent()}
        </div>
      );
    }

    if (activeSection === 'fournisseurs') {
      return (
        <div className="space-y-6">
          <div className="flex space-x-2">
            {menuItems[1].subsections?.map((subsection) => (
              <Button
                key={subsection.id}
                variant={activeSupplierSection === subsection.id ? 'primary' : 'outline'}
                onClick={() => setActiveSupplierSection(subsection.id)}
              >
                {subsection.title}
              </Button>
            ))}
          </div>
          {renderSuppliersContent()}
        </div>
      );
    }

    return (
      <Card>
        <CardContent>
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            Cette section est en cours de développement
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Finance</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gestion financière et comptable
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-[#0046AD] text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};