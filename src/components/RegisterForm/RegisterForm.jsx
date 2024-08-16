import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'REGISTER',
        payload: { username, password },
      });
    } else {
      dispatch({ type: 'REGISTER_INPUT_ERROR' });
    }
  };

  const goToLogin = () => {
    history.push('/login');
  };

  return (
    <Box component="form" onSubmit={registerUser} noValidate sx={{ mt: 1 }}>
      <Typography component="h2" variant="h6">
        Register User
      </Typography>
      {errors.registrationMessage && (
        <Typography color="error" variant="body2">
          {errors.registrationMessage}
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
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={goToLogin}
          sx={{ mt: 3, mb: 2 }}
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterForm;
