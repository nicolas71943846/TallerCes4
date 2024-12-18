import React, { useEffect } from 'react';

function Modal({ showModal, setShowModal, modalTitle, modalMessage }) {
  // Cerrar el modal cuando se hace clic fuera de él (opcional)
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  // Si el modal no se debe mostrar, devolver null
  if (!showModal) return null;

  return (
    <div className={`modal ${showModal ? 'show' : ''}`} onClick={handleClose}>
      <div className="modal-content">
        <h2>{modalTitle}</h2>
        <p>{modalMessage}</p>
        <button 
          onClick={() => setShowModal(false)} 
          aria-label="Cerrar modal"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Modal;