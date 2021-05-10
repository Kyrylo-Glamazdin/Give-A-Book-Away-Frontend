import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/SelectedBook.css";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
  setChat,
  initiateRedirect,
  cancelRedirect,
  setPostedBooks,
  editPostedBook
} from "../Actions";
import { Form } from "react-bootstrap";
import DropdownExampleSelection from "./condition";
import axios from "axios";

class SelectedBookPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      condition: "",
    };
  }

  componentDidMount() {
    this.setState({ 
      condition: this.props.book.condition,
      description: this.props.book.description 
    });
    if (!this.props.currentUser.id) {
      return;
    }
    this.props.cancelRedirect();
  }

  editChange = () => {
    axios.put(`http://localhost:3500/api/book/${this.props.book.id}`, {
        description: this.state.description,
        condition: this.state.condition
      })
      .then(res => {
        if (res.data) {
          let updatedBook = res.data;
          this.props.editPostedBook(updatedBook)
        }
      })
      .catch(err => console.log(err))
  };

  handleConditionSubmit = (e) => {
    this.setState({
      condition: e,
    });
  };

  render() {
    if (!this.props.currentUser.id) {
      return <Redirect to="/" />;
    } else if (this.props.redirect) {
      return <Redirect to="/inbox" />;
    }
    return (
      <div className="edit-a-book">
        <div className="edit-book-title">
          <h1>{this.props.book.title}</h1>
          <img src={this.props.book.preview_image} alt="" />
        </div>

        <div className="d-flex justify-content-center">
          <DropdownExampleSelection
            handleConditionSubmit={this.handleConditionSubmit}
          />
        </div>
        <div
          className="pt-5 d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <Form.Group style={{ width: "50%" }}>
            <Form.Label className="text-white">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </Form.Group>
        </div>

        <button
          type="button"
          className="button12"
          onClick={() => this.editChange()}
        >
          Save Change
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
  setPostedBooks,
  editPostedBook
})(SelectedBookPage);
