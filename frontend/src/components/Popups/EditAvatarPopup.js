import { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, isLoading, onClose, onSubmit }) {
  const linkInput = useRef();
  const linkInputError = useRef();
  const [ isValid, setIsValid ] = useState(false);

  useEffect(() => {
    !isOpen && setTimeout(() => handleInputsUpdate(), 200);
  }, [isOpen]);

  function clearFieldset() {
    const input = linkInput.current;

    linkInputError.textContent = '';
    input.value = null;
    input.classList.remove('form__input_invalid');
  }

  function handleInputsUpdate() {
    setIsValid(false);
    clearFieldset();
  }

  function handleChange() {
    const input = linkInput.current;

    linkInputError.current.textContent = input.validationMessage;
    if (!input.validity.valid) {
      input.classList.add('form__input_invalid');
      setIsValid(false);
    } else {
      input.classList.remove('form__input_invalid');
      setIsValid(true);
    }
  }

  return(
    <PopupWithForm 
      onClose={onClose}
      onSubmit={onSubmit}
      isOpen={isOpen}
      isLoading={isLoading}
      isValid={isValid}
      inputs={{link: linkInput.current?.value}}
      name="avatar-edit" 
      title="Обновить аватар" 
      submitText="Сохранить"
      loadingSubmitText="Сохранение"
      inputFieldset={
        <fieldset className="form__input-container form__input-container_type_popup">
          <div className="form__field">
            <input
              className="form__input form__input_type_popup"
              ref={linkInput} 
              name="avatar" 
              id="avatar-link-input" 
              type="url" 
              placeholder="Ссылка на картинку" 
              required 
              onChange={handleChange} 
            />
            <span ref={linkInputError} className="form__input-error"></span>
          </div>
        </fieldset>
      } 
    />
  )
}

