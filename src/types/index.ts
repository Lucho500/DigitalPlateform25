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

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  type: 'invoice' | 'quote';
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  total: number;
}

export interface Reminder {
  id: string;
  invoiceId: string;
  clientName: string;
  level: 1 | 2 | 3;
  sentDate: string;
  dueAmount: number;
  status: 'pending' | 'sent' | 'resolved';
}

export interface OpenItem {
  id: string;
  clientId: string;
  clientName: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  remainingAmount: number;
  status: 'open' | 'partially_paid' | 'closed';
  lastPaymentDate?: string;
}

export interface SupplierInvoice {
  id: string;
  number: string;
  supplierId: string;
  supplierName: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  paymentStatus: 'unpaid' | 'scheduled' | 'paid';
  paymentDate?: string;
  reference: string;
  category: string;
}

export interface PaymentProposal {
  id: string;
  invoiceId: string;
  supplierName: string;
  amount: number;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'proposed' | 'approved' | 'rejected';
  bankAccount: string;
}

export interface SupplierPayment {
  id: string;
  invoiceId: string;
  supplierName: string;
  amount: number;
  scheduledDate: string;
  status: 'scheduled' | 'processing' | 'completed' | 'failed';
  method: 'wire' | 'sepa' | 'check';
  reference: string;
}

export interface SupplierOpenItem {
  id: string;
  supplierId: string;
  supplierName: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  remainingAmount: number;
  status: 'open' | 'partially_paid' | 'closed';
  lastPaymentDate?: string;
}