import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTransactionDetails } from "../api";

type Transaction = {
  id: string;
  type: string;
  amount: number;
  description: string;
  createdAt: string;
};

export function TransactionsPage() {
  const { accountId } = useParams<{ accountId: string }>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        if (accountId) {
          const response = await getTransactionDetails(accountId);
          setTransactions(response.transactions);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [accountId]);

  if (loading) return <p className="text-center text-blue-500">Loading transactions...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-gray-50 text-left text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="px-4 py-2 border border-gray-300">ID</th>
              <th className="px-4 py-2 border border-gray-300">Type</th>
              <th className="px-4 py-2 border border-gray-300">Amount</th>
              <th className="px-4 py-2 border border-gray-300">Description</th>
              <th className="px-4 py-2 border border-gray-300">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="odd:bg-white even:bg-gray-100 hover:bg-gray-200"
              >
                <td className="px-4 py-2 border border-gray-300">{transaction.id}</td>
                <td className="px-4 py-2 border border-gray-300">{transaction.type}</td>
                <td className="px-4 py-2 border border-gray-300">
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {transaction.description}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {new Date(transaction.createdAt).toLocaleDateString()}{" "}
                  {new Date(transaction.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

