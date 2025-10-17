import React, { useState } from "react";
// styles
import "./Card.css";
// components
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

const Card = (props) => {
  const { text, value } = props;
  const [modalOn, setModalOn] = useState(false);

  const toggleModal = () => setModalOn(!modalOn);

  return (
    <div className="card">
      <span className="cardText">
        <span>{text}: </span>
        {/* Removed ₹ symbol from inside curly braces */}
        <span
          className={
            text === "Expenses" ? "cardTextRed" : "cardTextGreen"
          }
        >
          {value}
        </span>
      </span>

      <Button
        text={text === "Expenses" ? "+ Add Expense" : "+ Add Income"}
        background={text === "Expenses" ? "gradientRed" : "gradientGreen"}
        buttonSize="largeButton"
        clickFunction={toggleModal}
      />

      {modalOn ? (
        <Modal
          toggleModal={toggleModal}
          text={text === "Expenses" ? "Add Expense" : "Add Balance"}
        />
      ) : null}
    </div>
  );
};

export default Card;
