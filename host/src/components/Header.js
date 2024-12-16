import React, { lazy } from 'react';
import { Route, Link, Routes, BrowserRouter } from 'react-router-dom';
// import logoPath from '../images/logo.svg';

// В корневом компоненте App описаны обработчики: onRegister, onLogin и onSignOut. Эти обработчики переданы в соответствующие компоненты: Register.js, Login.js, Header.js
function Header ({email, HeaderLogout}) {



  return (
    <header className="header page__section">
      <BrowserRouter>
      <Routes>
      {/* <img src={logoPath} alt="Логотип проекта Mesto" className="logo header__logo" /> */}
      <Route exact path="/" element={HeaderLogout}>

      </Route>
      <Route path="/signup" element={<Link className="header__auth-link" to="signin">Войти</Link>}>
      </Route>
      <Route path="/signin" element={<Link className="header__auth-link" to="signup">Регистрация</Link>}>
      </Route>
      </Routes>
      </BrowserRouter>
    </header>
  )
}

export default Header;
