import React from "react";

const WalletBalance = ({ balance, onAddIncome }) => (
  <div className="wallet-balance">
    <h2>Wallet Balance: ₹{balance}</h2>
    <button onClick={onAddIncome} className="add-income-btn">
      + Add Income
    </button>
  </div>
);

export default WalletBalance;
