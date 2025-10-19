import React, { useContext, useState, useEffect } from "react";
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

  // Load from localStorage initially
  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactionData(JSON.parse(storedTransactions));
    }
  }, [setTransactionData]);

  // Save to localStorage whenever transactionData changes
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactionData));
  }, [transactionData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

    setTransactionData((prev) => [...prev, newTransaction]);

    // Update money context
    if (formData.type === "income") {
      setMoney((prev) => prev + priceValue);
    } else {
      setMoney((prev) => prev - priceValue);
    }

    // Reset form after submission
    setFormData({
      title: "",
      price: "",
      type: isIncome ? "income" : "expense",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });

    toggleModal();
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
        required
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder={isIncome ? "Income Amount" : "Expense Amount"}
        required
      />

      {!isIncome && (
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category (Food, Travel, etc.)"
        />
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
