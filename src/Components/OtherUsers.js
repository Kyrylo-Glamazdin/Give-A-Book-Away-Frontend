import React, { Component } from "react";
import { connect } from "react-redux";
import { addUserBook, clearUserBooks } from "../Actions";
import {Redirect} from 'react-router';
import OtherBookItem from "./OtherBookItem";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";

class OtherUser extends Component {
  constructor(props) {
    super(props);
  }

  fetchUserBooks = async () => {
    this.props.clearUserBooks();
    let requestObj = {
      currentUserZipcode: this.props.currentUser.zipcode,
      otherUserZipcode: this.props.bookOwner.zipcode,
      userId: this.props.bookOwner.id,
    };
    axios
      .post(`http://localhost:3500/api/book/userbooks`, requestObj)
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
        <div className="profile-title">{this.props.bookOwner.username}</div>
        <div>
          <div>
            <div className="list-box m-3 py-5">
              <Container>
                <Row className="py-5">
                  {this.props.userBooks.map((item, key) => {
                    item.owner = this.props.bookOwner.username;
                    return (
                      <Col key={key} md={3} sm={6} className="list py-3">
                        <div className="imagebox m-auto">
                          <OtherBookItem book={item} />
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            </div>
          </div>
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
