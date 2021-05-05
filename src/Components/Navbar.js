import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../Styles/GiveaBook.png'
import {postBook, clearBooksTemporary, addBookOwner, clearBookOwner} from '../Actions'
import {connect} from 'react-redux';
import axios from 'axios';
import '../Styles/Navbar.css';

class Navbar extends Component {

    updateBooksOnMainPage = () => {
        this.props.clearBooksTemporary()
        this.fetchBooks()
    }

    fetchBooks = async () => {
        if (!this.props.currentUser.id) {
            return;
        }
        this.props.clearBookOwner();
        let req = {
          id: this.props.currentUser.id,
          zipcode: this.props.currentUser.zipcode 
        }
        axios.post("http://localhost:3500/api/book/recommended", req)
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            let bookOwner = response.data[i].user;
            this.props.addBookOwner(bookOwner);
            this.props.postBook(response.data[i]);
          }
        })
        .catch(err => {
          console.log(err);
        })
      }

    render() {
        return (
            <div className="navbar">
                <div className="logo">
                    
                    <Link className="navbutton-left" to="/home">
                    
                    <img className= "logo" src={logo} alt= "logo" onClick={this.updateBooksOnMainPage}></img>
                    
                    </Link>
                </div>
                <div className="button-group">
                    <Link className="navbutton" to="/home">
                        <button className="navigationbutton" onClick={this.updateBooksOnMainPage}>
                            HOME
                        </button>
                    </Link>
                    <Link className="navbutton" to="/post">POST</Link>
                    <Link className="navbutton" to="/inbox/">INBOX</Link>
                    <Link className="navbutton" to="/profile/">PROFILE</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        books: state.books,
        users: state.users
    };
}

export default connect(mapStateToProps, {
    clearBooksTemporary,
    postBook,
    addBookOwner,
    clearBookOwner
})(Navbar);