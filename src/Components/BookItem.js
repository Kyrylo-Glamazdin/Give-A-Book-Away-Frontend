import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import '../Styles/BookItem.css';

// Small book component displayed in the book list
class BookItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            approximateDistance: "In your area"
        }
    }

    componentDidMount() {
        //if displays the book of the logged in user, do not show the distance
        if (this.props.book.owner === "self") {
            this.setState({
                approximateDistance: ""
            })
        }
        //otherwise, update the distance
        else if (this.props.book.distance !== "0.0") {
            this.setState({
                approximateDistance: this.props.book.distance + " miles from you"
            })
        }
    }

    render() {
        return (
            <div className="book-item">
                <Link to={"/book/" + this.props.book.id} className="book-link">
                    <div className="book-item-img-div">
                        <img src = {this.props.book.preview_image} className="book-image" alt=""/>
                    </div>
                </Link>
                <div className="book-item-info">
                    <Link to={"/book/" + this.props.book.id} className="book-link">
                        <div className="book-item-title">
                            {this.props.book.title}
                        </div>
                    </Link>
                    <div className="book-item-author">
                        {this.props.book.author}
                    </div>
                    <div className="book-item-distance">
                        {this.state.approximateDistance}
                    </div>
                </div>
            </div>
        );
    }
}

export default BookItem;