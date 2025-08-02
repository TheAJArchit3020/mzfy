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
  