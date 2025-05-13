import React, { useState } from 'react';
import { Calendar, Download, Filter, Search, AlertCircle, CheckCircle, Clock, FileText, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface Declaration {
  id: string;
  type: 'TVA' | 'IS' | 'URSSAF' | 'DSN';
  period: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'late' | 'processing';
  amount?: number;
}

const mockDeclarations: Declaration[] = [
  {
    id: '1',
    type: 'TVA',
    period: 'Mars 2025',
    dueDate: '2025-04-20',
    status: 'pending',
    amount: 12500
  },
  {
    id: '2',
    type: 'URSSAF',
    period: 'T1 2025',
    dueDate: '2025-04-15',
    status: 'submitted',
    amount: 8750
  },
  {
    id: '3',
    type: 'DSN',
    period: 'Mars 2025',
    dueDate: '2025-04-05',
    status: 'submitted',
    amount: 4500
  },
  {
    id: '4',
    type: 'IS',
    period: 'Acompte T2 2025',
    dueDate: '2025-05-15',
    status: 'pending',
    amount: 15000
  }
];

const upcomingDeadlines = [
  {
    id: '1',
    title: 'Déclaration TVA',
    date: '2025-04-20',
    description: 'Déclaration mensuelle de TVA pour mars 2025'
  },
  {
    id: '2',
    title: 'Acompte IS',
    date: '2025-05-15',
    description: 'Versement du 2ème acompte IS 2025'
  },
  {
    id: '3',
    title: 'DSN',
    date: '2025-05-05',
    description: 'Déclaration Sociale Nominative avril 2025'
  }
];

export const Declarations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

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
      case 'submitted':
        return <Badge variant="success">Transmise</Badge>;
      case 'pending':
        return <Badge variant="warning">À transmettre</Badge>;
      case 'late':
        return <Badge variant="error">En retard</Badge>;
      case 'processing':
        return <Badge variant="info">En cours</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'pending':
        return <Clock size={20} className="text-yellow-500" />;
      case 'late':
        return <AlertCircle size={20} className="text-red-500" />;
      case 'processing':
        return <Clock size={20} className="text-blue-500" />;
      default:
        return null;
    }
  };

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Déclarations</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gérez vos déclarations fiscales et sociales
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            leftIcon={<Calendar size={16} />}
          >
            Calendrier fiscal
          </Button>
          <Button 
            variant="primary" 
            leftIcon={<FileText size={16} />}
          >
            Nouvelle déclaration
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des déclarations */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <CardTitle>Déclarations récentes</CardTitle>
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
                  <Button 
                    variant="outline" 
                    leftIcon={<Filter size={16} />}
                  >
                    Filtres
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDeclarations.map((declaration) => (
                  <div 
                    key={declaration.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(declaration.status)}
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            Déclaration {declaration.type}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Période : {declaration.period}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(declaration.status)}
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Échéance
                          </p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatDate(declaration.dueDate)}
                          </p>
                        </div>
                        {declaration.amount && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Montant
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {formatCurrency(declaration.amount)}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                        {declaration.status === 'pending' && (
                          <Button variant="primary" size="sm">
                            Transmettre
                          </Button>
                        )}
                        {declaration.status === 'submitted' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            leftIcon={<Download size={14} />}
                          >
                            Télécharger
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Échéances à venir */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Échéances à venir</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => {
                  const daysRemaining = getDaysRemaining(deadline.date);
                  return (
                    <div 
                      key={deadline.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {deadline.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {deadline.description}
                          </p>
                          <div className="flex items-center mt-2">
                            <Calendar size={14} className="text-gray-400 mr-1" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(deadline.date)}
                            </span>
                          </div>
                        </div>
                        <Badge 
                          variant={daysRemaining <= 7 ? "error" : daysRemaining <= 15 ? "warning" : "info"}
                        >
                          {daysRemaining} jours
                        </Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-3"
                        rightIcon={<ArrowRight size={14} />}
                      >
                        Préparer
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Ressources utiles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" fullWidth className="justify-start">
                  <FileText size={16} className="mr-2" />
                  Guide des déclarations TVA
                </Button>
                <Button variant="outline" fullWidth className="justify-start">
                  <FileText size={16} className="mr-2" />
                  Calendrier fiscal 2025
                </Button>
                <Button variant="outline" fullWidth className="justify-start">
                  <FileText size={16} className="mr-2" />
                  Guide DSN
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};