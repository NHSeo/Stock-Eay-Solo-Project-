import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
    <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
      <Typography component="h2" variant="h6" color="primary">
        LOGIN
      </Typography>
      {errors.loginMessage && (
        <Typography color="error" variant="body2">
          {errors.loginMessage}
        </Typography>
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
          '& label.Mui-focused': {
            color: 'primary.main',
          },
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
          '& label.Mui-focused': {
            color: 'primary.main',
          },
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Log In
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={goToRegister}
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}

export default LoginForm;
