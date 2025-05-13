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