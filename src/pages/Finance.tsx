import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Download, Upload, ArrowUpRight, 
  ArrowDownRight, FileText, Check, X, AlertCircle, 
  CreditCard, Building2, Wallet, DollarSign, Receipt,
  FileSpreadsheet, Calendar, Clock, CheckCircle2,
  BarChart2, PieChart, TrendingUp, FileCheck,
  Bell, FileSignature, Send, Eye
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockInvoices, mockReminders, mockOpenItems } from '../data/mockData';

const Finance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClientTab, setSelectedClientTab] = useState<'invoices' | 'open_items' | 'reminders'>('invoices');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
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
          <Button variant="outline" size="sm" leftIcon={<Filter size={16} />}>
            Filtrer
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" leftIcon={<FileSignature size={16} />}>
            Nouvelle offre
          </Button>
          <Button variant="primary" leftIcon={<Plus size={16} />}>
            Nouvelle facture
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total à encaisser</p>
                <p className="text-2xl font-semibold mt-1">36 250 €</p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Wallet className="text-blue-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rappels à envoyer</p>
                <p className="text-2xl font-semibold mt-1">5</p>
              </div>
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
                <Bell className="text-red-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Délai moyen de paiement</p>
                <p className="text-2xl font-semibold mt-1">32 jours</p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <Clock className="text-green-500" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <Button
              variant={selectedClientTab === 'invoices' ? 'primary' : 'ghost'}
              onClick={() => setSelectedClientTab('invoices')}
            >
              Factures et offres
            </Button>
            <Button
              variant={selectedClientTab === 'open_items' ? 'primary' : 'ghost'}
              onClick={() => setSelectedClientTab('open_items')}
            >
              Postes ouverts débiteurs
            </Button>
            <Button
              variant={selectedClientTab === 'reminders' ? 'primary' : 'ghost'}
              onClick={() => setSelectedClientTab('reminders')}
            >
              Gestion des rappels
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {selectedClientTab === 'invoices' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Numéro
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Montant
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockInvoices.map((invoice) => (
                    <tr 
                      key={invoice.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {invoice.clientName}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {invoice.number}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {invoice.type === 'invoice' ? 'Facture' : 'Devis'}
                      </td>
                      <td className="px-4 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(invoice.amount)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(invoice.date)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {invoice.status === 'paid' && <Badge variant="success">Payée</Badge>}
                        {invoice.status === 'sent' && <Badge variant="info">Envoyée</Badge>}
                        {invoice.status === 'draft' && <Badge variant="warning">Brouillon</Badge>}
                        {invoice.status === 'overdue' && <Badge variant="error">En retard</Badge>}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2 justify-end">
                          <Button variant="ghost" size="sm" leftIcon={<Eye size={16} />}>
                            Voir
                          </Button>
                          {invoice.status === 'draft' && (
                            <Button variant="ghost" size="sm" leftIcon={<Send size={16} />}>
                              Envoyer
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" leftIcon={<Download size={16} />}>
                            PDF
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedClientTab === 'open_items' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Facture
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Montant total
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Reste à payer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Échéance
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockOpenItems.map((item) => (
                    <tr 
                      key={item.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {item.clientName}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {item.invoiceNumber}
                      </td>
                      <td className="px-4 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(item.amount)}
                      </td>
                      <td className="px-4 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(item.remainingAmount)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(item.dueDate)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {item.status === 'open' && <Badge variant="warning">Ouvert</Badge>}
                        {item.status === 'partially_paid' && <Badge variant="info">Partiellement payé</Badge>}
                        {item.status === 'closed' && <Badge variant="success">Clôturé</Badge>}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2 justify-end">
                          <Button variant="ghost" size="sm" leftIcon={<Eye size={16} />}>
                            Détails
                          </Button>
                          {item.status !== 'closed' && (
                            <Button variant="ghost" size="sm" leftIcon={<DollarSign size={16} />}>
                              Encaisser
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedClientTab === 'reminders' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Niveau
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Montant dû
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date d'envoi
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockReminders.map((reminder) => (
                    <tr 
                      key={reminder.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {reminder.clientName}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        Niveau {reminder.level}
                      </td>
                      <td className="px-4 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(reminder.dueAmount)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(reminder.sentDate)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {reminder.status === 'pending' && <Badge variant="warning">À envoyer</Badge>}
                        {reminder.status === 'sent' && <Badge variant="info">Envoyé</Badge>}
                        {reminder.status === 'resolved' && <Badge variant="success">Résolu</Badge>}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2 justify-end">
                          <Button variant="ghost" size="sm" leftIcon={<Eye size={16} />}>
                            Voir
                          </Button>
                          {reminder.status === 'pending' && (
                            <Button variant="ghost" size="sm" leftIcon={<Send size={16} />}>
                              Envoyer
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Finance;
export { Finance };