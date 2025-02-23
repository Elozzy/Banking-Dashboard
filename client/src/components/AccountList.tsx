// /**
//  * AccountList Component
//  *
//  * TECHNICAL ASSESSMENT NOTES:
//  * This is a basic implementation with intentional areas for improvement:
//  * - Basic error handling
//  * - Simple loading state
//  * - No skeleton loading
//  * - No retry mechanism
//  * - No pagination
//  * - No sorting/filtering
//  * - No animations
//  * - No accessibility features
//  * - No tests
//  *
//  * Candidates should consider:
//  * - Component structure
//  * - Error boundary implementation
//  * - Loading states and animations
//  * - User feedback
//  * - Performance optimization
//  * - Accessibility (ARIA labels, keyboard navigation)
//  * - Testing strategy
//  */


"use client";
import { useState, useEffect } from "react";
import { Account } from "../types";
import { getAccounts } from "../api";
import { AccountCard } from "./AccountCard";
import { useNavigate } from "react-router-dom";

export function AccountList() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getAccounts();
        setAccounts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading)
    return (
      <div className="flex flex-wrap gap-4 p-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-300 rounded-lg h-24 w-full sm:w-48"
          ></div>
        ))}
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );

  return (
    
    <div className="p-10 px-20 bg-white items-center justify-center ">
      <h2 className="text-2xl font-semibold mb-4 text-center">Accounts</h2>
      <div className="flex flex-wrap gap-4 items-center justify-center w-full ">
        {accounts.map((account) => (
          <AccountCard
            key={account.id}
            account={account}
            onViewTransactions={() => navigate(`/transactions/${account.id}`)}
            onCreateTransactions={() => navigate(`/create-transaction/${account.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
