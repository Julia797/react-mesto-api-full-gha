import { useContext } from 'react';
import Card from '../Card/Card';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Spinner from '../Spinner/Spinner.js';


function HomePage({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDeleteClick, cards, onCardLike, isLoading }) {
  const currentUser = useContext(CurrentUserContext) 
 
  return (
    <>
      <section className="profile indent">
        <button className="profile__avatar-edit" type="button" aria-label="редактировать фото" onClick={onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="аватарка"/>
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__btn-edit button btnOpen" type="button" aria-label="редактировать профиль" onClick={onEditProfile}></button>
        <button className="profile__btn-plus button btnOpen" type="button" aria-label="добавить карточку" onClick={onAddPlace}></button>
      </section>

      <section className="elements" aria-label="карточки с фотографиями красивых мест">
        <ul className="element">
          {isLoading ? <Spinner/> : cards.map(data => {
            return (
              <Card 
                key = {data._id}
                card = {data} 
                onCardClick = {onCardClick}
                onDeleteClick = {onDeleteClick}
                onCardLike = {onCardLike}
              />
            )
          })}
        </ul>
      </section>
    </>
  )
}

export default HomePage;
