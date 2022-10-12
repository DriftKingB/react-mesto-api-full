import imageSuccess from '../../images/popup__tooltip-image_success.svg';
import imageFail from '../../images/popup__tooltip-image_fail.svg';
import { useCallback, useEffect } from 'react';

export default function InfoToolTipPopup({ isOpen, onClose, isSucceeded }) {
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

  return(
    <section className={`popup popup_type_tooltip ${isOpen ? 'popup_active' : ''}`} onMouseDown={handleClose} >
      <div className="popup__container">
        <div className="popup__tooltip">
          <img 
            className="popup__tooltip-image" 
            src={isSucceeded ? imageSuccess : imageFail} 
            alt={isSucceeded ? 'Запрос выполнен' : 'Запрос отклонен'} 
          />
          <h2 className="popup__tooltip-message" >
            {isSucceeded ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </h2>
        </div>
        <button className="popup__close-button" type="button" onClick={onClose} />
      </div>
    </section>
  )
}
