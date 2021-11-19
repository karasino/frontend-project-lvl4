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
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/login">Sign in</Link>
					</li>
				</ul>
			</nav>
			<Switch>
				<Route path="/login">
          <Login />
        </Route>
				<Route path="/">
          <Home />
        </Route>
			</Switch>
    </div>
  </Router>
);
