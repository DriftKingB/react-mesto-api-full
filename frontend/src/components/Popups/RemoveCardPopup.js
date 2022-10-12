import PopupWithForm from "./PopupWithForm";

export default function RemoveCardPopup({ isLoading, onClose, onSubmit, card }) {
  const isOpen = card ? true : false;

  return(
    <PopupWithForm 
        onClose={onClose}
        onSubmit={onSubmit}
        isOpen={isOpen}
        isLoading={isLoading}
        isValid={true}
        inputs={card}
        name="card-remove" 
        title="Вы уверены?"
        submitText="Да"
        loadingSubmitText="Да"
        inputFieldset={ <></> }
      />
  )
}