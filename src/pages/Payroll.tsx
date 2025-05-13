import React, { useState } from 'react';
import { 
  Search, Filter, Download, Upload, Plus, FileText, Users, 
  DollarSign, TrendingUp, Calendar, Clock, FileSpreadsheet 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  salary: number;
  startDate: string;
  status: 'active' | 'leave' | 'terminated';
}

interface PayrollSummary {
  totalSalaries: number;
  totalEmployees: number;
  averageSalary: number;
  payrollDate: string;
  socialCharges: number;
  netPayroll: number;
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
  },
  {
    id: '4',
    name: 'Pierre Lambert',
    position: 'Comptable',
    department: 'Finance',
    salary: 3500,
    startDate: '2024-01-10',
    status: 'active'
  },
  {
    id: '5',
    name: 'Marie Petit',
    position: 'Assistante RH',
    department: 'RH',
    salary: 3200,
    startDate: '2024-02-01',
    status: 'active'
  }
];

const payrollSummary: PayrollSummary = {
  totalSalaries: 19200,
  totalEmployees: 5,
  averageSalary: 3840,
  payrollDate: '2025-04-25',
  socialCharges: 9600,
  netPayroll: 28800
};

export const Payroll: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Salaires</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gestion des salaires et bulletins de paie
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            leftIcon={<Upload size={16} />}
          >
            Importer
          </Button>
          <Button 
            variant="primary" 
            leftIcon={<Plus size={16} />}
          >
            Nouveau salarié
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Masse salariale
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  {formatCurrency(payrollSummary.netPayroll)}
                </h3>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <DollarSign className="text-blue-500" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span>+5.3% vs mois précédent</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Charges sociales
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  {formatCurrency(payrollSummary.socialCharges)}
                </h3>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-full">
                <FileText className="text-amber-500" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <Clock size={16} className="mr-1" />
              <span>Prochaine échéance : 15 mai 2025</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Effectif total
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  {payrollSummary.totalEmployees} employés
                </h3>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <Users className="text-green-500" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <Calendar size={16} className="mr-1" />
              <span>Moyenne d'ancienneté : 14 mois</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des employés */}
      <Card>
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <CardTitle>Employés</CardTitle>
            <div className="flex items-center space-x-4">
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
              <Button 
                variant="outline" 
                leftIcon={<Filter size={16} />}
              >
                Filtres
              </Button>
              <Button 
                variant="outline" 
                leftIcon={<FileSpreadsheet size={16} />}
              >
                Export
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

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar size={20} className="text-[#0046AD] mr-3" />
                <div>
                  <h3 className="font-medium">Prochaine paie</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(payrollSummary.payrollDate)}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Planifier
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText size={20} className="text-[#0046AD] mr-3" />
                <div>
                  <h3 className="font-medium">Bulletins en attente</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    3 bulletins à valider
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Valider
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users size={20} className="text-[#0046AD] mr-3" />
                <div>
                  <h3 className="font-medium">Congés en cours</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    2 employés en congé
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Gérer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};