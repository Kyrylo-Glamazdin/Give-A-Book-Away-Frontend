import React, { Component } from "react";
import { connect } from "react-redux";
import { addUserBook, clearUserBooks } from "../Actions";
import {Redirect} from 'react-router';
import OtherBookItem from "./OtherBookItem";
import axios from "axios";
import "../Styles/BookList.css";

class OtherUser extends Component {
  fetchUserBooks = async () => {
    this.props.clearUserBooks();
    let requestObj = {
      currentUserZipcode: this.props.currentUser.zipcode,
      otherUserZipcode: this.props.bookOwner.zipcode,
      userId: this.props.bookOwner.id,
    };
    axios.post(`https://books-away.herokuapp.com/api/book/userbooks`, requestObj)
      .then((response) => {
        const userbooks = response.data;
        for(let i = 0; i < userbooks.length; i++) {
          this.props.addUserBook(userbooks[i])
        }
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    if (!this.props.currentUser.id) {
      return;
    }
    window.scrollTo({
      top: 0, behavior: "smooth"
    })
    this.fetchUserBooks();
  }

  render() {
    if (!this.props.currentUser.id) {
      return(
          <Redirect to = "/"/>
      )
    }
    return (
      <div>
        <div className="other-users-profile-title">
          {this.props.bookOwner.username}
        </div>
        {this.props.userBooks.length > 0 && this.props.userBooks[0].city && this.props.userBooks[0].state && this.props.userBooks[0].user.zipcode ? 
          <div className="other-users-profile-location">
            Location: {this.props.userBooks[0].city}, {this.props.userBooks[0].state} ({this.props.userBooks[0].user.zipcode})
          </div>
        :
          <div/>
        }
        <div className="other-users-books-title">
          Books
        </div>
        <div className="other-users-book-list">
          {this.props.userBooks.map((item, key) => {
            item.owner = this.props.bookOwner.username;
            return (
              <div key={key} className="other-users-book-item">
                <OtherBookItem book={item} />
              </div>
            );
          })}
        </div>
     </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    userBooks: state.userBooks
  };
};

export default connect(mapStateToProps, {
  addUserBook,
  clearUserBooks
})(OtherUser);
