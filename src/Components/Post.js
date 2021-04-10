import React, {Component} from "react";
import '../Styles/PostButtons.css';
import Upload from './upload'
import { connect } from 'react-redux';
import {addPostedBook} from '../Actions'
//import DropdownExampleSelection from './condition'
import Searchbar from './Searchbar.js';
import Buttons from './submit';
import { Row } from "react-bootstrap";
import axios from 'axios';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
        searchInput: "",
        searchBooks: [],
        selectedBook: {},
        selectedBookItem: <div/>,
        errorMessage: ""
    }
}

handleFormChange = event => {
  this.setState({
      [event.target.name]: event.target.value
  })
}

setSelectedBook = book => {
  this.handleSearchBook();
  if (book.title) {
    this.setState({
      selectedBook: book,
      selectedBookItem: <div>
        <div className="selecttext"> 
          You Selected:
        </div>
          <Row key={"selectedBook"} className="search-book mt-3 ml-1 p-1">
            <div className="selectedbook">
              <img className="ml-5" src={book.preview_image} alt =""></img>
              <div className="pl-3 dropdown-letter">
                <p>{`${book.title}`}</p>
                <p>{`${book.author}`}</p>
                <p>{`${book.isbn}`}</p>
              </div>
            </div>
          </Row>
          <div>
            <button className="remoofbutton"onClick={() => this.setSelectedBook({})}>
              Remove Selection
            </button>
          </div>
        </div>
    })
  }
  else {
    this.setState({
      selectedBook: {},
      selectedBookItem: <div/>
    })
  }
}

confirmBookPost = () => {
  if (this.state.selectedBook.title) {
    this.setState({
      errorMessage: ""
    })
  }
  else {
    this.setState({
      errorMessage: "You must select a book first"
    })
    return;
  }
  if (!this.props.currentUser.id) {
    this.setState({
      errorMessage: "You are not logged in"
    })
    return;
  }
  let bookAndUserObject = {
    book: this.state.selectedBook,
    user: this.props.currentUser
  }
  console.log(bookAndUserObject)
  axios.post('http://localhost:3500/api/book/post', bookAndUserObject)
  .then(response => {
    this.props.addPostedBook(response.data)
  })
  .catch(err => {
    console.log(err);
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
  } 
  else {
      alert("Please input search key.");
  }
}

handleSearchBook(){
  this.setState({searchBooks: []})
}

  render() {
    return (
      <div>
        <h1> Give Your Book Away</h1>
        {this.state.selectedBookItem}
        <div className='layout'>
          <div className='keys'>
            {/*<Upload/>*/}
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
            
            <Buttons confirmBookPost={this.confirmBookPost}/>
            <div>
              {this.state.errorMessage}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, {
  addPostedBook
})(Post);