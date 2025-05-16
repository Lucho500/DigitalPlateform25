import React, { useState } from 'react';
import { Users, Building, Ban as Bank, FileCheck, FileText, Calculator, Search, Filter, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockPerformanceData } from '../data/mockData';
import { formatCurrency, formatPercentage } from '../utils/formatters';

export default function Finance() {
  const [activeTab, setActiveTab] = useState('clients');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'suppliers', label: 'Fournisseurs', icon: Building },
    { id: 'bank_reconciliation', label: 'Rapprochement bancaire', icon: Bank },
    { id: 'interim_closing', label: 'Clôture intermédiaire', icon: FileCheck },
    { id: 'annual_closing', label: 'Clôture Annuelle', icon: FileText },
    { id: 'analytics', label: 'Comptabilité analytique', icon: Calculator }
  ];

  const renderClientsTab = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">CA Clients</p>
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
                  <p className="text-sm font-medium text-gray-500">Créances</p>
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
                  <p className="text-sm font-medium text-gray-500">DSO</p>
                  <h3 className="text-xl font-semibold mt-1">45 jours</h3>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <ArrowUpRight className="text-blue-500" size={20} />
                </div>
              </div>
              <div className="mt-2 text-sm text-blue-600">-5 jours vs objectif</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Clients actifs</p>
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
              <div className="flex items-center justify-between">
                <CardTitle>Évolution CA Clients</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="success" size="sm">+15.3% vs N-1</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value/1000}k€`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#0046AD" 
                      fill="#0046AD" 
                      fillOpacity={0.6}
                      name="CA"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Analyse des marges</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="info" size="sm">Par client</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value/1000}k€`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="margin" fill="#00A3A1" name="Marge" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Achats</p>
                  <h3 className="text-xl font-semibold mt-1">45 000 €</h3>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <ArrowDownRight className="text-green-500" size={20} />
                </div>
              </div>
              <div className="mt-2 text-sm text-green-600">-8% vs mois précédent</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Dettes</p>
                  <h3 className="text-xl font-semibold mt-1">28 000 €</h3>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <ArrowUpRight className="text-blue-500" size={20} />
                </div>
              </div>
              <div className="mt-2 text-sm text-blue-600">+5% vs mois précédent</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">DPO</p>
                  <h3 className="text-xl font-semibold mt-1">30 jours</h3>
                </div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                  <ArrowUpRight className="text-yellow-500" size={20} />
                </div>
              </div>
              <div className="mt-2 text-sm text-yellow-600">+2 jours vs objectif</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Fournisseurs actifs</p>
                  <h3 className="text-xl font-semibold mt-1">28</h3>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <Building className="text-purple-500" size={20} />
                </div>
              </div>
              <div className="mt-2 text-sm text-purple-600">Stable</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Évolution des achats</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="success" size="sm">Optimisé</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value/1000}k€`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Area 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="#FF6B35" 
                      fill="#FF6B35" 
                      fillOpacity={0.6}
                      name="Achats"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Analyse des coûts</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="info" size="sm">Par catégorie</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value/1000}k€`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="analyticsA" fill="#0046AD" name="Coûts directs" />
                    <Bar dataKey="analyticsB" fill="#FF6B35" name="Coûts indirects" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderBankReconciliation = () => {
    return (
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Rapprochement bancaire</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Contenu en cours de développement</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderInterimClosing = () => {
    return (
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Clôture intermédiaire</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Contenu en cours de développement</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAnalyticsTab = () => {
    return (
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Comptabilité analytique</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Contenu en cours de développement</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAnnualClosingTab = () => {
    return (
      <div className="space-y-6">
        {/* Écritures de clôture */}
        <Card>
          <CardHeader>
            <CardTitle>Écritures de clôture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Écritures d'inventaire</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Amortissements</span>
                      <Badge variant="success">Validé</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Provisions</span>
                      <Badge variant="warning">En cours</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Régularisations</span>
                      <Badge variant="warning">En cours</Badge>
                    </div>
                  </div>
                  <Button variant="outline" fullWidth className="mt-4">
                    Gérer les écritures
                  </Button>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Écritures de régularisation</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Charges à payer</span>
                      <Badge variant="success">Validé</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Produits à recevoir</span>
                      <Badge variant="warning">En cours</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Charges constatées d'avance</span>
                      <Badge variant="info">À faire</Badge>
                    </div>
                  </div>
                  <Button variant="outline" fullWidth className="mt-4">
                    Voir le détail
                  </Button>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Balance de clôture</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Débit</span>
                      <span className="font-medium">1 250 000 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Crédit</span>
                      <span className="font-medium">1 250 000 €</span>
                    </div>
                    <div className="flex justify-between text-green-500">
                      <span>Écart</span>
                      <span className="font-medium">0 €</span>
                    </div>
                  </div>
                  <Button variant="outline" fullWidth className="mt-4">
                    Voir la balance
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dossier de clôture */}
        <Card>
          <CardHeader>
            <CardTitle>Dossier de clôture documenté et justifié</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-4">Documents obligatoires</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Bilan</span>
                      <Badge variant="success">Complet</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Compte de résultat</span>
                      <Badge variant="success">Complet</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Annexes</span>
                      <Badge variant="warning">En cours</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-4">Justificatifs</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Relevés bancaires</span>
                      <Badge variant="success">Validé</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Inventaire physique</span>
                      <Badge variant="warning">En attente</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Justificatifs charges</span>
                      <Badge variant="info">À vérifier</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* États financiers */}
        <Card>
          <CardHeader>
            <CardTitle>États financiers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Bilan</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Actif</span>
                      <span className="font-medium">2 500 000 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Passif</span>
                      <span className="font-medium">2 500 000 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fonds propres</span>
                      <span className="font-medium">850 000 €</span>
                    </div>
                  </div>
                  <Button variant="outline" fullWidth className="mt-4">
                    Voir le bilan
                  </Button>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Compte de résultat</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Chiffre d'affaires</span>
                      <span className="font-medium">1 200 000 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Résultat net</span>
                      <span className="font-medium text-green-500">180 000 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Marge nette</span>
                      <span className="font-medium">15%</span>
                    </div>
                  </div>
                  <Button variant="outline" fullWidth className="mt-4">
                    Voir le détail
                  </Button>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Annexes</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Règles et méthodes</span>
                      <Badge variant="success">Complet</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Tableaux obligatoires</span>
                      <Badge variant="warning">En cours</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Notes complémentaires</span>
                      <Badge variant="info">À faire</Badge>
                    </div>
                  </div>
                  <Button variant="outline" fullWidth className="mt-4">
                    Gérer les annexes
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PV AGO */}
        <Card>
          <CardHeader>
            <CardTitle>PV d'Assemblée Générale Ordinaire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Documents préparatoires</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Convocations</span>
                      <Badge variant="success">Envoyées</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Rapport de gestion</span>
                      <Badge variant="warning">En cours</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Résolutions</span>
                      <Badge variant="info">À préparer</Badge>
                    </div>
                  </div>
                  <Button variant="outline" fullWidth className="mt-4">
                    Gérer les documents
                  </Button>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Procès-verbal</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Date AGO</span>
                      <span className="font-medium">30/06/2025</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Quorum</span>
                      <span className="font-medium text-green-500">Atteint</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Statut</span>
                      <Badge variant="warning">À rédiger</Badge>
                    </div>
                  </div>
                  <Button variant="primary" fullWidth className="mt-4">
                    Préparer le PV
                  </Button>
                </div>
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
      {activeTab === 'annual_closing' && renderAnnualClosingTab()}
      {activeTab === 'analytics' && renderAnalyticsTab()}
    </div>
  );
}

export { Finance }