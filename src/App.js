import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Post from "./Components/Post";
import Navbar from "./Components/Navbar.js";
import Searchbar from "./Components/Searchbar.js";
import BookList from "./Components/BookList.js";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const NavbarComponent = () => <Navbar />;
    const BookListComponent = () => <BookList />;
    const PostComponent = () => <Post />;
    return (
      <div>
        <Router>
        <NavbarComponent/>
        {/* <Searchbar /> */}
          <Switch>
            <Route exact path="/" component={BookListComponent} />
            <Route exact path="/post" component={PostComponent} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
