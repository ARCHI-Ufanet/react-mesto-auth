import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute'
import {api} from '../../src/utils/Api';
import { apiAuth } from '../utils/ApiAuth';
import PopupEditProfile from './PopupEditProfile'
import PopupAddPlace from './PopupAddPlace'
import PopupEditAvatar from './PopupEditAvatar';
import PopupWithConfirm from './PopupWithConfirm';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Header from './Header.js';
import Register from './Register';
import Login from './Login';
import Main from './Main.js';
import Footer from './Footer'

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [headerUserEmail, setHeaderUserEmail] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegStatusOk, setIsRegStatusOk] = useState(false);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen

  function handleInfoTooltip() {setIsInfoTooltipOpen(true)};
  function handleEditProfileClick() {setIsEditProfilePopupOpen(true)};
  function handleAddPlaceClick() {setIsAddPlacePopupOpen(true)};
  function handleEditAvatarClick() {setIsEditAvatarPopupOpen(true)};
  function handleConfirm() {setIsConfirmPopupOpen(true)};
  function handleCardClick(card) {setSelectedCard(card); setIsImagePopupOpen(true)};
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }
  useEffect(() => {
    const me = api.getUserInfo();
    const cards = api.getInitialCards();
    Promise.all([me, cards])
        .then(([me, cards]) => {
          setCurrentUser(me);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        }); 
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      apiAuth.checkToken(jwt)
        .then((data) => {
          if(data) {
            setHeaderUserEmail(data.data.email);
            setLoggedIn(true);
            navigate('/', {replace: true});
          }
        })
        .catch(err => console.log(err));
    }
  }, []);

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.likeCard(card._id, !isLiked)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.unlikeCard(card._id, isLiked)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function handleCardDel(card) {
      api.delCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter(c => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateUser(data) {
    api.patchUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateAvatar(avatar) {
    api.patchUserAvatar(avatar)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  };

  function handleAddPlace(data) {
    api.postCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  };

  function handleRegister(email, password) {
    apiAuth.register(email, password)
    .then(() => {
      setIsRegStatusOk(true);
      handleInfoTooltip();
    })
    .then(() => {
        navigate('/sign-in', {replace: true});
    })
    .catch((err) => {
      setIsRegStatusOk(false);
      handleInfoTooltip();
      console.log(err)})
  }

  function handleLogin(email, password) { 
    apiAuth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setHeaderUserEmail(email);
          setLoggedIn(true);
          navigate('/', {replace: true});
          localStorage.setItem('jwt', data.token);
        }
      })
      .catch((err) => {
        setIsRegStatusOk(false);
        handleInfoTooltip();
        console.log(err)});
  };
  
  function handleLogout() {
    localStorage.removeItem('jwt');
    setHeaderUserEmail('');
    setLoggedIn(false);
    navigate('/sign-in', {replace: true});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header userInfo={headerUserEmail} loggedIn={loggedIn} logout={handleLogout}/>
        <Routes>
          <Route path="/"
            element={
              <ProtectedRoute
                exact
                loggedIn={loggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDel={handleCardDel}
                cards={cards}
              />
            }
          />  
          <Route path="/sign-up" element={<Register handleRegister={handleRegister} />}/>  
          <Route path="/sign-in" element={<Login handleLogin={handleLogin} />}/>
          <Route element={loggedIn ? <Navigate to="/" replace/> : <Navigate to="/sign-in" replace/>}/>
        </Routes>
        <Footer />
      <PopupEditProfile
        isOpen={isEditProfilePopupOpen}
        onClose = {closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <PopupAddPlace 
        isOpen={isAddPlacePopupOpen}
        onClose = {closeAllPopups}
        onAddPlace={handleAddPlace}
      />

      <PopupEditAvatar
        isOpen={isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <PopupWithConfirm 
        isOpen={isConfirmPopupOpen}
        onClose = {closeAllPopups}
        onConfirm={handleConfirm}
      />

      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose = {closeAllPopups}
        card={selectedCard}
      />

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isRegStatusOk={isRegStatusOk}
      />
    </CurrentUserContext.Provider>
  );
};