import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const AddExpenseForm = ({
  isOpen,
  onRequestClose,
  addExpense,
  editExpense,
  expenseToEdit,
}) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.title);
      setAmount(expenseToEdit.amount);
      setCategory(expenseToEdit.category);
      setDate(expenseToEdit.date);
    } else {
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    }
  }, [expenseToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseData = { title, amount: parseFloat(amount), category, date };
    if (expenseToEdit) {
      editExpense({ ...expenseData, id: expenseToEdit.id });
    } else {
      addExpense(expenseData);
    }
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="modal-content">
        <h2 className="modal-header">
          {expenseToEdit ? "Edit Expense" : "Add Expense"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="modal-input"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="modal-input"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="modal-input"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="modal-input"
          />
          <button type="submit" className="modal-button">
            {expenseToEdit ? "Update Expense" : "Add Expense"}
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="modal-button modal-button-cancel"
          >
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddExpenseForm;
