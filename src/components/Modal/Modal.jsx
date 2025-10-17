import React from "react";
import "./Modal.css";

const Modal = ({ toggleModal, children }) => {
  return (
    <div className="Modal" onClick={toggleModal}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
