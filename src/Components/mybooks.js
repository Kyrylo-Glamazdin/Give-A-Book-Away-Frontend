import React, { Component } from "react";
import RemoveButton from "./removebook";
import { connect } from "react-redux";
import { removePostedBook } from "../Actions";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/BookList.css";
import '../Styles/BookItem.css';

class MyBooks extends Component {

  removeBook = (book) => {
    axios
      .delete(`http://localhost:3500/api/book/${book.id}`)
      .then(this.props.removePostedBook(book))
      .catch((err) => console.log(err));
  };

  render() {
    if (this.props.postedBooks.length === 0 ) {
      return (
        <div className="no-posted-books">
          You haven't posted any books yet
        </div>
      );
    }
    return (

      <div className="my-books-container">
            {this.props.postedBooks.map((item, key) => {
              item.distance = "0.0";
              item.owner = "self";
              return (
                <div key={key} className="my-books-col">
                    <div className="my-books-book-item">
                      <Link to={"/book/edit/" + item.id} className="book-link">
                        <div className="book-item-img-div">
                          <img src={item.preview_image} alt="" />
                        </div>
                      </Link>
                      <div className="book-item-info">
                        <Link to={"/book/edit/" + item.id} className="book-link">
                          <div className="book-item-title">
                            {item.title}
                          </div>
                        </Link>
                        <div className="book-item-author">
                          {item.author}
                        </div>
                      </div>
                    </div>
                    <div className="my-books-remove-button">
                      <RemoveButton removeBook={() => this.removeBook(item)} />
                    </div>
                </div>
              );
            })}
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
})(MyBooks);
