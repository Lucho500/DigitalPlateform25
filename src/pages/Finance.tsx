import React, { useState } from 'react';
import { 
  Users, Building, Ban as Bank, FileCheck, Calculator, PieChart, 
  BarChart2, TrendingUp, ArrowUpRight, ArrowDownRight, Download,
  FileText, CheckCircle, AlertCircle, Clock, BookOpen, FileSpreadsheet,
  ClipboardCheck, FileSignature, Plus, Filter, Search, Eye, Upload,
  DollarSign, Package, Briefcase, Tool, HelpCircle
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
    { id: 'analytics', label: 'Comptabilité analytique', icon: Calculator },
    { id: 'payroll', label: 'Import Salaires', icon: DollarSign },
    { id: 'inventory', label: 'Stocks', icon: Package },
    { id: 'investments', label: 'Titres', icon: Briefcase },
    { id: 'fixed_assets', label: 'Immobilisations', icon: Tool },
    { id: 'audit', label: 'Support Audit', icon: HelpCircle }
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

  const renderPayrollTab = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Import des écritures de salaire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-4">Fichier d'import</h4>
                  <Button variant="outline" fullWidth leftIcon={<Upload size={16} />}>
                    Sélectionner un fichier
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    Formats acceptés : .csv, .xlsx
                  </p>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-4">Dernier import</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Date</span>
                      <span>15/04/2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Montant total</span>
                      <span className="font-medium">45 000 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Statut</span>
                      <Badge variant="success">Validé</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-medium mb-4">Journal des imports</h4>
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-2">Date</th>
                      <th className="pb-2">Description</th>
                      <th className="pb-2 text-right">Montant</th>
                      <th className="pb-2 text-center">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-2">15/04/2025</td>
                      <td>Salaires Mars 2025</td>
                      <td className="text-right">45 000 €</td>
                      <td className="text-center">
                        <Badge variant="success">Validé</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">15/03/2025</td>
                      <td>Salaires Février 2025</td>
                      <td className="text-right">44 500 €</td>
                      <td className="text-center">
                        <Badge variant="success">Validé</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderInventoryTab = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>État des stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Valeur totale</h4>
                  <p className="text-2xl font-bold">250 000 €</p>
                  <div className="mt-2 flex items-center text-sm text-green-500">
                    <ArrowUpRight size={16} className="mr-1" />
                    <span>+5% depuis le dernier mois</span>
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
              <CardTitle>Mouvements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Entrées</p>
                    <p className="text-lg font-semibold">+15 000 €</p>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Sorties</p>
                    <p className="text-lg font-semibold">-12 000 €</p>
                  </div>
                </div>
                <Button variant="outline" fullWidth>
                  Nouveau mouvement
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventaire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Dernier inventaire</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Date</span>
                      <span>31/03/2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Écart</span>
                      <span className="text-green-500">+1 250 €</span>
                    </div>
                  </div>
                </div>
                <Button variant="primary" fullWidth>
                  Nouvel inventaire
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderInvestmentsTab = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Portefeuille</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Valeur totale</h4>
                  <p className="text-2xl font-bold">750 000 €</p>
                  <div className="mt-2 flex items-center text-sm text-green-500">
                    <ArrowUpRight size={16} className="mr-1" />
                    <span>+8.5% YTD</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Actions</span>
                    <span>60%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Obligations</span>
                    <span>30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trésorerie</span>
                    <span>10%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="primary" fullWidth>
                  Nouvelle transaction
                </Button>
                <div className="space-y-2">
                  <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Achat Actions Tech</p>
                        <p className="text-sm text-gray-500">15/04/2025</p>
                      </div>
                      <span className="text-green-500">+25 000 €</span>
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Vente Obligations</p>
                        <p className="text-sm text-gray-500">10/04/2025</p>
                      </div>
                      <span className="text-red-500">-15 000 €</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-40">
                  {/* Add performance chart here */}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>1 mois</span>
                    <span className="text-green-500">+2.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>3 mois</span>
                    <span className="text-green-500">+5.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>YTD</span>
                    <span className="text-green-500">+8.5%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderFixedAssetsTab = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Immobilisations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Valeur nette comptable</h4>
                  <p className="text-2xl font-bold">1 250 000 €</p>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span>Valeur brute</span>
                      <span>2 000 000 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amortissements</span>
                      <span>750 000 €</span>
                    </div>
                  </div>
                </div>
                <Button variant="primary" fullWidth>
                  Nouvelle immobilisation
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amortissements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">À comptabiliser</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Avril 2025</span>
                      <span>15 000 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mai 2025</span>
                      <span>15 000 €</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" fullWidth>
                  Calculer les amortissements
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Dernières cessions</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Véhicule A</span>
                      <span className="text-green-500">+5 000 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Machine B</span>
                      <span className="text-red-500">-2 000 €</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" fullWidth>
                  Nouvelle cession
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderAuditTab = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents d'audit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-4">Balance âgée</h4>
                  <Button variant="outline" fullWidth>
                    Télécharger
                  </Button>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-4">Grand livre</h4>
                  <Button variant="outline" fullWidth>
                    Télécharger
                  </Button>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-4">Journal des écritures</h4>
                  <Button variant="outline" fullWidth>
                    Télécharger
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support à l'audit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-4">Questions en attente</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Justificatifs</span>
                      <Badge variant="warning">3</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Confirmations</span>
                      <Badge variant="warning">2</Badge>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium mb-4">Dernières demandes</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Facture 2025-001</span>
                      <Badge variant="success">Fourni</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Contrat location</span>
                      <Badge variant="warning">En attente</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="primary" fullWidth>
                  Répondre aux demandes
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
      <div className="flex space-x-2 overflow-x-auto pb-2">
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
      {activeTab === 'payroll' && renderPayrollTab()}
      {activeTab === 'inventory' && renderInventoryTab()}
      {activeTab === 'investments' && renderInvestmentsTab()}
      {activeTab === 'fixed_assets' && renderFixedAssetsTab()}
      {activeTab === 'audit' && renderAuditTab()}
    </div>
  );
}

export { Finance }