import { Document, KPI, Meeting, Message, Notification, Task, User, Invoice, InvoiceItem, Reminder, OpenItem, SupplierInvoice, PaymentProposal, SupplierPayment, SupplierOpenItem, BankReconciliation, COFIEntry } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@company.com',
  role: 'Administrator',
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
  status: 'online'
};

export const documents: Document[] = [
  {
    id: '1',
    name: 'Facture Client 2025-001',
    type: 'invoice',
    uploadDate: '2025-04-15T10:30:00',
    size: '1.2 MB',
    status: 'pending'
  },
  {
    id: '2',
    name: 'Contrat de Service',
    type: 'contract',
    uploadDate: '2025-04-14T15:45:00',
    size: '2.8 MB',
    status: 'approved'
  },
  {
    id: '3',
    name: 'Déclaration TVA Mars 2025',
    type: 'tax',
    uploadDate: '2025-04-13T09:15:00',
    size: '856 KB',
    status: 'processed'
  },
  {
    id: '4',
    name: 'Bulletin de paie - Mars 2025',
    type: 'payroll',
    uploadDate: '2025-04-12T16:20:00',
    size: '450 KB',
    status: 'approved'
  }
];

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'Nouveau document',
    message: 'Une nouvelle facture a été ajoutée',
    type: 'info',
    date: '2025-04-15T10:30:00',
    read: false
  },
  {
    id: '2',
    title: 'Paiement reçu',
    message: 'Le paiement de la facture FAC-2025-001 a été reçu',
    type: 'success',
    date: '2025-04-14T15:45:00',
    read: true
  },
  {
    id: '3',
    title: 'Échéance proche',
    message: 'La déclaration TVA doit être soumise dans 3 jours',
    type: 'warning',
    date: '2025-04-13T09:15:00',
    read: false
  },
  {
    id: '4',
    title: 'Erreur de traitement',
    message: 'La synchronisation bancaire a échoué',
    type: 'error',
    date: '2025-04-12T16:20:00',
    read: false
  }
];

export const mockBankReconciliations: BankReconciliation[] = [
  {
    id: '1',
    date: '2025-04-15',
    reference: 'VIR-2025-001',
    description: 'Paiement Office Supplies Corp',
    amount: -2500,
    type: 'supplier',
    status: 'pending'
  },
  {
    id: '2',
    date: '2025-04-14',
    reference: 'VIR-2025-002',
    description: 'Règlement Tech Solutions SAS',
    amount: 12500,
    type: 'debtor',
    status: 'matched',
    matchedDocument: 'FAC-2025-001'
  },
  {
    id: '3',
    date: '2025-04-13',
    reference: 'VIR-2025-003',
    description: 'Paiement IT Services SARL',
    amount: -5800,
    type: 'supplier',
    status: 'reconciled'
  },
  {
    id: '4',
    date: '2025-04-12',
    reference: 'VIR-2025-004',
    description: 'Règlement Digital Services SARL',
    amount: 8750,
    type: 'debtor',
    status: 'pending'
  }
];

export const mockCOFIEntries: COFIEntry[] = [
  {
    id: '1',
    date: '2025-04-15',
    account: '512000',
    description: 'Paiement fournisseur',
    debit: 0,
    credit: 2500,
    status: 'draft',
    reference: 'VIR-2025-001'
  },
  {
    id: '2',
    date: '2025-04-14',
    account: '512000',
    description: 'Encaissement client',
    debit: 12500,
    credit: 0,
    status: 'posted',
    reference: 'VIR-2025-002'
  },
  {
    id: '3',
    date: '2025-04-13',
    account: '512000',
    description: 'Paiement fournisseur',
    debit: 0,
    credit: 5800,
    status: 'posted',
    reference: 'VIR-2025-003'
  },
  {
    id: '4',
    date: '2025-04-12',
    account: '512000',
    description: 'Encaissement client',
    debit: 8750,
    credit: 0,
    status: 'draft',
    reference: 'VIR-2025-004'
  }
];