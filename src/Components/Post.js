import React, { Component } from "react";
import { connect } from "react-redux";
import { addPostedBook, beginLoading, endLoading } from "../Actions";

import DropdownExampleSelection from "./condition.js";
import Searchbar from "./Searchbar.js";
import Buttons from "./submit";
import { Redirect } from "react-router";
import axios from "axios";

import { Row, Form } from "react-bootstrap";
import "../Styles/PostButtons.css";

// Post component is used for adding new books to the database
class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: "",
      searchBooks: [],
      selectedBook: {},
      selectedBookItem: <div />,
      errorMessage: "",
      condition: "",
      description: "",
    };
  }

  handleFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //if an error occurs while posting a book, display the error message for 5 seconds
  setErrorMessage = message => {
    this.setState({errorMessage: message})
    setTimeout(() => {
      this.setState({errorMessage: ""})
    }, 5000)
  }

  //display the book that was selected from the dropdown.
  //also add the condition and description fields ready to be edited
  setSelectedBook = (book) => {
    this.handleSearchBook();
    if (book.title) {
      this.setState({
        selectedBook: book,
        selectedBookItem: (
          <div className="post-selected-book-container">
            <div className="you-selected-title">
              <p>You Selected:</p>
            </div>
            <Row className="post-book-info">
              <img className="ml-5" src={book.preview_image} alt=""></img>
              <div className="pl-3 dropdown-letter text-white">
                <p>{`${book.title}`}</p>
                <p>{`${book.author}`}</p>
                <p>{`${book.isbn}`}</p>
              </div>
            </Row>
            <div className="condition-dropdown">
              <DropdownExampleSelection handleConditionSubmit={this.handleConditionSubmit} />
            </div>
            <div>
              <div className="pt-5 d-flex justify-content-center" style={{width: "100%"}}>
                <Form.Group style={{width: "50%"}}>
                  <Form.Label className="text-white">Description</Form.Label>
                  <Form.Control as="textarea" rows={3} onChange={(e)=>this.setState({ description: e.target.value })} />
                </Form.Group>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="remoofbutton"
                  onClick={() => this.setSelectedBook({})}
                >
                  Remove Selection
                </button>
              </div>
            </div>
          </div>
        ),
      });
    } else {
      this.setState({
        selectedBook: {},
        selectedBookItem: <div />,
      });
    }
  };

  //add the book to the database
  confirmBookPost = () => {
    //check for errors
    if (!this.state.selectedBook.title) {
      this.setErrorMessage("You must select a book first");
      return;
    }
    else if (!this.props.currentUser.id) {
      this.setErrorMessage("You are not logged in")
      return;
    }
    else if (this.state.condition.length === 0) {
      this.setErrorMessage("You must select a condition")
      return;
    }

    this.props.beginLoading();
    let book = this.state.selectedBook;
    book.condition = this.state.condition;
    book.description = this.state.description;
    //add the book and add an association to the current user
    let bookAndUserObject = {
      book,
      user: this.props.currentUser,
    };
    axios.post("https://books-away.herokuapp.com/api/book/post", bookAndUserObject)
      .then((response) => {
        this.props.endLoading();
        this.setState({ description: "" })
        this.props.addPostedBook(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //get data from searchbar and query google books api. display the results in the dropdown
  handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (this.state.searchInput) {
      //get google books api key from back-end
      let booksKey = await axios.get("https://books-away.herokuapp.com/api/book/key");
      //query google books and add the results to the dropdown
      await axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.state.searchInput + "&key=" + booksKey.data)
        .then((result) => {
          let books = [];
          for (let i = 0; i < result.data.items.length; i++) {
            let temp = result.data.items[i].volumeInfo;
            let newBook = {
              title: temp.title,
              author: temp.authors ? temp.authors[0] : "",
              isbn: temp.industryIdentifiers
                ? temp.industryIdentifiers[0].identifier
                : "",
              preview_image: temp.imageLinks?.thumbnail,
            };
            books.push(newBook);
          }
          this.setState({ searchBooks: books });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please input search key.");
    }
  };

  //reset the dropdown
  handleSearchBook() {
    this.setState({ searchBooks: [] });
  }

  //pass this function to the condition dropdown to get the selected condition
  handleConditionSubmit = (e) => {
    this.setState({
      condition: e,
    });
  };

  render() {
    if (!this.props.currentUser.id) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1 className="heading"> Give Your Book Away</h1>

        <div className="searchButtonPost">
          <Searchbar
            handleFormChange={this.handleFormChange}
            handleSearchSubmit={this.handleSearchSubmit}
            handleSearchBook={this.handleSearchBook}
            formValue={this.state.searchInput}
            searchBooks={this.state.searchBooks}
            setSelectedBook={this.setSelectedBook}
            option="post"
            me={this}
          />
        </div>
        {this.props.booksLoading ?
          <div className="posting-book-ui">
            Posting...
          </div>
          :
          <div>
            {this.state.selectedBookItem}
          </div>
        }
        <div >
        <Buttons confirmBookPost={this.confirmBookPost} />
        <div className="post-error-message">{this.state.errorMessage}</div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    booksLoading: state.booksLoading
  };
};

export default connect(mapStateToProps, {
  beginLoading,
  endLoading,
  addPostedBook
})(Post);
