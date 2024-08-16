import React from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/system';
import { ExitToApp } from '@mui/icons-material';

const colors = {
    buttonBackground: '#6B4F4F',
    buttonHover: '#B2958F',
    textColor: '#FFFFFF',
};

const StyledLogOutButton = styled('button')({
    borderRadius: '20px',
    padding: '10px 20px',
    width: '200px',
    backgroundColor: colors.buttonBackground,
    color: colors.textColor,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: colors.buttonHover,
    },
});

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <StyledLogOutButton
      className={props.className}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      <ExitToApp sx={{ color: colors.textColor }} />
      LOG OUT
    </StyledLogOutButton>
  );
}

export default LogOutButton;
