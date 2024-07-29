import React, { useState } from "react";
import Modal from "react-modal";

const AddIncomeForm = ({ isOpen, onRequestClose, addIncome }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncome(parseFloat(amount));
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="modal-content">
        <h2 className="modal-header">Add Income</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Income Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="modal-input"
          />
          <button type="submit" className="modal-button">
            Add Income
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

export default AddIncomeForm;
