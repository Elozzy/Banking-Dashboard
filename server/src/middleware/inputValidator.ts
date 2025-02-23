import { Request, Response, NextFunction } from "express";

export const validateTransactionInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { type, amount } = req.body;

  if (!["DEPOSIT", "WITHDRAWAL", "TRANSFER"].includes(type)) {
    res.status(400).json({ error: "Invalid transaction type" });
    return;
  }

  if (typeof amount !== "number" || amount <= 0 || isNaN(amount)) {
     res.status(400).json({ error: "Invalid amount" });
     return
  }

  next();
};
