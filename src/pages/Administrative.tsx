import React, { useState } from 'react';
import { 
  Clock, Receipt, FolderOpen, Building2, Calendar, CheckSquare,
  Search, Filter, Plus, Download, Eye, FileText, Upload, MoreVertical,
  Car, Bank, Tool, FileCheck, Mail, MapPin
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

type TabType = 'time' | 'expenses' | 'documents' | 'domiciliation' | 'tasks';

interface TabProps {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

const tabs: TabProps[] = [
  { id: 'time', label: 'Gestion du temps', icon: <Clock size={20} /> },
  { id: 'expenses', label: 'Notes de frais', icon: <Receipt size={20} /> },
  { id: 'documents', label: 'GED', icon: <FolderOpen size={20} /> },
  { id: 'domiciliation', label: 'Domiciliation', icon: <Building2 size={20} /> },
  { id: 'tasks', label: 'Tâches', icon: <CheckSquare size={20} /> }
];

interface TimeEntry {
  id: string;
  date: string;
  project: string;
  activity: string;
  duration: number;
  status: 'pending' | 'approved' | 'rejected';
}

interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface Document {
  id: string;
  name: string;
  category: string;
  type: string;
  date: string;
  size: string;
  status: 'active' | 'expired' | 'pending';
}

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'done';
  assignee: string;
}

const mockTimeEntries: TimeEntry[] = [
  {
    id: '1',
    date: '2025-04-15',
    project: 'Projet A',
    activity: 'Développement',
    duration: 8,
    status: 'approved'
  },
  {
    id: '2',
    date: '2025-04-14',
    project: 'Projet B',
    activity: 'Réunion client',
    duration: 2,
    status: 'pending'
  }
];

const mockExpenses: Expense[] = [
  {
    id: '1',
    date: '2025-04-15',
    category: 'Transport',
    amount: 45.80,
    description: 'Taxi client',
    status: 'pending'
  },
  {
    id: '2',
    date: '2025-04-12',
    category: 'Repas',
    amount: 28.50,
    description: 'Déjeuner d\'affaires',
    status: 'approved'
  }
];

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Contrat_Leasing_2025.pdf',
    category: 'Leasing',
    type: 'contract',
    date: '2025-04-15',
    size: '2.4 MB',
    status: 'active'
  },
  {
    id: '2',
    name: 'Contrat_Entretien_Q2_2025.pdf',
    category: 'Entretien',
    type: 'contract',
    date: '2025-04-10',
    size: '1.8 MB',
    status: 'active'
  },
  {
    id: '3',
    name: 'Attestation_Domiciliation_2025.pdf',
    category: 'Domiciliation',
    type: 'document',
    date: '2025-04-01',
    size: '1.2 MB',
    status: 'active'
  }
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Validation des factures fournisseurs',
    dueDate: '2025-04-20',
    priority: 'high',
    status: 'todo',
    assignee: 'Sophie Martin'
  },
  {
    id: '2',
    title: 'Préparation déclaration TVA',
    dueDate: '2025-04-18',
    priority: 'high',
    status: 'in-progress',
    assignee: 'Thomas Dubois'
  }
];

