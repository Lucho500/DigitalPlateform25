import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  FileText, CheckCircle2, AlertCircle, Clock, ArrowRight, 
  FileSpreadsheet, Calculator, BookOpen, Download, Eye, 
  BarChart2, PieChart, Filter, Search, Upload, Plus,
  Archive, ClipboardCheck, FileCheck, FileSignature
} from 'lucide-react';

type TabType = 'ecritures' | 'dossier' | 'etats' | 'pvago';

interface TabProps {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabProps[] = [
  { id: 'ecritures', label: 'Écritures', icon: <FileText size={20} /> },
  { id: 'dossier', label: 'Dossier de clôture', icon: <Archive size={20} /> },
  { id: 'etats', label: 'États financiers', icon: <FileSpreadsheet size={20} /> },
  { id: 'pvago', label: 'PVAGO', icon: <FileSignature size={20} /> }
];

interface ClosingEntry {
  id: string;
  number: string;
  date: string;
  description: string;
  debit: number;
  credit: number;
  status: 'draft' | 'validated' | 'posted';
  type: 'provision' | 'amortization' | 'accrual' | 'regularization';
}

const mockEntries: ClosingEntry[] = [
  {
    id: '1',
    number: 'EC-2025-001',
    date: '2025-04-15',
    description: 'Provision pour risques',
    debit: 15000,
    credit: 15000,
    status: 'validated',
    type: 'provision'
  },
  {
    id: '2',
    number: 'EC-2025-002',
    date: '2025-04-15',
    description: 'Dotation aux amortissements',
    debit: 8500,
    credit: 8500,
    status: 'draft',
    type: 'amortization'
  },
  {
    id: '3',
    number: 'EC-2025-003',
    date: '2025-04-15',
    description: 'Charges à payer',
    debit: 12000,
    credit: 12000,
    status: 'posted',
    type: 'accrual'
  }
];

interface Document {
  id: string;
  name: string;
  category: string;
  date: string;
  status: 'pending' | 'validated' | 'final';
  size: string;
  type: string;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Balance générale',
    category: 'Comptabilité',
    date: '2025-04-15',
    status: 'final',
    size: '2.4 MB',
    type: 'excel'
  },
  {
    id: '2',
    name: 'Grand livre',
    category: 'Comptabilité',
    date: '2025-04-15',
    status: 'final',
    size: '3.8 MB',
    type: 'excel'
  },
  {
    id: '3',
    name: 'Justificatifs provisions',
    category: 'Justificatifs',
    date: '2025-04-15',
    status: 'validated',
    size: '1.5 MB',
    type: 'pdf'
  },
  {
    id: '4',
    name: 'Tableau des immobilisations',
    category: 'Immobilisations',
    date: '2025-04-15',
    status: 'pending',
    size: '1.2 MB',
    type: 'excel'
  }
];

export const InterimClosing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('ecritures');
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
        return <Badge variant="warning">Brouillon</Badge>;
      case 'validated':
        return <Badge variant="info">Validé</Badge>;
      case 'posted':
        return <Badge variant="success">Comptabilisé</Badge>;
      case 'pending':
        return <Badge variant="warning">En attente</Badge>;
      case 'final':
        return <Badge variant="success">Final</Badge>;
      default:
        return <Badge variant="default">Inconnu</Badge>;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'ecritures':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
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
                          Numéro
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
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
                      {mockEntries.map((entry) => (
                        <tr 
                          key={entry.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {entry.number}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(entry.date)}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                            {entry.description}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                            {formatCurrency(entry.debit)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                            {formatCurrency(entry.credit)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            {getStatusBadge(entry.status)}
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
              </CardContent>
            </Card>
          </div>
        );

      case 'dossier':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un document..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent focus:border-[#0046AD] focus:ring-1 focus:ring-[#0046AD] text-sm w-64"
                  />
                </div>
                <Button variant="outline" size="sm" leftIcon={<Filter size={16} />}>
                  Filtrer
                </Button>
              </div>
              <Button variant="primary" leftIcon={<Upload size={16} />}>
                Importer
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockDocuments.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {doc.type === 'excel' ? (
                          <FileSpreadsheet size={20} className="text-green-500 mt-1" />
                        ) : (
                          <FileText size={20} className="text-red-500 mt-1" />
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {doc.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {doc.category}
                          </p>
                          <div className="flex items-center mt-2 space-x-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(doc.date)}
                            </span>
                            <span className="text-gray-300 dark:text-gray-600">•</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {doc.size}
                            </span>
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(doc.status)}
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'etats':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bilan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileSpreadsheet size={20} className="text-green-500" />
                        <div>
                          <h4 className="font-medium">Bilan détaillé</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Excel - 1.2 MB</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download size={16} />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText size={20} className="text-red-500" />
                        <div>
                          <h4 className="font-medium">Bilan présenté</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">PDF - 850 KB</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compte de résultat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileSpreadsheet size={20} className="text-green-500" />
                        <div>
                          <h4 className="font-medium">Compte de résultat détaillé</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Excel - 980 KB</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download size={16} />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText size={20} className="text-red-500" />
                        <div>
                          <h4 className="font-medium">Compte de résultat présenté</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">PDF - 720 KB</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Annexes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText size={20} className="text-blue-500" />
                      <div>
                        <h4 className="font-medium">Annexe légale</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">PDF - 1.5 MB</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileSpreadsheet size={20} className="text-green-500" />
                      <div>
                        <h4 className="font-medium">Tableaux de l'annexe</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Excel - 2.1 MB</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'pvago':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Procès-verbal d'assemblée générale ordinaire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h3 className="font-medium mb-4">Documents à préparer</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle2 size={20} className="text-green-500 mr-2" />
                        <span>Convocation des actionnaires</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={20} className="text-yellow-500 mr-2" />
                        <span>Feuille de présence</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={20} className="text-yellow-500 mr-2" />
                        <span>Procès-verbal</span>
                      </div>
                      <div className="flex items-center">
                        <AlertCircle size={20} className="text-gray-400 mr-2" />
                        <span>Rapport de gestion</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Convocation</h4>
                        <Badge variant="success">Envoyée</Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Date d'envoi : {formatDate('2025-04-10')}
                      </p>
                      <Button variant="outline" size="sm" leftIcon={<Eye size={16} />}>
                        Voir le document
                      </Button>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Feuille de présence</h4>
                        <Badge variant="warning">À préparer</Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Date limite : {formatDate('2025-05-15')}
                      </p>
                      <Button variant="outline" size="sm" leftIcon={<FileText size={16} />}>
                        Préparer
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h3 className="font-medium mb-4">Résolutions</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium">Approbation des comptes</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Première résolution
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye size={16} />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium">Affectation du résultat</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Deuxième résolution
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye size={16} />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium">Quitus aux administrateurs</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Troisième résolution
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Clôture</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gestion de la clôture comptable
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" leftIcon={<Calculator size={16} />}>
            Balance
          </Button>
          <Button variant="outline" leftIcon={<FileSpreadsheet size={16} />}>
            Grand Livre
          </Button>
          <Button variant="primary" leftIcon={<BookOpen size={16} />}>
            Démarrer la clôture
          </Button>
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
          {renderTabContent()}
        </CardContent>
      </Card>
    </div>
  );
};