import React, { Component } from "react";
import MyBooks from './mybooks'
import {connect} from 'react-redux';
import {setUser, postBook, clearBooksTemporary} from '../Actions'
import {Link} from 'react-router-dom';

class Profile extends Component {

  logout = () => {
    this.props.clearBooksTemporary();
    this.props.setUser({})
  }

  render() {
      return (
        <div>
          <h1>Books You Are Giving Away</h1>
          <div>
          <Link to="/">
            <button onClick={this.logout}>
              Log Out
            </button>
          </Link>
          </div>
          <div>
            <MyBooks/>
          </div>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        books: state.books,
        users: state.users
    };
}

export default connect(mapStateToProps, {
  setUser, 
  postBook, 
  clearBooksTemporary
})(Profile);