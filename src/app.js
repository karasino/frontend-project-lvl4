import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './login.js';

export default () => (
  <Router>
    <div>
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<ul class="navbar-nav">
					<li class="nav-item active">
						<Link to="/" class="nav-link">Home</Link>
					</li>
					<li class="nav-item">
						<Link to="/login" class="nav-link">Sign in</Link>
					</li>
				</ul>
			</nav>
			<Switch>
				<Route path="/login">
          <Login />
        </Route>
				<Route path="/">
          <div>Home page</div>
        </Route>
			</Switch>
    </div>
  </Router>
);
