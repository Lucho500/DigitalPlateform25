// ... (previous types)

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