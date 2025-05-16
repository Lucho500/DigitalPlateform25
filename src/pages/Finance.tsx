import React, { useState } from 'react';
import { 
  Users, Building, Ban as Bank, FileText, Calculator, PieChart, 
  BarChart2, TrendingUp, ArrowUpRight, ArrowDownRight, Download,
  FileCheck, AlertCircle, Clock, BookOpen, FileSpreadsheet,
  ClipboardCheck, FileSignature, Search, Filter, Plus, Eye,
  CreditCard, Send, DollarSign, Receipt, Calendar, CheckCircle2,
  Briefcase, Tool, Archive, Box, HardDrive, HelpCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockInvoices, mockReminders, mockOpenItems } from '../data/mockData';

type TabType = 
  | 'clients' 
  | 'suppliers' 
  | 'bank_reconciliation' 
  | 'interim_closing' 
  | 'analytics' 
  | 'annual_closing'
  | 'payroll_entries'
  | 'inventory'
  | 'securities'
  | 'fixed_assets'
  | 'audit_support';

interface TabProps {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabProps[] = [
  { id: 'clients', label: 'Clients', icon: <Users size={20} /> },
  { id: 'suppliers', label: 'Fournisseurs', icon: <Building size={20} /> },
  { id: 'bank_reconciliation', label: 'Rapprochement bancaire', icon: <Bank size={20} /> },
  { id: 'interim_closing', label: 'Clôture intermédiaire', icon: <FileCheck size={20} /> },
  { id: 'analytics', label: 'Compta analytique', icon: <Calculator size={20} /> },
  { id: 'annual_closing', label: 'Clôture annuelle', icon: <BookOpen size={20} /> },
  { id: 'payroll_entries', label: 'Écritures salaires', icon: <FileSpreadsheet size={20} /> },
  { id: 'inventory', label: 'Gestion des stocks', icon: <Box size={20} /> },
  { id: 'securities', label: 'Gestion des titres', icon: <Briefcase size={20} /> },
  { id: 'fixed_assets', label: 'Gestion des immos', icon: <Archive size={20} /> },
  { id: 'audit_support', label: 'Support audit', icon: <HelpCircle size={20} /> }
];

type ClientTabType = 'invoices' | 'open_items' | 'reminders';
type SupplierTabType = 'entry' | 'payment_proposal' | 'payment' | 'open_items';
type BankReconciliationType = 'supplier_reconciliation' | 'debtor_reconciliation' | 'cofi_accounting';

const Finance = () => {
  const [activeTab, setActiveTab] = useState<TabType>('clients');
  const [clientTab, setClientTab] = useState<ClientTabType>('invoices');
  const [supplierTab, setSupplierTab] = useState<SupplierTabType>('entry');
  const [bankTab, setBankTab] = useState<BankReconciliationType>('supplier_reconciliation');
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'clients':
        return (
          <Card>
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Button
                  variant={clientTab === 'invoices' ? 'primary' : 'ghost'}
                  onClick={() => setClientTab('invoices')}
                >
                  Factures et offres
                </Button>
                <Button
                  variant={clientTab === 'open_items' ? 'primary' : 'ghost'}
                  onClick={() => setClientTab('open_items')}
                >
                  Postes ouverts débiteurs
                </Button>
                <Button
                  variant={clientTab === 'reminders' ? 'primary' : 'ghost'}
                  onClick={() => setClientTab('reminders')}
                >
                  Gestion des rappels
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Existing client content */}
            </CardContent>
          </Card>
        );

      case 'suppliers':
        return (
          <Card>
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Button
                  variant={supplierTab === 'entry' ? 'primary' : 'ghost'}
                  onClick={() => setSupplierTab('entry')}
                >
                  Saisie
                </Button>
                <Button
                  variant={supplierTab === 'payment_proposal' ? 'primary' : 'ghost'}
                  onClick={() => setSupplierTab('payment_proposal')}
                >
                  Proposition de paiement
                </Button>
                <Button
                  variant={supplierTab === 'payment' ? 'primary' : 'ghost'}
                  onClick={() => setSupplierTab('payment')}
                >
                  Mise au paiement
                </Button>
                <Button
                  variant={supplierTab === 'open_items' ? 'primary' : 'ghost'}
                  onClick={() => setSupplierTab('open_items')}
                >
                  Postes ouverts créanciers
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Supplier content based on supplierTab */}
            </CardContent>
          </Card>
        );

      case 'bank_reconciliation':
        return (
          <Card>
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Button
                  variant={bankTab === 'supplier_reconciliation' ? 'primary' : 'ghost'}
                  onClick={() => setBankTab('supplier_reconciliation')}
                >
                  Acquittement Fournisseurs
                </Button>
                <Button
                  variant={bankTab === 'debtor_reconciliation' ? 'primary' : 'ghost'}
                  onClick={() => setBankTab('debtor_reconciliation')}
                >
                  Acquittement Débiteurs
                </Button>
                <Button
                  variant={bankTab === 'cofi_accounting' ? 'primary' : 'ghost'}
                  onClick={() => setBankTab('cofi_accounting')}
                >
                  Comptabilisation COFI
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Bank reconciliation content based on bankTab */}
            </CardContent>
          </Card>
        );

      case 'interim_closing':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Reporting de clôture intermédiaire</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Interim closing reporting content */}
            </CardContent>
          </Card>
        );

      case 'analytics':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Comptabilité analytique</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Analytics content */}
            </CardContent>
          </Card>
        );

      case 'annual_closing':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Écritures de clôture</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Annual closing entries content */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dossier de clôture documenté et justifié</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Closing documentation content */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>États financiers</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Financial statements content */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>PVAGO</CardTitle>
              </CardHeader>
              <CardContent>
                {/* PVAGO content */}
              </CardContent>
            </Card>
          </div>
        );

      case 'payroll_entries':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Import des écritures de salaire</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Payroll entries import content */}
            </CardContent>
          </Card>
        );

      case 'inventory':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Gestion des stocks - Inventaire permanent</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Inventory management content */}
            </CardContent>
          </Card>
        );

      case 'securities':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Gestion des titres (en valeur marché)</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Securities management content */}
            </CardContent>
          </Card>
        );

      case 'fixed_assets':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Gestion des immobilisations</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Fixed assets management content */}
            </CardContent>
          </Card>
        );

      case 'audit_support':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Support à l'audit</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Audit support content */}
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
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
        <div className="flex items-center space-x-3">
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
      </div>

      <Card className="mb-6">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2 overflow-x-auto">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'ghost'}
                onClick={() => setActiveTab(tab.id)}
                className="whitespace-nowrap"
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </Button>
            ))}
          </div>
        </CardHeader>
      </Card>

      {renderContent()}
    </div>
  );
};

export default Finance;
export { Finance };