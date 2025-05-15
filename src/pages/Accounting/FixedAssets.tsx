import React, { useState } from 'react';
import { 
  Building2, Plus, Filter, Search, Download, Eye, 
  Calendar, Calculator, FileText, TrendingUp, ArrowUpRight,
  Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

interface FixedAsset {
  id: string;
  name: string;
  category: string;
  acquisitionDate: string;
  acquisitionValue: number;
  currentValue: number;
  depreciationRate: number;
  status: 'active' | 'fully-depreciated' | 'disposed';
  nextDepreciation: string;
}

const mockAssets: FixedAsset[] = [
  {
    id: '1',
    name: 'Machine de production A',
    category: 'Équipement industriel',
    acquisitionDate: '2023-06-15',
    acquisitionValue: 75000,
    currentValue: 65000,
    depreciationRate: 10,
    status: 'active',
    nextDepreciation: '2025-06-15'
  },
  {
    id: '2',
    name: 'Véhicule de service',
    category: 'Transport',
    acquisitionDate: '2023-03-01',
    acquisitionValue: 35000,
    currentValue: 28000,
    depreciationRate: 20,
    status: 'active',
    nextDepreciation: '2025-03-01'
  },
  {
    id: '3',
    name: 'Serveur informatique',
    category: 'Matériel informatique',
    acquisitionDate: '2022-12-10',
    acquisitionValue: 15000,
    currentValue: 9000,
    depreciationRate: 33.33,
    status: 'active',
    nextDepreciation: '2025-12-10'
  }
];

export const FixedAssets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Actif</Badge>;
      case 'fully-depreciated':
        return <Badge variant="warning">Amorti</Badge>;
      case 'disposed':
        return <Badge variant="error">Cédé</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des Immobilisations
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gérez vos immobilisations et leur amortissement
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" leftIcon={<Calendar size={16} />}>
            Planning
          </Button>
          <Button variant="primary" leftIcon={<Plus size={16} />}>
            Nouvelle immobilisation
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Valeur totale</p>
                <h3 className="text-xl font-semibold mt-1">102 000 €</h3>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Building2 className="text-blue-500" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Amortissement</p>
                <h3 className="text-xl font-semibold mt-1">25 000 €</h3>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <Calculator className="text-green-500" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">VNC</p>
                <h3 className="text-xl font-semibold mt-1">77 000 €</h3>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                <TrendingUp className="text-purple-500" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Immobilisations</p>
                <h3 className="text-xl font-semibold mt-1">12</h3>
              </div>
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-full">
                <FileText className="text-orange-500" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <CardTitle>Liste des immobilisations</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent focus:border-[#0046AD] focus:ring-1 focus:ring-[#0046AD] text-sm w-64"
                />
              </div>
              <Button variant="outline" leftIcon={<Filter size={16} />}>
                Filtres
              </Button>
              <Button variant="outline" leftIcon={<Download size={16} />}>
                Exporter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Immobilisation
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date d'acquisition
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Valeur d'acquisition
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Valeur actuelle
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockAssets.map((asset) => (
                  <tr 
                    key={asset.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {asset.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Taux: {asset.depreciationRate}%
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {asset.category}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(asset.acquisitionDate)}
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(asset.acquisitionValue)}
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(asset.currentValue)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {getStatusBadge(asset.status)}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button variant="ghost" size="sm">
                        <Eye size={16} className="mr-2" />
                        Détails
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Prochains amortissements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAssets.map((asset) => (
                <div 
                  key={asset.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Clock size={20} className="text-gray-400" />
                    <div>
                      <p className="font-medium">{asset.name}</p>
                      <p className="text-sm text-gray-500">
                        Prochain amortissement: {formatDate(asset.nextDepreciation)}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Calculer
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents liés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <FileText size={20} className="text-blue-500" />
                  <div>
                    <p className="font-medium">Tableau des immobilisations</p>
                    <p className="text-sm text-gray-500">Mis à jour le {formatDate(new Date().toISOString())}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download size={16} />
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <FileText size={20} className="text-green-500" />
                  <div>
                    <p className="font-medium">Plan d'amortissement</p>
                    <p className="text-sm text-gray-500">Mis à jour le {formatDate(new Date().toISOString())}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download size={16} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};