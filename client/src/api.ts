import { Account, AccountDetails, AccountTransaction } from "./types";

const API_URL = "http://localhost:3001/api";

export const getAccounts = async (): Promise<Account[]> => {
  const response = await fetch(`${API_URL}/accounts`);
  if (!response.ok) {
    throw new Error("Failed to fetch accounts");
  }
  return response.json();
};

export const getAccount = async (id: string): Promise<Account> => {
  const response = await fetch(`${API_URL}/accounts/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch account");
  }
  return response.json();
};

export const getTransactionDetails = async (
  id: string
): Promise<AccountTransaction> => {
  const response = await fetch(`${API_URL}/accounts/${id}/transactions`);

  if (!response.ok) {
    throw new Error("Failed to fetch account");
  }
  return response.json();
};

export const createTransaction = async (
  accountId: string,
  transactionData: {
    type: string;
    amount: number;
    description: string;
  }
): Promise<AccountTransaction> => {
  const response = await fetch(`${API_URL}/accounts/${accountId}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transactionData),
  });

  if (!response.ok) {
    throw new Error("Failed to create transaction");
  }

  return response.json();
};

