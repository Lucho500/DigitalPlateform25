import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Download, Filter } from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 65000, expenses: 45000, profit: 20000 },
  { month: 'Fév', revenue: 59000, expenses: 42000, profit: 17000 },
  { month: 'Mar', revenue: 80000, expenses: 52000, profit: 28000 },
  { month: 'Avr', revenue: 81000, expenses: 55000, profit: 26000 },
  { month: 'Mai', revenue: 76000, expenses: 48000, profit: 28000 },
  { month: 'Juin', revenue: 84000, expenses: 53000, profit: 31000 }
];

const expenseCategories = [
  { name: 'Salaires', value: 45 },
  { name: 'Marketing', value: 15 },
  { name: 'Équipement', value: 20 },
  { name: 'Services', value: 12 },
  { name: 'Autres', value: 8 }
];

const clientSegmentation = [
  { segment: 'TPE', count: 145 },
  { segment: 'PME', count: 89 },
  { segment: 'ETI', count: 34 },
  { segment: 'Grands Comptes', count: 12 }
];

const monthlyTasks = [
  { month: 'Jan', completed: 145, pending: 23 },
  { month: 'Fév', completed: 132, pending: 28 },
  { month: 'Mar', completed: 164, pending: 19 },
  { month: 'Avr', completed: 158, pending: 25 },
  { month: 'Mai', completed: 142, pending: 31 },
  { month: 'Juin', completed: 176, pending: 22 }
];

export const Analytics: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Analyse détaillée de vos données financières et opérationnelles
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            leftIcon={<Filter size={16} />}
          >
            Filtres
          </Button>
          <Button 
            variant="primary" 
            leftIcon={<Download size={16} />}
          >
            Exporter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Évolution du Chiffre d'Affaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#0046AD" name="CA" />
                  <Line type="monotone" dataKey="expenses" stroke="#FF6B35" name="Dépenses" />
                  <Line type="monotone" dataKey="profit" stroke="#00A3A1" name="Bénéfice" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition des Dépenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#0046AD"
                    dataKey="value"
                    label={({ name, value }) => `${name} (${value}%)`}
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Segmentation Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clientSegmentation}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="segment" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#00A3A1" name="Nombre de clients" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suivi des Tâches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTasks}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="completed" 
                    stackId="1" 
                    stroke="#0046AD" 
                    fill="#0046AD" 
                    name="Tâches complétées"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pending" 
                    stackId="1" 
                    stroke="#FF6B35" 
                    fill="#FF6B35" 
                    name="Tâches en attente"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};