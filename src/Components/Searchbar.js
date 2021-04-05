import React, { Component } from "react";
import "../Styles/Searchbar.css";
import {connect} from 'react-redux';
import {postBook, clearBooksTemporary} from '../Actions';
import axios from 'axios';

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
    else {
      let bookAndUserObject = {
        book: book,
        user: this.props.currentUser
      }
      axios.post('http://localhost:3500/api/book/post', bookAndUserObject)
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  render() {
    let searchBooks = this.props.searchBooks;
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
                    <div key={key} className="p-2 search-book" onClick = {() => this.fetchBooks(item)}>
                      <p className="dropdown-item">{item.title}</p>
                    </div>
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
})(Searchbar);