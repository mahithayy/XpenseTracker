import React, { useContext, useState } from "react";
import "./AddTransactions.css";
import { MoneyContext, TransactionsContext } from "../../Contexts/AllContexts";

const AddTransactions = ({ toggleModal }) => {
  const [money, setMoney] = useContext(MoneyContext);
  const [transactionData, setTransactionData] = useContext(TransactionsContext);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    type: "", // start empty instead of "expense"
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

    const { title, price, type, category, date } = formData;
    if (!title || !price || !type) return alert("Please fill all fields");

    const newTransaction = {
      id: Date.now(),
      name: title,
      price: Number(price),
      category,
      date,
    };

    let newBalance = money.balance;
    let newExpenses = money.expenses;

    if (type === "income") {
      newBalance += Number(price);
    } else {
      if (newBalance < price) return alert("Out of balance");
      newBalance -= Number(price);
      newExpenses += Number(price);
    }

    const updatedTransactions = [...transactionData, newTransaction];
    setTransactionData(updatedTransactions);
    setMoney({ balance: newBalance, expenses: newExpenses });

    localStorage.setItem(
      "allData",
      JSON.stringify({
        money: { balance: newBalance, expenses: newExpenses },
        transactionData: updatedTransactions,
      })
    );

    // Reset and close modal
    setFormData({
      title: "",
      price: "",
      type: "", // reset to empty
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
          name="price"
          placeholder="Amount"
          value={formData.price}
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
          <option value="">Select Type</option>
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

      <button
        id="add-btn"
        type="submit"
        className="add-btn"
        disabled={!formData.type} // disable until type is selected
      >
        {formData.type === "income" ? "Add Balance" : "Add Expense"}
      </button>
    </form>
  );
};

export default AddTransactions;
