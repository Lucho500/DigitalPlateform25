import React, { useState } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { 
  Download, Filter, Database, Shield, FileText, TrendingUp,
  Users, DollarSign, Calendar, PieChart as PieChartIcon,
  BarChart2, ArrowUpRight, ArrowDownRight, Target,
  Briefcase, CreditCard, Building, Eye
} from 'lucide-react';

type TabType = 'data_lake' | 'reporting' | 'planning' | 'projection';

interface TabProps {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabProps[] = [
  { id: 'data_lake', label: 'Data Lake', icon: <Database size={20} /> },
  { id: 'reporting', label: 'Reporting', icon: <BarChart2 size={20} /> },
  { id: 'planning', label: 'Planification', icon: <Calendar size={20} /> },
  { id: 'projection', label: 'Projection', icon: <Target size={20} /> }
];

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

const cashFlowData = [
  { month: 'Jan', entrees: 72000, sorties: 48000 },
  { month: 'Fév', entrees: 65000, sorties: 44000 },
  { month: 'Mar', entrees: 85000, sorties: 54000 },
  { month: 'Avr', entrees: 88000, sorties: 58000 }
];

const budgetData = [
  { category: 'Marketing', budget: 50000, actual: 45000, variance: 5000 },
  { category: 'R&D', budget: 80000, actual: 85000, variance: -5000 },
  { category: 'Ventes', budget: 60000, actual: 58000, variance: 2000 },
  { category: 'Admin', budget: 40000, actual: 38000, variance: 2000 }
];

const projectionData = [
  { year: '2025', baseline: 100000, optimistic: 120000, pessimistic: 80000 },
  { year: '2026', baseline: 120000, optimistic: 150000, pessimistic: 90000 },
  { year: '2027', baseline: 150000, optimistic: 190000, pessimistic: 110000 }
];

export const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('reporting');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'data_lake':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <Shield className="text-blue-500" size={24} />
                    </div>
                    <Badge variant="success">Actif</Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Sécurité des données</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Encryption et protection des données sensibles
                  </p>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      Voir les détails
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                      <FileText className="text-green-500" size={24} />
                    </div>
                    <Badge variant="success">Conforme</Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Compliance</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Conformité RGPD et normes sectorielles
                  </p>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      Voir les rapports
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                      <Database className="text-purple-500" size={24} />
                    </div>
                    <Badge variant="info">94% utilisé</Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Stockage</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Gestion et optimisation du stockage
                  </p>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      Gérer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Sources de données</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Users size={24} className="text-blue-500" />
                      <div>
                        <h4 className="font-medium">Données RH</h4>
                        <p className="text-sm text-gray-500">Mise à jour il y a 2h</p>
                      </div>
                    </div>
                    <Badge variant="success">Connecté</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <DollarSign size={24} className="text-green-500" />
                      <div>
                        <h4 className="font-medium">Données financières</h4>
                        <p className="text-sm text-gray-500">Mise à jour il y a 1h</p>
                      </div>
                    </div>
                    <Badge variant="success">Connecté</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Building size={24} className="text-purple-500" />
                      <div>
                        <h4 className="font-medium">Données opérationnelles</h4>
                        <p className="text-sm text-gray-500">Mise à jour il y a 30min</p>
                      </div>
                    </div>
                    <Badge variant="success">Connecté</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'reporting':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">CA Mensuel</p>
                      <h3 className="text-xl font-semibold mt-1">84 000 €</h3>
                    </div>
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                      <ArrowUpRight className="text-green-500" size={20} />
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-green-600">+12% vs mois précédent</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Charges</p>
                      <h3 className="text-xl font-semibold mt-1">53 000 €</h3>
                    </div>
                    <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
                      <ArrowDownRight className="text-red-500" size={20} />
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-red-600">+8% vs mois précédent</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Trésorerie</p>
                      <h3 className="text-xl font-semibold mt-1">125 000 €</h3>
                    </div>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <CreditCard className="text-blue-500" size={20} />
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-blue-600">45 jours de couverture</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Effectifs</p>
                      <h3 className="text-xl font-semibold mt-1">42</h3>
                    </div>
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                      <Users className="text-purple-500" size={20} />
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-purple-600">+2 ce mois</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance financière</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
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
                        />
                        <Line 
                          type="monotone" 
                          dataKey="expenses" 
                          stroke="#FF6B35" 
                          name="Charges"
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="profit" 
                          stroke="#00A3A1" 
                          name="Résultat"
                          strokeWidth={2}
                        />
                      </LineChart>
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

