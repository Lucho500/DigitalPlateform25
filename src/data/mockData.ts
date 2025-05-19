import { Document, KPI, Meeting, Message, Notification, Task, User, BankReconciliation, COFIEntry, PayrollEntry, StockItem, StockMovement, Investment, FixedAsset, AuditRequest } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Sophie Martin',
  email: 'sophie.martin@example.com',
  role: 'client',
  avatar: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150'
};

export const experts: User[] = [
  {
    id: '2',
    name: 'Thomas Dubois',
    email: 'thomas.dubois@mazars.fr',
    role: 'expert',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '3',
    name: 'Claire Bernard',
    email: 'claire.bernard@mazars.fr',
    role: 'expert',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

export const documents: Document[] = [
  {
    id: '1',
    name: 'Facture_Fournisseur_Avril2025.pdf',
    type: 'invoice',
    uploadDate: '2025-04-15',
    status: 'processed',
    size: '2.4 MB',
    url: '#'
  },
  {
    id: '2',
    name: 'Bilan_Financier_Q1_2025.xlsx',
    type: 'financial',
    uploadDate: '2025-04-10',
    status: 'approved',
    size: '1.8 MB',
    url: '#'
  },
  {
    id: '3',
    name: 'Contrat_Prestation_Tech_Solutions.pdf',
    type: 'contract',
    uploadDate: '2025-04-05',
    status: 'pending',
    size: '3.1 MB',
    url: '#'
  }
];

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'Document approuvé',
    message: 'Votre Bilan Financier Q1 2025 a été approuvé',
    date: '2025-04-16T10:30:00',
    read: false,
    type: 'success'
  },
  {
    id: '2',
    title: 'Déclaration TVA à venir',
    message: 'N\'oubliez pas de soumettre votre déclaration TVA avant le 20 avril',
    date: '2025-04-15T09:15:00',
    read: true,
    type: 'warning'
  }
];

export const kpis: KPI[] = [
  {
    id: '1',
    title: 'Chiffre d\'affaires mensuel',
    value: 81000,
    unit: '€',
    change: 15.3,
    trend: 'up'
  },
  {
    id: '2',
    title: 'Trésorerie nette',
    value: 125000,
    unit: '€',
    change: 8.7,
    trend: 'up'
  }
];

export const meetings: Meeting[] = [
  {
    id: '1',
    title: 'Revue comptable mensuelle',
    date: '2025-04-22',
    time: '14:00',
    duration: 45,
    type: 'video',
    expert: {
      id: '2',
      name: 'Thomas Dubois',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'Expert-comptable'
    }
  }
];

export const messages: Message[] = [
  {
    id: '1',
    sender: {
      id: '2',
      name: 'Thomas Dubois',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'expert'
    },
    content: 'Bonjour Sophie, j\'ai remarqué une incohérence dans vos dernières factures. Pouvons-nous en discuter lors de notre prochain rendez-vous ?',
    timestamp: '2025-04-15T14:30:00',
    read: true
  }
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Validation des factures fournisseurs',
    description: 'Vérifier et valider les factures fournisseurs du mois d\'avril',
    dueDate: '2025-04-20',
    status: 'pending',
    priority: 'high'
  }
];

export const mockBankReconciliations = [
  {
    bankName: "Banque Principale",
    bankBalance: 125000,
    accountingBalance: 124500,
    difference: 500,
    status: "En cours"
  },
  {
    bankName: "Compte Secondaire",
    bankBalance: 45000,
    accountingBalance: 45000,
    difference: 0,
    status: "Terminé"
  }
];

export const mockCOFIEntries = [
  {
    id: "1",
    date: "2025-04-15",
    description: "Virement client ABC",
    amount: 5000,
    status: "Rapproché"
  },
  {
    id: "2",
    date: "2025-04-14",
    description: "Paiement fournisseur XYZ",
    amount: -2500,
    status: "En attente"
  }
];