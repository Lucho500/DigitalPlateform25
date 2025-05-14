import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  FileText, Download, Eye, Filter, Search, Calendar,
  TrendingUp, BarChart2, PieChart, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface Report {
  id: string;
  name: string;
  period: string;
  type: 'monthly' | 'quarterly' | 'annual';
  date: string;
  status: 'draft' | 'final';
  kpis: {
    revenue: number;
    expenses: number;
    profit: number;
    change: number;
  };
}

interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

const monthlyData: MonthlyData[] = [
  { month: 'Jan', revenue: 65000, expenses: 45000, profit: 20000 },
  { month: 'Fév', revenue: 72000, expenses: 48000, profit: 24000 },
  { month: 'Mar', revenue: 81000, expenses: 55000, profit: 26000 }
];

const expenseCategories = [
  { name: 'Personnel', value: 45 },
  { name: 'Marketing', value: 15 },
  { name: 'Locaux', value: 20 },
  { name: 'Services', value: 12 },
  { name: 'Autres', value: 8 }
];

const mockReports: Report[] = [
  {
    id: '1',
    name: 'Reporting Mars 2025',
    period: 'Mars 2025',
    type: 'monthly',
    date: '2025-04-15',
    status: 'final',
    kpis: {
      revenue: 81000,
      expenses: 55000,
      profit: 26000,
      change: 5.8
    }
  },
  {
    id: '2',
    name: 'Reporting Février 2025',
    period: 'Février 2025',
    type: 'monthly',
    date: '2025-03-15',
    status: 'final',
    kpis: {
      revenue: 76000,
      expenses: 52000,
      profit: 24000,
      change: 4.2
    }
  },
  {
    id: '3',
    name: 'Reporting T1 2025',
    period: 'T1 2025',
    type: 'quarterly',
    date: '2025-04-15',
    status: 'draft',
    kpis: {
      revenue: 235000,
      expenses: 160000,
      profit: 75000,
      change: 8.5
    }
  }
];

export const InterimReporting: React.FC = () => {
  const [activeReport, setActiveReport] = useState<Report>(mockReports[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [periodFilter, setPeriodFilter] = useState<'all' | 'monthly' | 'quarterly'>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
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
      case 'final':
        return <Badge variant="success">Final</Badge>;
      default:
        return <Badge variant="default">Inconnu</Badge>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reporting Intermédiaire</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Consultez vos reportings mensuels et trimestriels
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" leftIcon={<Calendar size={16} />}>
            Périodicité
          </Button>
          <Button variant="primary" leftIcon={<FileText size={16} />}>
            Nouveau reporting
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des reportings */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <CardTitle>Reportings</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent focus:border-[#0046AD] focus:ring-1 focus:ring-[#0046AD] text-sm"
                    />
                  </div>
                  <Button variant="outline" size="sm" leftIcon={<Filter size={16} />}>
                    Filtrer
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockReports.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => setActiveReport(report)}
                    className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      activeReport.id === report.id ? 'bg-gray-50 dark:bg-gray-800' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {report.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {formatDate(report.date)}
                        </p>
                      </div>
                      {getStatusBadge(report.status)}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Détails du reporting */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Chiffre d'affaires
                      </p>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-1">
                        {formatCurrency(activeReport.kpis.revenue)}
                      </h3>
                    </div>
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                      <TrendingUp className="text-green-500" size={20} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Charges
                      </p>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-1">
                        {formatCurrency(activeReport.kpis.expenses)}
                      </h3>
                    </div>
                    <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
                      <ArrowDownRight className="text-red-500" size={20} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Résultat
                      </p>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-1">
                        {formatCurrency(activeReport.kpis.profit)}
                      </h3>
                    </div>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <BarChart2 className="text-blue-500" size={20} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Évolution
                      </p>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-1">
                        +{activeReport.kpis.change}%
                      </h3>
                    </div>
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                      <PieChart className="text-purple-500" size={20} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Graphiques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                  <CardTitle>Évolution mensuelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `${value/1000}k€`} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#0046AD" 
                          name="CA"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="expenses" 
                          stroke="#FF6B35" 
                          name="Charges"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="profit" 
                          stroke="#00A3A1" 
                          name="Résultat"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                  <CardTitle>Répartition des charges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={expenseCategories}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Bar 
                          dataKey="value" 
                          fill="#0046AD"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Documents du reporting */}
            <Card>
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText size={20} className="text-gray-400" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            Rapport d'activité
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            PDF - 2.4 MB
                          </p>
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

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText size={20} className="text-gray-400" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            Analyse financière
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            PDF - 1.8 MB
                          </p>
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

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText size={20} className="text-gray-400" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            Tableaux de bord
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Excel - 3.2 MB
                          </p>
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
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};