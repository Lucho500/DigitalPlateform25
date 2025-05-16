import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../utils/formatters';
import { mockPerformanceData } from '../data/mockData';
import { Users, Building, Ban as Bank, FileCheck } from 'lucide-react';

export const Finance = () => {
  const [activeTab, setActiveTab] = useState('clients');

  const tabs = [
    { id: 'clients', label: 'Clients', icon: 'Users' },
    { id: 'suppliers', label: 'Fournisseurs', icon: 'Building' },
    { id: 'bank_reconciliation', label: 'Rapprochement bancaire', icon: 'Bank' },
    { id: 'interim_closing', label: 'Clôture intermédiaire', icon: 'FileCheck' }
  ];

  const renderClientsTab = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance financière</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value/1000}k€`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Area type="monotone" dataKey="revenue" stroke="#10B981" fill="#10B981" name="Chiffre d'affaires" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Répartition des charges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value/1000}k€`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="expenses" fill="#FF6B35" name="Charges" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-medium mb-2">Factures en attente</h4>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-500 mt-1">Total: 45 000 €</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-medium mb-2">Paiements à venir</h4>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-500 mt-1">Total: 28 000 €</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-medium mb-2">Délai moyen</h4>
                <p className="text-2xl font-bold">45 jours</p>
                <p className="text-sm text-gray-500 mt-1">Objectif: 30 jours</p>
              </div>
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-medium mb-2">Opérations à lettrer</h4>
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-gray-500 mt-1">Montant total: 12 500 €</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-medium mb-2">Dernier rapprochement</h4>
                <p className="text-2xl font-bold">15/04/2025</p>
                <p className="text-sm text-gray-500 mt-1">Par Thomas Dubois</p>
              </div>
            </div>
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
            leftIcon={
              tab.icon === 'Users' ? <Users size={16} /> :
              tab.icon === 'Building' ? <Building size={16} /> :
              tab.icon === 'Bank' ? <Bank size={16} /> :
              <FileCheck size={16} />
            }
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {activeTab === 'clients' && renderClientsTab()}
      {activeTab === 'suppliers' && renderSuppliersTab()}
      {activeTab === 'bank_reconciliation' && renderBankReconciliation()}
      {activeTab === 'interim_closing' && renderInterimClosing()}
    </div>
  );
};