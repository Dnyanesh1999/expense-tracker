import React, { useState, useEffect } from "react";
import WalletBalance from "./components/WalletBalance";
import AddExpenseForm from "./components/AddExpenseForm";
import AddIncomeForm from "./components/AddIncomeForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseTrends from "./components/ExpenseTrends";
import { SnackbarProvider, useSnackbar } from "notistack";
import "./styles.css";

const App = () => {
  const [walletBalance, setWalletBalance] = useState(() => {
    return parseFloat(localStorage.getItem("walletBalance")) || 5000;
  });
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [walletBalance, expenses]);

  const addIncome = (amount) => {
    setWalletBalance(walletBalance + amount);
    enqueueSnackbar("Income added successfully!", { variant: "success" });
  };

  const addExpense = (expense) => {
    if (walletBalance >= expense.amount) {
      setExpenses([...expenses, { ...expense, id: Date.now() }]);
      setWalletBalance(walletBalance - expense.amount);
      enqueueSnackbar("Expense added successfully!", { variant: "success" });
    } else {
      enqueueSnackbar("Insufficient balance!", { variant: "error" });
    }
  };

  const editExpense = (updatedExpense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    enqueueSnackbar("Expense updated successfully!", { variant: "success" });
  };

  const deleteExpense = (id) => {
    const expenseToDelete = expenses.find((expense) => expense.id === id);
    setExpenses(expenses.filter((expense) => expense.id !== id));
    setWalletBalance(walletBalance + expenseToDelete.amount);
    enqueueSnackbar("Expense deleted successfully!", { variant: "success" });
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <div className="app">
        <div className="header">Expense Tracker</div>
        <div className="wallet-section">
          <WalletBalance
            balance={walletBalance}
            onAddIncome={() => setIsAddIncomeModalOpen(true)}
          />
          <button
            className="add-expense-btn"
            onClick={() => setIsAddExpenseModalOpen(true)}
          >
            + Add Expense
          </button>
        </div>
        <ExpenseList
          expenses={expenses}
          onEdit={editExpense}
          onDelete={deleteExpense}
        />
        <div className="charts">
          <div className="chart">
            <ExpenseSummary expenses={expenses} />
          </div>
          <div className="chart">
            <ExpenseTrends expenses={expenses} />
          </div>
        </div>
        <AddExpenseForm
          isOpen={isAddExpenseModalOpen}
          onRequestClose={() => setIsAddExpenseModalOpen(false)}
          addExpense={addExpense}
        />
        <AddIncomeForm
          isOpen={isAddIncomeModalOpen}
          onRequestClose={() => setIsAddIncomeModalOpen(false)}
          addIncome={addIncome}
        />
      </div>
    </SnackbarProvider>
  );
};

export default App;
