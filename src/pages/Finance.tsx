import React, { useState } from 'react';
import { Users, Building, Bank, FileCheck, FileText, Calculator } from 'lucide-react';
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
    { id: 'annual_closing', label: 'Clôture Annuelle', icon: FileText },
    { id: 'analytics', label: 'Comptabilité analytique', icon: Calculator }
  ];

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