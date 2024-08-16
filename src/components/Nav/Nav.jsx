import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon } from '@mui/material';
import { Home, AddCircle, ListAlt, ExitToApp } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { styled } from '@mui/system';
import LogOutButton from '../LogOutButton/LogOutButton';

const colors = {
  background: '#FAF9F6',
  accent: '#6B4F4F',
  text: '#4A4A4A',
  hoverBackground: '#EDEDED',
};

const NavContainer = styled(Box)({
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  width: '250px',
  backgroundColor: colors.background,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '40px 20px',
  borderRadius: '0 0 50px 0',
  boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
  zIndex: 2,
  overflow: 'hidden',
});

const NavHeader = styled(Box)({
  textAlign: 'center',
  marginBottom: '40px',
});

const LogoImage = styled('img')({
  width: '150px',
  height: 'auto',
  borderRadius: '15px',
});

const NavLinkList = styled(List)({
  padding: 0,
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '30px',
});

const StyledListItem = styled(ListItem)({
  padding: '10px 20px',
  paddingLeft: '17px',
  '&:hover': {
    backgroundColor: colors.hoverBackground,
  },
});

const StyledListItemText = styled('span')({
  color: colors.text,
  fontWeight: 'bold',
  fontSize: '17px',
  marginLeft: '1px',
});

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <NavContainer>
      <NavHeader>
        <LogoImage src="/images/logo.png" alt="Stock Easy Logo" />
      </NavHeader>
      <NavLinkList>
        {user.id && (
          <>
            <StyledListItem button component={Link} to="/dashboard">
              <ListItemIcon>
                <Home sx={{ color: colors.accent }} />
              </ListItemIcon>
              <StyledListItemText>DASHBOARD</StyledListItemText>
            </StyledListItem>
            <StyledListItem button component={Link} to="/add-item">
              <ListItemIcon>
                <AddCircle sx={{ color: colors.accent }} />
              </ListItemIcon>
              <StyledListItemText>ADD ITEM</StyledListItemText>
            </StyledListItem>
            <StyledListItem button component={Link} to="/item-list">
              <ListItemIcon>
                <ListAlt sx={{ color: colors.accent }} />
              </ListItemIcon>
              <StyledListItemText>ITEM LIST</StyledListItemText>
            </StyledListItem>
            <StyledListItem>
              <LogOutButton />
            </StyledListItem>
          </>
        )}
      </NavLinkList>
    </NavContainer>
  );
}

export default Nav;
