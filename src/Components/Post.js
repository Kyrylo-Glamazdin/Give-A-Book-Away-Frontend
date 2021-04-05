import React, {Component} from "react";
import '../Styles/PostButtons.css';
import Upload from './upload'
import DropdownExampleSearchSelection from './searchdropbox'
import DropdownExampleSelection from './condition'
import Searchbar from './Searchbar.js';
import Buttons from './submit';
import axios from 'axios';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
        searchInput: "",
        searchBooks: []
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
        <Searchbar 
          handleFormChange={this.handleFormChange} 
          handleSearchSubmit={this.handleSearchSubmit} 
          handleSearchBook={this.handleSearchBook} 
          formValue={this.state.searchInput} 
          searchBooks={this.state.searchBooks} 
          option="post"
          me={this}
        />
        <div className='layout'>
          <div className='keys'>
            <Upload/>
            <DropdownExampleSearchSelection/>
            <DropdownExampleSelection/>
            <Buttons/>
          </div>
        </div>
      </div>
    );
  }
}


export default Post;