import React, { Component, useState } from 'react'
import {connect} from 'react-redux';
import Searchbar from './Searchbar.js';
import BookItem from './BookItem.js';
import "../Styles/BookList.css"

class BookList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Searchbar />
                <div className="book-grid">
                    {this.props.books.map(book => (<BookItem book={book}/>))}
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

})(BookList);