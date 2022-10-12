export default function Form({ type, name, title, submitText, loadingSubmitText, submitSubline, onSubmit, isOpen = true, isLoading, isValid, inputFieldset }) {
  return(
    <form className={`form form_type_${type}`} name={`${name}-form`} onSubmit={onSubmit}>
      <h2 className="form__title">{title}</h2>      
      {inputFieldset}
      <fieldset className="form__handlers">
        <button className={`form__submit-button form__submit-button_type_${type} ${!isValid ? 'form__submit-button_inactive' : ''}`} disabled={!isValid} >
          <span className="form__submit-button-text">
            <span className="form__submit-text"> { !(isLoading && isOpen) ? submitText : loadingSubmitText } </span>
            <span className={`form__loading-icon ${ isLoading ? 'form__loading-icon_active' : '' }`} />
          </span>
        </button>
        <span className="form__submit-subline">
          {submitSubline}
        </span>
      </fieldset>
    </form>
  )
}