import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ExpenseList = ({ expenses, onEdit, onDelete }) => (
  <div className="expense-list">
    <h3>Recent Transactions</h3>
    <ul>
      {expenses.map((expense) => (
        <li key={expense.id}>
          <span>{expense.title}</span>
          <span>{expense.date}</span>
          <span>₹{expense.amount}</span>
          <button onClick={() => onEdit(expense)}>
            <FaEdit />
          </button>
          <button onClick={() => onDelete(expense.id)}>
            <FaTrashAlt />
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default ExpenseList;
