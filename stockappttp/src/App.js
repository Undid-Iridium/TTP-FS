import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import SignIn from "./components/SignIn.component";
import Portfolio from "./components/Portfolio.component";
import home from "./components/home.component";
import Account from "./components/CreateAccount.component";

import logo from "./logo.png";

class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isAuthenticated: false
      };
    }

    userHasAuthenticated = authenticated => {
      this.setState({ isAuthenticated: authenticated });
    }
  render() {
    
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          
            <Link to="/" className="navbar-brand">Home</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/login" className="nav-link">Sign in</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create"className="nav-link">Create Account</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/login" exact component={SignIn} />
          <Route path="/create" exact component={Account} />
          <Route path="/edit/:id" component={Portfolio} />
          <Route path="/" exact component={home} />
        </div>
      </Router>
    );
  }
}

export default App;
