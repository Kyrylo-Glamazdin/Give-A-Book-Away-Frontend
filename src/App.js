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
import {postBook, addUser} from './Actions';
import SelectedBookPage from "./Components/SelectedBookPage";


class App extends Component {

  componentDidMount() {
    // this.fetchUsers();
    // this.fetchBooks();
  }

  // fetchUsers = async () => {
  //   axios.get("http://localhost:3500/api/user/")
  //   .then(response => {
  //     for (let i = 0; i < response.data.length; i++) {
  //       this.props.addUser(response.data[i]);
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }

  // fetchBooks = async () => {
  //   let req = {
  //     id: this.props.currentUser.id,
  //     zipcode: this.props.currentUser.zipcode 
  //   }
  //   axios.post("http://localhost:3500/api/book/recommended", req)
  //   .then(response => {
  //     for (let i = 0; i < response.data.length; i++) {
  //       this.props.postBook(response.data[i]);
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }

  

  render() {
    const NavbarComponent = () => <Navbar />;
    const SignInComponent = () => <SignIn />;
    const SignUpComponent = () => <SignUp />;
    const BookListComponent = () => <BookList />;
    const PostComponent = () => <Post />;
    const ProfileComponent = () => <Profile />;
    const SelectedBookPageComponent = () => <SelectedBookPage />;
    return (
      <div>
        <Router>
          <NavbarComponent />
          <Switch>
            <Route exact path="/" component={SignInComponent} />
            <Route path="/home" component={BookListComponent} />
            <Route path="/signin" component={SignInComponent} />
            <Route path="/signup" component={SignUpComponent} />
            <Route path="/post" component={PostComponent} />
            <Route path="/inbox" component={SelectedBookPageComponent} />
            <Route path="/profile" component={ProfileComponent} />
            {this.props.books.map(book => {
              return (
                <Route path={"/book/" + book.id} 
                  render={() => {
                    return <SelectedBookPage key={"bookinlist"+book.id} book={book}/>
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
    users: state.users,
    books: state.books,
    currentUser: state.currentUser
  }
}

export default connect (mapStateToProps, {
  postBook,
  addUser
})(App);
