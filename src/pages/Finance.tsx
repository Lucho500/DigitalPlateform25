import React, { useState } from 'react';
import { 
  Users, Building, Ban as Bank, FileCheck, Calculator, PieChart, 
  BarChart2, TrendingUp, ArrowUpRight, ArrowDownRight, Download,
  FileText, CheckCircle, AlertCircle, Clock, BookOpen, FileSpreadsheet,
  ClipboardCheck, FileSignature, Search, Filter, Plus, Eye
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockBankReconciliations, mockCOFIEntries } from '../data/mockData';

export const Finance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bank_reconciliation');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'bank_reconciliation', label: 'Rapprochement bancaire', icon: <Bank size={20} /> },
    { id: 'annual_closing', label: 'Clôture Annuelle', icon: <BookOpen size={20} /> },
    { id: 'analytics', label: 'Comptabilité analytique', icon: <Calculator size={20} /> }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
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
      case 'pending':
        return <Badge variant="warning">En attente</Badge>;
      case 'matched':
        return <Badge variant="info">Lettré</Badge>;
      case 'reconciled':
        return <Badge variant="success">Rapproché</Badge>;
      case 'draft':
        return <Badge variant="warning">Brouillon</Badge>;
      case 'posted':
        return <Badge variant="success">Comptabilisé</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  const renderBankReconciliation = () => {
    return (
      <div className="space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Solde bancaire</p>
                  <h3 className="text-2xl font-semibold mt-1">125 000 €</h3>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Bank className="text-blue-500" size={24} />
                </div>
              </div>
              <div className="mt-2 text-sm text-blue-600">Mis à jour aujourd'hui</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">À rapprocher</p>
                  <h3 className="text-2xl font-semibold mt-1">45 000 €</h3>
                </div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                  <Clock className="text-yellow-500" size={24} />
                </div>
              </div>
              <div className="mt-2 text-sm text-yellow-600">12 opérations en attente</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Rapproché</p>
                  <h3 className="text-2xl font-semibold mt-1">80 000 €</h3>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <CheckCircle className="text-green-500" size={24} />
                </div>
              </div>
              <div className="mt-2 text-sm text-green-600">28 opérations rapprochées</div>
            </CardContent>
          </Card>
        </div>

        {/* Opérations bancaires */}
        <Card>
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <CardTitle>Opérations bancaires</CardTitle>
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
                <Button variant="primary" leftIcon={<Plus size={16} />}>
                  Nouvelle opération
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
                  {mockBankReconciliations.map((operation) => (
                    <tr 
                      key={operation.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(operation.date)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {operation.reference}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {operation.description}
                      </td>
                      <td className={`px-4 py-4 whitespace-nowrap text-sm text-right font-medium ${
                        operation.amount >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatCurrency(operation.amount)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {getStatusBadge(operation.status)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} className="mr-2" />
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

        {/* Écritures COFI */}
        <Card>
          <CardHeader>
            <CardTitle>Écritures COFI</CardTitle>
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
                  {mockCOFIEntries.map((entry) => (
                    <tr 
                      key={entry.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(entry.date)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {entry.account}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {entry.description}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                        {entry.debit > 0 ? formatCurrency(entry.debit) : '-'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                        {entry.credit > 0 ? formatCurrency(entry.credit) : '-'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {getStatusBadge(entry.status)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} className="mr-2" />
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
    <div className="p-6 space-y-6">
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'ghost'}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span className="ml-2">{tab.label}</span>
          </Button>
        ))}
      </div>

      {activeTab === 'bank_reconciliation' && renderBankReconciliation()}
      {activeTab === 'annual_closing' && renderAnnualClosing()}
      {activeTab === 'analytics' && renderAnalyticsTab()}
    </div>
  );
};

export { Finance };