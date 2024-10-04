import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="overlay" onClick={onClose}>
      <div role="dialog" className="modal">
        {children}
      </div>
    </div>
  );
};

export default Modal;