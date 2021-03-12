import React, {Component} from 'react';
import '../Styles/BookItem.css';

class BookItem extends Component {
    render() {
        return(
            <div className="book-item">
                <div className="book-item-img-div">
                    <img src = {this.props.book.preview_image}/>
                </div>
                <div className="book-item-info">
                    <div className="book-item-title">
                        {this.props.book.title}
                    </div>
                    <div className="book-item-author">
                        {this.props.book.author}
                    </div>
                    <div className="book-item-distance">
                        3.2 miles from you
                    </div>
                </div>
            </div>
        );
    }
}

export default BookItem;