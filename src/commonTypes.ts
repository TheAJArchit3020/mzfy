// add common types of ts types

export type paymentStatus =string;

export type expenseItem = {
    date: string;
    transactions: Transaction[];
  };

export type Transaction  = {
    id: string;
    category: string;
    item: string;
    amount: number;
    date: string;
  }

  export type DebtCountDownType = {
    year: number;
    month: number;
    day: number;
  };

  export type DebtChartDataItem = {
    balance: string;
    debtName: string;
    color: string;
    _id: string;
  };
  
  export interface DonutDataItem {
    value: number;
    color: string;
    label?: string;
    line1?: string;
    line2?: string;
    emoji?: string;
  }

  export type LogExpenseCategoryItem = {
    _id: string;
    user: string;
    name: string;
    color: string;
    budget: number;
    isDefault: boolean;
    __v: number;
    createdAt: string;
    updatedAt: string;
  };

  export type DebtInfo = {
    _id: string;
    name: string;
  };

  export type TransactionData = {
    _id: string;
    user: string;
    debt: DebtInfo;
    openingBalance: number;
    paymentAmount: number;
    principalComponent: number;
    interestComponent: number;
    closingBalance: number;
    dueDate: string;
    status: string;
    note: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };

  export type TransactionState = {
    transaction: TransactionData | null;
    loading: boolean;
    error: string | null;
  };
  