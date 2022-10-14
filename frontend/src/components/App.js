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
  const authToken = localStorage.getItem('token');
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    authToken && auth.checkToken(authToken)
      .then(res => setCurrentUserEmail(res.data.email))
      .catch(err => console.log(err));
    api.getUserInfo()
      .then(({ data }) => setCurrentUser(data))
      .catch(err => console.log(err));
    api.getCohortCards()
      .then(({ data }) => setCards(data))
      .catch(err => console.log(err));
  }, [authToken])

  function handleSignIn(token) {
    localStorage.setItem('token', token);
  }

  function handleSignOut() {
    localStorage.removeItem('token');
  }

  function handleLoginSubmit(loadingFunc, popupState, requestState, inputs) {
    loadingFunc(true);
    auth.login(inputs.email.value, inputs.password.value)
      .then(({ data }) => {
        handleSignIn(data);
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
            authToken={authToken}
            onSignOut={handleSignOut}
            component={HomePage}
            exact
            path='/'
            currentUserEmail={currentUserEmail}
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

