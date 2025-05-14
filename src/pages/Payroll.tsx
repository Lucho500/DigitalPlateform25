import React, { useState } from 'react';
import { 
  Search, Filter, Download, Upload, Plus, FileText, Users, 
  DollarSign, TrendingUp, Calendar, Clock, FileSpreadsheet,
  UserPlus, UserMinus, Briefcase, Building, FileCheck,
  AlertTriangle, BellRing, Database, ArrowUpRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

type TabType = 'fiches_paie' | 'paiements' | 'mutations' | 'maladies' | 'avs_lpp' | 'comptabilite' | 'declarations' | 'impot_source' | 'sirh';

interface TabProps {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

const tabs: TabProps[] = [
  { id: 'fiches_paie', label: 'Fiches de paie', icon: <FileText size={20} /> },
  { id: 'paiements', label: 'Paiements', icon: <DollarSign size={20} /> },
  { id: 'mutations', label: 'Mutations', icon: <Users size={20} /> },
  { id: 'maladies', label: 'Maladies/APG', icon: <AlertTriangle size={20} /> },
  { id: 'avs_lpp', label: 'AVS/LPP', icon: <Building size={20} /> },
  { id: 'comptabilite', label: 'Comptabilité', icon: <FileSpreadsheet size={20} /> },
  { id: 'declarations', label: 'Déclarations', icon: <FileCheck size={20} /> },
  { id: 'impot_source', label: 'Impôt source', icon: <BellRing size={20} /> },
  { id: 'sirh', label: 'SIRH', icon: <Database size={20} /> }
];

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  salary: number;
  startDate: string;
  status: 'active' | 'leave' | 'terminated';
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    position: 'Directrice Marketing',
    department: 'Marketing',
    salary: 4500,
    startDate: '2023-03-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Thomas Dubois',
    position: 'Développeur Senior',
    department: 'Technique',
    salary: 4200,
    startDate: '2023-06-01',
    status: 'active'
  },
  {
    id: '3',
    name: 'Julie Bernard',
    position: 'Commerciale',
    department: 'Ventes',
    salary: 3800,
    startDate: '2023-09-15',
    status: 'leave'
  }
];

interface PayrollSummary {
  totalSalaries: number;
  totalEmployees: number;
  averageSalary: number;
  payrollDate: string;
  socialCharges: number;
  netPayroll: number;
}

const payrollSummary: PayrollSummary = {
  totalSalaries: 19200,
  totalEmployees: 5,
  averageSalary: 3840,
  payrollDate: '2025-04-25',
  socialCharges: 9600,
  netPayroll: 28800
};

