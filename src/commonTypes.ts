// add common types of ts types

export type paymentStatus = "paid" | "upcoming" | "missed";

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
    _id?: string;
    user?: string;
    name: string;
    color?: string;
    budget?: number;
    isDefault?: boolean;
    __v?: number;
    createdAt?: string;
    updatedAt?: string;
  };
  