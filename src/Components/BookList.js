import React, { Component} from 'react'
import {connect} from 'react-redux';
import {postBook, clearBooksTemporary} from '../Actions';
import Searchbar from './Searchbar.js';
import BookItem from './BookItem.js';
import axios from 'axios';
import "../Styles/BookList.css"

class BookList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchInput: ""
        }
    }

    handleFormChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSearchSubmit = async event => {
        event.preventDefault();
        let booksKey = await axios.get("http://localhost:3500/api/book/key");
        booksKey = booksKey.data;
        await axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.state.searchInput + "&key=" +booksKey)
        .then(result => {
            this.props.clearBooksTemporary();
            for (let i = 0; i < result.data.items.length; i++) {
                let newBook = {
                    title: result.data.items[i].volumeInfo.title,
                    author: result.data.items[i].volumeInfo.authors[0],
                    isbn: result.data.items[i].volumeInfo.industryIdentifiers[0].identifier,
                    preview_image: result.data.items[i].volumeInfo.imageLinks.thumbnail
                }
                this.props.postBook(newBook)
            }
        })
        .catch(err => {console.log(err)})
    }

    render() {
        return(
            <div>
                <Searchbar handleFormChange={this.handleFormChange} handleSearchSubmit={this.handleSearchSubmit} formValue={this.state.searchInput} />
                <div className="book-grid">
                    {this.props.books.map(book => (<BookItem key={"book"+book.id} book={book}/>))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books
    };
}

export default connect(mapStateToProps, {
    postBook,
    clearBooksTemporary
})(BookList);