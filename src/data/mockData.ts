import { Document, KPI, Meeting, Message, Notification, Task, User, Invoice, InvoiceItem, Reminder, OpenItem, SupplierInvoice, PaymentProposal, SupplierPayment, SupplierOpenItem, BankReconciliation, COFIEntry } from '../types';

// ... (previous mock data)

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
    status: 'reconciled',
    matchedDocument: 'FACT-2025-002'
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