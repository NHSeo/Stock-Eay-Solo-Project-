import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RegisterForm from '../RegisterForm/RegisterForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6B4F4F',
    },
    secondary: {
      main: '#B2958F',
    },
    background: {
      default: '#FAFAFA',
    },
  },
  typography: {
    fontFamily: `'Josefin Sans', sans-serif`,
  },
});

function RegisterPage() {
  useEffect(() => {
    document.querySelector('.main-content').style.marginLeft = '0';
    
    return () => {
      document.querySelector('.main-content').style.marginLeft = '250px';
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.default',
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary">
            REGISTER
          </Typography>
          <RegisterForm />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegisterPage;
