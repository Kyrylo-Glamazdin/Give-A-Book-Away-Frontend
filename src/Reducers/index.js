import {combineReducers} from 'redux';

let users = [
    
];

let books = [

];

let currentUser = {id: 0, name: "Guest", username: "guest", zipcode: "11111"};
let currentBook = {};

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

const currentBookReducer = (curBook = currentBook, action) => {
    switch (action.type) {
        case "SET_BOOK":
            return action.payload;
        default:
            return curBook;
    }
}

export default combineReducers({
    users: usersReducer,
    books: booksReducer,
    currentUser: currentUserReducer,
    currentBook: currentBookReducer
});