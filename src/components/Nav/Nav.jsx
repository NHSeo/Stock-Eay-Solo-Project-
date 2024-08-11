import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <h2 className="nav-title">STOCK EASY</h2>
      <div className="nav-links">
        {user.id && (
          <>
            <Link className="navLink" to="/dashboard">
              Dashboard
            </Link>
            <Link className="navLink" to="/add-items">
              Add Items
            </Link>
            <Link className="navLink" to="/item-list">
              Item List
            </Link>
            <LogOutButton className="navLink logout" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
