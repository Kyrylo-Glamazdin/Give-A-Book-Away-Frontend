import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../Styles/GiveaBook.png'
import {postBook, clearBooksTemporary, addBookOwner, clearBookOwner, clearSimilarBooks, beginLoading, endLoading} from '../Actions'
import {connect} from 'react-redux';
import axios from 'axios';
import MediaQuery from 'react-responsive';
import '../Styles/Navbar.css';

// Navigation bar with the links bringing the user to different application components
class Navbar extends Component {
    //get recommended books for the homepage when clicking the "Home" button or Give a Book Away logo
    updateBooksOnMainPage = () => {
        this.props.clearBooksTemporary()
        this.fetchBooks()
    }

    //get recommended books for the homepage when clicking the "Home" button or Give a Book Away logo
    fetchBooks = async () => {
        if (!this.props.currentUser.id) {
            return;
        }
        this.props.clearSimilarBooks();
        this.props.clearBookOwner();
        this.props.beginLoading();
        let req = {
          id: this.props.currentUser.id,
          zipcode: this.props.currentUser.zipcode 
        }
        axios.post("https://books-away.herokuapp.com/api/book/recommended", req)
        .then(response => {
            this.props.endLoading();
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
            <div>
                <MediaQuery minDeviceWidth={751} >
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
                </MediaQuery>

                <MediaQuery maxDeviceWidth={750} >
                    <link rel="stylesheet" href= "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/> 
                    <div className="navbarsmall">
                        <div className="logosmall">    
                            <Link className="navbutton-left" to="/home">                   
                                <img className= "logosmall" src={logo} alt= "logo" onClick={this.updateBooksOnMainPage}></img>                   
                            </Link>
                        </div>
                        <div className="dropdown">
                            <button className="dropbtn"> <i class="fa fa-bars"></i> </button>
                            <div className="dropdown-content">
                                <Link  to="/home">HOME</Link>
                                <Link  to="/post">POST</Link>
                                <Link  to="/inbox/">INBOX</Link>
                                <Link  to="/profile/">PROFILE</Link>
                            </div>
                        </div>
                    </div>
                </MediaQuery>
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
    clearBookOwner,
    clearSimilarBooks,
    beginLoading,
    endLoading
})(Navbar);