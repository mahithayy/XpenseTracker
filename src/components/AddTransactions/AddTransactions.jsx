import React, { useContext, useState } from "react";
import "./AddTransactions.css";
import { MoneyContext, TransactionsContext } from "../../Contexts/AllContexts";

const AddTransactions = ({ toggleModal }) => {
  const [money, setMoney] = useContext(MoneyContext);
  const [transactionData, setTransactionData] = useContext(TransactionsContext);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, amount, type, category, date } = formData;
    if (!title || !amount) return alert("Please fill all fields");

    const newTransaction = {
      id: Date.now(),
      name: title,
      price: Number(amount),
      category,
      date,
    };

    let newBalance = money.balance;
    let newExpenses = money.expenses;

    if (type === "income") {
      newBalance += Number(amount);
    } else {
      if (newBalance < amount) return alert("Out of balance");
      newBalance -= Number(amount);
      newExpenses += Number(amount);
    }

    setMoney({ balance: newBalance, expenses: newExpenses });
    setTransactionData([...transactionData, newTransaction]);

    localStorage.setItem(
      "allData",
      JSON.stringify({
        money: { balance: newBalance, expenses: newExpenses },
        transactionData: [...transactionData, newTransaction],
      })
    );

    // Reset and close modal
    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });

    toggleModal && toggleModal();
  };

  return (
    <form className="add-transaction-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      <div className="form-group">
        <input
          id="title-input"
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          id="amount-input"
          type="number"
          name="amount"
          placeholder="Income Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <select
          id="type-select"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <select
          id="category-select"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="entertainment">Entertainment</option>
        </select>
        <input
          id="date-input"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <button id="add-btn" type="submit" className="add-btn">
        Add
      </button>
    </form>
  );
};

export default AddTransactions;
