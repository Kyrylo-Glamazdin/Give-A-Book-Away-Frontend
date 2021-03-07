import React from 'react';
import '../Styles/PostButtons.css';



const Buttons=()=> {
    function clickMe() {
        alert('yay');
    }
    return (
                <button className='button' onClick={clickMe}>
                    Post Book
                </button>
    );
    
  }
export default Buttons;