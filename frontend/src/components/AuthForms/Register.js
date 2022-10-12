import Form from "../Form";
import Header from "../Header";
import useInputHandling from "../../custom_hooks/useInputHandling";
import { useState } from "react";
import InfoToolTipPopup from "../Popups/InfoToolTipPopup";
import { Link, Redirect, useHistory } from "react-router-dom";


export default function Register({ onSubmit }) {
  const history = useHistory();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isPopupOpen, setPopupState ] = useState(false);
  const [ isRequestSucceeded, setRequestState ] = useState(false);
  const hookConfig = {
    defaultInputs: { email: { value: '' }, password: { value: '' } },
    defaultInputIsValidState: false
  }
  const [ inputs, isValid, handleInputsUpdate, handleChange ] = useInputHandling(hookConfig);

  function closePopup() {
    setPopupState(false);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    
    onSubmit(setIsLoading, setPopupState, setRequestState, inputs, history);
  }

  return(
    <>
      { (isRequestSucceeded && !isPopupOpen) && <Redirect to='/sign-in' />}
      <Header 
        redirectLink={
          <Link className="header__link header__link_type_auth" to="sign-in">Войти</Link>
        }
      />
      <Form
        type='auth'
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isValid={isValid}
        inputs={inputs}
        name="register" 
        title="Регистрация" 
        submitText="Зарегистрироваться"
        loadingSubmitText="Регистрация"
        submitSubline={
          <div className='form__submit-subline'>
            <p className="form__submit-subline-text">Уже зарегистрированы?</p>
            <Link className="form__submit-subline-link" to='sign-in' >Войти</Link>
          </div>
        }
        inputFieldset={
          <fieldset className="form__input-container form__input-container_type_auth">
            <div className="form__field">
              <input
                className={`form__input form__input_type_auth ${!(inputs.email?.isValid ?? true) ? 'form__input_invalid' : ''}`} 
                name="email" 
                id="email-input" 
                type="email" 
                placeholder="Email" 
                required 
                onChange={handleChange} 
                value={inputs.email?.value} 
              />
              <span className="form__input-error"> { inputs.email?.errorMessage } </span>
            </div>
            <div className="form__field">
              <input 
                className={`form__input form__input_type_auth ${!(inputs.password?.isValid ?? true) ? 'form__input_invalid' : ''}`} 
                name="password" 
                id="password-input" 
                type="password" 
                placeholder="Пароль" 
                required
                minLength="2" 
                maxLength="30" 
                onChange={handleChange} 
                value={inputs.password?.value} 
              />
              <span className="form__input-error"> { inputs.password?.errorMessage } </span>
            </div>
          </fieldset>
        } 
      />
      <InfoToolTipPopup 
        isOpen={isPopupOpen}
        onClose={closePopup}
        isSucceeded={isRequestSucceeded}
      />
    </>
  )
}