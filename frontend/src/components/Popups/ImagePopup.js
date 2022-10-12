import { useCallback, useEffect } from "react";

export default function ImagePopup({ isOpen, card, onClose }) {
  const closeByEscapeCallBack = useCallback((evt) => {
    evt.key === 'Escape' && onClose();
  }, [])
  
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

  return (
    <section className={`popup popup_type_image-view ${isOpen ? "popup_active" : ''}`} onMouseDown={handleClose} >
      <div className="popup__image-container">
        <button className="popup__close-button" type="button" onClick={onClose} />
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <p className="popup__image-title">{card?.name}</p>
      </div>
    </section>
  )
}