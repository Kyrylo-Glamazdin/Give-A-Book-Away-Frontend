import React, {Component} from 'react'
import '../Styles/OtherBookItem.css';
import {Link} from 'react-router-dom';

class OtherBookItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            approximateDistance: "In your area"
        }
    }

    componentDidMount() {
        if (this.props.book.owner === "self") {
            this.setState({
                approximateDistance: ""
            })
        }
        else if (this.props.book.distance !== "0.0") {
            this.setState({
                approximateDistance: this.props.book.distance + " miles from you"
            })
        }
    }

    render() {
        return (
            <div className="other-book-book-item">
                <Link to={"/books/" + this.props.book.id} className="other-book-book-link">
                    <div className="other-book-book-item-img-div">
                        <img src = {this.props.book.preview_image} className="other-book-book-image" alt=""/>
                    </div>
                </Link>
                <div className="other-book-book-item-info">
                    <Link to={"/books/" + this.props.book.id} className="other-book-book-link">
                        <div className="other-book-book-item-title">
                            {this.props.book.title}
                        </div>
                    </Link>
                    <div className="other-book-book-item-author">
                        {this.props.book.author}
                    </div>
                    <div className="other-book-book-item-distance">
                        {this.state.approximateDistance}
                    </div>
                </div>
            </div>
        );
    }
}

export default OtherBookItem;