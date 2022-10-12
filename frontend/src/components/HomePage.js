import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import ImagePopup from "./Popups/ImagePopup";
import EditProfilePopup from './Popups/EditProfilePopup';
import AddPlacePopup from './Popups/AddPlacePopup';
import EditAvatarPopup from './Popups/EditAvatarPopup';
import RemoveCardPopup from './Popups/RemoveCardPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function HomePage({ onSignOut, currentUserEmail, cards, onCardLike, onCardRemove, onAddPlace, onEditProfile, onEditAvatar }) {
	const currentUser = useContext(CurrentUserContext);

  const [isEditPopupOpen, setProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setCardPopupState] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupState] = useState(false);
  const [isImagePopupOpen, setImagePopupState] = useState(false);
  const [popupIsLoading, setPopupIsLoading] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToRemove, setCardToRemove] = useState(null);

  function handleEditAvatarClick() {
    setAvatarPopupState(true);
  }
  
  function handleEditProfileClick() {
    setProfilePopupState(true);
  }
  
  function handleAddPlaceClick() {
    setCardPopupState(true);
  }

  function handleRemoveCardClick(card) {
    setCardToRemove(card);
  }

  function handleCardClick(card) {
    setImagePopupState(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setAvatarPopupState(false);
    setCardPopupState(false);
    setProfilePopupState(false);
    setImagePopupState(false);

    setCardToRemove(null);
    setTimeout(() => { setSelectedCard(null) }, 200);
  }

  function handleCardRemove(card) {
    onCardRemove(card, setPopupIsLoading, closeAllPopups);
  }

  function handleAddPlace({ name, link }) {
    onAddPlace(name.value, link.value, setPopupIsLoading, closeAllPopups)
  }

  function handleEditProfile({ name, about }) {
    onEditProfile(name.value, about.value, setPopupIsLoading, closeAllPopups)
  }

  function handleEditAvatar({ link }) {
    onEditAvatar(link, setPopupIsLoading, closeAllPopups)
  }

	return(
    <>
			{
        currentUserEmail &&
        <Header 
          userEmail={ <p className="header__user-email ">{currentUserEmail}</p> }
          redirectLink={ 
            <Link 
              className="header__link header__link_type_home" 
              to="sign-in" 
              onClick={onSignOut}
            > Выйти 
            </Link> }
        />
      }
      { 
        (currentUser && cards) &&
        <Main 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardRemoval={handleRemoveCardClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={onCardLike}
        />
      }
      <ImagePopup 
        isOpen={isImagePopupOpen}
        isLoading={popupIsLoading}
        onClose={closeAllPopups}
        card={selectedCard}
      />
      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        isLoading={popupIsLoading}
        onClose={closeAllPopups}
        onSubmit={handleAddPlace}
      />
      <RemoveCardPopup 
        isLoading={popupIsLoading}
        onClose={closeAllPopups}
        onSubmit={handleCardRemove} 
        card={cardToRemove}
      />

      {
        currentUser &&
        <>
          <EditAvatarPopup 
            isLoading={popupIsLoading}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleEditAvatar}
          />
          <EditProfilePopup
            isLoading={popupIsLoading}
            isOpen={isEditPopupOpen} 
            onClose={closeAllPopups}
            onSubmit={handleEditProfile} 
          />
        </>
      }      
			<Footer />
    </>
	)
}