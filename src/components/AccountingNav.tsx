import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Users, FileText, CreditCard, Ban as Bank, PieChart, 
  BarChart2, BookOpen, FileSpreadsheet, Package, 
  TrendingUp, Building2, Headphones 
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const navItems: NavItem[] = [
  {
    path: '/accounting/clients',
    label: '1.00 Clients',
    icon: <Users size={20} />,
    description: 'Factures, offres et gestion des rappels'
  },
  {
    path: '/accounting/suppliers',
    label: '2.00 Fournisseurs',
    icon: <CreditCard size={20} />,
    description: 'Saisie et paiements fournisseurs'
  },
  {
    path: '/accounting/bank-reconciliation',
    label: 'Rapprochement Bancaire',
    icon: <Bank size={20} />,
    description: 'Acquittement et comptabilisation'
  },
  {
    path: '/accounting/interim-closing',
    label: 'Clôture Intermédiaire',
    icon: <FileText size={20} />,
    description: 'Reporting périodique'
  },
  {
    path: '/accounting/analytics',
    label: 'Compta Analytique',
    icon: <PieChart size={20} />,
    description: 'Analyse des coûts'
  },
  {
    path: '/accounting/annual-closing',
    label: 'Clôture Annuelle',
    icon: <BookOpen size={20} />,
    description: 'États financiers et documentation'
  },
  {
    path: '/accounting/payroll-import',
    label: 'Import Écritures Salaire',
    icon: <FileSpreadsheet size={20} />,
    description: 'Intégration comptable des salaires'
  },
  {
    path: '/accounting/inventory',
    label: 'Gestion des Stocks',
    icon: <Package size={20} />,
    description: 'Inventaire Permanent'
  },
  {
    path: '/accounting/securities',
    label: 'Gestion des Titres',
    icon: <TrendingUp size={20} />,
    description: 'Valeurs de marché'
  },
  {
    path: '/accounting/fixed-assets',
    label: 'Gestion des Immos',
    icon: <Building2 size={20} />,
    description: 'Gestion des immobilisations'
  },
  {
    path: '/accounting/audit-support',
    label: 'Support Audit',
    icon: <Headphones size={20} />,
    description: 'Support à l\'audit'
  }
];

export const AccountingNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 mx-auto">
        <div className="flex space-x-4 overflow-x-auto py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-3 py-2 rounded-lg text-sm font-medium
                transition-colors whitespace-nowrap
                ${isActive 
                  ? 'bg-[#0046AD] text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
              `}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};