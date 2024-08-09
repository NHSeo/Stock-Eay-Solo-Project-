import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/dashboard">
        <h2 className="nav-title">STOCK EASY</h2>
      </Link>
      <div>
        {user.id && (
          <>
            <Link className="navLink" to="/dashboard">
              Dashboard
            </Link>

            <Link className="navLink" to="/add-items">
              Add Item
            </Link>

            <Link className="navLink" to="/item-list">
              Item List
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
