import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Post from "./Components/Post";
import Navbar from "./Components/Navbar.js";
import Searchbar from "./Components/Searchbar.js";
import BookList from "./Components/BookList.js";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Components/login/SignUp";
import Profile from "./Components/ProfilePage.js";
import {connect} from 'react-redux';
import axios from 'axios';
import {postBook, addUser} from './Actions';

import SelectedBookPage from "./Components/SelectedBookPage";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchUsers();
    this.fetchBooks();
  }

  fetchUsers = async () => {
    axios.get("http://localhost:3500/api/book/")
    .then(response => {
      for (let i = 0; i < response.data.length; i++) {
        this.props.addUser(response.data[i]);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchBooks = async () => {
    axios.get("http://localhost:3500/api/book/")
    .then(response => {
      for (let i = 0; i < response.data.length; i++) {
        this.props.postBook(response.data[i]);
      }
    })
    .catch(err => {
      console.log(err);
    })
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

const mapStateToProps = state => {
  return {
    users: state.users,
    books: state.books
  }
}

export default connect (mapStateToProps, {
  postBook,
  addUser
})(App);
