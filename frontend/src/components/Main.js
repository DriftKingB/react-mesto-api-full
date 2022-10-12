import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, cards, onCardClick, onCardLike, onCardRemoval }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="content"> 
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
          <button className="profile__avatar-button" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name"> {currentUser.name} </h1>
          <p className="profile__subline"> {currentUser.about} </p>
          <button className="profile__edit-button" type="button" onClick={onEditProfile} />
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace} />
      </section>

      <section className="album">
        {cards.map((card) => 
          <Card 
            key={card._id} 
            card={card} 
            onCardClick={onCardClick} 
            onCardLike={onCardLike}
            onCardRemoval={onCardRemoval}
          />
        )}
      </section>
    </div>
  )
}