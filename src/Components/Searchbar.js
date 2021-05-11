import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { Row } from "react-bootstrap";
import "../Styles/Searchbar.css";
import { postBook, clearBooksTemporary, addPostedBook, postSimilarBook, addBookOwner, clearBookOwner, clearSimilarBooks, beginLoading, endLoading, setBooks } from '../Actions';

class Searchbar extends Component{

  fetchBooks(book){
    if (this.props.option === "search") {
      this.props.clearBooksTemporary();
      this.props.clearBookOwner();
      this.props.clearSimilarBooks();
      this.props.me.handleSearchBook();
      this.props.beginLoading();

      let bookAndZipObject = {
        book: book,
        zipcode: this.props.currentUser.zipcode,
        id: this.props.currentUser.id,
        formValue: this.props.formValue
      }

      let similarBooksRequest = {
        books: [],
        zipcode: this.props.currentUser.zipcode,
        id: this.props.currentUser.id,
      }

      let ind1 = 0;
      let ind2 = 0;
      let selectedBookISBN = bookAndZipObject.book.isbn;
      while (ind1 < this.props.searchBooks.length && ind2 < 4) {
        if (this.props.searchBooks[ind1].isbn !== selectedBookISBN) {
          similarBooksRequest.books.push(this.props.searchBooks[ind1]);
          ind2++;
        }
        ind1++;
      }

      axios.post('https://books-away.herokuapp.com/api/book/isbn', bookAndZipObject)
      .then(response => {
        this.props.endLoading();
        if (response.data) {
          this.props.setBooks(response.data)
          for (let i = 0; i < response.data.length; i++) {
            let bookOwner = response.data[i].user;
            this.props.addBookOwner(bookOwner);          
          }
        }
      })
      .catch(err => {
        console.log(err);
      })

      axios.post('https://books-away.herokuapp.com/api/book/similar', similarBooksRequest)
      .then(response => {
        let similarBooksResponse = response.data
        if (similarBooksResponse) {
          for (let i = 0; i < similarBooksResponse.length; i++) {
            let bookOwner = similarBooksResponse[i].user;
            this.props.addBookOwner(bookOwner);  
            this.props.postSimilarBook(similarBooksResponse[i]);
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  handleRowSelection = book => {
    if (this.props.option === "search") {
      this.fetchBooks(book)
    }
    else {
      this.props.setSelectedBook(book)
    }
  }

  render() {
    let searchBooks = this.props.searchBooks;
    return(
      <>

<link rel="stylesheet" href= 
"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/> 
        <div className="searchbar">
          <form className="standard-search-form" onSubmit={this.props.handleSearchSubmit}>
            <input className="search-input" name="searchInput" onChange={this.props.handleFormChange} value={this.props.formValue} placeholder="Search by title, author, or ISBN"/>
            <button className="search-button" type="submit" value="Search">
            <i className="fa fa-search"></i>
            </button>
          </form>
        </div>

        {
          searchBooks.length ? 
            <div className="searchbar height-0 mt-0">
              <div
                x-placement="bottom-start" 
                className="dropdown-menu show" 
                aria-labelledby="" 
                data-popper-reference-hidden="false" 
                data-popper-escaped="false" 
                data-popper-placement="bottom-start" 
              >
                {
                  searchBooks.map((item, key) => (
                    <React.Fragment key={key}>
                      <Row className="search-book mt-3 ml-1 p-1" onClick = {() => this.handleRowSelection(item)}>
                        <div>
                          <img className="ml-5" src={item.preview_image} alt =""></img>
                          <div className="pl-3 dropdown-letter">
                            <p>{`${item.title}`}</p>
                            <p>{`${item.author}`}</p>
                            <p>{`${item.isbn}`}</p>
                          </div>
                        </div>
                      </Row>
                    </React.Fragment>
                  ))
                }
              </div>
            </div>
            : 
            ""
        }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, {
  postBook,
  clearBooksTemporary,
  addPostedBook,
  postSimilarBook,
  addBookOwner,
  clearBookOwner ,
  clearSimilarBooks,
  beginLoading, 
  endLoading,
  setBooks
})(Searchbar);