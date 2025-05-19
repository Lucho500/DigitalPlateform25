import { Document, KPI, Meeting, Message, Notification, Task, User, Invoice, InvoiceItem, Reminder, OpenItem, SupplierInvoice, PaymentProposal, SupplierPayment, SupplierOpenItem, BankReconciliation, COFIEntry } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@company.com',
  role: 'Administrator',
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
  status: 'online'
};

export const messages: Message[] = [
  {
    id: '1',
    sender: experts[1],
    content: 'Bonjour, pouvez-vous examiner les dernières écritures comptables ?',
    timestamp: '2025-04-15T09:30:00',
    read: true
  },
  {
    id: '2',
    sender: currentUser,
    content: 'Bien sûr, je vais regarder ça tout de suite.',
    timestamp: '2025-04-15T09:35:00',
    read: true
  },
  {
    id: '3',
    sender: experts[1],
    content: 'Merci ! N\'hésitez pas si vous avez des questions.',
    timestamp: '2025-04-15T09:37:00',
    read: true
  },
  {
    id: '4',
    sender: currentUser,
    content: 'Je vous tiens au courant dès que j\'ai terminé la revue.',
    timestamp: '2025-04-15T09:40:00',
    read: true
  }
];

export const experts = [
  {
    id: '1',
    name: 'Sophie Martin',
    role: 'Expert-comptable',
    avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150',
    email: 'sophie.martin@company.com',
  },
  {
    id: '2',
    name: 'Pierre Dubois',
    role: 'Expert-comptable',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    email: 'pierre.dubois@company.com',
  },
  {
    id: '3',
    name: 'Marie Lambert',
    role: 'Expert-comptable',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    email: 'marie.lambert@company.com',
  },
  {
    id: '4',
    name: 'Thomas Bernard',
    role: 'Expert-comptable',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    email: 'thomas.bernard@company.com',
  }
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Valider les factures en attente',
    description: 'Examiner et approuver les factures fournisseurs du mois',
    dueDate: '2025-04-17T17:00:00',
    priority: 'high',
    status: 'pending',
    assignedTo: 'John Doe'
  },
  {
    id: '2',
    title: 'Préparer la déclaration TVA',
    description: 'Compiler les données pour la déclaration TVA de mars',
    dueDate: '2025-04-20T17:00:00',
    priority: 'medium',
    status: 'in-progress',
    assignedTo: 'John Doe'
  },
  {
    id: '3',
    title: 'Relancer les impayés',
    description: 'Contacter les clients avec des factures en retard',
    dueDate: '2025-04-18T12:00:00',
    priority: 'high',
    status: 'pending',
    assignedTo: 'Marie Martin'
  },
  {
    id: '4',
    title: 'Rapprochement bancaire',
    description: 'Effectuer le rapprochement bancaire hebdomadaire',
    dueDate: '2025-04-19T17:00:00',
    priority: 'low',
    status: 'not-started',
    assignedTo: 'John Doe'
  }
];

export const meetings: Meeting[] = [
  {
    id: '1',
    title: 'Revue financière mensuelle',
    date: '2025-04-16T14:00:00',
    duration: 60,
    attendees: ['John Doe', 'Marie Martin', 'Pierre Dubois'],
    status: 'scheduled',
    location: 'Salle de conférence A'
  },
  {
    id: '2',
    title: 'Point client Tech Solutions',
    date: '2025-04-17T10:00:00',
    duration: 45,
    attendees: ['John Doe', 'Sophie Bernard'],
    status: 'confirmed',
    location: 'Visioconférence'
  },
  {
    id: '3',
    title: 'Préparation bilan trimestriel',
    date: '2025-04-18T15:30:00',
    duration: 90,
    attendees: ['John Doe', 'Laurent Petit', 'Anne Richard'],
    status: 'pending',
    location: 'Salle de réunion B'
  }
];

export const kpis: KPI[] = [
  {
    id: '1',
    title: 'Chiffre d\'affaires',
    value: 81000,
    unit: '€',
    trend: 'up',
    change: 15.3,
    period: 'ce mois'
  },
  {
    id: '2',
    title: 'Trésorerie',
    value: 145000,
    unit: '€',
    trend: 'up',
    change: 8.2,
    period: 'ce mois'
  },
  {
    id: '3',
    title: 'Créances clients',
    value: 65000,
    unit: '€',
    trend: 'down',
    change: 12.5,
    period: 'ce mois'
  },
  {
    id: '4',
    title: 'Dettes fournisseurs',
    value: 48000,
    unit: '€',
    trend: 'up',
    change: 5.8,
    period: 'ce mois'
  }
];

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

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    number: 'FAC-2025-001',
    date: '2025-04-15',
    dueDate: '2025-05-15',
    clientName: 'Tech Solutions SAS',
    status: 'paid',
    totalHT: 12500,
    totalTTC: 15000,
    items: [
      {
        id: '1',
        description: 'Développement application web',
        quantity: 10,
        unitPrice: 1250,
        totalHT: 12500,
        tva: 20
      }
    ]
  },
  {
    id: '2',
    number: 'FAC-2025-002',
    date: '2025-04-14',
    dueDate: '2025-05-14',
    clientName: 'Digital Services SARL',
    status: 'pending',
    totalHT: 8750,
    totalTTC: 10500,
    items: [
      {
        id: '1',
        description: 'Maintenance mensuelle',
        quantity: 1,
        unitPrice: 5000,
        totalHT: 5000,
        tva: 20
      },
      {
        id: '2',
        description: 'Support technique',
        quantity: 15,
        unitPrice: 250,
        totalHT: 3750,
        tva: 20
      }
    ]
  }
];