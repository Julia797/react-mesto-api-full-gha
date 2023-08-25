import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import HomePage from '../HomePage/HomePage';
import Register from '../Register/Register';
import Login from '../Login/Login';

function Main({ name, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDeleteClick, cards, onCardLike, isLoading, handleRegister,  handleLogin, isSending }) {
  const currentUser = useContext(CurrentUserContext) 
  
  return (
    <main className="content">
      {name ==='MainFree' ?
        <HomePage
          onEditProfile = {onEditProfile}
          onAddPlace = {onAddPlace}
          onEditAvatar = {onEditAvatar}
          onCardClick = {onCardClick}
          onDeleteClick = {onDeleteClick}
          cards = {cards}
          onCardLike = {onCardLike}
          isLoading = {isLoading}
        />
      :
      name ==='MainSignUp' ?
        <Register
          handleRegister={handleRegister}
          isSending={isSending}
        />
      :
        <Login
          handleLogin={handleLogin}
          isSending={isSending}
        />
      }
    </main>
  );
}

export default Main;
