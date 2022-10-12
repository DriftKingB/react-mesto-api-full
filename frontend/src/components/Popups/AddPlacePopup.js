import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useInputHandling from "../../custom_hooks/useInputHandling";

export default function AddPlacePopup({ isOpen, isLoading, onClose, onSubmit }) {
  const hookConfig = {
    defaultInputs: { name: { value: '' }, link: { value: '' } },
    defaultInputIsValidState: false
  }
  const [ inputs, isValid, handleInputsUpdate, handleChange ] = useInputHandling(hookConfig, isOpen);

  useEffect(() => {
    !isOpen && setTimeout(() => handleInputsUpdate(), 200);
  }, [isOpen]);

  return(
    <PopupWithForm 
      onClose={onClose}
      onSubmit={onSubmit}
      isOpen={isOpen}
      isLoading={isLoading}
      isValid={isValid}
      inputs={inputs}
      name="card-add" 
      title="Новое место"
      submitText="Создать"
      loadingSubmitText="Создание"
      inputFieldset={
        <fieldset className="form__input-container form__input-container_type_popup">
          <div className="form__field">
            <input  
              className={`form__input form__input_type_popup ${!(inputs.name?.isValid ?? true) ? 'form__input_invalid' : ''}`}
              name="name" 
              id="title-input" 
              type="text" 
              placeholder="Название" 
              required 
              minLength="2" 
              maxLength="30" 
              onChange={handleChange} 
              value={inputs.name?.value} 
            />
            <span className="form__input-error"> { inputs.name?.errorMessage } </span>
          </div>
          <div className="form__field">
            <input
              className={`form__input form__input_type_popup ${!(inputs.link?.isValid ?? true) ? 'form__input_invalid' : ''}`}
              name="link" 
              id="link-input" 
              type="url" 
              placeholder="Ссылка на картинку" 
              required 
              onChange={handleChange} 
              value={inputs.link?.value} 
            />
            <span className="form__input-error"> { inputs.link?.errorMessage } </span>
          </div>
        </fieldset>
      } 
    />
  )
}

