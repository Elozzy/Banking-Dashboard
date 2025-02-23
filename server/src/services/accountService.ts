import { Database } from "sqlite";
import { getDatabase } from "../utils/database";
console.log("I came here");
export class AccountService {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
    if (!this.db) {
      throw new Error(
        "Database is not initialized. Ensure initializeDatabase() is called before using the service."
      );
    }
  }

  async createTransaction(
    id: string,
    type: string,
    amount: number,
    description: string
  ) {
    const account = await this.db.get("SELECT * FROM accounts WHERE id = ?", [
      id,
    ]);
    console.log("hello", account);

    if (!account) {
      throw new Error("Account not found");
    }

    let newBalance = account.balance;
    if (type === "DEPOSIT") newBalance += amount;
    if (type === "WITHDRAWAL") {
      if (amount > newBalance) throw new Error("Insufficient funds");
      newBalance -= amount;
    }

    const transactionId = Math.random().toString(36).substring(2, 11);
    const createdAt = new Date().toISOString();

    await this.db.run("UPDATE accounts SET balance = ? WHERE id = ?", [
      newBalance,
      id,
    ]);
    await this.db.run(
      "INSERT INTO transactions (id, accountId, type, amount, description, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
      [transactionId, id, type, amount, description, createdAt]
    );

    const recentTransactions = await this.db.all(
      "SELECT * FROM transactions WHERE accountId = ? ORDER BY createdAt DESC LIMIT 3",
      [id]
    );

    return {
      accountHolder: account.accountHolder,
      accountNumber: account.accountNumber,
      accountType:
        account.accountType === "CHECKING"
          ? "Checking Account"
          : "Savings Account",
      currentBalance: `$${newBalance.toFixed(2)}`,
      opened: new Date(account.createdAt).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      recentTransactions: recentTransactions.map((txn) => ({
        date: new Date(txn.createdAt).toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
        }),
        description: txn.description,
        amount: `$${txn.amount.toFixed(2)}`,
      })),
    };
  }

  async getAccountDetails(id: string) {
    const account = await this.db.get("SELECT * FROM accounts WHERE id = ?", [
      id,
    ]);

    if (!account) {
      throw new Error("Account not found");
    }

    const recentTransactions = await this.db.all(
      "SELECT * FROM transactions WHERE accountId = ? ORDER BY createdAt DESC LIMIT 3",
      [id]
    );

    return {
      accountHolder: account.accountHolder,
      accountNumber: account.accountNumber,
      accountType:
        account.accountType === "CHECKING"
          ? "Checking Account"
          : "Savings Account",
      currentBalance: `$${account.balance.toFixed(2)}`,
      opened: new Date(account.createdAt).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      recentTransactions: recentTransactions.map((txn) => ({
        date: new Date(txn.createdAt).toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
        }),
        description: txn.description,
        amount: `$${txn.amount.toFixed(2)}`,
      })),
    };
  }

  async getPaginatedTransactions(accountId: string, limit: number, offset: number) {
    const rows = await this.db.all(
      "SELECT * FROM transactions WHERE accountId = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?",
      [accountId, limit, offset]
    );
    return rows.map((txn) => ({
      id: txn.id,
      type: txn.type,
      amount: txn.amount,
      description: txn.description,
      createdAt: new Date(txn.createdAt).toISOString(),
    }));
  }
}

