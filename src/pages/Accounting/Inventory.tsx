import React, { useState } from 'react';
import { 
  Package, Plus, Filter, Search, Download, Eye, 
  ArrowUpRight, ArrowDownRight, TrendingUp, BarChart2,
  FileText, AlertCircle, Clock, CheckCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  reorderPoint: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastMovement: string;
}

const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Matière première A',
    category: 'Matières premières',
    quantity: 150,
    unitPrice: 25,
    totalValue: 3750,
    reorderPoint: 100,
    status: 'in-stock',
    lastMovement: '2025-04-15'
  },
  {
    id: '2',
    name: 'Produit fini X',
    category: 'Produits finis',
    quantity: 75,
    unitPrice: 120,
    totalValue: 9000,
    reorderPoint: 50,
    status: 'low-stock',
    lastMovement: '2025-04-14'
  },
  {
    id: '3',
    name: 'Composant B',
    category: 'Composants',
    quantity: 0,
    unitPrice: 45,
    totalValue: 0,
    reorderPoint: 25,
    status: 'out-of-stock',
    lastMovement: '2025-04-10'
  }
];

export const Inventory: React.FC = () => {
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
      case 'in-stock':
        return <Badge variant="success">En stock</Badge>;
      case 'low-stock':
        return <Badge variant="warning">Stock bas</Badge>;
      case 'out-of-stock':
        return <Badge variant="error">Rupture</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des Stocks
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gérez votre inventaire et suivez les mouvements de stock
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" leftIcon={<BarChart2 size={16} />}>
            Analyses
          </Button>
          <Button variant="primary" leftIcon={<Plus size={16} />}>
            Nouveau mouvement
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Valeur totale</p>
                <h3 className="text-xl font-semibold mt-1">12 750 €</h3>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Package className="text-blue-500" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Articles</p>
                <h3 className="text-xl font-semibold mt-1">225</h3>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <TrendingUp className="text-green-500" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Entrées (mois)</p>
                <h3 className="text-xl font-semibold mt-1">45</h3>
              </div>
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                <ArrowUpRight className="text-emerald-500" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Sorties (mois)</p>
                <h3 className="text-xl font-semibold mt-1">38</h3>
              </div>
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
                <ArrowDownRight className="text-red-500" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <CardTitle>Inventaire</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
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
                    Article
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Quantité
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Prix unitaire
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Valeur totale
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockInventory.map((item) => (
                  <tr 
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Dernier mouvement: {formatDate(item.lastMovement)}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {item.category}
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(item.totalValue)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {getStatusBadge(item.status)}
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
            <CardTitle>Articles à commander</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockInventory
                .filter(item => item.quantity <= item.reorderPoint)
                .map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <AlertCircle size={20} className="text-red-500" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantité: {item.quantity} / Point de commande: {item.reorderPoint}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Commander
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Derniers mouvements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <ArrowUpRight size={20} className="text-green-500" />
                  <div>
                    <p className="font-medium">Entrée stock</p>
                    <p className="text-sm text-gray-500">
                      50 × Matière première A
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {formatDate(new Date().toISOString())}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <ArrowDownRight size={20} className="text-red-500" />
                  <div>
                    <p className="font-medium">Sortie stock</p>
                    <p className="text-sm text-gray-500">
                      25 × Produit fini X
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {formatDate(new Date().toISOString())}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};