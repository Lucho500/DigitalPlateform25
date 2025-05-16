import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { mockPerformanceData } from '../data/mockData';
import { Users, Building, Bank, FileCheck, Calculator, PieChart, BarChart2, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const Finance = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  const tabs = [
    { id: 'clients', label: 'Clients', icon: 'Users' },
    { id: 'suppliers', label: 'Fournisseurs', icon: 'Building' },
    { id: 'bank_reconciliation', label: 'Rapprochement bancaire', icon: 'Bank' },
    { id: 'interim_closing', label: 'Clôture intermédiaire', icon: 'FileCheck' },
    { id: 'analytics', label: 'Comptabilité analytique', icon: 'Calculator' }
  ];

  const analyticsKPIs = [
    {
      title: 'Marge brute',
      value: 47000,
      change: 8.5,
      trend: 'up'
    },
    {
      title: 'Coûts directs',
      value: 28000,
      change: -2.3,
      trend: 'down'
    },
    {
      title: 'Coûts indirects',
      value: 15000,
      change: 1.2,
      trend: 'up'
    },
    {
      title: 'Taux de rentabilité',
      value: 32,
      change: 3.5,
      trend: 'up',
      isPercentage: true
    }
  ];

  const costCenters = [
    { name: 'Production', value: 35 },
    { name: 'R&D', value: 25 },
    { name: 'Marketing', value: 20 },
    { name: 'Administration', value: 15 },
    { name: 'Support', value: 5 }
  ];

  const renderAnalyticsTab = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsKPIs.map((kpi, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                    <h3 className="text-xl font-semibold mt-1">
                      {kpi.isPercentage ? formatPercentage(kpi.value) : formatCurrency(kpi.value)}
                    </h3>
                  </div>
                  <div className={`p-2 rounded-full ${
                    kpi.trend === 'up' 
                      ? 'bg-green-100 dark:bg-green-900' 
                      : 'bg-red-100 dark:bg-red-900'
                  }`}>
                    {kpi.trend === 'up' 
                      ? <ArrowUpRight className="text-green-500" size={20} />
                      : <ArrowDownRight className="text-red-500" size={20} />
                    }
                  </div>
                </div>
                <div className={`mt-2 text-sm ${
                  kpi.trend === 'up' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {kpi.change > 0 ? '+' : ''}{kpi.change}% vs mois précédent
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des marges analytiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value/1000}k€`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Line 
                      type="monotone" 
                      dataKey="analyticsA" 
                      stroke="#0046AD" 
                      name="Centre A"
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="analyticsB" 
                      stroke="#00A3A1" 
                      name="Centre B"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Répartition des coûts par centre</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costCenters}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="value" fill="#0046AD" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Analyse détaillée des coûts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Coûts directs</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Main d'œuvre</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Matières premières</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Autres</span>
                      <span className="font-medium">20%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Coûts indirects</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Administration</span>
                      <span className="font-medium">40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Marketing</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>R&D</span>
                      <span className="font-medium">25%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Indicateurs</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Taux d'absorption</span>
                      <span className="font-medium text-green-500">98%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Écart budget</span>
                      <span className="font-medium text-green-500">+2.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Productivité</span>
                      <span className="font-medium text-green-500">1.15</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" leftIcon={<PieChart size={16} />}>
                  Analyse détaillée
                </Button>
                <Button variant="outline" leftIcon={<BarChart2 size={16} />}>
                  Comparaison périodes
                </Button>
                <Button variant="primary" leftIcon={<TrendingUp size={16} />}>
                  Rapport complet
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderClientsTab = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Contenu du tableau de bord des clients à implémenter</p>
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
            <CardTitle>Fournisseurs</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Contenu du tableau de bord des fournisseurs à implémenter</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderBankReconciliation = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Rapprochement bancaire</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Contenu du rapprochement bancaire à implémenter</p>
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
            <p>Contenu de la clôture intermédiaire à implémenter</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'ghost'}
            onClick={() => setActiveTab(tab.id)}
            leftIcon={tab.icon}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {activeTab === 'clients' && renderClientsTab()}
      {activeTab === 'suppliers' && renderSuppliersTab()}
      {activeTab === 'bank_reconciliation' && renderBankReconciliation()}
      {activeTab === 'interim_closing' && renderInterimClosing()}
      {activeTab === 'analytics' && renderAnalyticsTab()}
    </div>
  );
};