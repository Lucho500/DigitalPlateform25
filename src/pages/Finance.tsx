import React, { useState } from 'react';
import { 
  Users, Building, Ban as Bank, FileText, Calculator, PieChart, BarChart2, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Download, FileCheck, AlertCircle, Clock, BookOpen, 
  FileSpreadsheet, ClipboardCheck, FileSignature, Search, Filter, Plus, Eye, CreditCard, 
  Send, DollarSign, Receipt, Calendar, CheckCircle2, Briefcase, PenTool as Tool, Archive, 
  Box, HardDrive, HelpCircle, Edit, Trash2, MoreVertical, Upload, CheckCircle, XCircle,
  ArrowLeftRight, FileSearch, RefreshCw
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { 
  mockInvoices, mockReminders, mockOpenItems, mockSupplierInvoices, 
  mockPaymentProposals, mockSupplierPayments, mockSupplierOpenItems,
  mockBankReconciliations, mockCOFIEntries 
} from '../data/mockData';
import type { 
  Invoice, OpenItem, Reminder, SupplierInvoice, PaymentProposal, 
  SupplierPayment, SupplierOpenItem 
} from '../types';

type TabType = 
  | 'clients' 
  | 'suppliers' 
  | 'bank_reconciliation' 
  | 'interim_closing' 
  | 'analytics' 
  | 'annual_closing'
  | 'payroll_entries'
  | 'inventory'
  | 'securities'
  | 'fixed_assets'
  | 'audit_support';

interface TabProps {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabProps[] = [
  { id: 'clients', label: 'Clients', icon: <Users size={20} /> },
  { id: 'suppliers', label: 'Fournisseurs', icon: <Building size={20} /> },
  { id: 'bank_reconciliation', label: 'Rapprochement bancaire', icon: <Bank size={20} /> },
  { id: 'interim_closing', label: 'Clôture intermédiaire', icon: <FileCheck size={20} /> },
  { id: 'analytics', label: 'Compta analytique', icon: <Calculator size={20} /> },
  { id: 'annual_closing', label: 'Clôture annuelle', icon: <BookOpen size={20} /> },
  { id: 'payroll_entries', label: 'Écritures salaires', icon: <FileSpreadsheet size={20} /> },
  { id: 'inventory', label: 'Gestion des stocks', icon: <Box size={20} /> },
  { id: 'securities', label: 'Gestion des titres', icon: <Briefcase size={20} /> },
  { id: 'fixed_assets', label: 'Gestion des immos', icon: <Archive size={20} /> },
  { id: 'audit_support', label: 'Support audit', icon: <HelpCircle size={20} /> }
];

type ClientTabType = 'invoices' | 'open_items' | 'reminders';
type SupplierTabType = 'entry' | 'payment_proposal' | 'payment' | 'open_items';
type BankReconciliationType = 'supplier_reconciliation' | 'debtor_reconciliation' | 'cofi_accounting';

const Finance = () => {
  const [activeTab, setActiveTab] = useState<TabType>('clients');
  const [clientTab, setClientTab] = useState<ClientTabType>('invoices');
  const [supplierTab, setSupplierTab] = useState<SupplierTabType>('entry');
  const [bankTab, setBankTab] = useState<BankReconciliationType>('supplier_reconciliation');
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="warning">Brouillon</Badge>;
      case 'sent':
        return <Badge variant="info">Envoyée</Badge>;
      case 'paid':
        return <Badge variant="success">Payée</Badge>;
      case 'overdue':
        return <Badge variant="error">En retard</Badge>;
      case 'cancelled':
        return <Badge variant="error">Annulée</Badge>;
      case 'open':
        return <Badge variant="warning">Ouvert</Badge>;
      case 'partially_paid':
        return <Badge variant="info">Partiellement payé</Badge>;
      case 'closed':
        return <Badge variant="success">Fermé</Badge>;
      case 'pending':
        return <Badge variant="warning">En attente</Badge>;
      case 'resolved':
        return <Badge variant="success">Résolu</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderClientContent = () => {
    switch (clientTab) {
      case 'invoices':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant="outline" leftIcon={<Plus size={16} />}>
                  Nouvelle facture
                </Button>
                <Button variant="outline" leftIcon={<Plus size={16} />}>
                  Nouvelle offre
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" leftIcon={<Download size={16} />}>
                  Exporter
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Numéro
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Échéance
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Montant
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {invoice.number}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {invoice.clientName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(invoice.date)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(invoice.dueDate)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium">
                        {formatCurrency(invoice.amount)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {getStatusBadge(invoice.status)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} className="mr-2" />
                          Voir
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit size={16} className="mr-2" />
                          Modifier
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'open_items':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant="outline" leftIcon={<Plus size={16} />}>
                  Nouveau règlement
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" leftIcon={<Download size={16} />}>
                  Exporter
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Facture
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Échéance
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Montant total
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Reste à payer
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockOpenItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {item.invoiceNumber}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {item.clientName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(item.date)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(item.dueDate)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium">
                        {formatCurrency(item.amount)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium">
                        {formatCurrency(item.remainingAmount)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} className="mr-2" />
                          Détails
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'reminders':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant="outline" leftIcon={<Plus size={16} />}>
                  Nouveau rappel
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" leftIcon={<Download size={16} />}>
                  Exporter
                </Button>
              </div>
            </div>

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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date d'envoi
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Montant dû
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockReminders.map((reminder) => (
                    <tr key={reminder.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {reminder.clientName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        Niveau {reminder.level}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(reminder.sentDate)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium">
                        {formatCurrency(reminder.dueAmount)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {getStatusBadge(reminder.status)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} className="mr-2" />
                          Voir
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Send size={16} className="mr-2" />
                          Renvoyer
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderSupplierContent = () => {
    switch (supplierTab) {
      case 'entry':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant="outline" leftIcon={<Upload size={16} />}>
                  Importer des factures
                </Button>
                <Button variant="primary" leftIcon={<Plus size={16} />}>
                  Nouvelle facture
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" leftIcon={<Download size={16} />}>
                  Exporter
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Numéro
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Fournisseur
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Échéance
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Montant
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockSupplierInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {invoice.number}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {invoice.supplierName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(invoice.date)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(invoice.dueDate)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium">
                        {formatCurrency(invoice.amount)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {getStatusBadge(invoice.status)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} className="mr-2" />
                          Voir
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit size={16} className="mr-2" />
                          Modifier
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'payment_proposal':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant="primary" leftIcon={<Plus size={16} />}>
                  Nouvelle proposition
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" leftIcon={<Download size={16} />}>
                  Exporter
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Fournisseur
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Échéance
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Montant
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Priorité
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockPaymentProposals.map((proposal) => (
                    <tr key={proposal.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {proposal.supplierName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(proposal.dueDate)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium">
                        {formatCurrency(proposal.amount)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <Badge variant={
                          proposal.priority === 'high' ? 'error' :
                          proposal.priority === 'medium' ? 'warning' : 'info'
                        }>
                          {proposal.priority === 'high' ? 'Haute' :
                           proposal.priority === 'medium' ? 'Moyenne' : 'Basse'}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {getStatusBadge(proposal.status)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} className="mr-2" />
                          Voir
                        </Button>
                        <Button variant="ghost" size="sm">
                          <CheckCircle2 size={16} className="mr-2" />
                          Approuver
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant="primary" leftIcon={<Send size={16} />}>
                  Exécuter les paiements
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" leftIcon={<Download size={16} />}>
                  Exporter
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Fournisseur
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date prévue
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Montant
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Méthode
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockSupplierPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {payment.supplierName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(payment.scheduledDate)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                        {payment.method === 'sepa' ? 'SEPA' :
                         payment.method === 'wire' ? 'Virement' : 'Chèque'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
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
          </div>
        );

      case 'open_items':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant="outline" leftIcon={<Plus size={16} />}>
                  Nouveau règlement
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" leftIcon={<Download size={16} />}>
                  Exporter
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Facture
                
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Fournisseur
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Échéance
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Montant total
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Reste à payer
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockSupplierOpenItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {item.invoiceNumber}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {item.supplierName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(item.date)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(item.dueDate)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium">
                        {formatCurrency(item.amount)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium">
                        {formatCurrency(item.remainingAmount)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
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
          </div>
        );

      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'clients':
        return (
          <Card>
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Button
                  variant={clientTab === 'invoices' ? 'primary' : 'ghost'}
                  onClick={() => setClientTab('invoices')}
                >
                  Factures et offres
                </Button>
                <Button
                  variant={clientTab === 'open_items' ? 'primary' : 'ghost'}
                  onClick={() => setClientTab('open_items')}
                >
                  Postes ouverts débiteurs
                </Button>
                <Button
                  variant={clientTab === 'reminders' ? 'primary' : 'ghost'}
                  onClick={() => setClientTab('reminders')}
                >
                  Gestion des rappels
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {renderClientContent()}
            </CardContent>
          </Card>
        );

      case 'suppliers':
        return (
          <Card>
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Button
                  variant={supplierTab === 'entry' ? 'primary' : 'ghost'}
                  onClick={() => setSupplierTab('entry')}
                >
                  Saisie
                </Button>
                <Button
                  variant={supplierTab === 'payment_proposal' ? 'primary' : 'ghost'}
                  onClick={() => setSupplierTab('payment_proposal')}
                >
                  Proposition de paiement
                </Button>
                <Button
                  variant={supplierTab === 'payment' ? 'primary' : 'ghost'}
                  onClick={() => setSupplierTab('payment')}
                >
                  Mise au paiement
                </Button>
                <Button
                  variant={supplierTab === 'open_items' ? 'primary' : 'ghost'}
                  onClick={() => setSupplierTab('open_items')}
                >
                  Postes ouverts créanciers
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {renderSupplierContent()}
            </CardContent>
          </Card>
        );

      case 'bank_reconciliation':
        return (
          <Card>
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Button
                  variant={bankTab === 'supplier_reconciliation' ? 'primary' : 'ghost'}
                  onClick={() => setBankTab('supplier_reconciliation')}
                >
                  Acquittement Fournisseurs
                </Button>
                <Button
                  variant={bankTab === 'debtor_reconciliation' ? 'primary' : 'ghost'}
                  onClick={() => setBankTab('debtor_reconciliation')}
                >
                  Acquittement Débiteurs
                </Button>
                <Button
                  variant={bankTab === 'cofi_accounting' ? 'primary' : 'ghost'}
                  onClick={() => setBankTab('cofi_accounting')}
                >
                  Comptabilisation COFI
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Bank reconciliation filters */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Rechercher une transaction..."
                        className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent focus:border-[#0046AD] focus:ring-1 focus:ring-[#0046AD] text-sm w-64"
                      />
                    </div>
                    <select className="rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm">
                      <option value="">Tous les types</option>
                      <option value="supplier">Fournisseurs</option>
                      <option value="debtor">Débiteurs</option>
                    </select>
                    <select className="rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm">
                      <option value="">Tous les statuts</option>
                      <option value="pending">En attente</option>
                      <option value="matched">Rapproché</option>
                      <option value="reconciled">Lettré</option>
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" leftIcon={<RefreshCw size={16} />}>
                      Rafraîchir
                    </Button>
                    <Button variant="outline" leftIcon={<Download size={16} />}>
                      Exporter
                    </Button>
                    <Button variant="primary" leftIcon={<ArrowLeftRight size={16} />}>
                      Lettrer
                    </Button>
                  </div>
                </div>

                {/* Bank reconciliation table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Référence
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Montant
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {mockBankReconciliations.map((reconciliation) => (
                        <tr key={reconciliation.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(reconciliation.date)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {reconciliation.reference}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {reconciliation.description}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium">
                            <span className={reconciliation.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                              {formatCurrency(reconciliation.amount)}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            <Badge variant={reconciliation.type === 'supplier' ? 'error' : 'success'}>
                              {reconciliation.type === 'supplier' ? 'Fournisseur' : 'Débiteur'}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            {reconciliation.status === 'matched' ? (
                              <Badge variant="info">Rapproché</Badge>
                            ) : reconciliation.status === 'reconciled' ? (
                              <Badge variant="success">Lettré</Badge>
                            ) : (
                              <Badge variant="warning">En attente</Badge>
                            )}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm">
                              <FileSearch size={16} className="mr-2" />
                              Rechercher
                            </Button>
                            {reconciliation.status === 'matched' && (
                              <Button variant="ghost" size="sm">
                                <CheckCircle size={16} className="mr-2" />
                                Lettrer
                              </Button>
                            )}
                            {reconciliation.status === 'reconciled' && (
                              <Button variant="ghost" size="sm">
                                <Eye size={16} className="mr-2" />
                                Voir
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">En attente</p>
                          <p className="text-2xl font-semibold mt-1">12</p>
                        </div>
                        <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                          <Clock className="text-yellow-500" size={24} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Rapprochés</p>
                          <p className="text-2xl font-semibold mt-1">45</p>
                        </div>
                        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                          <ArrowLeftRight className="text-blue-500" size={24} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Lettrés</p>
                          <p className="text-2xl font-semibold mt-1">78</p>
                        </div>
                        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                          <CheckCircle className="text-green-500" size={24} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'interim_closing':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Reporting de clôture intermédiaire</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Interim closing reporting content */}
            </CardContent>
          </Card>
        );

      case 'analytics':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Comptabilité analytique</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Analytics content */}
            </CardContent>
          </Card>
        );

      case 'annual_closing':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Écritures de clôture</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Annual closing entries content */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dossier de clôture documenté et justifié</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Closing documentation content */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>États financiers</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Financial statements content */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>PVAGO</CardTitle>
              </CardHeader>
              <CardContent>
                {/* PVAGO content */}
              </CardContent>
            </Card>
          </div>
        );

      case 'payroll_entries':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Import des écritures de salaire</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Payroll entries import content */}
            </CardContent>
          </Card>
        );

      case 'inventory':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Gestion des stocks - Inventaire permanent</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Inventory management content */}
            </CardContent>
          </Card>
        );

      case 'securities':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Gestion des titres (en valeur marché)</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Securities management content */}
            </CardContent>
          </Card>
        );

      case 'fixed_assets':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Gestion des immobilisations</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Fixed assets management content */}
            </CardContent>
          </Card>
        );

      case 'audit_support':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Support à l'audit</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Audit support content */}
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
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
        <div className="flex items-center space-x-3">
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
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2 overflow-x-auto">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'ghost'}
                onClick={() => setActiveTab(tab.id)}
                className="whitespace-nowrap"
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </Button>
            ))}
          </div>
        </CardHeader>
      </Card>

      {renderContent()}
    </div>
  );
};

export default Finance;
export { Finance };