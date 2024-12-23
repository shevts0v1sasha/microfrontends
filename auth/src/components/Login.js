import React from 'react';

import '../blocks/login/login.css';
import '../blocks/auth-form/auth-form.css';
import * as auth from "../utils/auth.js";

function Login () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e){
    e.preventDefault();
    const userData = {
      email,
      password
    }
    onLogin(userData);
  }

  function onLogin({ email, password }) {
    auth
      .login(email, password)
      .then((res) => {
        setEmail(email);

        // history.push("/");
        dispatchEvent(new CustomEvent('login', {
          detail: {
            token: res.token,
            email
          }
        }));
      })
      .catch((err) => {
        // setTooltipStatus("fail");
        // setIsInfoToolTipOpen(true);
      });
  }

  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Вход</h3>
          <label className="auth-form__input">
            <input type="text" name="name" id="email"
              className="auth-form__textfield" placeholder="Email"
              onChange={e => setEmail(e.target.value)} required  />
          </label>
          <label className="auth-form__input">
            <input type="password" name="password" id="password"
              className="auth-form__textfield" placeholder="Пароль"
              onChange={e => setPassword(e.target.value)} required  />
          </label>
        </div>
        <button className="auth-form__button" type="submit">Войти</button>
      </form>
    </div>
  )
}

export default Login;
