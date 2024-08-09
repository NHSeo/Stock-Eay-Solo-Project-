import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: { username, password },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  };


  useEffect(() => {
    if (user.id) {
      history.push('/dashboard');
    }
  }, [user, history]);

  const goToRegister = () => {
    history.push('/registration');
  };

  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input
          className="btn"
          type="submit"
          name="submit"
          value="Log In"
        />
        <input
          className="btn"
          type="button"
          value="Register"
          onClick={goToRegister}
        />
      </div>
    </form>
  );
}

export default LoginForm;
