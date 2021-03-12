import React, { Component, useState } from 'react'
import {connect} from 'react-redux';
import Searchbar from './Searchbar.js';
import BookItem from './BookItem.js';
import "../Styles/BookList.css"

class BookList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Searchbar />
                <div className="book-grid">
                    {this.props.books.map(book => (<BookItem book={book}/>))}
                </div>
            </div>
        );
    }
}

// const searchData = [
//     {
//         img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkB1qK13I9DeSy79dXGjGJC5UoMbCym9ioYg&usqp=CAU'
//     },
//     {
//         img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTioiWoj41EsWNdtWg-9SXkOigp0PNYREKfNA&usqp=CAU'
//     },
//     {
//         img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVMzIsRW3aVyq3JKEkGST6ogEe09honlpfZQ&usqp=CAU'
//     },
//     {
//         img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT21hq6ljHHF1hnaxsYWrut5KqlRmeb4gVtJw&usqp=CAU'
//     },
//     {
//         img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7gvR8b4uAN9pyiBoz7F2UIxIfi9opCeZ4Q&usqp=CAU'
//     },
//     {
//         img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7gvR8b4uAN9pyiBoz7F2UIxIfi9opCeZ4Q&usqp=CAU'
//     },
//     {
//         img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7gvR8b4uAN9pyiBoz7F2UIxIfi9opCeZ4Q&usqp=CAU'
//     }
// ]
// const BookList = () => {
//     const [searchKey, setSearchKey] = useState('');
//     const [bookList, setBookList] = useState(searchData);
//     const onChangeSearch = (e) => {
//         setSearchKey(e.target.value)
//     }

//     const onKeyDown = (e) => {
//         if(e.key === "Enter"){
//             // to backend
//         }
//     }

//     return (
//         <>
//             <div className="search-box py-5">
//                 <Input
//                     className="search-input m-auto"
//                     placeholder="Search by title, author, or ISBN"
//                     value={searchKey}
//                     onChange={onChangeSearch}
//                     onKeyDown={onKeyDown}
//                 />
//             </div>
//             <div className="list-box m-2 py-5">
//                 <Container >
//                     <Row className="py-5">
//                         {this.props.books.map((book, key) => {
//                             return (
//                             <Col key={key} md={3} sm={6} className="list py-3">
//                                 <div className="imagebox m-auto">
//                                     <Image thumbnail className="list-item" src={book.preview_image} />
//                                 </div>
//                             </Col>
//                             )
//                         })}
//                     </Row>
//                 </Container>
//             </div>
//         </>
//     )
// }

const mapStateToProps = (state) => {
    return {
        books: state.books
    };
}

export default connect(mapStateToProps, {

})(BookList);