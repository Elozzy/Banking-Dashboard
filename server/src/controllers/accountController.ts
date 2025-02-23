import { Request, Response } from "express";
import { AccountService } from "../services/accountService";

export const createTransaction = async (
  req: Request,
  res: Response,
  accountService: AccountService
) => {
  const { id } = req.params;
  const { type, amount, description } = req.body;

  try {
    const result = await accountService.createTransaction(
      id,
      type,
      amount,
      description
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getAccountDetails = async (
  req: Request,
  res: Response,
  accountService: AccountService
) => {
  const { id } = req.params;

  try {
    const result = await accountService.getAccountDetails(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const getAccountTransactions = async (
    req: Request<{ id: string }, any, any, { page?: string; limit?: string }>,
    res: Response,
    accountService: AccountService
  ):Promise< void> => {
    const { id } = req.params;
    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "10", 10);
    const offset = (page - 1) * limit;
  
    try {
      const account = await accountService.getAccountDetails(id);
      if (!account) {
         res.status(404).json({ error: "Account not found" });
         return
      }
  
      const transactions = await accountService.getPaginatedTransactions(id, limit, offset);
      res.json({accountId: id, transactions });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
