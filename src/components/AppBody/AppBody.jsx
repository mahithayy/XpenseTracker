import React, { useState } from 'react';
import "./AppBody.css";
import AddTransactions from '../AddTransactions/AddTransactions';
import Transactions from '../Transactions/Transactions';
import TopExpenses from '../TopExpenses/TopExpenses';

const AppBody = () => {
  // step 1: add a state variable to track modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // step 2: function to toggle modal open/close
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <div className="AppBody">
      {/* button to open modal */}
      <button className="btn btn-primary" onClick={toggleModal}>
        Add Transaction
      </button>

      {/* step 3: show AddTransactions only when modal is open */}
      {isModalOpen && (
        <AddTransactions toggleModal={toggleModal} />
      )}

      <Transactions />
      <TopExpenses />
    </div>
  );
};

export default AppBody;
