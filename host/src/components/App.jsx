import React, { lazy, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Route, useHistory, Switch, BrowserRouter, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

import "../index.css";

const Login = lazy(() => import('auth/Login').catch(() => {
  return { default: () => <div>Couldn't load Login</div>}
}));
const HeaderLogout = lazy(() => import('auth/HeaderLogout').catch(() => {
  return { default: () => <div>Couldn't load HeaderLogout</div>}
}));



const App = () => {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
  React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  React.useEffect(() => {
      api.getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData.data);
        setCards(cardData.data);
      })
      .catch((err) => {
        if (!window.location.href.endsWith('/singin')) {
          console.log(window.location.href);

        }
  });
  }, [isLoggedIn]);

  const handleLogin = event => {
   setIsLoggedIn(true);
   console.log(event);
   
   console.log(event.token);
   setEmail(event.email);
   window.location.href = '/';
  }

  const handleLogout = event => {
    setIsLoggedIn(false);
    window.location.href = '/signin';
  }

  useEffect(() => {
    addEventListener('login', handleLogin);
    addEventListener('logout', handleLogout);
    return () => {
      removeEventListener('login', handleLogin);
      removeEventListener('logout', handleLogout);
    }
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    // setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    // setSelectedCard(card);
  }
  function handleCardLike(card) {
    // const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // api
    //   .changeLikeCardStatus(card._id, !isLiked)
    //   .then((newCard) => {
    //     setCards((cards) =>
    //       cards.map((c) => (c._id === card._id ? newCard : c))
    //     );
    //   })
    //   .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    // api
    //   .removeCard(card._id)
    //   .then(() => {
    //     setCards((cards) => cards.filter((c) => c._id !== card._id));
    //   })
    //   .catch((err) => console.log(err));
  }

  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    // sessionStorage.removeItem("jwt");
    // setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    // history.push("/signin");
  }

  return (
  //   <div className="page__content">
  //     <Login />
  // </div>
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page__content">
    <Header email={email} HeaderLogout={<HeaderLogout email={currentUser.email}/>} onSignOut={onSignOut} />
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main />}>
          </Route>
          <Route path="/signin" element={<Login />}>
          </Route>
      </Routes>
      <Footer />
    </BrowserRouter>

    </div>
  </CurrentUserContext.Provider>
  );

}

export default App;
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
);