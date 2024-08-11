import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';


import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import DashboardPage from '../DashboardPage/DashboardPage';
import AddItemsPage from '../AddItemsPage/AddItemsPage';
import ItemListPage from '../ItemListPage/ItemListPage';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div className="app-container">
        {user.id && <Nav />}
        <main className="main-content">
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route exact path="/login">
              {user.id ? <Redirect to="/dashboard" /> : <LoginPage />}
            </Route>
            <Route exact path="/registration">
              {user.id ? <Redirect to="/dashboard" /> : <RegisterPage />}
            </Route>
            <ProtectedRoute exact path="/dashboard">
              <DashboardPage />
            </ProtectedRoute>
            <ProtectedRoute exact path="/add-items">
              <AddItemsPage />
            </ProtectedRoute>
            <ProtectedRoute exact path="/item-list">
              <ItemListPage />
            </ProtectedRoute>
            <Redirect from="*" to="/login" />
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;
