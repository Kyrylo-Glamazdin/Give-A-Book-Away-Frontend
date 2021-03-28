import React from 'react'
import { setBook } from '../Actions';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import '../Styles/BookItem.css';

export default function BookItem(props) {
    
    const dispatch = useDispatch();
    const history = useHistory();

    const gotoPage = (e) => {
        dispatch(setBook(props.book))
        history.push("/inbox")
    }

    return (
        <div className="book-item" onClick={gotoPage}>
            <div className="book-item-img-div">
                <img src = {props.book.preview_image} alt=""/>
            </div>
            <div className="book-item-info">
                <div className="book-item-title">
                    {props.book.title}
                </div>
                <div className="book-item-author">
                    {props.book.author}
                </div>
                <div className="book-item-distance">
                    {props.book.distance} miles from you
                </div>
            </div>
        </div>
    );
}