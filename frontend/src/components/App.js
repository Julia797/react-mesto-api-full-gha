import '../index.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Main from './Main/Main';
import PopupWithForm from './PopupWithForm/PopupWithForm';
import ImagePopup from './ImagePopup/ImagePopup';
import { useState, useCallback, useEffect} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import InfoTooltip from './InfoTooltip/InfoTooltip';
import { autorize, getContent, register } from '../utils/auth'

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setIsImagePopup] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [deleteIdCard, setDeleteIdCard] = useState('')
  const [isLoadingCards, setIsLoadingCards] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isReultPopupOpen, setIsReultPopupOpen] = useState(false)
  const [isSucessful, setIsSucessful] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [isCheckToken, setIsCheckToken] = useState(true)
  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isDeletePopupOpen || isImagePopup || isReultPopupOpen
  const navigate = useNavigate()
 
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handlePopapDeleteClick(IdCard) {
    setDeleteIdCard(IdCard)
    setIsDeletePopupOpen(true)
  }

  const setForPopups = useCallback(() => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopup(false)
    setIsDeletePopupOpen(false)
    setIsReultPopupOpen(false)
  }, [])

  const closeAllPopups = useCallback(() => {
    setForPopups()
  }, [setForPopups])


  useEffect(() => {
    function closePopupEsc(e) { 
      if (e.key === 'Escape') { 
        closeAllPopups()
      } 
    }
      if (isOpen) {
        document.addEventListener('keydown', closePopupEsc)
        return () => {
          document.removeEventListener('keydown', closePopupEsc) 
        }
    }
  }, [isOpen, closeAllPopups]
  )

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopup(true)
  }

  useEffect(() => {
    if(localStorage.token) {
      getContent(localStorage.token)
      .then(res => {
        setUserEmail(res.email)
        setIsLoggedIn(true)
        setIsCheckToken(false)
        navigate('/')
      })
      .catch((err) => {
        console.log('Ошибка. Войти по токену не получилось: ', err);
      })}
      else {
        setIsLoggedIn(false)
        setIsCheckToken(false)
      }
  
    },[navigate])

  useEffect(() => {
    if (isLoggedIn) {
    setIsLoadingCards(true)
    Promise.all([api.getUserInfo(localStorage.token), api.getInitialCards(localStorage.token)])
    .then(([dataUserInfo, dataInitialCards]) => {
      setCurrentUser(dataUserInfo)
      setCards(dataInitialCards.reverse())
      setIsLoadingCards(false)
    })
    .catch((err) => {
      console.log('Ошибка. Начальные данные не созданы: ', err);
    });
  }
  }, [isLoggedIn])
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item === currentUser._id);
    if (isLiked) {
      api.minusLike(card._id, localStorage.token)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      }) 
      .catch((err) => {
        console.log('Ошибка. Удалить лайк не получилось: ', err);
      });
    } else {
      api.plusLike(card._id, localStorage.token)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => {
        console.log('Ошибка. Поставить лайк не получилось: ', err);
      });
    }
  }

  function handleCardDelete(evt) {
    evt.preventDefault()
    setIsSending(true)
    api.deleteCard(deleteIdCard, localStorage.token)    
    .then(() => {
    
    setCards(cards.filter(item => {
      return item._id !== deleteIdCard
    }))
    closeAllPopups()
    })
    .catch((err) => {
      console.log('Ошибка. Удалить карточку не получилось: ', err);
    })
    .finally(() => setIsSending(false))
  }

  function handleUpdateUser(dataUser, resetForm) {
    setIsSending(true)
    api.setUserInfo(dataUser, localStorage.token)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        resetForm()
       })
      .catch((err) => {
        console.log('Ошибка. Обновить данные пользователя на сервере не получилось: ', err);
      })
      .finally(() => setIsSending(false))
  }

  function handleUpdateAvatar(dataUser, resetForm) {
    setIsSending(true)
    api.setUpdateAvatar(dataUser, localStorage.token)
    .then(res => {
      setCurrentUser(res)
      closeAllPopups()
      resetForm({linkupdateAvatar: ''})
    })
    .catch((err) => {
      console.log('Ошибка. Обновить аватар пользователя на сервере не получилось: ', err);
    })
    .finally(() => setIsSending(false))
  }

  function handleAddPlaceSubmit(dataInitialCards, resetForm) {
    setIsSending(true)
    api.createCard(dataInitialCards, localStorage.token, resetForm)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups()
        resetForm({title: '', link: ''})
      })
      .catch((err) => {
        console.log('Ошибка. Добавить карточку не получилось: ', err);
      })
      .finally(() => setIsSending(false))
  }

  function handleRegister(password, email, resetForm) {
    setIsSending(true)
    register(password, email)
    .then(() => {
      setIsReultPopupOpen(true)
      setIsSucessful(true)
      resetForm({ password: '', email: '' })
      navigate('/sign-in')
    })
    .catch((err) => {
      setIsReultPopupOpen(true)
      setIsSucessful(false)
      console.log('Ошибка. Зарегистрировать пользователя на сервере не получилось: ', err);
    })
    .finally(() => setIsSending(false))
  }
  
  function handleLogin(password, email, resetForm) {
    setIsSending(true)
    autorize(password, email)
    .then(res => {
      localStorage.setItem('token', res.token)
      setIsLoggedIn(true)
      resetForm({ password: '', email: '' })
      window.scrollTo(0, 0)
      navigate('/')
    })
    .catch((err) => {
      setIsReultPopupOpen(true)
      setIsSucessful(false)
      console.log('Ошибка. Войти не получилось: ', err);
    })
    .finally(() => 
    setIsSending(false))
  }
    
  return (
    <CurrentUserContext.Provider value = {currentUser}>
  
      <Routes>
        <Route path='/' element={
          <ProtectedRoute 
            isLoggedIn={isLoggedIn}
            element={
              <div className="page">
        
              <Header
                nameHeader='free'
                userEmail={userEmail}
              />
        
              <Main
                name='MainFree'
                onEditProfile = {handleEditProfileClick}
                onAddPlace = {handleAddPlaceClick}
                onEditAvatar = {handleEditAvatarClick}
                onCardClick = {handleCardClick}
                onDeleteClick = {handlePopapDeleteClick}
                cards = {cards}
                onCardLike = {handleCardLike}
                isLoading = {isLoadingCards}
              />
              <Footer/>
  
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                isSending={isSending}
              />
  
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                isSending={isSending}
              />
        
              <PopupWithForm 
                name='confirmDeletion' 
                title='Вы уверены ?' 
                nameButton='Да'
                isOpen={isDeletePopupOpen}
                onClose={closeAllPopups}
                onSubmit={handleCardDelete}
                isSending={isSending}
              />
  
              <EditAvatarPopup
               isOpen={isEditAvatarPopupOpen}
               onClose={closeAllPopups}
               onUpdateAvatar={handleUpdateAvatar}
               isSending={isSending}
              />
  
              <ImagePopup
                card={selectedCard}
                isOpen={isImagePopup}
                onClose={closeAllPopups}
              />
              </div>
            }
          />
        } />
      
        <Route path='/sign-up' element={
          <div className="page">
     /* Отображение компонента для регистрации */
            <Header
              nameHeader='signUp'
              userEmail={userEmail}
            />
            <Main
              name='MainSignUp'
              handleRegister={handleRegister}
              isSending={isSending}
            />   
          
            <InfoTooltip
              isSucessful={isSucessful}
              name='infoTooltip' 
              isOpen={isReultPopupOpen}
              onClose={closeAllPopups}
            />
          </div>
        } />

        <Route path='sign-in' element={
          <div className="page">
     /* Отображение компонента для авторизации */
            <Header
              nameHeader='signIn'
              userEmail={userEmail}
            />
            <Main
              name='MainSignIn'
              handleLogin={handleLogin}
              isSending={isSending}
            />   
          
            <InfoTooltip
              isSucessful={isSucessful}
              name='infoTooltip' 
              isOpen={isReultPopupOpen}
              onClose={closeAllPopups}
            />
          </div>
        } />

        <Route path="*" element={<Navigate to='/' />} />
  
      </Routes>
    </CurrentUserContext.Provider>
  );
}
  
  export default App;
  
