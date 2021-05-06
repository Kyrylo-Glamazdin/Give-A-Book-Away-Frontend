import React, { Component } from "react";
import "../Styles/PostButtons.css";
// import Upload from './upload'
import { connect } from "react-redux";
import { addPostedBook } from "../Actions";
import DropdownExampleSelection from "./condition.js";
import Searchbar from "./Searchbar.js";
import Buttons from "./submit";
import { Row, Form } from "react-bootstrap";
import { Redirect } from "react-router";
import axios from "axios";

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
      description: ""
    };
  }

  handleFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  setSelectedBook = (book) => {
    this.handleSearchBook();
    if (book.title) {
      this.setState({
        selectedBook: book,
        selectedBookItem: (
          <div>
            <div className="d-flex justify-content-center text-white">
              <p>You Selected:</p>
            </div>
            <Row className="d-flex justify-content-center" style={{marginTop: "3rem"}}>
              <img className="ml-5" src={book.preview_image} alt=""></img>
              <div className="pl-3 dropdown-letter text-white">
                <p>{`${book.title}`}</p>
                <p>{`${book.author}`}</p>
                <p>{`${book.isbn}`}</p>
              </div>
            </Row>
            <div className="d-flex justify-content-center">
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

  confirmBookPost = () => {
    if (this.state.selectedBook.title && this.state.condition) {
      this.setState({
        errorMessage: "",
      });
    } else {
      this.setState({
        errorMessage: "You must select a book first",
      });
      return;
    }
    if (!this.props.currentUser.id) {
      this.setState({
        errorMessage: "You are not logged in",
      });
      return;
    }
    if (this.state.condition.length === 0) {
      this.setState({
        errorMessage: "You must select a condition",
      });
      return;
    }
    let book = this.state.selectedBook;
    book.condition = this.state.condition;
    book.description = this.state.description;
    let bookAndUserObject = {
      book,
      user: this.props.currentUser,
    };
    axios
      .post("http://localhost:3500/api/book/post", bookAndUserObject)
      .then((response) => {
        this.setState({ description: "" })
        this.props.addPostedBook(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (this.state.searchInput) {
      let booksKey = await axios.get("http://localhost:3500/api/book/key");
      await axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            this.state.searchInput +
            "&key=" +
            booksKey.data
        )
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

  handleSearchBook() {
    this.setState({ searchBooks: [] });
  }

  handleConditionSubmit = (e) => {
    this.setState({
      condition: e,
    });
    console.log(this.state.condition);
  };

  render() {
    if (!this.props.currentUser.id) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1 className="heading"> Give Your Book Away</h1>

        {this.state.selectedBookItem}

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
        <div >
          <Buttons confirmBookPost={this.confirmBookPost} />
          <div>{this.state.errorMessage}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps, {
  addPostedBook,
})(Post);
