import React, { useState } from 'react'
import { Col, Container, Image, Row } from "react-bootstrap";
import RemoveButton from './removebook'

import "../Styles/BookList.css"

const searchData = [
    
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVMzIsRW3aVyq3JKEkGST6ogEe09honlpfZQ&usqp=CAU'
    },
    
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7gvR8b4uAN9pyiBoz7F2UIxIfi9opCeZ4Q&usqp=CAU'
    },
    
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7gvR8b4uAN9pyiBoz7F2UIxIfi9opCeZ4Q&usqp=CAU'
    }
]
const MyBooks = () => {
    // const [searchKey, setSearchKey] = useState('');
    // eslint-disable-next-line
    const [bookList, setBookList] = useState(searchData);
    // const onChangeSearch = (e) => {
    //     setSearchKey(e.target.value)
    // }

    // const onKeyDown = (e) => {
    //     if(e.key === "Enter"){
    //         // to backend
    //     }
    // }

    return (
        <>
            <div className="list-box m-2 py-5">
                <Container >
                    <Row className="py-5">
                        {bookList.map((item, key) => {
                            return (
                            <Col key={key} md={3} sm={6} className="list py-3">
                                <div className="imagebox m-auto">
                                    <Image thumbnail className="list-item" src={item.img} />
                                    <RemoveButton/>
                                </div>
                            </Col>
                            )
                        })}
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default MyBooks;