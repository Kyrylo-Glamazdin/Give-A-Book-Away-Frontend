import React, { Component } from "react";
import MyBooks from "./mybooks";
import { connect } from "react-redux";
import {
  setUser,
  clearUsers,
  clearBooksTemporary,
  clearBookOwner,
  clearPostedBooks,
  clearChats,
  clearUserBooks
} from "../Actions";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

class Profile extends Component {
  logout = () => {
    this.props.clearBooksTemporary();
    this.props.clearBookOwner();
    this.props.clearPostedBooks();
    this.props.clearUserBooks();
    this.props.clearUsers();
    this.props.clearChats();
    this.props.setUser({});
  };

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
              <button type="button" class="button20" onClick={this.logout}>
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
  clearUserBooks
})(Profile);
