import React, { useState } from 'react';
import { 
  Users, Building, Ban as Bank, FileCheck, Calculator, PieChart, 
  BarChart2, TrendingUp, ArrowUpRight, ArrowDownRight, Download,
  FileText, CheckCircle, AlertCircle, Clock, BookOpen, FileSpreadsheet,
  ClipboardCheck, FileSignature
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export default function Finance() {
  const [activeTab, setActiveTab] = useState('annual_closing');

  const tabs = [
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'suppliers', label: 'Fournisseurs', icon: Building },
    { id: 'bank_reconciliation', label: 'Rapprochement bancaire', icon: Bank },
    { id: 'interim_closing', label: 'Clôture intermédiaire', icon: FileCheck },
    { id: 'annual_closing', label: 'Clôture Annuelle', icon: BookOpen },
    { id: 'analytics', label: 'Comptabilité analytique', icon: Calculator }
  ];

  const renderClientsTab = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestion des clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Clients actifs</h4>
                  <p className="text-2xl font-bold">127</p>
                  <p className="text-sm text-gray-500">+12% ce mois</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Chiffre d'affaires</h4>
                  <p className="text-2xl font-bold">324,500€</p>
                  <p className="text-sm text-gray-500">+8% ce mois</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Encours client</h4>
                  <p className="text-2xl font-bold">45,800€</p>
                  <p className="text-sm text-gray-500">-5% ce mois</p>
                </div>
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
        <Card>
          <CardHeader>
            <CardTitle>Gestion des fournisseurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Fournisseurs actifs</h4>
                  <p className="text-2xl font-bold">84</p>
                  <p className="text-sm text-gray-500">+5% ce mois</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Dépenses</h4>
                  <p className="text-2xl font-bold">156,300€</p>
                  <p className="text-sm text-gray-500">+3% ce mois</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Dettes fournisseurs</h4>
                  <p className="text-2xl font-bold">28,900€</p>
                  <p className="text-sm text-gray-500">-8% ce mois</p>
                </div>
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
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Solde comptable</h4>
                  <p className="text-2xl font-bold">125,400€</p>
                  <p className="text-sm text-gray-500">Au 15/04/2025</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Solde bancaire</h4>
                  <p className="text-2xl font-bold">124,800€</p>
                  <p className="text-sm text-gray-500">Au 15/04/2025</p>
                </div>
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
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Résultat intermédiaire</h4>
                  <p className="text-2xl font-bold">45,600€</p>
                  <p className="text-sm text-gray-500">T1 2025</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Variation N-1</h4>
                  <p className="text-2xl font-bold text-green-500">+12%</p>
                  <p className="text-sm text-gray-500">vs T1 2024</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Marge brute</h4>
                  <p className="text-2xl font-bold">32%</p>
                  <p className="text-sm text-gray-500">+2pts vs N-1</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAnalyticsTab = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Comptabilité analytique</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Centre de profit A</h4>
                  <p className="text-2xl font-bold">28,500€</p>
                  <p className="text-sm text-gray-500">Marge: 25%</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Centre de profit B</h4>
                  <p className="text-2xl font-bold">34,200€</p>
                  <p className="text-sm text-gray-500">Marge: 28%</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Centre de profit C</h4>
                  <p className="text-2xl font-bold">22,800€</p>
                  <p className="text-sm text-gray-500">Marge: 22%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAnnualClosing = () => {
    return (
      <div className="space-y-6">
        {/* Écritures */}
        <Card>
          <CardHeader>
            <CardTitle>Écritures de clôture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <FileText className="text-blue-500" size={24} />
                    <h4 className="font-medium">Écritures d'inventaire</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>À traiter</span>
                      <Badge variant="warning">8</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Validées</span>
                      <Badge variant="success">12</Badge>
                    </div>
                    <Button variant="outline" fullWidth className="mt-2">
                      Gérer
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <FileSpreadsheet className="text-green-500" size={24} />
                    <h4 className="font-medium">Écritures de régularisation</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>À traiter</span>
                      <Badge variant="warning">5</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Validées</span>
                      <Badge variant="success">15</Badge>
                    </div>
                    <Button variant="outline" fullWidth className="mt-2">
                      Gérer
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <ClipboardCheck className="text-purple-500" size={24} />
                    <h4 className="font-medium">Écritures de bilan</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>À traiter</span>
                      <Badge variant="warning">3</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Validées</span>
                      <Badge variant="success">18</Badge>
                    </div>
                    <Button variant="outline" fullWidth className="mt-2">
                      Gérer
                    </Button>
                  </div>
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
                      <span>Balance générale</span>
                      <Badge variant="success">Validé</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Grand livre</span>
                      <Badge variant="success">Validé</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Journal centralisateur</span>
                      <Badge variant="warning">En cours</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-4">Justificatifs</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Relevés bancaires</span>
                      <Badge variant="success">Complet</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Factures</span>
                      <Badge variant="warning">95%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Contrats</span>
                      <Badge variant="success">Complet</Badge>
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
                      <span className="font-medium">1.2M€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Passif</span>
                      <span className="font-medium">1.2M€</span>
                    </div>
                    <Button variant="outline" fullWidth className="mt-2">
                      Voir détails
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Compte de résultat</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Résultat net</span>
                      <span className="font-medium text-green-500">+250k€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Variation N-1</span>
                      <span className="font-medium text-green-500">+15%</span>
                    </div>
                    <Button variant="outline" fullWidth className="mt-2">
                      Voir détails
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Annexes</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sections complétées</span>
                      <span className="font-medium">18/20</span>
                    </div>
                    <div className="flex justify-between">
                      <span>État</span>
                      <Badge variant="warning">En cours</Badge>
                    </div>
                    <Button variant="outline" fullWidth className="mt-2">
                      Compléter
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PVAGO */}
        <Card>
          <CardHeader>
            <CardTitle>PV d'Assemblée Générale Ordinaire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <FileSignature className="text-blue-500" size={24} />
                    <h4 className="font-medium">État du document</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Version</span>
                      <span className="font-medium">2.1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dernière modification</span>
                      <span className="font-medium">15/04/2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Statut</span>
                      <Badge variant="warning">En révision</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <ClipboardCheck className="text-green-500" size={24} />
                    <h4 className="font-medium">Actions requises</h4>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" fullWidth>
                      Modifier le document
                    </Button>
                    <Button variant="outline" fullWidth>
                      Ajouter des annexes
                    </Button>
                    <Button variant="primary" fullWidth>
                      Envoyer pour signature
                    </Button>
                  </div>
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
          >
            <tab.icon size={20} className="mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      {activeTab === 'clients' && renderClientsTab()}
      {activeTab === 'suppliers' && renderSuppliersTab()}
      {activeTab === 'bank_reconciliation' && renderBankReconciliation()}
      {activeTab === 'interim_closing' && renderInterimClosing()}
      {activeTab === 'annual_closing' && renderAnnualClosing()}
      {activeTab === 'analytics' && renderAnalyticsTab()}
    </div>
  );
}

export { Finance }