import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./Components/Navbar.js";
import Searchbar from "./Components/Searchbar.js";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const NavbarComponent = () => <Navbar />;
    return (
      <div>
        <Router>
          <Route path="/" render={NavbarComponent} />
          <Switch>{/* more routes here */}</Switch>
        </Router>
        <Searchbar />
      </div>
    );
  }
}

export default App;
