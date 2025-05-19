import { Document, KPI, Meeting, Message, Notification, Task, User, BankReconciliation, COFIEntry, PayrollEntry, StockItem, StockMovement, Investment, FixedAsset, AuditRequest } from '../types';

// ... (existing mock data)

export const mockPayrollEntries: PayrollEntry[] = [
  {
    id: '1',
    date: '2025-04-15',
    employeeId: 'EMP001',
    employeeName: 'Jean Dupont',
    grossAmount: 4500,
    netAmount: 3200,
    status: 'pending'
  },
  {
    id: '2',
    date: '2025-04-15',
    employeeId: 'EMP002',
    employeeName: 'Marie Martin',
    grossAmount: 3800,
    netAmount: 2800,
    status: 'imported'
  }
];

export const mockStockItems: StockItem[] = [
  {
    id: '1',
    code: 'PROD001',
    name: 'Produit A',
    category: 'Catégorie 1',
    quantity: 150,
    unitPrice: 25,
    totalValue: 3750,
    lastMovement: '2025-04-15'
  },
  {
    id: '2',
    code: 'PROD002',
    name: 'Produit B',
    category: 'Catégorie 2',
    quantity: 80,
    unitPrice: 45,
    totalValue: 3600,
    lastMovement: '2025-04-14'
  }
];

export const mockStockMovements: StockMovement[] = [
  {
    id: '1',
    date: '2025-04-15',
    type: 'in',
    itemId: 'PROD001',
    quantity: 50,
    unitPrice: 25,
    totalAmount: 1250,
    reference: 'REC001'
  },
  {
    id: '2',
    date: '2025-04-14',
    type: 'out',
    itemId: 'PROD002',
    quantity: 20,
    unitPrice: 45,
    totalAmount: 900,
    reference: 'LIV001'
  }
];

export const mockInvestments: Investment[] = [
  {
    id: '1',
    name: 'Action Tech Corp',
    type: 'stock',
    quantity: 100,
    purchasePrice: 50,
    currentPrice: 65,
    purchaseDate: '2025-01-15',
    performance: 30
  },
  {
    id: '2',
    name: 'Obligation État',
    type: 'bond',
    quantity: 50,
    purchasePrice: 1000,
    currentPrice: 1020,
    purchaseDate: '2025-02-01',
    performance: 2
  }
];

export const mockFixedAssets: FixedAsset[] = [
  {
    id: '1',
    name: 'Machine de production',
    category: 'Équipement industriel',
    purchaseDate: '2024-01-15',
    purchaseAmount: 50000,
    depreciationMethod: 'linear',
    depreciationPeriod: 5,
    currentValue: 40000,
    status: 'active'
  },
  {
    id: '2',
    name: 'Véhicule de service',
    category: 'Transport',
    purchaseDate: '2024-03-01',
    purchaseAmount: 25000,
    depreciationMethod: 'degressive',
    depreciationPeriod: 4,
    currentValue: 22000,
    status: 'active'
  }
];

export const mockAuditRequests: AuditRequest[] = [
  {
    id: '1',
    date: '2025-04-15',
    topic: 'Validation des amortissements',
    description: 'Vérification du calcul des amortissements pour l\'exercice 2024',
    status: 'pending',
    priority: 'high',
    dueDate: '2025-04-30'
  },
  {
    id: '2',
    date: '2025-04-14',
    topic: 'Contrôle des stocks',
    description: 'Audit de la valorisation des stocks',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'Thomas Dubois',
    dueDate: '2025-04-25'
  }
];