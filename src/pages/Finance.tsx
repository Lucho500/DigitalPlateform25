import React, { useState } from 'react';
import { 
  Users, Building, Ban as Bank, FileCheck, Calculator, PieChart, 
  BarChart2, TrendingUp, ArrowUpRight, ArrowDownRight, Download,
  FileText, CheckCircle, AlertCircle, Clock, BookOpen, FileSpreadsheet,
  ClipboardCheck, FileSignature, Plus, Filter, Search, Eye
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockBankReconciliations, mockCOFIEntries } from '../data/mockData';

export default function Finance() {
  const [activeTab, setActiveTab] = useState('clients');

  const tabs = [
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'suppliers', label: 'Fournisseurs', icon: Building },
    { id: 'bank_reconciliation', label: 'Rapprochement bancaire', icon: Bank },
    { id: 'interim_closing', label: 'Clôture intermédiaire', icon: FileCheck },
    { id: 'annual_closing', label: 'Clôture Annuelle', icon: BookOpen },
    { id: 'analytics', label: 'Comptabilité analytique', icon: Calculator }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const renderClientsTab = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Factures et offres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="primary" fullWidth leftIcon={<Plus size={16} />}>
                  Nouvelle facture
                </Button>
                <Button variant="outline" fullWidth>
                  Nouvelle offre
                </Button>
                <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Aperçu</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Factures en cours</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Offres en attente</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Montant total</span>
                      <span className="font-medium text-green-500">45 000 €</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Postes ouverts débiteurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Total à encaisser</h4>
                  <span className="text-xl font-bold text-blue-600">125 000 €</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Non échus</p>
                    <p className="text-lg font-semibold">85 000 €</p>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Échus</p>
                    <p className="text-lg font-semibold">40 000 €</p>
                  </div>
                </div>
                <Button variant="outline" fullWidth>
                  Voir le détail
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestion des rappels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Rappels à envoyer</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Niveau 1</span>
                      <Badge variant="warning">8</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Niveau 2</span>
                      <Badge variant="error">3</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Niveau 3</span>
                      <Badge variant="error">1</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="primary" fullWidth>
                  Générer les rappels
                </Button>
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
            <CardHeader>
              <CardTitle>Saisie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="primary" fullWidth leftIcon={<Plus size={16} />}>
                  Nouvelle facture
                </Button>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">À traiter</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>En attente</span>
                      <Badge variant="warning">5</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>En cours</span>
                      <Badge variant="info">3</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Proposition de paiement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Échéances</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Cette semaine</span>
                      <span className="font-medium">25 000 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Semaine prochaine</span>
                      <span className="font-medium">18 000 €</span>
                    </div>
                  </div>
                </div>
                <Button variant="primary" fullWidth>
                  Générer proposition
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mise au paiement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">À payer</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Validés</span>
                      <span className="font-medium text-green-500">32 000 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>En attente</span>
                      <span className="font-medium text-yellow-500">15 000 €</span>
                    </div>
                  </div>
                </div>
                <Button variant="primary" fullWidth>
                  Préparer paiement
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Postes ouverts créanciers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Total à payer</h4>
                  <span className="text-xl font-bold text-red-600">85 000 €</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Non échus</p>
                    <p className="text-lg font-semibold">65 000 €</p>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Échus</p>
                    <p className="text-lg font-semibold">20 000 €</p>
                  </div>
                </div>
                <Button variant="outline" fullWidth>
                  Voir le détail
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderBankReconciliationTab = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapprochements en cours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBankReconciliations.map((item, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{item.bankName}</h4>
                      <Badge variant={item.status === 'En cours' ? 'warning' : 'success'}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Solde bancaire</span>
                        <span className="font-medium">{formatCurrency(item.bankBalance)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Solde comptable</span>
                        <span className="font-medium">{formatCurrency(item.accountingBalance)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Écart</span>
                        <span className={`font-medium ${item.difference === 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {formatCurrency(item.difference)}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" fullWidth className="mt-4">
                      Continuer
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nouveau rapprochement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Comptes disponibles</h4>
                  <div className="space-y-2">
                    <Button variant="outline" fullWidth>
                      <Bank className="mr-2 h-4 w-4" />
                      Compte principal
                    </Button>
                    <Button variant="outline" fullWidth>
                      <Bank className="mr-2 h-4 w-4" />
                      Compte secondaire
                    </Button>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Import relevé bancaire</h4>
                  <Button variant="primary" fullWidth>
                    <Download className="mr-2 h-4 w-4" />
                    Importer fichier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderInterimClosingTab = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>État d'avancement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-4">Tâches à effectuer</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Validation des écritures</span>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                      <span>Lettrage des comptes</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-2" />
                      <span>Analyse des comptes</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documents de clôture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" fullWidth leftIcon={<FileText size={16} />}>
                  Balance générale
                </Button>
                <Button variant="outline" fullWidth leftIcon={<FileSpreadsheet size={16} />}>
                  Grand livre
                </Button>
                <Button variant="outline" fullWidth leftIcon={<ClipboardCheck size={16} />}>
                  Journal des écritures
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Validation finale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Contrôles</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Cohérence des soldes</span>
                      <Badge variant="success">OK</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Équilibre des journaux</span>
                      <Badge variant="warning">À vérifier</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="primary" fullWidth>
                  Valider la clôture
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderAnnualClosingTab = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Opérations de clôture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-4">Liste des opérations</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FileSignature className="h-5 w-5 text-blue-500 mr-2" />
                      <span>Écritures d'inventaire</span>
                    </div>
                    <div className="flex items-center">
                      <Calculator className="h-5 w-5 text-purple-500 mr-2" />
                      <span>Calcul des amortissements</span>
                    </div>
                    <div className="flex items-center">
                      <FileCheck className="h-5 w-5 text-green-500 mr-2" />
                      <span>Validation des provisions</span>
                    </div>
                  </div>
                </div>
                <Button variant="primary" fullWidth>
                  Démarrer les opérations
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>États financiers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" fullWidth>
                  Bilan
                </Button>
                <Button variant="outline" fullWidth>
                  Compte de résultat
                </Button>
                <Button variant="outline" fullWidth>
                  Annexes
                </Button>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Résultat de l'exercice</h4>
                  <div className="text-2xl font-bold text-green-500">
                    {formatCurrency(250000)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Archivage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Documents à archiver</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Journaux</span>
                      <Badge variant="success">Prêt</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Grand livre</span>
                      <Badge variant="success">Prêt</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Balance</span>
                      <Badge variant="warning">En cours</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="primary" fullWidth>
                  Archiver l'exercice
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderAnalyticsTab = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Centres de coûts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Production</h4>
                    <p className="text-sm text-gray-500">Centre principal</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-red-500">-85 000 €</p>
                    <p className="text-sm text-gray-500">Dépenses</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Administration</h4>
                    <p className="text-sm text-gray-500">Centre auxiliaire</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-red-500">-45 000 €</p>
                    <p className="text-sm text-gray-500">Dépenses</p>
                  </div>
                </div>
                <Button variant="outline" fullWidth>
                  Voir tous les centres
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Répartition des coûts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-48 flex items-center justify-center">
                  <PieChart className="h-32 w-32 text-blue-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Production</span>
                    <span>45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Administration</span>
                    <span>30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Commercial</span>
                    <span>25%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analyse de rentabilité</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Projet A</h4>
                    <Badge variant="success">Rentable</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Revenus</span>
                      <span className="font-medium text-green-500">150 000 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Coûts</span>
                      <span className="font-medium text-red-500">-100 000 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Marge</span>
                      <span className="font-medium">33%</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" fullWidth>
                  Voir tous les projets
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
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
      {activeTab === 'bank_reconciliation' && renderBankReconciliationTab()}
      {activeTab === 'interim_closing' && renderInterimClosingTab()}
      {activeTab === 'annual_closing' && renderAnnualClosingTab()}
      {activeTab === 'analytics' && renderAnalyticsTab()}
    </div>
  );
}

export { Finance }