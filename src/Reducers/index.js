import {combineReducers} from 'redux';

let users = [
    {id: 1, name: "User 1", username: "user_1", zipcode: "11204"},
    {id: 2, name: "User 2", username: "user_2", zipcode: "10012"},
    {id: 3, name: "User 3", username: "user_3", zipcode: "10021"},
    {id: 4, name: "User 4", username: "user_4", zipcode: "11364"},
    {id: 5, name: "User 5", username: "user_5", zipcode: "11370"},
    {id: 6, name: "User 6", username: "user_6", zipcode: "11229"}
];

let books = [
    {id: 1, title: "Book 1", author: "Author 1", isbn: "1234", userId: 1, preview_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkB1qK13I9DeSy79dXGjGJC5UoMbCym9ioYg&usqp=CAU"},
    {id: 2, title: "Book 2", author: "Author 2", isbn: "1235", userId: 5, preview_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTioiWoj41EsWNdtWg-9SXkOigp0PNYREKfNA&usqp=CAU"},
    {id: 3, title: "Book 3", author: "Author 3", isbn: "1236", userId: 6, preview_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVMzIsRW3aVyq3JKEkGST6ogEe09honlpfZQ&usqp=CAU"},
    {id: 4, title: "Book 4", author: "Author 4", isbn: "1237", userId: 2, preview_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT21hq6ljHHF1hnaxsYWrut5KqlRmeb4gVtJw&usqp=CAU"},
    {id: 5, title: "Book 5", author: "Author 1", isbn: "1238", userId: 2, preview_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7gvR8b4uAN9pyiBoz7F2UIxIfi9opCeZ4Q&usqp=CAU"},
    {id: 6, title: "Book 6", author: "Author 2", isbn: "1239", userId: 3, preview_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7gvR8b4uAN9pyiBoz7F2UIxIfi9opCeZ4Q&usqp=CAU"},
    {id: 7, title: "Book 7", author: "Author 6", isbn: "1232", userId: 6, preview_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU7gvR8b4uAN9pyiBoz7F2UIxIfi9opCeZ4Q&usqp=CAU"}
];

let currentUser = {id: 0, name: "Guest", username: "guest", zipcode: "11111"};

let nextUserId = 7;
let nextBookId = 8;

const usersReducer = (oldUsers = users, action) => {
    switch (action.type) {
        case "ADD_USER":
            let newUser = action.payload;
            newUser.id = nextUserId;
            nextUserId++;
            return oldUsers.concat(newUser);
        default:
            return oldUsers;
    }
}

const booksReducer = (oldBooks = books, action) => {
    switch(action.type) {
        case "POST_BOOK":
            let newBook = action.payload;
            newBook.id = nextBookId;
            nextBookId++;
            return oldBooks.concat(newBook);
        case "EDIT_BOOK":
            for (let i = 0; i < oldBooks.length; i++) {
                if (oldBooks[i].id === action.payload.id) {
                    oldBooks[i] = action.payload;
                    return oldBooks;
                }
            }
            return oldBooks;
        case "DELETE_BOOK":
            return oldBooks.filter(book => (book.id !== action.payload.id));
        case "CLEAR_BOOKS_TEMPORARY":
            return [];
        default:
            return oldBooks;
    }
}

const currentUserReducer = (curUser = currentUser, action) => {
    switch (action.type) {
        case "SET_USER":
            return action.payload;
        default:
            return curUser;
    }
}

export default combineReducers({
    users: usersReducer,
    books: booksReducer,
    currentUser: currentUserReducer
});