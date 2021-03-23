import React, { Component } from "react";
import "../Styles/Searchbar.css";
import {connect} from 'react-redux';
import {postBook, clearBooksTemporary} from '../Actions';
import axios from 'axios';

class Searchbar extends Component{

  fetchBooks(book){
    this.props.clearBooksTemporary();
    this.props.me.handleSearchBook();
    axios.get(`http://localhost:3500/api/book/${book.isbn}`)
    .then(response => {
      for (let i = 0; i < response.data.length; i++) {
        this.props.postBook(response.data[i]);
      }
    })
    .catch(err => {
      console.log(err);
    })
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
  };
}

export default connect(mapStateToProps, {
  postBook,
  clearBooksTemporary,
})(Searchbar);