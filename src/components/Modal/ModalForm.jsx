import React, { useContext, useEffect, useState } from 'react';
// components
import FormButtons from '../FormButtons/FormButtons';
// contexts
import { MoneyContext, TransactionsContext } from '../../Contexts/AllContexts';
// styles
import './ModalForm.css';

const ModalForm = (props) => {
  // props
  const { toggleModal, formType, existingData } = props;

  // contexts
  const [money, setMoney] = useContext(MoneyContext);
  const [transactionData, setTransactionData] = useContext(TransactionsContext);

  // states
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    date: new Date().toISOString().split("T")[0], // yyyy-mm-dd
    category: "",
  });

  const [balanceFormData, setBalanceFormData] = useState({ income: "" });

  // check for existing data to update transaction
  useEffect(() => {
    if (existingData) updateFormDataWithExistingData();
    // eslint-disable-next-line
  }, []);

  const updateFormDataWithExistingData = () => {
    const { name, date, amount, category } = existingData;
    setFormData({
      name: name,
      price: amount,
      date: date,
      category: category,
    });
  };

  const handleChange = (evt) => {
    const key = evt.target.name;
    const value = evt.target.value;
    setFormData({ ...formData, [key === "title" ? "name" : key]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (formType === "Add Balance") {
      setMoney({
        ...money,
        balance: money.balance + Number(balanceFormData.income),
      });
    }

    if (formType === "Add Expense") {
      let newExpense = money.expenses + Number(formData.price);
      let newBalance = money.balance - Number(formData.price);

      if (newBalance < 0) {
        return alert("Out of balance");
      } else {
        let newId = new Date() / 1;
        let newTransaction = { ...formData, id: newId };
        setMoney({ balance: newBalance, expenses: newExpense });
        setTransactionData([...transactionData, newTransaction]);
      }
    }

    if (formType === "Edit Expense") {
      let newExpense =
        money.expenses + Number(formData.price) - Number(existingData.amount);
      let newBalance =
        money.balance - Number(formData.price) + Number(existingData.amount);

      if (newBalance < 0) return alert("Out of balance");

      const indexOfTransaction = transactionData.findIndex(
        (transaction) => existingData.id === transaction.id
      );

      const updatedTransaction = { ...formData, id: existingData.id };
      transactionData[indexOfTransaction] = updatedTransaction;

      setMoney({ balance: newBalance, expenses: newExpense });
      setTransactionData([...transactionData]);
      localStorage.setItem("transactions", JSON.stringify(transactionData));

    }

    toggleModal();
  };

  const expenseAndEditInput = () => {
    return (
      <div className="formInputsDiv">
        <input
          required
          value={formData.name}
          className="formInput"
          onChange={handleChange}
          placeholder="Title"
          type="text"
          name="modal-title"
          autoFocus
        />
        <input
          required
          value={formData.price}
          className="formInput"
          onChange={handleChange}
          placeholder="Expense Amount"
          type="number"
          name="modal-price"
        />
        <select
          value={formData.category}
          className="formInput"
          onChange={handleChange}
          name="category"
          required
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="travel">Travel</option>
        </select>
        <input
          required
          value={formData.date}
          className="formInput"
          onChange={handleChange}
          placeholder="dd/mm/yyyy"
          type="date"
          name="date"
        />
      </div>
    );
  };

  const incomeInputs = () => {
    return (
      <div className="balanceFormInputDiv">
        <input
          className="formInput"
          onChange={(e) =>
            setBalanceFormData({ income: +e.target.value })
          }
          placeholder="Income Amount"
          type="number"
          name="income"
          value={balanceFormData.income}
          autoFocus
          required
        />
      </div>
    );
  };

  return (
    <form className="modalForm expensesForm" onSubmit={handleSubmit}>
      {formType === "Add Balance" ? incomeInputs() : expenseAndEditInput()}
      <FormButtons text={formType} toggleModal={toggleModal} />
    </form>
  );
};

export default ModalForm;
