import React, { useContext, useState } from "react";
import "./AddTransactions.css";
import { MoneyContext, TransactionsContext } from "../../Contexts/AllContexts";

const AddTransactions = ({ toggleModal, isIncome = false }) => {
  const [money, setMoney] = useContext(MoneyContext);
  const [transactionData, setTransactionData] = useContext(TransactionsContext);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    type: isIncome ? "income" : "expense",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  //  Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //  Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const priceValue = parseFloat(formData.price);
    if (isNaN(priceValue) || priceValue <= 0 || formData.title.trim() === "") {
      return;
    }

    const newTransaction = {
      ...formData,
      price: priceValue,
      id: Date.now(),
    };

    // Update transactions
    setTransactionData((prev) => {
      const updated = [...prev, newTransaction];
      localStorage.setItem("expenses", JSON.stringify(updated)); // 👈 keep Cypress happy
      return updated;
    });

    // Update money
    if (formData.type === "income") {
      setMoney((prev) => ({
        ...prev,
        balance: prev.balance + priceValue,
      }));
    } else {
      setMoney((prev) => ({
        ...prev,
        balance: prev.balance - priceValue,
        expenses: prev.expenses + priceValue,
      }));
    }

    //  Allow re-render before closing modal
    setTimeout(() => {
      toggleModal();
    }, 200);

    // Reset form
    setFormData({
      title: "",
      price: "",
      type: isIncome ? "income" : "expense",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>{isIncome ? "Add Income" : "Add Expense"}</h2>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder={isIncome ? "Income Title" : "Expense Title"}

      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder={isIncome ? "Income Amount" : "Expense Amount"}

      />

      {!isIncome && (
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="entertainment">Entertainment</option>
          <option value="other">Other</option>
        </select>
      )}

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <button type="submit" className="submit-btn">
        {isIncome ? "Add Balance" : "Add Expense"}
      </button>
    </form>
  );
};

export default AddTransactions;
