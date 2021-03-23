import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/SelectedBook.css";

export default function SelectedBookPage(){
  
  const history = useHistory();
  const data = useSelector((state) => state.currentBook);
  if(!data || JSON.stringify(data) === "{}") {
    history.push("/home")
  }
  console.log(data)

  return (
    <div className="a-book">
      <div className="book-title">
        <h1>{data.title}</h1>
        <img src={data.preview_image} alt=""/>
      </div>

      <div className="author-name">
        <h5 className="authname">
          Author: <strong>{data.author}</strong>
        </h5>
      </div>

      <div className="isbn">
        <h5 className="isbn-num">
          ISBN: {data.isbn}
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