export const Administrative: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('time');
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
      case 'approved':
        return <Badge variant="success">Approuvé</Badge>;
      case 'pending':
        return <Badge variant="warning">En attente</Badge>;
      case 'rejected':
        return <Badge variant="error">Rejeté</Badge>;
      case 'active':
        return <Badge variant="success">Actif</Badge>;
      case 'expired':
        return <Badge variant="error">Expiré</Badge>;
      case 'todo':
        return <Badge variant="warning">À faire</Badge>;
      case 'in-progress':
        return <Badge variant="info">En cours</Badge>;
      case 'done':
        return <Badge variant="success">Terminé</Badge>;
      default:
        return <Badge variant="default">Inconnu</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="error">Haute</Badge>;
      case 'medium':
        return <Badge variant="warning">Moyenne</Badge>;
      case 'low':
        return <Badge variant="info">Basse</Badge>;
      default:
        return <Badge variant="default">Standard</Badge>;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'time':
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
                Nouvelle entrée
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
                          Projet
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Activité
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Durée (h)
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {mockTimeEntries.map((entry) => (
                        <tr 
                          key={entry.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(entry.date)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {entry.project}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {entry.activity}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium">
                            {entry.duration}
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

      case 'expenses':
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
                Nouvelle note de frais
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
                          Catégorie
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
                      {mockExpenses.map((expense) => (
                        <tr 
                          key={expense.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(expense.date)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {expense.category}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {expense.description}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium">
                            {formatCurrency(expense.amount)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            {getStatusBadge(expense.status)}
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

      case 'documents':
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
                  Importer
                </Button>
                <Button variant="primary" leftIcon={<Plus size={16} />}>
                  Nouveau document
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contrats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Car size={20} className="text-blue-500" />
                        <div>
                          <h4 className="font-medium">Contrats de leasing</h4>
                          <p className="text-sm text-gray-500">3 documents</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Bank size={20} className="text-green-500" />
                        <div>
                          <h4 className="font-medium">Contrats bancaires</h4>
                          <p className="text-sm text-gray-500">2 documents</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Tool size={20} className="text-purple-500" />
                        <div>
                          <h4 className="font-medium">Contrats d'entretien</h4>
                          <p className="text-sm text-gray-500">4 documents</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Documents fiscaux</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileCheck size={20} className="text-blue-500" />
                        <div>
                          <h4 className="font-medium">Déclarations TVA</h4>
                          <p className="text-sm text-gray-500">12 documents</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText size={20} className="text-green-500" />
                        <div>
                          <h4 className="font-medium">Impôts</h4>
                          <p className="text-sm text-gray-500">5 documents</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Domiciliation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Mail size={20} className="text-blue-500" />
                        <div>
                          <h4 className="font-medium">Courriers</h4>
                          <p className="text-sm text-gray-500">8 documents</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MapPin size={20} className="text-green-500" />
                        <div>
                          <h4 className="font-medium">Attestations</h4>
                          <p className="text-sm text-gray-500">2 documents</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Documents récents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Nom
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Catégorie
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Taille
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {mockDocuments.map((doc) => (
                        <tr 
                          key={doc.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                            {doc.name}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {doc.category}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(doc.date)}
                          </td>
                          <td className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-400">
                            {doc.size}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            {getStatusBadge(doc.status)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm">
                              <Eye size={16} className="mr-2" />
                              Voir
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download size={16} />
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

      case 'domiciliation':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <Mail className="text-blue-500" size={24} />
                    </div>
                    <Badge variant="success">Actif</Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Gestion du courrier</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Réception et transmission du courrier
                  </p>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      Configurer
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                      <MapPin className="text-green-500" size={24} />
                    </div>
                    <Badge variant="success">Actif</Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Adresse commerciale</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Gestion de l'adresse de domiciliation
                  </p>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      Voir les détails
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                      <FileText className="text-purple-500" size={24} />
                    </div>
                    <Badge variant="success">À jour</Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Documents légaux</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Contrats et attestations
                  </p>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      Gérer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Services de domiciliation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-medium mb-4">Réception du courrier</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Numérisation</span>
                        <Badge variant="success">Activé</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Transfert automatique</span>
                        <Badge variant="success">Activé</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Conservation</span>
                        <Badge variant="info">30 jours</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-medium mb-4">Adresse commerciale</h4>
                    <div className="space-y-2">
                      <p className="text-sm">123 rue de la Paix</p>
                      <p className="text-sm">75000 Paris</p>
                      <p className="text-sm">France</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4">
                      Modifier
                    </Button>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-medium mb-4">Contrat de domiciliation</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Date de début</span>
                        <span>01/01/2025</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Date de fin</span>
                        <span>31/12/2025</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Statut</span>
                        <Badge variant="success">Actif</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4">
                      Voir le contrat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'tasks':
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
                Nouvelle tâche
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>À faire</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTasks
                      .filter(task => task.status === 'todo')
                      .map(task => (
                        <div 
                          key={task.id}
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{task.title}</h4>
                            {getPriorityBadge(task.priority)}
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>{formatDate(task.dueDate)}</span>
                            <span>{task.assignee}</span>
                          </div>
                          <div className="mt-4 flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreVertical size={16} />
                            </Button>
                          </div>
                        </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>En cours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTasks
                      .filter(task => task.status === 'in-progress')
                      .map(task => (
                        <div 
                          key={task.id}
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{task.title}</h4>
                            {getPriorityBadge(task.priority)}
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>{formatDate(task.dueDate)}</span>
                            <span>{task.assignee}</span>
                          </div>
                          <div className="mt-4 flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreVertical size={16} />
                            </Button>
                          </div>
                        </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Terminé</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTasks
                      .filter(task => task.status === 'done')
                      .map(task => (
                        <div 
                          key={task.id}
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{task.title}</h4>
                            {getPriorityBadge(task.priority)}
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>{formatDate(task.dueDate)}</span>
                            <span>{task.assignee}</span>
                          </div>
                          <div className="mt-4 flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreVertical size={16} />
                            </Button>
                          </div>
                        </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Calendrier comptable</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-2">Échéances à venir</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>TVA</span>
                          <span className="font-medium">20/04/2025</span>
                        </div>
                        <div className="flex justify-between">
                          <span>IS</span>
                          <span className="font-medium">15/05/2025</span>
                        </div>
                        <div className="flex justify-between">
                          <span>URSSAF</span>
                          <span className="font-medium">05/05/2025</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-2">Validation en attente</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Factures fournisseurs</span>
                          <Badge variant="warning">3</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Notes de frais</span>
                          <Badge variant="warning">2</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Rapprochements</span>
                          <Badge variant="warning">5</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-2">Statistiques</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Tâches en cours</span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tâches terminées</span>
                          <span className="font-medium">45</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taux de complétion</span>
                          <span className="font-medium text-green-500">79%</span>
                        </div>
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Administratif</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gestion administrative et documentaire
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
          {renderTabContent()}
        </CardContent>
      </Card>
    </div>
  );
};