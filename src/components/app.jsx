import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import LoginPage from './loginPage.jsx';
import NoMatch from './noMatch.jsx';
import HomePage from './homePage.jsx';
import authContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userToken');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/login">Log in</Nav.Link>
        </Nav>
      </Navbar>

      <div className="container p-3">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            )}
          />
          <Route element={<NoMatch />} />
        </Routes>
      </div>

    </Router>
  </AuthProvider>
);

export default App;
