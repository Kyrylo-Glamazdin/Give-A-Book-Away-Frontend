import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/SelectedBook.css";
//import axios from 'axios'
//Later connect to database will add more code
//Will need state variable and product id for database I think

class SelectedBookPage extends React.Component {
  render() {
    return (
      <div className="a-book">
        <div className="book-title">
          <h1>A Book's Title</h1>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTioiWoj41EsWNdtWg-9SXkOigp0PNYREKfNA&usqp=CAU"
            //Later connect to database image
          />
        </div>

        <div className="author-name">
          <h5 className="authname">
            <h5>Author: </h5>
          </h5>
        </div>

        <div className="isbn">
          <h5 className="isbn-num">
            <h5>ISBN: </h5>
          </h5>
        </div>

        <div className="description">
          <h5 className="desc">
            <h5>Description: </h5>
          </h5>
        </div>

        <div className="location">
          <h5 className="distence">
            <h5>Location: </h5>
          </h5>
        </div>

        <div className="test">
          <h5 className="atest">
            <h5>Testing: </h5>
          </h5>
        </div>
      </div>
    );
  }
}
export default SelectedBookPage;
