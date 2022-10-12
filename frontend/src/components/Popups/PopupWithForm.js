import { useCallback, useEffect } from "react"
import Form from "../Form";

export default function PopupWithForm({ name, title, submitText, loadingSubmitText, onClose, onSubmit, isOpen, isLoading, isValid, inputFieldset, inputs }) {
  const closeByEscapeCallBack = useCallback((evt) => {
    evt.key === 'Escape' && onClose();
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', closeByEscapeCallBack);
    } else {
      document.removeEventListener('keydown', closeByEscapeCallBack);
    }
  }, [isOpen]);

  function handleClose(evt) {
    evt.target.classList.contains('popup') && onClose();
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onSubmit(inputs);
  }

  return (
    <section className={`popup popup_type_${name} ${isOpen ? "popup_active" : ""}`} onMouseDown={handleClose} >
      <div className="popup__container">
        <Form
          type='popup'
          onSubmit={handleSubmit}
          isOpen={isOpen}
          isLoading={isLoading}
          isValid={isValid}
          inputs={inputs}
          name={name} 
          title={title} 
          submitText={submitText}
          loadingSubmitText={loadingSubmitText}
          inputFieldset={inputFieldset}
        />
        <button className="popup__close-button" type="button" onClick={onClose} />
      </div>
    </section>
  )
}