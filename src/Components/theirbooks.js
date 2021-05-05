import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { removePostedBook } from "../Actions";
import BookItem from "./BookItem";


import "../Styles/BookList.css";
class TheirBooks extends Component {
  

  render() {
    return (
      <div className="list-box m-3 py-5">
        <Container>
          <Row className="py-5">

          {/*this.props.books.map(book => {
              return (
                <Route path={"/otheruser/"} 
                  render={() => {
                    return <OtherUser key={"listedbook"+book.id} book={book}/>
                  }}
                />
              )
            })*/}

            {this.props.books.map((book, key) => {
             book.owner = this.props.books.username;
              return (
                <Col key={key} md={3} sm={6} className="list py-3">
                  <div className="imagebox m-auto">
                    <BookItem book={book} />
                    
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postedBooks: state.postedBooks,
  };
};

export default connect(mapStateToProps, {
  removePostedBook,
})(TheirBooks);
