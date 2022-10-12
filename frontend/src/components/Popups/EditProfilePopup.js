import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useInputHandling from "../../custom_hooks/useInputHandling";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, isLoading, onClose, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);
  const hookConfig = {
    defaultInputs: { name: { value: currentUser.name }, about: { value: currentUser.about } },
    defaultInputIsValidState: true
  }
  const [ inputs, isValid, handleInputsUpdate, handleChange ] = useInputHandling(hookConfig, isOpen);

  useEffect(() => {
    const delay = isOpen ? 0 : 200; 

    setTimeout(() => handleInputsUpdate(), delay);
  }, [isOpen]);

  return(
    <PopupWithForm
      onClose={onClose}
      onSubmit={onSubmit}
      isOpen={isOpen}
      isLoading={isLoading}
      isValid={isValid}
      inputs={inputs}
      name="profile-edit" 
      title="Редактировать профиль" 
      submitText="Сохранить"
      loadingSubmitText="Сохранение"
      inputFieldset={
        <fieldset className={`form__input-container form__input-container_type_popup`}>
          <div className="form__field">
            <input
              className={`form__input form__input_type_popup ${!(inputs.name?.isValid ?? true) ? 'form__input_invalid' : ''}`} 
              name="name" 
              id="name-input" 
              type="text" 
              placeholder="Имя" 
              required 
              minLength="2" 
              maxLength="40" 
              onChange={handleChange} 
              value={inputs.name?.value} 
            />
            <span className="form__input-error"> { inputs.name?.errorMessage } </span>
          </div>
          <div className="form__field">
            <input 
              className={`form__input form__input_type_popup ${!(inputs.about?.isValid ?? true) ? 'form__input_invalid' : ''}`} 
              name="about" 
              id="about-input" 
              type="text" 
              placeholder="О себе" 
              required 
              minLength="2" 
              maxLength="200" 
              onChange={handleChange} 
              value={inputs.about?.value} 
            />
            <span className="form__input-error"> { inputs.about?.errorMessage } </span>
          </div>
        </fieldset>
      } 
    />
  )
}

