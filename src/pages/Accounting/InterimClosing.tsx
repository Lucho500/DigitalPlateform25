import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  FileText, CheckCircle2, AlertCircle, Clock, ArrowRight, 
  FileSpreadsheet, Calculator, BookOpen, Download, Eye, 
  BarChart2, PieChart, Filter, Search 
} from 'lucide-react';

interface ClosingTask {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  dueDate: string;
  assignedTo?: string;
  progress?: number;
}

interface FinancialReport {
  id: string;
  name: string;
  type: string;
  date: string;
  status: 'draft' | 'review' | 'approved' | 'final';
  size: string;
}

const mockTasks: ClosingTask[] = [
  {
    id: '1',
    name: 'Rapprochement bancaire',
    description: 'Vérification des écritures bancaires et réconciliation des comptes',
    status: 'completed',
    dueDate: '2025-04-15',
    progress: 100
  },
  {
    id: '2',
    name: 'Lettrage des comptes',
    description: 'Lettrage des comptes clients et fournisseurs',
    status: 'in-progress',
    dueDate: '2025-04-16',
    progress: 65
  },
  {
    id: '3',
    name: 'Écritures d\'inventaire',
    description: 'Saisie des écritures d\'inventaire et provisions',
    status: 'pending',
    dueDate: '2025-04-17',
    progress: 0
  },
  {
    id: '4',
    name: 'Contrôle des immobilisations',
    description: 'Vérification des amortissements et des cessions',
    status: 'blocked',
    dueDate: '2025-04-18',
    progress: 30
  },
  {
    id: '5',
    name: 'Validation des charges à payer',
    description: 'Contrôle et validation des FNP et charges à payer',
    status: 'pending',
    dueDate: '2025-04-19',
    progress: 0
  }
];

const mockReports: FinancialReport[] = [
  {
    id: '1',
    name: 'Balance générale',
    type: 'excel',
    date: '2025-04-15',
    status: 'final',
    size: '2.4 MB'
  },
  {
    id: '2',
    name: 'Grand livre',
    type: 'excel',
    date: '2025-04-15',
    status: 'final',
    size: '3.8 MB'
  },
  {
    id: '3',
    name: 'Compte de résultat',
    type: 'pdf',
    date: '2025-04-15',
    status: 'review',
    size: '1.2 MB'
  },
  {
    id: '4',
    name: 'Bilan',
    type: 'pdf',
    date: '2025-04-15',
    status: 'draft',
    size: '1.5 MB'
  }
];

export const InterimClosing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Terminé</Badge>;
      case 'in-progress':
        return <Badge variant="info">En cours</Badge>;
      case 'pending':
        return <Badge variant="warning">À faire</Badge>;
      case 'blocked':
        return <Badge variant="error">Bloqué</Badge>;
      case 'draft':
        return <Badge variant="default">Brouillon</Badge>;
      case 'review':
        return <Badge variant="warning">En révision</Badge>;
      case 'approved':
        return <Badge variant="info">Approuvé</Badge>;
      case 'final':
        return <Badge variant="success">Final</Badge>;
      default:
        return <Badge variant="default">Inconnu</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={20} className="text-green-500" />;
      case 'in-progress':
        return <Clock size={20} className="text-blue-500" />;
      case 'pending':
        return <Clock size={20} className="text-yellow-500" />;
      case 'blocked':
        return <AlertCircle size={20} className="text-red-500" />;
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

      {/* Progression de la clôture */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Tâches terminées
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  1/5
                </h3>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <CheckCircle2 className="text-green-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  En cours
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  1/5
                </h3>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Clock className="text-blue-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  À faire
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  2/5
                </h3>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Clock className="text-yellow-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Bloquées
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  1/5
                </h3>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                <AlertCircle className="text-red-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Liste des tâches */}
        <Card>
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <CardTitle>Tâches de clôture</CardTitle>
              <Button variant="outline" size="sm" leftIcon={<Filter size={16} />}>
                Filtrer
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTasks.map((task) => (
                <div 
                  key={task.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(task.status)}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {task.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {task.description}
                        </p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Échéance : {formatDate(task.dueDate)}
                          </span>
                          {task.progress !== undefined && (
                            <div className="flex items-center space-x-2">
                              <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                <div 
                                  className="h-full bg-[#0046AD] rounded-full"
                                  style={{ width: `${task.progress}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {task.progress}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(task.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* États financiers */}
        <Card>
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <CardTitle>États financiers</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent focus:border-[#0046AD] focus:ring-1 focus:ring-[#0046AD] text-sm w-48"
                  />
                </div>
                <Button variant="outline" size="sm" leftIcon={<Filter size={16} />}>
                  Filtrer
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReports.map((report) => (
                <div 
                  key={report.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {report.type === 'excel' ? (
                        <FileSpreadsheet size={20} className="text-green-500" />
                      ) : (
                        <FileText size={20} className="text-red-500" />
                      )}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {report.name}
                        </h4>
                        <div className="flex items-center mt-1 space-x-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>{formatDate(report.date)}</span>
                          <span>•</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(report.status)}
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};