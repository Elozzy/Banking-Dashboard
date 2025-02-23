import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import fs from "fs";
import path from "path";

const databasePath = path.resolve(__dirname, "../data");

if (!fs.existsSync(databasePath)) {
  fs.mkdirSync(databasePath, { recursive: true });
}

const databaseFile = path.join(databasePath, "database.db");

let db: Database<sqlite3.Database, sqlite3.Statement>;

export const initializeDatabase = async () => {
  db = await open({
    filename: databaseFile,
    driver: sqlite3.Database,
  });

  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      accountNumber TEXT UNIQUE,
      accountType TEXT CHECK(accountType IN ('CHECKING', 'SAVINGS')),
      balance REAL,
      accountHolder TEXT,
      createdAt TEXT
    );
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      accountId TEXT,
      type TEXT CHECK(type IN ('DEPOSIT', 'WITHDRAWAL', 'TRANSFER')),
      amount REAL,
      description TEXT,
      createdAt TEXT,
      FOREIGN KEY (accountId) REFERENCES accounts(id)
    );
  `);
  console.log("Database initialized at:", databaseFile);

  // seed sample data
  await seedSampleData();
};

const seedSampleData = async () => {
    const sampleAccounts = [
      {
        id: "1",
        accountNumber: "1001",
        accountType: "CHECKING",
        balance: 5000.0,
        accountHolder: "John Doe",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        accountNumber: "1002",
        accountType: "SAVINGS",
        balance: 10000.0,
        accountHolder: "Jane Smith",
        createdAt: new Date().toISOString(),
      },
    ];
  
    const insertQuery = `
      INSERT OR REPLACE INTO accounts (id, accountNumber, accountType, balance, accountHolder, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    for (const account of sampleAccounts) {
      try {
        await db.run(
          insertQuery,
          account.id,
          account.accountNumber,
          account.accountType,
          account.balance,
          account.accountHolder,
          account.createdAt
        );
      } catch (err:any) {
        console.error("Error inserting sample data:", err.message);
      }
    }
  
    console.log("Sample data seeded successfully.");
  };

export const getDatabase = () => db;
