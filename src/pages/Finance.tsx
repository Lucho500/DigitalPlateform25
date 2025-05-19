import React, { useState } from 'react';
import { 
  Users, Building, Ban as Bank, FileCheck, Calculator, PieChart, 
  BarChart2, TrendingUp, ArrowUpRight, ArrowDownRight, Download,
  FileText, CheckCircle, AlertCircle, Clock, BookOpen, FileSpreadsheet,
  ClipboardCheck, FileSignature, Search, Filter, Plus, Eye, ArrowRight,
  CreditCard, Receipt, FileArchive, Mail, DollarSign, Package, Briefcase,
  HelpCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockBankReconciliations, mockCOFIEntries } from '../data/mockData';

type TabType = 
  | 'clients' 
  | 'suppliers' 
  | 'bank_reconciliation' 
  | 'interim_closing' 
  | 'analytics' 
  | 'annual_closing'
  | 'salary_entries'
  | 'inventory'
  | 'securities'
  | 'fixed_assets'
  | 'audit_support';

interface TabProps {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  subTabs?: {
    id: string;
    label: string;
  }[];
}

export const Finance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('clients');
  const [activeSubTab, setActiveSubTab] = useState<string>('invoices');
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const tabs: TabProps[] = [
    { 
      id: 'clients', 
      label: 'Clients', 
      icon: <Users size={20} />,
      subTabs: [
        { id: 'invoices', label: 'Factures et offres' },
        { id: 'open_items', label: 'Postes ouverts débiteurs' },
        { id: 'reminders', label: 'Gestion des rappels' }
      ]
    },
    { 
      id: 'suppliers', 
      label: 'Fournisseurs', 
      icon: <Building size={20} />,
      subTabs: [
        { id: 'entry', label: 'Saisie' },
        { id: 'payment_proposal', label: 'Proposition de paiement' },
        { id: 'payment', label: 'Mise au paiement' },
        { id: 'open_items', label: 'Postes ouverts créanciers' }
      ]
    },
    { 
      id: 'bank_reconciliation', 
      label: 'Rapprochement bancaire', 
      icon: <Bank size={20} />,
      subTabs: [
        { id: 'reconciliation', label: 'Acquittement Fournisseurs / débiteurs' },
        { id: 'cofi', label: 'Comptabilisation COFI' }
      ]
    },
    { 
      id: 'interim_closing', 
      label: 'Clôture intermédiaire', 
      icon: <FileCheck size={20} />,
      subTabs: [
        { id: 'reporting', label: 'Reporting' }
      ]
    },
    { 
      id: 'analytics', 
      label: 'Compta analytique', 
      icon: <Calculator size={20} /> 
    },
    { 
      id: 'annual_closing', 
      label: 'Clôture annuelle', 
      icon: <BookOpen size={20} />,
      subTabs: [
        { id: 'entries', label: 'Écritures' },
        { id: 'documentation', label: 'Dossier de clôture documenté' },
        { id: 'financial_statements', label: 'États financiers' },
        { id: 'pvago', label: 'PVAGO' }
      ]
    },
    { 
      id: 'salary_entries', 
      label: 'Import écritures salaire', 
      icon: <DollarSign size={20} /> 
    },
    { 
      id: 'inventory', 
      label: 'Gestion des stocks', 
      icon: <Package size={20} /> 
    },
    { 
      id: 'securities', 
      label: 'Gestion des titres', 
      icon: <Briefcase size={20} /> 
    },
    { 
      id: 'fixed_assets', 
      label: 'Gestion des immos', 
      icon: <Building size={20} /> 
    },
    { 
      id: 'audit_support', 
      label: 'Support à l\'audit', 
      icon: <HelpCircle size={20} /> 
    }
  ];

  const renderClientsTab = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Chiffre d'affaires</p>
                  <h3 className="text-xl font-semibold mt-1">450 000 €</h3>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <CreditCard className="text-green-500" size={20} />
                </div>
              </div>
              <div className="mt-2 text-sm text-green-600">+12% vs N-1</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Encours client</p>
                  <h3 className="text-xl font-semibold mt-1">85 000 €</h3>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Receipt className="text-blue-500" size={20} />
                </div>
              </div>
              <div className="mt-2 text-sm text-blue-600">45 jours</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Clients actifs</p>
                  <h3 className="text-xl font-semibold mt-1">42</h3>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <Users className="text-purple-500" size={20} />
                </div>
              </div>
              <div className="mt-2 text-sm text-purple-600">+2 ce mois</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Factures en retard</p>
                  <h3 className="text-xl font-semibold mt-1">5</h3>
                </div>
                <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
                  <AlertCircle className="text-red-500" size={20} />
                </div>
              </div>
              <div className="mt-2 text-sm text-red-600">15 000 €</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des clients</CardTitle>
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
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      CA (12 mois)
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Encours
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Tech Solutions SAS
                        </p>
                        <p className="text-sm text-gray-500">
                          Paris, France
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm">Jean Dupont</p>
                        <p className="text-sm text-gray-500">jean.dupont@techsolutions.fr</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right font-medium">
                      85 000 €
                    </td>
                    <td className="px-4 py-4 text-right font-medium">
                      12 500 €
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Badge variant="success">Actif</Badge>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button variant="ghost" size="sm">
                        <Eye size={16} className="mr-2" />
                        Voir
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Achats</p>
                  <h3 className="text-xl font-semibold mt-1">280 000 €</h3>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Building className="text-blue-500" size={20} />
                </div>
              </div>
              <div className="mt-2 text-sm text-blue-600">+8% vs N-1</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Dettes fournisseurs</p>
                  <h3 className="text-xl font-semibold mt-1">45 000 €</h3>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <Receipt className="text-green-500" size={20} />
                </div>
              </div>
              <div className="mt-2 text-sm text-green-600">30 jours</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Fournisseurs actifs</p>
                  <h3 className="text-xl font-semibold mt-1">28</h3>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <Building className="text-purple-500" size={20} />
                </div>
              </div>
              <div className="mt-2 text-sm text-purple-600">Stable</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Factures en attente</p>
                  <h3 className="text-xl font-semibold mt-1">8</h3>
                </div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                  <Clock className="text-yellow-500" size={20} />
                </div>
              </div>
              <div className="mt-2 text-sm text-yellow-600">25 000 €</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des fournisseurs</CardTitle>
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
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Achats (12 mois)
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Encours
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Office Supplies Corp
                        </p>
                        <p className="text-sm text-gray-500">
                          Lyon, France
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm">Marie Martin</p>
                        <p className="text-sm text-gray-500">marie.martin@officesupplies.fr</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right font-medium">
                      45 000 €
                    </td>
                    <td className="px-4 py-4 text-right font-medium">
                      8 500 €
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Badge variant="success">Actif</Badge>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button variant="ghost" size="sm">
                        <Eye size={16} className="mr-2" />
                        Voir
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent focus:border-[#0046AD] focus:ring-1 focus:ring-[#0046AD] text-sm w-64"
              />
            </div>
            <Button variant="outline" size="sm" leftIcon={<Filter size={16} />}>
              Filtrer
            </Button>
          </div>
          <Button variant="primary" leftIcon={<Plus size={16} />}>
            Nouvelle écriture
          </Button>
        </div>

        <Card>
          <CardContent>
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
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockBankReconciliations.map((reconciliation) => (
                    <tr 
                      key={reconciliation.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(reconciliation.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {reconciliation.reference}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {reconciliation.description}
                      </td>
                      <td className={`px-4 py-4 whitespace-nowrap text-sm text-right font-medium ${
                        reconciliation.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {formatCurrency(reconciliation.amount)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <Badge 
                          variant={
                            reconciliation.status === 'reconciled' ? 'success' :
                            reconciliation.status === 'matched' ? 'info' :
                            'warning'
                          }
                        >
                          {reconciliation.status === 'reconciled' ? 'Rapproché' :
                           reconciliation.status === 'matched' ? 'Lettré' :
                           'En attente'}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
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
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderInterimClosing = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Clôture intermédiaire</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Contenu du tab clôture intermédiaire */}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAnalyticsTab = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Comptabilité analytique</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Contenu du tab analytique */}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAnnualClosing = () => {
    return (
      <div className="space-y-6">
        {/* Écritures */}
        <Card>
          <CardHeader>
            <CardTitle>Écritures de clôture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <FileText className="text-blue-500" size={24} />
                    <h4 className="font-medium">Écritures d'inventaire</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>À traiter</span>
                      <Badge variant="warning">8</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Validées</span>
                      <Badge variant="success">12</Badge>
                    </div>
                    <Button variant="outline" fullWidth className="mt-2">
                      Gérer
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <FileSpreadsheet className="text-green-500" size={24} />
                    <h4 className="font-medium">Écritures de régularisation</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>À traiter</span>
                      <Badge variant="warning">5</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Validées</span>
                      <Badge variant="success">15</Badge>
                    </div>
                    <Button variant="outline" fullWidth className="mt-2">
                      Gérer
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <ClipboardCheck className="text-purple-500" size={24} />
                    <h4 className="font-medium">Écritures de bilan</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>À traiter</span>
                      <Badge variant="warning">3</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Validées</span>
                      <Badge variant="success">18</Badge>
                    </div>
                    <Button variant="outline" fullWidth className="mt-2">
                      Gérer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dossier de clôture */}
        <Card>
          <CardHeader>
            <CardTitle>Dossier de clôture documenté et justifié</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-4">Documents obligatoires</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Balance générale</span>
                      <Badge variant="success">Validé</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Grand livre</span>
                      <Badge variant="success">Validé</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Journal centralisateur</span>
                      <Badge variant="warning">En cours</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-4">Justificatifs</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Relevés bancaires</span>
                      <Badge variant="success">Complet</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Factures</span>
                      <Badge variant="warning">95%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Contrats</span>
                      <Badge variant="success">Complet</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* États financiers */}
        <Card>
          <CardHeader>
            <CardTitle>États financiers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Bilan</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Actif</span>
                      <span className="font-medium">1.2M€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Passif</span>
                      <span className="font-medium">1.2M€</span>
                    </div>
                    <Button variant="outline" fullWidth className="mt-2">
                      Voir détails
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Compte de résultat</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Résultat net</span>
                      <span className="font-medium text-green-500">+250k€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Variation N-1</span>
                      <span className="font-medium text-green-500">+15%</span>
                    </div>
                    <Button variant="outline" fullWidth className="mt-2">
                      Voir détails
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Annexes</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sections complétées</span>
                      <span className="font-medium">18/20</span>
                    </div>
                    <div className="flex justify-between">
                      <span>État</span>
                      <Badge variant="warning">En cours</Badge>
                    </div>
                    <Button variant="outline" fullWidth className="mt-2">
                      Compléter
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PVAGO */}
        <Card>
          <CardHeader>
            <CardTitle>PV d'Assemblée Générale Ordinaire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <FileSignature className="text-blue-500" size={24} />
                    <h4 className="font-medium">État du document</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Version</span>
                      <span className="font-medium">2.1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dernière modification</span>
                      <span className="font-medium">15/04/2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Statut</span>
                      <Badge variant="warning">En révision</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <ClipboardCheck className="text-green-500" size={24} />
                    <h4 className="font-medium">Actions requises</h4>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" fullWidth>
                      Modifier le document
                    </Button>
                    <Button variant="outline" fullWidth>
                      Ajouter des annexes
                    </Button>
                    <Button variant="primary" fullWidth>
                      Envoyer pour signature
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'ghost'}
            onClick={() => {
              setActiveTab(tab.id);
              if (tab.subTabs?.length) {
                setActiveSubTab(tab.subTabs[0].id);
              }
            }}
            className="flex items-center space-x-2"
          >
            {tab.icon}
            <span>{tab.label}</span>
          </Button>
        ))}
      </div>

      {/* Sous-onglets */}
      {tabs.find(t => t.id === activeTab)?.subTabs && (
        <div className="flex gap-2 mt-4 border-b border-gray-200 dark:border-gray-700 pb-2">
          {tabs.find(t => t.id === activeTab)?.subTabs?.map((subTab) => (
            <Button
              key={subTab.id}
              variant={activeSubTab === subTab.id ? 'primary' : 'ghost'}
              onClick={() => setActiveSubTab(subTab.id)}
              size="sm"
            >
              {subTab.label}
            </Button>
          ))}
        </div>
      )}

      {/* Contenu des onglets */}
      <div className="mt-6">
        {activeTab === 'clients' && renderClientsTab()}
        {activeTab === 'suppliers' && renderSuppliersTab()}
        {activeTab === 'bank_reconciliation' && renderBankReconciliation()}
        {activeTab === 'interim_closing' && renderInterimClosing()}
        {activeTab === 'annual_closing' && renderAnnualClosing()}
        {activeTab === 'analytics' && renderAnalyticsTab()}
      </div>
    </div>
  );
};