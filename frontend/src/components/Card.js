import { useContext, useState } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

export default function Card({ card, onCardClick, onCardLike, onCardRemoval }) {
  const currentUser = useContext(CurrentUserContext);
  const madeByUser = currentUser._id === card.owner._id;
  const likedByUser = card.likes.some(user => user._id === currentUser._id );
  const [ isLoading, setIsLoading ] = useState(false);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card, setIsLoading);
  }

  function handleCardRemoval() {
    onCardRemoval(card);
  }

  return (
    <article className="card" id={card._id}>
      <div className="card__image-container" onClick={handleCardClick}>
        <img className="card__image" src={card.link} alt={card.name} />
      </div>
      <div className="card__tab">
        <h2 className="card__title"> {card.name} </h2>
        <div className="card__likes">
          <button className={`card__like-button ${likedByUser && "card__like-button_active"}`} type="button" onClick={handleCardLike} />
          <div className={`card__loading-icon ${isLoading && "card__loading-icon_active"}`} />
          <span className={`card__likes-number ${isLoading && "card__likes-number_inactive"}`}> {card.likes.length} </span>
        </div>
      </div>
      { madeByUser && <button className="card__delete-button" onClick={handleCardRemoval} /> }
    </article>
  )
}