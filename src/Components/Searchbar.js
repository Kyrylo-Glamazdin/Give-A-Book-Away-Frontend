import React, { Component } from "react";
import "../Styles/Searchbar.css";

//https://www.emgoto.com/react-search-bar/ tutorial that helped make searchbar
class Searchbar extends Component{
  render() {
    return(
      <div className="searchbar">
        <form className="standard-search-form" onSubmit={this.props.handleSearchSubmit}>
          <input className="search-input" name="searchInput" onChange={this.props.handleFormChange} value={this.props.formValue} placeholder="Search by title, author, or ISBN"/>
          <input className="search-button" type="submit" value="Search"/>
        </form>
      </div>
    );
  }
}

export default Searchbar;
