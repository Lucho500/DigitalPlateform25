import React, { useState } from 'react';
import { 
  Bell, Lock, User, Building, CreditCard, Mail, Moon, Sun, 
  Globe, Shield, BellRing, BellOff, Smartphone, LogOut
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { currentUser } from '../data/mockData';

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ReactNode;
}

export const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('fr');

  const sections: SettingsSection[] = [
    { id: 'profile', title: 'Profil', icon: <User size={20} /> },
    { id: 'company', title: 'Entreprise', icon: <Building size={20} /> },
    { id: 'security', title: 'Sécurité', icon: <Shield size={20} /> },
    { id: 'notifications', title: 'Notifications', icon: <Bell size={20} /> },
    { id: 'billing', title: 'Facturation', icon: <CreditCard size={20} /> },
    { id: 'preferences', title: 'Préférences', icon: <Globe size={20} /> }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar 
                src={currentUser.avatar} 
                name={currentUser.name} 
                size="xl" 
              />
              <div>
                <Button variant="outline" size="sm">Modifier la photo</Button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  JPG, GIF ou PNG. Max 2MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  defaultValue={currentUser.name}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={currentUser.email}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  defaultValue="+33 6 12 34 56 78"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fonction
                </label>
                <input
                  type="text"
                  defaultValue="Directeur Général"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline">Annuler</Button>
              <Button variant="primary">Enregistrer</Button>
            </div>
          </div>
        );

      case 'company':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Raison sociale
                </label>
                <input
                  type="text"
                  defaultValue="Tech Solutions SAS"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  SIREN
                </label>
                <input
                  type="text"
                  defaultValue="123 456 789"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Adresse
                </label>
                <input
                  type="text"
                  defaultValue="123 rue de la Paix"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Code postal
                </label>
                <input
                  type="text"
                  defaultValue="75000"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ville
                </label>
                <input
                  type="text"
                  defaultValue="Paris"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pays
                </label>
                <select className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                  <option value="FR">France</option>
                  <option value="BE">Belgique</option>
                  <option value="CH">Suisse</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline">Annuler</Button>
              <Button variant="primary">Enregistrer</Button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Mot de passe</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Dernière modification il y a 3 mois
                    </p>
                  </div>
                  <Button variant="outline">Modifier</Button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Double authentification</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Sécurisez votre compte avec la 2FA
                    </p>
                  </div>
                  <Button variant="outline">Configurer</Button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Sessions actives</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Gérez vos appareils connectés
                    </p>
                  </div>
                  <Button variant="outline">Voir</Button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Historique des connexions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Smartphone size={20} className="text-gray-400" />
                    <div>
                      <p className="font-medium">iPhone 13 - Paris, France</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Aujourd'hui à 14:30
                      </p>
                    </div>
                  </div>
                  <Badge variant="success">Actif</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Globe size={20} className="text-gray-400" />
                    <div>
                      <p className="font-medium">Chrome - MacBook Pro</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Hier à 09:15
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Déconnecter</Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail size={20} className="text-gray-400" />
                    <div>
                      <h3 className="font-medium">Notifications par email</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Recevez des mises à jour par email
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant={notificationsEnabled ? "primary" : "outline"}
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    leftIcon={notificationsEnabled ? <BellRing size={16} /> : <BellOff size={16} />}
                  >
                    {notificationsEnabled ? 'Activées' : 'Désactivées'}
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <h4 className="font-medium">Types de notifications</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="ml-2">Nouvelles déclarations</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="ml-2">Échéances importantes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="ml-2">Messages de l'expert-comptable</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded" />
                    <span className="ml-2">Newsletters et actualités</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline">Réinitialiser</Button>
              <Button variant="primary">Enregistrer</Button>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Forfait actuel</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">Premium</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Facturé mensuellement
                  </p>
                </div>
                <Badge variant="success">Actif</Badge>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
              <div className="p-4">
                <h3 className="font-medium mb-4">Moyen de paiement</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CreditCard size={20} className="text-gray-400" />
                    <div>
                      <p className="font-medium">Visa se terminant par 4242</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Expire en 03/2026
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Modifier</Button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium mb-4">Historique des factures</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mars 2025</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Premium - Mensuel
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      leftIcon={<Download size={16} />}
                    >
                      Télécharger
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Février 2025</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Premium - Mensuel
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      leftIcon={<Download size={16} />}
                    >
                      Télécharger
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                    <div>
                      <h3 className="font-medium">Thème</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Personnalisez l'apparence de l'interface
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant={isDarkMode ? "primary" : "outline"}
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    leftIcon={isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
                  >
                    {isDarkMode ? 'Sombre' : 'Clair'}
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe size={20} />
                    <div>
                      <h3 className="font-medium">Langue</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Choisissez la langue de l'interface
                      </p>
                    </div>
                  </div>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail size={20} />
                    <div>
                      <h3 className="font-medium">Format des exports</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Format par défaut pour les exports
                      </p>
                    </div>
                  </div>
                  <select 
                    defaultValue="xlsx"
                    className="rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  >
                    <option value="xlsx">Excel (.xlsx)</option>
                    <option value="csv">CSV</option>
                    <option value="pdf">PDF</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-red-600 dark:text-red-400">
                    Supprimer le compte
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Cette action est irréversible
                  </p>
                </div>
                <Button variant="danger">Supprimer</Button>
              </div>
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Paramètres</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gérez vos préférences et paramètres de compte
          </p>
        </div>
        <Button 
          variant="outline" 
          leftIcon={<LogOut size={16} />}
        >
          Se déconnecter
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Menu latéral */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-[#0046AD] text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {section.icon}
                    <span>{section.title}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Contenu principal */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>
                {sections.find(s => s.id === activeSection)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};