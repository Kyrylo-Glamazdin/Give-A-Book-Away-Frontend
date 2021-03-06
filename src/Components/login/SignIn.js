import React, { Component } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import {
  setUser,
  postBook,
  clearBooksTemporary,
  setPostedBooks,
  addUser,
  clearUsers,
  addChat,
  clearChats,
  addBookOwner,
  beginLoading, 
  endLoading
} from "../../Actions";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "../../Styles/SignIn.css";

// Component for logging into an existing account. Asks the user to provide the username and the password
class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      username: "",
      password: "",
      errorMessage: ""
    };
  }

  //if an error occurs, display the error to the user for 3 seconds
  setErrorMessage = errorMessage => {
    this.setState({errorMessage})
    setTimeout(() => {
      this.setState({errorMessage: ""})
    }, 3000)
  }

  //attempt logging in
  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    this.setValidated(true);
    let sendData = {
      username: this.state.username,
      password: this.state.password,
    };
    //check if the user with entered credentials exists. if so, fetch the user and all their data, and redirect to the home page
    axios.post("https://books-away.herokuapp.com/api/auth/signin", sendData)
      .then((response) => {
        let data = response.data;
        if (data.status) {
          this.props.clearBooksTemporary();
          this.props.clearUsers();
          this.props.clearChats();
          const user = response.data.data;
          this.fetchBooks(user.id, user.zipcode);
          this.fetchPostedBooks(user.id);
          this.fetchChats(user.id);
          this.props.setUser(user);
        } else {
          this.setErrorMessage(data.message)
        }
      })
      .catch((err) => {
        console.log(err);
        this.setErrorMessage("Server connection error.")
      });
  };

  setValidated = (validity) => {
    this.setState({
      validated: validity,
    });
  };

  handleFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //get recommended books
  fetchBooks = async (id, zipcode) => {
    this.props.beginLoading();
    let req = {
      id,
      zipcode
    };
    axios.post("https://books-away.herokuapp.com/api/book/recommended", req)
      .then((response) => {
        this.props.endLoading();
        for (let i = 0; i < response.data.length; i++) {
          let bookOwner = response.data[i].user;
          this.props.addBookOwner(bookOwner);
          this.props.postBook(response.data[i]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //get books posted by this user
  fetchPostedBooks = async (loggedInUserId) => {
    axios.get(`https://books-away.herokuapp.com/api/book/${loggedInUserId}`)
      .then((response) => {
        this.props.setPostedBooks(response.data);
      })
      .catch((err) => console.log(err));
  };

  //fetch user's chats
  fetchChats = async (loggedInUserId) => {
    axios.get(`https://books-away.herokuapp.com/api/inbox/${loggedInUserId}`)
      .then((response) => {
        let chatData = response.data;
        for (let i = 0; i < chatData.length; i++) {
          if (chatData[i].userOneId === loggedInUserId) {
            this.fetchUser(chatData[i].userTwoId);
          } else if (chatData[i].userTwoId === loggedInUserId) {
            this.fetchUser(chatData[i].userOneId);
          } else {
            console.log("Couldn't fetch user");
          }
          this.props.addChat(chatData[i]);
        }
      });
  };

  //fetch individual user info for chat
  fetchUser = async (userId) => {
    axios.get(`https://books-away.herokuapp.com/api/user/${userId}`).then((response) => {
      let userData = response.data;
      this.props.addUser(userData);
    });
  };

  render() {
    if (this.props.currentUser.id) {
      return <Redirect to="/home/" />;
    }
    return (
      <Card
        border="primary mx-auto"
        style={{
          float: "center",
          top: "15vh",
          width: "30%",
          margin: "30px",
          padding: "40px 20px",
        }}
      >
        <h1>Sign In</h1>
        <Row className="p-2">
          <Col>
            <p className="float-left">New User?</p>
            <Link to="/signup">
              <p className="red-color float-left ml-2">Create an Account.</p>
            </Link>
          </Col>
        </Row>
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={this.handleSubmit}
        >
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
              <Form.Control
                type="text"
                placeholder="Username"
                value={this.state.username}
                name="username"
                onChange={this.handleFormChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input an username.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Control
                type="password"
                placeholder="Password"
                value={this.state.password}
                name="password"
                onChange={this.handleFormChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a password.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button
            style={{ width: "100%" }}
            type="submit"
            variant="danger"
            className="rounded-pill"
          >
            Sign In
          </Button>
        </Form>
        {this.state.errorMessage.length > 0 ?
          <div className="login-error-message">
            {this.state.errorMessage}
          </div>
        :
          <div/>
        }
      </Card>
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
  clearBooksTemporary,
  setUser,
  postBook,
  setPostedBooks,
  addUser,
  clearUsers,
  addChat,
  clearChats,
  addBookOwner,
  beginLoading,
  endLoading
})(SignIn);
