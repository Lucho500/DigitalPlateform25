import { Document, KPI, Meeting, Message, Notification, Task, User } from '../types';

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
  },
  {
    id: '4',
    name: 'Déclaration_TVA_Mars2025.pdf',
    type: 'tax',
    uploadDate: '2025-04-02',
    status: 'processed',
    size: '1.5 MB',
    url: '#'
  },
  {
    id: '5',
    name: 'Bulletin_Salaire_Mars2025.pdf',
    type: 'payroll',
    uploadDate: '2025-03-31',
    status: 'approved',
    size: '0.9 MB',
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
  },
  {
    id: '3',
    title: 'Nouveau message',
    message: 'Thomas Dubois vous a envoyé un message concernant votre comptabilité',
    date: '2025-04-15T14:45:00',
    read: false,
    type: 'info'
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
  },
  {
    id: '3',
    title: 'Créances clients',
    value: 45000,
    unit: '€',
    change: -12.4,
    trend: 'down'
  },
  {
    id: '4',
    title: 'Résultat mensuel',
    value: 26000,
    unit: '€',
    change: 5.8,
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
  },
  {
    id: '2',
    title: 'Planification fiscale',
    date: '2025-04-28',
    time: '10:30',
    duration: 60,
    type: 'in-person',
    expert: {
      id: '3',
      name: 'Claire Bernard',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'Conseillère fiscale'
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
  },
  {
    id: '2',
    sender: {
      id: '1',
      name: 'Sophie Martin',
      avatar: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'client'
    },
    content: 'Bien sûr Thomas, merci pour votre vigilance. Nous pourrons en parler mardi prochain.',
    timestamp: '2025-04-15T15:05:00',
    read: true
  },
  {
    id: '3',
    sender: {
      id: '3',
      name: 'Claire Bernard',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'expert'
    },
    content: 'Sophie, j\'ai préparé une simulation fiscale pour votre entreprise. Les résultats sont encourageants, je vous les présenterai lors de notre prochain rendez-vous.',
    timestamp: '2025-04-16T09:20:00',
    read: false
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
  },
  {
    id: '2',
    title: 'Préparation déclaration TVA',
    description: 'Rassembler les documents nécessaires pour la déclaration TVA d\'avril',
    dueDate: '2025-04-18',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: '3',
    title: 'Révision contrat de prestation',
    description: 'Relire et annoter le nouveau contrat de prestation',
    dueDate: '2025-04-25',
    status: 'pending',
    priority: 'medium'
  }
];