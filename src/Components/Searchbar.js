import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { Row } from "react-bootstrap";
import "../Styles/Searchbar.css";
import { postBook, clearBooksTemporary, addPostedBook } from '../Actions';

class Searchbar extends Component{

  fetchBooks(book){
    if (this.props.option === "search") {
      this.props.clearBooksTemporary();
      this.props.me.handleSearchBook();
      let bookAndZipObject = {
        book: book,
        zipcode: this.props.currentUser.zipcode,
        id: this.props.currentUser.id
      }
      axios.post('http://localhost:3500/api/book/isbn', bookAndZipObject)
      .then(response => {
        console.log(response.data)
        for (let i = 0; i < response.data.length; i++) {
          this.props.postBook(response.data[i]);
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
      console.log('title: "' + book.title + '", author: "' + book.author + '", isbn: "' + book.isbn + '", preview_image: "' + book.preview_image + '"')
      this.props.setSelectedBook(book)
    }
  }

  render() {
    let searchBooks = this.props.searchBooks;

    console.log(searchBooks, "searchBooks")

    return(
      <>
        <div className="searchbar">
          <form className="standard-search-form" onSubmit={this.props.handleSearchSubmit}>
            <input className="search-input" name="searchInput" onChange={this.props.handleFormChange} value={this.props.formValue} placeholder="Search by title, author, or ISBN"/>
            <input className="search-button" type="submit" value="Search"/>
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
                    <Row key={key} className="search-book mt-3 ml-1 p-1" onClick = {() => this.handleRowSelection(item)}>
                      <div>
                        <img className="ml-5" src={item.preview_image} alt =""></img>
                        <div className="pl-3 dropdown-letter">
                          <p>{`${item.title}`}</p>
                          <p>{`${item.author}`}</p>
                          <p>{`${item.isbn}`}</p>
                        </div>
                      </div>
                    </Row>
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
  addPostedBook
})(Searchbar);