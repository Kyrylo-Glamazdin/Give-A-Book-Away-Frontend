import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../Styles/GiveaBook.png'
import '../Styles/Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <div className="logo">
                    
                    <Link className="navbutton-left" to="/home">
                    
                    <img className= "logo" src={logo} alt= "logo"></img>
                    
                    </Link>
                </div>
                <div className="button-group">
                    <Link className="navbutton" to="/home">Home</Link>
                    <Link className="navbutton" to="/post">Post</Link>
                    <Link className="navbutton" to="/inbox/">Inbox</Link>
                    <Link className="navbutton" to="/profile/">Profile</Link>
                </div>
            </div>
        );
    }
}

export default Navbar;