export const Payroll: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('fiches_paie');
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
      case 'active':
        return <Badge variant="success">Actif</Badge>;
      case 'leave':
        return <Badge variant="warning">En congé</Badge>;
      case 'terminated':
        return <Badge variant="error">Terminé</Badge>;
      default:
        return null;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'fiches_paie':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un employé..."
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
                Nouvelle fiche de paie
              </Button>
            </div>

            <Card>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Employé
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Département
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date d'entrée
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Salaire brut
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {mockEmployees.map((employee) => (
                        <tr 
                          key={employee.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <td className="px-4 py-4">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {employee.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {employee.position}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {employee.department}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(employee.startDate)}
                          </td>
                          <td className="px-4 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                            {formatCurrency(employee.salary)}
                          </td>
                          <td className="px-4 py-4 text-center">
                            {getStatusBadge(employee.status)}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              leftIcon={<Download size={14} />}
                            >
                              Bulletin
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

      case 'paiements':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Préparation du fichier de paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-medium">Paiements en attente</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        3 paiements à valider pour avril 2025
                      </p>
                    </div>
                    <Button variant="primary">Valider les paiements</Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-2">Format du fichier</h4>
                      <select className="w-full rounded-lg border-gray-300 dark:border-gray-600">
                        <option>ISO 20022 (pain.001)</option>
                        <option>SEPA</option>
                        <option>CSV</option>
                      </select>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-2">Date d'exécution</h4>
                      <input 
                        type="date" 
                        className="w-full rounded-lg border-gray-300 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'mutations':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Entrées</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" fullWidth leftIcon={<UserPlus size={16} />}>
                      Nouvelle entrée
                    </Button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                      Aucune entrée prévue
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mutations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" fullWidth leftIcon={<Briefcase size={16} />}>
                      Nouvelle mutation
                    </Button>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-sm">
                        1 mutation en attente de validation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sorties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" fullWidth leftIcon={<UserMinus size={16} />}>
                      Nouvelle sortie
                    </Button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                      Aucune sortie prévue
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'maladies':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Déclarations de cas maladies et accidents APG</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="primary" leftIcon={<Plus size={16} />}>
                    Nouvelle déclaration
                  </Button>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Employé
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Date début
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Date fin
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Statut
                          </th>
                          <th className="px-4 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                            Aucune déclaration en cours
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

      case 'avs_lpp':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Annonces mutations AVS/LPP</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-4">AVS</h4>
                      <Button variant="outline" fullWidth>
                        Nouvelle annonce AVS
                      </Button>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-4">LPP</h4>
                      <Button variant="outline" fullWidth>
                        Nouvelle annonce LPP
                      </Button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Statut
                          </th>
                          <th className="px-4 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                            Aucune annonce en cours
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

      case 'comptabilite':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Automatisation de la pièce comptable</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-2">Configuration des comptes</h4>
                      <Button variant="outline" fullWidth>
                        Gérer les comptes
                      </Button>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-2">Modèles d'écritures</h4>
                      <Button variant="outline" fullWidth>
                        Gérer les modèles
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-medium mb-4">Dernières écritures générées</h4>
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
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Montant
                            </th>
                            <th className="px-4 py-3"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={4} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                              Aucune écriture récente
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'declarations':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Déclarations annuelles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-2">Certificats de salaire</h4>
                      <Button variant="outline" fullWidth>
                        Générer
                      </Button>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-2">Attestations</h4>
                      <Button variant="outline" fullWidth>
                        Générer
                      </Button>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-2">Statistiques</h4>
                      <Button variant="outline" fullWidth>
                        Générer
                      </Button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Année
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Date génération
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Statut
                          </th>
                          <th className="px-4 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                            Aucune déclaration générée
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

      case 'impot_source':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Décompte impôt source</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-2">Période</h4>
                      <select className="w-full rounded-lg border-gray-300 dark:border-gray-600">
                        <option>Mars 2025</option>
                        <option>Février 2025</option>
                        <option>Janvier 2025</option>
                      </select>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-2">Canton</h4>
                      <select className="w-full rounded-lg border-gray-300 dark:border-gray-600">
                        <option>Genève</option>
                        <option>Vaud</option>
                        <option>Valais</option>
                      </select>
                    </div>
                  </div>

                  <Button variant="primary" fullWidth>
                    Générer le décompte
                  </Button>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Période
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Canton
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
                      <tbody>
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                            Aucun décompte généré
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

      case 'sirh':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Base de Données RH (SIRH)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Employés actifs</h3>
                            <p className="text-2xl font-bold mt-2">42</p>
                          </div>
                          <Users className="text-blue-500" size={24} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Documents</h3>
                            <p className="text-2xl font-bold mt-2">156</p>
                          </div>
                          <FileText className="text-green-500" size={24} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Taux de complétion</h3>
                            <p className="text-2xl font-bold mt-2">94%</p>
                          </div>
                          <ArrowUpRight className="text-green-500" size={24} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-4">Données personnelles</h4>
                      <Button variant="outline" fullWidth>
                        Gérer les données
                      </Button>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-4">Documents RH</h4>
                      <Button variant="outline" fullWidth>
                        Gérer les documents
                      </Button>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-4">Formations</h4>
                      <Button variant="outline" fullWidth>
                        Gérer les formations
                      </Button>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-4">Évaluations</h4>
                      <Button variant="outline" fullWidth>
                        Gérer les évaluations
                      </Button>
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Salaires</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400  mt-1">
            Gestion des salaires et ressources humaines
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" leftIcon={<Upload size={16} />}>
            Importer
          </Button>
          <Button variant="primary" leftIcon={<Plus size={16} />}>
            Nouveau salarié
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#0046AD] text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
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