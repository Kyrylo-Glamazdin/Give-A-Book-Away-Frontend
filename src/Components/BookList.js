import React, { Component} from 'react'
import {connect} from 'react-redux';
import Searchbar from './Searchbar.js';
import BookItem from './BookItem.js';
import SimilarBookItem from './SimilarBookItem.js';
import axios from 'axios';
import {Redirect} from 'react-router';
import "../Styles/BookList.css"

class BookList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchInput: "",
            searchBooks: [],
            noSearchResults: <div/>,
            noSearchResultsBool: false
        }
    }

    handleFormChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSearchSubmit = async event => {
        event.preventDefault();
        if(this.state.searchInput) {
            let booksKey = await axios.get("http://localhost:3500/api/book/key");
            await axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.state.searchInput + "&key=" + booksKey.data)
            .then(result => {
                let books = [];
                for (let i = 0; i < result.data.items.length; i++) {
                    let temp = result.data.items[i].volumeInfo;
                    let newBook = {
                        title: temp.title,
                        author: temp.authors ? temp.authors[0]: "",
                        isbn: temp.industryIdentifiers? temp.industryIdentifiers[0].identifier:"",
                        preview_image: temp.imageLinks?.thumbnail
                    }
                    books.push(newBook)
                }
                this.setState({searchBooks: books})
            })
            .catch(err => {console.log(err)})
        } else {
            alert("Please input search key.");
        }
    }

    handleSearchBook(){
        this.setState({searchBooks: []})
    }

    render() {
        if (!this.props.currentUser.id) {
            return (
                <Redirect to="/"/>
            )
        }
        return(
            <div>
                <Searchbar 
                    handleFormChange={this.handleFormChange} 
                    handleSearchSubmit={this.handleSearchSubmit} 
                    handleSearchBook={this.handleSearchBook} 
                    formValue={this.state.searchInput} 
                    searchBooks={this.state.searchBooks} 
                    option="search"
                    me={this}
                />
                    {/* {this.state.noSearchResults} */}
                    {this.props.books.length > 0 ?
                <div className="book-grid">
                    {
                        this.props.books.map((book, key) => (
                            <BookItem key={key} book={book}/>
                        ))
                    }
                </div>
                : 
                    <div>
                        {this.props.booksLoading ? 
                            <div className="no-listed-books">
                                Loading...
                            </div>
                            :
                            <div className="no-listed-books">
                                There are no books that match your search
                            </div>
                        }
                    </div>
                // <div className="no-listed-books">
                //     There are no books that match your search
                // </div>
                }
                {
                    this.props.similarBooks && this.props.similarBooks.length ? 
                        <React.Fragment>
                            <div className = "similar-book">
                                <p>Similar Books</p>
                            </div>
                            <div className="book-grid">
                                {
                                    this.props.similarBooks.map((book, key) => (
                                        <SimilarBookItem key={key} book={book} />
                                    ))
                                }
                            </div>
                        </React.Fragment> : null
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books,
        currentUser: state.currentUser,
        similarBooks: state.similarBooks,
        booksLoading: state.booksLoading
    };
}

export default connect(mapStateToProps, {

})(BookList);