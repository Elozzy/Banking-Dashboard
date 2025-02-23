import express, { Router } from "express";
import { createTransaction, getAccountDetails, getAccountTransactions } from "../controllers/accountController";
import { validateTransactionInput } from "../middleware/inputValidator";
import { getDatabase } from "../utils/database";
import { AccountService } from "../services/accountService";



const accountRoutes = (db: any) => {
    const router = express.Router();
    const accountService = new AccountService(db);

  router.get("/", async (req, res) => {
    try {
      const db = getDatabase();
      const accounts = await db.all("SELECT * FROM accounts");
      res.json(accounts);
    } catch (err) {
      console.error("Error fetching accounts:", err);
      res.status(500).json({ error: "Failed to fetch accounts." });
    }
  });
    router.post("/:id/transactions", (req, res) => createTransaction(req, res, accountService));
    router.get("/:id", (req, res) => getAccountDetails(req, res, accountService));
    router.get("/:id/transactions",  (req, res) => getAccountTransactions(req, res, accountService)); 
  
    return router;
  };
  
  export default accountRoutes;