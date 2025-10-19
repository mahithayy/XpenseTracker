import React, { useContext, useState } from "react";
import "./Card.css";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import AddTransactions from "../AddTransactions/AddTransactions";
import { MoneyContext } from "../../Contexts/AllContexts";

const Card = ({ text }) => {
  const [modalOn, setModalOn] = useState(false);
  const [money] = useContext(MoneyContext);

  const toggleModal = () => setModalOn(!modalOn);

  const value = text === "Expenses" ? money.expenses : money.balance;

  return (
    <div className="card">
      <span className="cardText">
        <span>{text}: </span>
        <span
          className={text === "Expenses" ? "cardTextRed" : "cardTextGreen"}
        >
          ₹{value}
        </span>
      </span>

      <Button
        text={text === "Expenses" ? "+ Add Expense" : "+ Add Balance"}
        background={text === "Expenses" ? "gradientRed" : "gradientGreen"}
        buttonSize="largeButton"
        clickFunction={toggleModal}
      />

      {modalOn && (
        <Modal toggleModal={toggleModal}>
          <AddTransactions toggleModal={toggleModal} />
        </Modal>
      )}
    </div>
  );
};

export default Card;
