import React, { Component } from "react";
//import ReactDom from "react-dom";
import "../Styles/Searchbar.css";
import { Input, Search } from 'semantic-ui-react';

//https://www.emgoto.com/react-search-bar/ tutorial that helped make searchbar
const Searchbar = () => (
  
  <div className="searchbar">
    <form action="/" method="get">
      <label htmlFor="header-search">
        <span className="visually-hidden">Search for books</span>
      </label>

      <input
        type="text"
        id="header-search"
        placeholder="Search for books"
        name="s"
      />

      <button type="submit">Search</button>
    </form>
  </div> //

);

export default Searchbar;
