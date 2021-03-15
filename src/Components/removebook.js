import React from 'react';
import "../Styles/ProfilePage.css"



const RemoveButton=()=> {
    function clickMe() {
        alert('book ded');
    }
    return (
                <button className='button1' onClick={clickMe}>
                    Remove Book
                </button>
    );
    
  }
export default RemoveButton;