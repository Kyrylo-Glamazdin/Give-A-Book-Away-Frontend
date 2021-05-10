import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/EditBook.css";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { setChat, initiateRedirect, cancelRedirect } from "../Actions";

class SelectedBookPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullLocation: "",
    };
  }

  componentDidMount() {
    if (!this.props.currentUser.id) {
      return;
    }
    this.props.cancelRedirect();
    if (
      this.props.book.city &&
      this.props.book.state &&
      this.props.book.zipcode
    ) {
      let fullLocation =
        this.props.book.city +
        " " +
        this.props.book.state +
        " (" +
        this.props.book.zipcode +
        ")";
      this.setState({ fullLocation });
    }
  }

  findChat = (otherUserId) => {
    this.props.setChat(otherUserId);
    this.props.initiateRedirect();
  };

  render() {
    if (!this.props.currentUser.id) {
      return <Redirect to="/" />;
    } else if (this.props.redirect) {
      return <Redirect to="/inbox" />;
    }
    return (
      <div className="a-book">
        <div>
          <div className="selected-book-image-div">
            <img src={this.props.book.preview_image} className="selected-book-image" alt="" />
          </div>
          <div className="book-title">
            {this.props.book.title}
          </div>

          <div className="author-name">
            <div className="book-details-title">Author:</div> {this.props.book.author}
          </div>

          <div className="isbn">
            <div className="book-details-title">ISBN:</div> {this.props.book.isbn}
          </div>

          <div className="location">
            <div className="book-details-title">Location:</div> {this.state.fullLocation}
          </div>
          <div className="location">
            <div className="book-details-title">Condition:</div> {this.props.book.condition}
          </div>
          {this.props.book.description && this.props.book.description.length > 0 ?
            <div className="location">
              <div className="book-details-title">Owner's Description:</div> {this.props.book.description}
            </div>
            :
            <div/>
          }
          <div className="userinfo">
            <div className="book-details-title-user">
              Posted by:
            </div>
              <Link to={"/otheruser/" + this.props.book.userId} className="book-owner-username">
                {this.props.book.username}
              </Link>
          </div>
        </div>
          <button
            type="button"
            className="button10"
            onClick={() => this.findChat(this.props.book.userOwnerId)}
          >
            Contact owner
          </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    chats: state.chats,
    redirect: state.redirect,
  };
};

export default connect(mapStateToProps, {
  setChat,
  initiateRedirect,
  cancelRedirect,
})(SelectedBookPage);
