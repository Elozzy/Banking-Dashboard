import { Account } from "../types";

export function AccountCard({
  account,
  onViewTransactions,
  onCreateTransactions,
}: {
  account: Account;
  onViewTransactions: () => void;
  onCreateTransactions: () => void;
}) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition-shadow w-96">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">
        {account.accountHolder}
      </h3>
      <p className="text-lg text-gray-600 mb-2">
        Account Number: {account.accountNumber}
      </p>
      <p className="text-lg text-gray-600 mb-2">Type: {account.accountType}</p>
      <p className="text-lg text-gray-600 mb-4">
        Balance: ${account.balance.toFixed(2)}
      </p>
      <div className="flex justify-between gap-4">
        <button
          onClick={onViewTransactions}
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 cursor-pointer"
        >
          View Transactions
        </button>
        <button
          onClick={onCreateTransactions}
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 cursor-pointer"
        >
          Create Transaction
        </button>
      </div>
    </div>
  );
}
