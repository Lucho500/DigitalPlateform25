import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { mockPerformanceData } from '../data/mockData';
import { 
  Users, Building, Ban as Bank, FileCheck, Calculator, PieChart, 
  BarChart2, TrendingUp, ArrowUpRight, ArrowDownRight, Download,
  FileText, CheckCircle, AlertCircle, Clock
} from 'lucide-react';

export const Finance = () => {
  const [activeTab, setActiveTab] = useState('clients');

  const tabs = [
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'suppliers', label: 'Fournisseurs', icon: Building },
    { id: 'bank_reconciliation', label: 'Rapprochement bancaire', icon: Bank },
    { id: 'interim_closing', label: 'Clôture intermédiaire', icon: FileCheck },
    { id: 'analytics', label: 'Comptabilité analytique', icon: Calculator }
  ];

  const renderClientsTab = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Créances clients</h3>
                <Badge variant="success">En hausse</Badge>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total créances</span>
                  <span className="font-medium">45 000 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Délai moyen (DSO)</span>
                  <span className="font-medium">32 jours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Taux de recouvrement</span>
                  <span className="font-medium text-green-500">98%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Factures en attente</h3>
                <Badge variant="warning">12 factures</Badge>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Montant total</span>
                  <span className="font-medium">15 000 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Échéance moyenne</span>
                  <span className="font-medium">7 jours</span>
                </div>
                <Button variant="outline" fullWidth>Voir les factures</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Actions requises</h3>
                <Badge variant="error">3 actions</Badge>
              </div>
              <div className="space-y-4">
                <Button variant="outline" fullWidth>Relances (2)</Button>
                <Button variant="outline" fullWidth>Litiges (1)</Button>
                <Button variant="primary" fullWidth>Gérer</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Suivi des paiements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Client</th>
                      <th className="text-left p-4">Facture</th>
                      <th className="text-right p-4">Montant</th>
                      <th className="text-center p-4">Échéance</th>
                      <th className="text-center p-4">Statut</th>
                      <th className="text-right p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">Tech Solutions</td>
                      <td className="p-4">FAC-2025-001</td>
                      <td className="p-4 text-right">12 500 €</td>
                      <td className="p-4 text-center">15/04/2025</td>
                      <td className="p-4 text-center">
                        <Badge variant="success">Payée</Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm">
                          <Download size={16} />
                        </Button>
                      </td>
                    </tr>
                    {/* Ajoutez plus de lignes selon vos besoins */}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderSuppliersTab = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Dettes fournisseurs</h3>
                <Badge variant="info">Stable</Badge>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total dettes</span>
                  <span className="font-medium">28 000 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Délai moyen (DPO)</span>
                  <span className="font-medium">45 jours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Factures en retard</span>
                  <span className="font-medium text-yellow-500">3</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Paiements à venir</h3>
                <Badge variant="warning">8 paiements</Badge>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Cette semaine</span>
                  <span className="font-medium">12 000 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Semaine prochaine</span>
                  <span className="font-medium">8 500 €</span>
                </div>
                <Button variant="outline" fullWidth>Planifier</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Actions requises</h3>
                <Badge variant="error">2 actions</Badge>
              </div>
              <div className="space-y-4">
                <Button variant="outline" fullWidth>Validation (2)</Button>
                <Button variant="outline" fullWidth>Litiges (0)</Button>
                <Button variant="primary" fullWidth>Traiter</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Factures fournisseurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Fournisseur</th>
                      <th className="text-left p-4">Facture</th>
                      <th className="text-right p-4">Montant</th>
                      <th className="text-center p-4">Échéance</th>
                      <th className="text-center p-4">Statut</th>
                      <th className="text-right p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">Office Supplies</td>
                      <td className="p-4">FF-2025-042</td>
                      <td className="p-4 text-right">2 800 €</td>
                      <td className="p-4 text-center">20/04/2025</td>
                      <td className="p-4 text-center">
                        <Badge variant="warning">En attente</Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm">Valider</Button>
                      </td>
                    </tr>
                    {/* Ajoutez plus de lignes selon vos besoins */}
                  </tbody>
                </table>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Acquittement Fournisseurs / Débiteurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="text-green-500" size={24} />
                    <div>
                      <h4 className="font-medium">Paiements acquittés</h4>
                      <p className="text-sm text-gray-500">15 opérations</p>
                    </div>
                  </div>
                  <span className="font-medium">45 000 €</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Clock className="text-yellow-500" size={24} />
                    <div>
                      <h4 className="font-medium">En attente</h4>
                      <p className="text-sm text-gray-500">8 opérations</p>
                    </div>
                  </div>
                  <span className="font-medium">12 500 €</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <AlertCircle className="text-red-500" size={24} />
                    <div>
                      <h4 className="font-medium">À vérifier</h4>
                      <p className="text-sm text-gray-500">3 opérations</p>
                    </div>
                  </div>
                  <span className="font-medium">5 800 €</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comptabilité Financière</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">État des comptes</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Solde bancaire</span>
                      <span className="font-medium">125 000 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Solde comptable</span>
                      <span className="font-medium">122 500 €</span>
                    </div>
                    <div className="flex justify-between text-yellow-500">
                      <span>Écart</span>
                      <span className="font-medium">2 500 €</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" fullWidth leftIcon={<FileText size={16} />}>
                    Relevé bancaire
                  </Button>
                  <Button variant="outline" fullWidth leftIcon={<Download size={16} />}>
                    Export
                  </Button>
                </div>

                <Button variant="primary" fullWidth>
                  Rapprocher les écritures
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Opérations à rapprocher</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Libellé</th>
                    <th className="text-right p-4">Montant</th>
                    <th className="text-center p-4">Type</th>
                    <th className="text-center p-4">Statut</th>
                    <th className="text-right p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">15/04/2025</td>
                    <td className="p-4">Paiement client ABC</td>
                    <td className="p-4 text-right">12 500 €</td>
                    <td className="p-4 text-center">Crédit</td>
                    <td className="p-4 text-center">
                      <Badge variant="warning">À rapprocher</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm">Rapprocher</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderInterimClosing = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Reporting Mensuel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Indicateurs clés</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Chiffre d'affaires</span>
                      <span className="font-medium">84 000 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Marge brute</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>EBITDA</span>
                      <span className="font-medium">18%</span>
                    </div>
                  </div>
                </div>

                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockPerformanceData.slice(-6)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `${value/1000}k€`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar dataKey="revenue" fill="#0046AD" name="CA" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reporting Trimestriel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Performance T1 2025</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>CA Trimestriel</span>
                      <span className="font-medium">245 000 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Croissance vs T4 2024</span>
                      <span className="font-medium text-green-500">+8.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Objectif atteint</span>
                      <span className="font-medium text-green-500">102%</span>
                    </div>
                  </div>
                </div>

                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockPerformanceData.slice(-12)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `${value/1000}k€`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Line type="monotone" dataKey="revenue" stroke="#0046AD" name="CA" />
                      <Line type="monotone" dataKey="expenses" stroke="#FF6B35" name="Charges" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tableau de bord financier</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-medium mb-2">Bilan</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total actif</span>
                    <span className="font-medium">850k€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fonds propres</span>
                    <span className="font-medium">420k€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ratio endettement</span>
                    <span className="font-medium">0.45</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-medium mb-2">Trésorerie</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Disponibilités</span>
                    <span className="font-medium">125k€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BFR</span>
                    <span className="font-medium">45 jours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prévisionnel</span>
                    <span className="font-medium text-green-500">+15%</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-medium mb-2">Rentabilité</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>ROE</span>
                    <span className="font-medium">22%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROCE</span>
                    <span className="font-medium">18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Point mort</span>
                    <span className="font-medium">85%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAnalyticsTab = () => {
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'ghost'}
            onClick={() => setActiveTab(tab.id)}
            leftIcon={<tab.icon size={20} />}
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