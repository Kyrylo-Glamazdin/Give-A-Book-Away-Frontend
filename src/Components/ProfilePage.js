import React, { Component } from "react";
import MyBooks from "./mybooks";
import { connect } from "react-redux";
import {setUser, clearUsers, clearBooksTemporary, clearBookOwner, clearPostedBooks, clearChats, clearUserBooks, clearSimilarBooks} from "../Actions";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

// Profile page that displays all books posted by the logged in user. Also shows a log out button
class Profile extends Component {
  //clear app state entirely when logging out
  logout = () => {
    this.props.clearBooksTemporary();
    this.props.clearBookOwner();
    this.props.clearPostedBooks();
    this.props.clearUserBooks();
    this.props.clearUsers();
    this.props.clearChats();
    this.props.clearSimilarBooks();
    this.props.setUser({});
  };

  //show all books listed for a giveaway
  render() {
    if (!this.props.currentUser.id) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1 className="profile-title">Books You Are Giving Away </h1>
        <div>
          <div className="log-out">
            <Link to="/">
              <button type="button" className="button20" onClick={this.logout}>
                Log Out
              </button>
            </Link>
          </div>
        </div>
        <div>
          <MyBooks />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    books: state.books,
    users: state.users,
  };
};

export default connect(mapStateToProps, {
  setUser,
  clearUsers,
  clearPostedBooks,
  clearBooksTemporary,
  clearBookOwner,
  clearChats,
  clearUserBooks,
  clearSimilarBooks
})(Profile);
