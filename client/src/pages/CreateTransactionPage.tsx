import React, { useState } from "react";
import { createTransaction } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export function NewTransactionForm() {
  const { accountId } = useParams();
  const [transactionType, setTransactionType] = useState("DEPOSIT");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!accountId) {
        throw new Error("Account ID is missing");
      }

      const transactionData = {
        type: transactionType,
        amount: parseFloat(amount), 
        description,
      };
      const response = await createTransaction(accountId, transactionData);
      console.log("Transaction created successfully:", response);

      navigate(`/transactions/${accountId}`);
     
      setTransactionType("DEPOSIT");
      setAmount("");
      setDescription("");
    } catch (error) {
      console.error("Error creating transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-6 mx-auto"
    >
      {/* Transaction Type */}
      <div>
        <label
          htmlFor="transactionType"
          className="block text-sm font-medium text-gray-700"
        >
          Transaction Type
        </label>
        <select
          id="transactionType"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 px-4 py-2 text-base shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-2 focus:ring-opacity-50 sm:text-sm"
          required
        >
          <option value="DEPOSIT">DEPOSIT</option>
          <option value="WITHDRAWAL">WITHDRAWAL</option>
          <option value="TRANSFER">TRANSFER</option>
        </select>
      </div>

      {/* Amount */}
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 px-4 py-2 text-base shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-2 focus:ring-opacity-50 sm:text-sm"
          placeholder="Enter amount"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 px-4 py-2 text-base shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-2 focus:ring-opacity-50 sm:text-sm"
          placeholder="Enter description"
          rows={3}
          required
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className={`inline-flex justify-center px-6 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Create Transaction"}
        </button>
      </div>
    </form>
  );
}
