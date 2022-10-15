import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import auth from '../utils/Auth';
import api from '../utils/Api';

import HomePage from './HomePage';
import Register from './AuthForms/Register';
import Login from './AuthForms/Login';

import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function App() {
  const [tokenIsPresent, setTokenState] = useState(localStorage.getItem('tokenIsPresent'));
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    tokenIsPresent && api.getUserInfo()
      .then(({ data }) => setCurrentUser(data))
      .catch(err => console.log(err));
    tokenIsPresent && api.getCards()
      .then(({ data }) => setCards(data))
      .catch(err => console.log(err));
  }, [tokenIsPresent])

  function handleSignIn() {
    localStorage.setItem('tokenIsPresent', true);
    setTokenState(true);
  }

  function handleSignOut() {
    localStorage.setItem('tokenIsPresent', false);
    setTokenState(false);
  }

  function handleLoginSubmit(loadingFunc, popupState, requestState, inputs) {
    loadingFunc(true);
    auth.login(inputs.email.value, inputs.password.value)
      .then(({ data }) => {
        handleSignIn();
        requestState(true);
      })
      .catch((err) => {
        console.log(err);
        requestState(false);
        popupState(true);
      })
      .finally(() => loadingFunc(false));
  }

  function handleRegisterSubmit(loadingFunc, popupState, requestState, inputs) {
    loadingFunc(true);
    auth.register(inputs.email.value, inputs.password.value)
      .then(() => requestState(true))
      .catch((err) => {
        console.log(err);
        requestState(false);
      })
      .finally(() => {
        loadingFunc(false);
        popupState(true);
      });
  }

  function handleCardLike(card, loadingFunc) {
    const likedByUser = card.likes.some(userId => userId === currentUser._id );

    const request = !likedByUser ? api.putCardLike(card._id) : api.removeCardLike(card._id);

    loadingFunc(true);
    request
      .then(({ data }) => {
        setCards(cards.map((cardItem) => data._id === cardItem._id ? data : cardItem));
      })
      .catch(err => console.log(err))
      .finally(() => loadingFunc(false));
  }

  function handleCardRemove(card, loadingFunc, closePopups) {
    loadingFunc(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((cardItem) => cardItem._id !== card._id && cardItem ));
        closePopups();
      })
      .catch(err => console.log(err))
      .finally(() => loadingFunc(false));
  }

  function handleAddPlace(name, link, loadingFunc, closePopups) {
    loadingFunc(true);
    api.postSectionItem(name, link)
      .then(({ data }) => {
        setCards([data, ...cards]);
        closePopups();
      })
      .catch(err => console.log(err))
      .finally(() => loadingFunc(false));
  }

  function handleEditProfile(name, about, loadingFunc, closePopups) {
    loadingFunc(true);
    api.patchUserInfo(name, about)
      .then(({ data }) => {
        setCurrentUser(data);
        closePopups();
      })
      .catch(err => console.log(err))
      .finally(() => loadingFunc(false));
  }

  function handleEditAvatar(link, loadingFunc, closePopups) {
    loadingFunc(true);
    api.patchUserAvatar(link)
      .then(({ data }) => {
        setCurrentUser(data);
        closePopups();
      })
      .catch(err => console.log(err))
      .finally(() => loadingFunc(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Router>
        <Switch>
          <ProtectedRoute
            tokenIsPresent={tokenIsPresent}
            onSignOut={handleSignOut}
            component={HomePage}
            exact
            path='/'
            cards={cards}
            onCardLike={handleCardLike}
            onCardRemove={handleCardRemove}
            onAddPlace={handleAddPlace}
            onEditProfile={handleEditProfile}
            onEditAvatar={handleEditAvatar}
          />
          <Route path='/sign-up'>
            <Register onSubmit={handleRegisterSubmit} />
          </Route>
          <Route path='/sign-in'>
            <Login onSubmit={handleLoginSubmit} />
          </Route>
        </Switch>
      </Router>
    </CurrentUserContext.Provider>
  );
}

