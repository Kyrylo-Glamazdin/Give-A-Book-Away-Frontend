import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route  } from "react-router-dom";
import Post from "./Components/Post";
import Navbar from "./Components/Navbar.js";
// import Searchbar from "./Components/Searchbar.js";
import BookList from "./Components/BookList.js";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./Components/login/SignIn";
import SignUp from "./Components/login/SignUp";
import Profile from "./Components/ProfilePage.js";
import {connect} from 'react-redux';
import axios from 'axios';
import SelectedBookPage from "./Components/SelectedBookPage";
import './Styles/design.css'
import {addMessageToConversation} from './Actions';
import Inbox from "./Components/Inbox";
import socket from './socket.js';

class App extends Component {
  render() {
    const NavbarComponent = () => <Navbar />;
    const SignInComponent = () => <SignIn />;
    const SignUpComponent = () => <SignUp />;
    const BookListComponent = () => <BookList />;
    const PostComponent = () => <Post />;
    const ProfileComponent = () => <Profile />;
    const InboxComponent = () => <Inbox 
    />
    return (
        <div className = "design">
          <Router>
            <NavbarComponent />
            <Switch>
              <Route exact path="/" component={SignInComponent} />
              <Route path="/home" component={BookListComponent} />
              <Route path="/signin" component={SignInComponent} />
              <Route path="/signup" component={SignUpComponent} />
              <Route path="/post" component={PostComponent} />
              <Route path="/profile" component={ProfileComponent} />
              <Route path="/inbox" component={InboxComponent} />
              {this.props.books.map(book => {
                return (
                  <Route path={"/book/" + book.id} 
                    render={() => {
                      return <SelectedBookPage key={"listedbook"+book.id} book={book}/>
                    }}
                  />
                )
              })}
            </Switch>
          </Router>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      books: state.books,
      currentUser: state.currentUser,
      users: state.users,
      currentChat: state.currentChat
  }
}

export default connect (mapStateToProps, {
  addMessageToConversation
})(App);
