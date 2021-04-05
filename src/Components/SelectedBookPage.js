import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/SelectedBook.css";

class SelectedBookPage extends Component{
  // constructor(props) {
  //   super(props)
  // }


  render() {
    return (
      <div className="a-book">
        <div className="book-title">
          <h1>{this.props.book.title}</h1>
          <img src={this.props.book.preview_image} alt=""/>
        </div>

        <div className="author-name">
          <h5 className="authname">
            Author: <strong>{this.props.book.author}</strong>
          </h5>
        </div>

        <div className="isbn">
          <h5 className="isbn-num">
            ISBN: {this.props.book.isbn}
          </h5>
        </div>

        <div className="location">
          <h5 className="distence">
            Location: 11375
          </h5>
        </div>
        
        <div className="description">
          <h5 className="desc">
          Description:
          </h5>
        </div>

        <div className="test">
          <h5 className="atest">
            Testing: 
          </h5>
        </div>
      </div>
    )
  }
}

export default SelectedBookPage;