import React, { Component } from 'react';
import '../Styles/PostButtons.css';

// Submit button for posting the book
class Buttons extends Component {
    render(){
        return (
            <button className='button' onClick={this.props.confirmBookPost}>
                Post Book
            </button>
        );
    }
}
export default Buttons;