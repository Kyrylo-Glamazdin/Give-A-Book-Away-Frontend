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
} from "../Actions";
import { Form } from "react-bootstrap";
import DropdownExampleSelection from "./condition";
import axios from "axios";

class SelectedBookPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullLocation: "",
      description: "",
      condition: "",
    };
  }

  componentDidMount() {
    this.setState({ condition: this.props.book.condition });
    this.setState({ description: this.props.book.description });
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

  editChange = () => {
    axios
      .put(`http://localhost:3500/api/book/${this.props.book.id}`, {
        description: this.state.description,
      })
      .then((res) => {
        axios
          .get(`http://localhost:3500/api/book/${this.props.currentUser.id}`)
          .then((response) => {
            this.props.setPostedBooks(response.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    axios
      .put(`http://localhost:3500/api/book/${this.props.book.id}`, {
        condition: this.state.condition,
      })
      .then((res) => {
        axios
          .get(`http://localhost:3500/api/book/${this.props.currentUser.id}`)
          .then((response) => {
            this.props.setPostedBooks(response.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
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
      <div className="a-book">
        <div className="book-title">
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
          className="button10"
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
})(SelectedBookPage);
