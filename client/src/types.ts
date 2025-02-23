export interface Account {
  id: string;
  accountNumber: string;
  accountType: "CHECKING" | "SAVINGS";
  balance: number;
  accountHolder: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  createdAt: string;
}

export interface AccountTransaction {
  accountId: string;
  transactions: Transaction[];
}

interface TransactionInfo {
  date: string;
  description: string;
  amount: string;
}

export interface AccountDetails {
  accountHolder: string;
  accountNumber: string;
  accountType: string;
  currentBalance: string;
  opened: string;
  recentTransactions: TransactionInfo[];
}


