import React, { Component } from 'react';
import "../Styles/ProfilePage.css"

// Button to remove book from the database
class RemoveButton extends Component {
    render(){
        return (
            <button className='button1' onClick={this.props.removeBook}>
                Remove Book
            </button>
        );
    }
  }

export default RemoveButton;