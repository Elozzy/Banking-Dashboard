import { AccountList } from "./components/AccountList";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { TransactionsPage } from "./pages/TransactionsPage";
import { NewTransactionForm } from "./pages/CreateTransactionPage";

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800">
      <Router>
        <header className="bg-blue-600 text-white py-4 shadow-md">
          <Link to="/" className="text-2xl font-bold text-center block cursor-pointer">
            Banking Dashboard
          </Link>
        </header>
        <div className="w-full px-4">
          <Routes>
            <Route path="/" element={<AccountList />} />
            <Route path="/transactions/:accountId" element={<TransactionsPage />} />
            <Route path="/create-transaction/:accountId" element={<NewTransactionForm />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}



export default App;
