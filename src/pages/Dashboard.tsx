import React from 'react';
import { Upload, Plus, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { KPICard } from '../components/Dashboard/KPICard';
import { DocumentList } from '../components/Dashboard/DocumentList';
import { UpcomingMeetings } from '../components/Dashboard/UpcomingMeetings';
import { TaskList } from '../components/Dashboard/TaskList';
import { documents, kpis, meetings, tasks } from '../data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 65000, expenses: 45000, profit: 20000 },
  { month: 'Fév', revenue: 59000, expenses: 42000, profit: 17000 },
  { month: 'Mar', revenue: 80000, expenses: 52000, profit: 28000 },
  { month: 'Avr', revenue: 81000, expenses: 55000, profit: 26000 }
];

const cashFlowData = [
  { month: 'Jan', entrees: 72000, sorties: 48000 },
  { month: 'Fév', entrees: 65000, sorties: 44000 },
  { month: 'Mar', entrees: 85000, sorties: 54000 },
  { month: 'Avr', entrees: 88000, sorties: 58000 }
];

const alerts = [
  {
    id: '1',
    type: 'warning',
    message: 'Trésorerie prévisionnelle en baisse pour juin 2025',
    action: 'Voir les détails'
  },
  {
    id: '2',
    type: 'info',
    message: 'Nouveaux crédits d\'impôts disponibles',
    action: 'En savoir plus'
  },
  {
    id: '3',
    type: 'error',
    message: 'Échéance TVA dans 5 jours',
    action: 'Préparer'
  }
];

export const Dashboard: React.FC = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tableau de bord</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Vue d'ensemble de votre activité
          </p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button 
            variant="outline" 
            leftIcon={<Upload size={16} />}
          >
            Importer un document
          </Button>
          <Button 
            variant="primary" 
            leftIcon={<Plus size={16} />}
          >
            Nouvelle demande
          </Button>
        </div>
      </div>

      {/* Alertes et notifications importantes */}
      <div className="mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Alertes importantes</h2>
            <Button variant="ghost" size="sm">Voir toutes</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className={`p-4 rounded-lg border ${
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' :
                  alert.type === 'error' ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' :
                  'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                }`}
              >
                <div className="flex items-start">
                  <AlertCircle size={20} className={`mr-3 ${
                    alert.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                    alert.type === 'error' ? 'text-red-600 dark:text-red-400' :
                    'text-blue-600 dark:text-blue-400'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.message}</p>
                    <Button variant="link" size="sm" className="mt-2 p-0">
                      {alert.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {kpis.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Graphiques financiers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Performance financière</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="success" size="sm">+15.3% vs N-1</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value/1000}k€`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stackId="1" 
                    stroke="#0046AD" 
                    fill="#0046AD" 
                    fillOpacity={0.6}
                    name="CA"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    stackId="2" 
                    stroke="#FF6B35" 
                    fill="#FF6B35" 
                    fillOpacity={0.6}
                    name="Charges"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Trésorerie</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="info" size="sm">Prévisionnel à 3 mois</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value/1000}k€`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar 
                    dataKey="entrees" 
                    fill="#00A3A1" 
                    name="Entrées"
                  />
                  <Bar 
                    dataKey="sorties" 
                    fill="#FF6B35" 
                    name="Sorties"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents et Rendez-vous */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <DocumentList documents={documents} />
        </div>
        <div>
          <UpcomingMeetings meetings={meetings} />
        </div>
      </div>

      {/* Tâches */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TaskList tasks={tasks} />
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Indicateurs clés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">BFR</span>
                  <div className="flex items-center">
                    <span className="font-medium">45 jours</span>
                    <TrendingDown className="ml-2 text-red-500" size={16} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Délai client moyen</span>
                  <div className="flex items-center">
                    <span className="font-medium">32 jours</span>
                    <TrendingUp className="ml-2 text-green-500" size={16} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Taux de marge</span>
                  <div className="flex items-center">
                    <span className="font-medium">24.5%</span>
                    <TrendingUp className="ml-2 text-green-500" size={16} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};