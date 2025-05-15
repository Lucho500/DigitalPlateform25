import React, { useState } from 'react';
import { 
  FileText, Users, CreditCard, Bank, BarChart, Calculator,
  BookOpen, Archive, Package, Briefcase, HelpCircle,
  Download, Upload, Plus, Search, Filter
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

type Section = 
  | 'clients'
  | 'fournisseurs'
  | 'rapprochement'
  | 'cloture_intermediaire'
  | 'compta_analytique'
  | 'cloture_annuelle'
  | 'import_salaires'
  | 'stocks'
  | 'titres'
  | 'immos'
  | 'support_audit';

interface MenuItem {
  id: Section;
  title: string;
  icon: React.ReactNode;
  subsections?: { id: string; title: string }[];
}

export const Finance: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('clients');

  const menuItems: MenuItem[] = [
    {
      id: 'clients',
      title: 'Clients',
      icon: <Users size={20} />,
      subsections: [
        { id: 'factures', title: 'Factures et offres' },
        { id: 'debiteurs', title: 'Postes ouverts débiteurs' },
        { id: 'rappels', title: 'Gestion des rappels' }
      ]
    },
    {
      id: 'fournisseurs',
      title: 'Fournisseurs',
      icon: <CreditCard size={20} />,
      subsections: [
        { id: 'saisie', title: 'Saisie' },
        { id: 'proposition', title: 'Proposition de paiement' },
        { id: 'paiement', title: 'Mise au paiement' },
        { id: 'creanciers', title: 'Postes ouverts créanciers' }
      ]
    },
    {
      id: 'rapprochement',
      title: 'Rapprochement Bancaire',
      icon: <Bank size={20} />,
      subsections: [
        { id: 'acquittement', title: 'Acquittement Fournisseurs / débiteurs' },
        { id: 'cofi', title: 'Comptabilisation COFI' }
      ]
    },
    {
      id: 'cloture_intermediaire',
      title: 'Clôture Intermédiaire',
      icon: <BarChart size={20} />,
      subsections: [
        { id: 'reporting', title: 'Reporting' }
      ]
    },
    {
      id: 'compta_analytique',
      title: 'Compta Analytique',
      icon: <Calculator size={20} />
    },
    {
      id: 'cloture_annuelle',
      title: 'Clôture Annuelle',
      icon: <BookOpen size={20} />,
      subsections: [
        { id: 'ecritures', title: 'Écritures' },
        { id: 'dossier', title: 'Dossier de clôture documenté' },
        { id: 'etats', title: 'États financiers' },
        { id: 'pvago', title: 'PVAGO' }
      ]
    },
    {
      id: 'import_salaires',
      title: 'Import Écritures Salaire',
      icon: <Upload size={20} />
    },
    {
      id: 'stocks',
      title: 'Gestion des Stocks',
      icon: <Package size={20} />
    },
    {
      id: 'titres',
      title: 'Gestion des titres',
      icon: <Archive size={20} />
    },
    {
      id: 'immos',
      title: 'Gestion des immos',
      icon: <Briefcase size={20} />
    },
    {
      id: 'support_audit',
      title: 'Support à l\'audit',
      icon: <HelpCircle size={20} />
    }
  ];

  const renderContent = () => {
    const activeItem = menuItems.find(item => item.id === activeSection);
    if (!activeItem) return null;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent focus:border-[#0046AD] focus:ring-1 focus:ring-[#0046AD] text-sm w-64"
              />
            </div>
            <Button variant="outline" size="sm" leftIcon={<Filter size={16} />}>
              Filtrer
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" leftIcon={<Download size={16} />}>
              Exporter
            </Button>
            <Button variant="primary" leftIcon={<Plus size={16} />}>
              Nouveau
            </Button>
          </div>
        </div>

        {activeItem.subsections && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeItem.subsections.map(subsection => (
              <Card key={subsection.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-2">{subsection.title}</h3>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Accéder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Aperçu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              Sélectionnez une action dans les cartes ci-dessus pour commencer
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Finance</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gestion financière et comptable
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-[#0046AD] text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};