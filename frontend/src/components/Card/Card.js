import { useContext } from "react";
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Card({ card, onCardClick, onDeleteClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext)
  const isOwner = card.owner === currentUser._id;
  const isLiked = card.likes.some(item => item === currentUser._id);
  const cardLikeButtonClassName = ( 
    `btn-like ${isLiked && 'btn-like_active'}` 
  ); 
 
  const handleLikeClick = () => {
    onCardLike(card)
  }
  
  return (
    <li className="element__item">
      <img className="element__foto" src={card.link} alt={card.name} 
        onClick = {() => onCardClick({name: card.name, link: card.link})}/>
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button className={cardLikeButtonClassName} type="button" aria-label="лайк" onClick={handleLikeClick} />
          <span className="element__likes-counter">{card.likes.length}</span>
        </div>
        {isOwner && <button className="btn-delete button" type="button" aria-label="удалить" onClick={() => onDeleteClick(card._id)} />}
      </div>
    </li>
  )
}

export default Card;
