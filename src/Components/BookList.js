import React, { Component} from 'react'
import {connect} from 'react-redux';
import Searchbar from './Searchbar.js';
import BookItem from './BookItem.js';
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

    handleSearchSubmit = event => {
        event.preventDefault();
        //back-end call
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

})(BookList);