            <Card>
              <CardHeader>
                <CardTitle>Tableaux de bord personnalisés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">RH & Paie</h4>
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Effectifs</span>
                        <span className="font-medium">42</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Masse salariale</span>
                        <span className="font-medium">156k€</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Turn-over</span>
                        <span className="font-medium">4.2%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Trésorerie</h4>
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Solde</span>
                        <span className="font-medium">125k€</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Encours client</span>
                        <span className="font-medium">45k€</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Dettes fournisseurs</span>
                        <span className="font-medium">28k€</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Performance</h4>
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Marge brute</span>
                        <span className="font-medium">32%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>EBITDA</span>
                        <span className="font-medium">18%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>ROE</span>
                        <span className="font-medium">22%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'planning':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget vs Réalisé</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={budgetData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis tickFormatter={(value) => `${value/1000}k€`} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Bar dataKey="budget" name="Budget" fill="#0046AD" />
                        <Bar dataKey="actual" name="Réalisé" fill="#00A3A1" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prévisions de trésorerie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={cashFlowData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `${value/1000}k€`} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="entrees" 
                          stackId="1" 
                          stroke="#0046AD" 
                          fill="#0046AD" 
                          name="Entrées"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="sorties" 
                          stackId="1" 
                          stroke="#FF6B35" 
                          fill="#FF6B35" 
                          name="Sorties"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Gestion budgétaire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-2">Budget opérationnel</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Alloué</span>
                          <span className="font-medium">450k€</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Consommé</span>
                          <span className="font-medium">312k€</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Reste</span>
                          <span className="font-medium text-green-500">138k€</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-2">Budget investissement</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Alloué</span>
                          <span className="font-medium">250k€</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Consommé</span>
                          <span className="font-medium">185k€</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Reste</span>
                          <span className="font-medium text-green-500">65k€</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-2">Budget RH</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Alloué</span>
                          <span className="font-medium">850k€</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Consommé</span>
                          <span className="font-medium">620k€</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Reste</span>
                          <span className="font-medium text-green-500">230k€</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'projection':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Projections financières</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `${value/1000}k€`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="baseline" 
                        stroke="#0046AD" 
                        name="Base"
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="optimistic" 
                        stroke="#00A3A1" 
                        name="Optimiste"
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="pessimistic" 
                        stroke="#FF6B35" 
                        name="Pessimiste"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Stratégie de prix</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-2">Analyse de sensibilité</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Prix actuel</span>
                          <span className="font-medium">100€</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Impact +10%</span>
                          <span className="font-medium text-green-500">+15% marge</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Impact -10%</span>
                          <span className="font-medium text-red-500">-20% marge</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-2">Élasticité-prix</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Court terme</span>
                          <span className="font-medium">-0.8</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Moyen terme</span>
                          <span className="font-medium">-1.2</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Long terme</span>
                          <span className="font-medium">-1.5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scénarios stratégiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Expansion marché</h4>
                        <Badge variant="success">Recommandé</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        Développement sur nouveaux marchés
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>ROI estimé</span>
                          <span className="font-medium">25%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Risque</span>
                          <span className="font-medium">Modéré</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Innovation produit</h4>
                        <Badge variant="warning">À étudier</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        Développement nouvelle gamme
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>ROI estimé</span>
                          <span className="font-medium">35%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Risque</span>
                          <span className="font-medium">Élevé</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Optimisation coûts</h4>
                        <Badge variant="info">En cours</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        Réduction des charges
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Impact estimé</span>
                          <span className="font-medium">15%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Risque</span>
                          <span className="font-medium">Faible</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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

      <Card>
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#0046AD] text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
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