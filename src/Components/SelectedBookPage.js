import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/SelectedBook.css";
import { connect } from 'react-redux';
import {Redirect} from 'react-router';

class SelectedBookPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullLocation: "",
    };
  }

  componentDidMount() {
    let fullLocation =
      this.props.book.city +
      " " +
      this.props.book.state +
      " (" +
      this.props.book.zipcode +
      ")";
    this.setState({ fullLocation });
    console.log(this.props.book);
  }

  render() {
    if (!this.props.currentUser.id) {
      return (
          <Redirect to="/"/>
      )
    }
    return (
      <div className="a-book">
        <div className="book-title">
          <h1>{this.props.book.title}</h1>
          <img src={this.props.book.preview_image} alt="" />
        </div>

        <div className="author-name">
          <h5 className="authname">
            Author: <strong>{this.props.book.author}</strong>
          </h5>
        </div>

        <div className="isbn">
          <h5 className="isbn-num">ISBN: {this.props.book.isbn}</h5>
        </div>

        <div className="location">
          <h5 className="distance">Location: {this.state.fullLocation}</h5>
        </div>

        <div className="description">
          <h5 className="desc">Posted by: {this.props.book.user}</h5>
        </div>

        <button type="button" class="button10">
          Contact owner
        </button>

        {/* Uncomment after presentation */}
        {/* <div className="description">
          <h5 className="desc">
          Description:
          </h5>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, {
})(SelectedBookPage);
