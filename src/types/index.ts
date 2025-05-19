export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'expert' | 'admin';
  avatar?: string;
}

export interface MenuItem {
  name: string;
  path: string;
  icon: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: 'pending' | 'processed' | 'approved' | 'rejected';
  size: string;
  url: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface KPI {
  id: string;
  title: string;
  value: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  type: 'video' | 'call' | 'in-person';
  expert: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
  };
}

export interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    role: 'client' | 'expert' | 'admin';
  };
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
}

export interface Theme {
  mode: 'light' | 'dark';
}

export interface BankReconciliation {
  id: string;
  date: string;
  reference: string;
  description: string;
  amount: number;
  type: 'supplier' | 'debtor';
  status: 'pending' | 'matched' | 'reconciled';
  matchedDocument?: string;
}

export interface COFIEntry {
  id: string;
  date: string;
  account: string;
  description: string;
  debit: number;
  credit: number;
  status: 'draft' | 'posted';
  reference: string;
}

export interface PayrollEntry {
  id: string;
  date: string;
  employeeId: string;
  employeeName: string;
  grossAmount: number;
  netAmount: number;
  status: 'pending' | 'imported' | 'posted';
}

export interface StockItem {
  id: string;
  code: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  lastMovement: string;
}

export interface StockMovement {
  id: string;
  date: string;
  type: 'in' | 'out';
  itemId: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  reference: string;
}

export interface Investment {
  id: string;
  name: string;
  type: 'stock' | 'bond' | 'fund';
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
  performance: number;
}

export interface FixedAsset {
  id: string;
  name: string;
  category: string;
  purchaseDate: string;
  purchaseAmount: number;
  depreciationMethod: 'linear' | 'degressive';
  depreciationPeriod: number;
  currentValue: number;
  status: 'active' | 'fully-depreciated' | 'disposed';
}

export interface AuditRequest {
  id: string;
  date: string;
  topic: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  dueDate: string;
}