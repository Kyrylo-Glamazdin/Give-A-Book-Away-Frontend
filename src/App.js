import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Post from "./Components/Post";
import Navbar from "./Components/Navbar.js";
import Searchbar from "./Components/Searchbar.js";
import BookList from "./Components/BookList.js";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Components/login/SignUp";
import Profile from "./Components/ProfilePage.js";

import SelectedBookPage from "./Components/SelectedBookPage";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const NavbarComponent = () => <Navbar />;
    const BookListComponent = () => <BookList />;
    const PostComponent = () => <Post />;
    const SignUpComponent = () => <SignUp />;
    const ProfileComponent = () => <Profile />;
    const SelectedBookPageComponent = () => <SelectedBookPage />;
    return (
      <div>
        <Router>
          <NavbarComponent />
          <Switch>
            <Route exact path="/" component={BookListComponent} />
            <Route exact path="/post" component={PostComponent} />
            <Route exact path="/signup" component={SignUpComponent} />
            <Route exact path="/inbox" component={SelectedBookPageComponent} />
            <Route exact path="/profile" component={ProfileComponent} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
