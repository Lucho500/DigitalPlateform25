import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, FileText, Home, MessageSquare, PieChart, Settings, Users, Wallet, DollarSign, ChevronDown, ChevronRight } from 'lucide-react';
import { MenuItem } from '../types';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [activeItem, setActiveItem] = useState<string>('dashboard');
  const [isAccountingOpen, setIsAccountingOpen] = useState(true);

  const menuItems: MenuItem[] = [
    { name: 'Tableau de bord', path: '/', icon: 'Home' },
    { name: 'Documents', path: '/documents', icon: 'FileText' },
    { name: 'Salaires', path: '/payroll', icon: 'DollarSign' },
    { name: 'Déclarations', path: '/declarations', icon: 'PieChart' },
    { name: 'Analytics', path: '/analytics', icon: 'BarChart3' },
    { name: 'Messagerie', path: '/messages', icon: 'MessageSquare' },
    { name: 'Experts', path: '/experts', icon: 'Users' },
    { name: 'Paramètres', path: '/settings', icon: 'Settings' }
  ];

  const accountingSubItems = [
    { name: 'Clients', path: '/accounting/clients' },
    { name: 'Fournisseurs', path: '/accounting/suppliers' },
    { name: 'Rapprochement', path: '/accounting/bank-reconciliation' },
    { name: 'Clôture', path: '/accounting/interim-closing' }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home size={20} />;
      case 'FileText': return <FileText size={20} />;
      case 'Wallet': return <Wallet size={20} />;
      case 'DollarSign': return <DollarSign size={20} />;
      case 'PieChart': return <PieChart size={20} />;
      case 'BarChart3': return <BarChart3 size={20} />;
      case 'MessageSquare': return <MessageSquare size={20} />;
      case 'Users': return <Users size={20} />;
      case 'Settings': return <Settings size={20} />;
      default: return <Home size={20} />;
    }
  };

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-10 w-64 bg-[#0046AD] text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <div className="h-16 flex items-center px-6 border-b border-[#003580]">
        <h1 className="text-xl font-bold tracking-wide">
          Xperience
        </h1>
      </div>
      
      <nav className="mt-5 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeItem === item.path 
                    ? 'bg-white text-[#0046AD]' 
                    : 'text-white hover:bg-[#003580]'
                }`}
                onClick={() => setActiveItem(item.path)}
              >
                <span className="mr-3">{getIcon(item.icon)}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
          
          {/* Section Comptabilité avec sous-menus */}
          <li>
            <button
              onClick={() => setIsAccountingOpen(!isAccountingOpen)}
              className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeItem.startsWith('/accounting')
                  ? 'bg-white text-[#0046AD]'
                  : 'text-white hover:bg-[#003580]'
              }`}
            >
              <span className="mr-3"><Wallet size={20} /></span>
              <span>Comptabilité</span>
              {isAccountingOpen ? (
                <ChevronDown size={16} className="ml-auto" />
              ) : (
                <ChevronRight size={16} className="ml-auto" />
              )}
            </button>
            
            {isAccountingOpen && (
              <ul className="mt-1 ml-6 space-y-1">
                {accountingSubItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeItem === subItem.path 
                          ? 'bg-white text-[#0046AD]' 
                          : 'text-white hover:bg-[#003580]'
                      }`}
                      onClick={() => setActiveItem(subItem.path)}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-[#003580]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-blue-200">Votre expert dédié</p>
            <p className="text-sm font-medium">Thomas Dubois</p>
          </div>
          <button 
            className="px-3 py-1 text-xs font-medium bg-white text-[#0046AD] rounded-md hover:bg-gray-100"
          >
            Contacter
          </button>
        </div>
      </div>
    </aside>
  );
};