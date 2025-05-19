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
  const [activeTab, setActiveTab] = useState('annual_closing');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const renderClientsTab = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestion des clients</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Contenu du tab clients */}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderSuppliersTab = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestion des fournisseurs</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Contenu du tab fournisseurs */}
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

  const tabs = [
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'suppliers', label: 'Fournisseurs', icon: Building },
    { id: 'bank_reconciliation', label: 'Rapprochement bancaire', icon: Bank },
    { id: 'interim_closing', label: 'Clôture intermédiaire', icon: FileCheck },
    { id: 'annual_closing', label: 'Clôture Annuelle', icon: BookOpen },
    { id: 'analytics', label: 'Comptabilité analytique', icon: Calculator }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'ghost'}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={20} className="mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      {activeTab === 'clients' && renderClientsTab()}
      {activeTab === 'suppliers' && renderSuppliersTab()}
      {activeTab === 'bank_reconciliation' && renderBankReconciliation()}
      {activeTab === 'interim_closing' && renderInterimClosing()}
      {activeTab === 'annual_closing' && renderAnnualClosing()}
      {activeTab === 'analytics' && renderAnalyticsTab()}
    </div>
  );
};