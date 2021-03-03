import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../Styles/Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <div className="site-title">
                    <Link className="navbutton-left" to="/">Give a Book Away</Link>
                </div>
                <div className="button-group">
                    <Link className="navbutton" to="/">Home</Link>
                    <Link className="navbutton" to="/post/">Post</Link>
                    <Link className="navbutton" to="/inbox/">Inbox</Link>
                    <Link className="navbutton" to="/profile/">Profile</Link>
                </div>
            </div>
        );
    }
}

export default Navbar;