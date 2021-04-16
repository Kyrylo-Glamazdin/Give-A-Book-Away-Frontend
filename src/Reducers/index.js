import { act } from 'react-dom/test-utils';
import {combineReducers} from 'redux';

let users = [
    
];

let books = [

];

let postedBooks = [

];

let chats = [
    {id: 1, userOneId: 1, userTwoId: 2},
    {id: 2, userOneId: 1, userTwoId: 3},
    {id: 3, userOneId: 3, userTwoId: 2}
];

let currentUser = {};
let currentBook = {};
let currentChat = {};

let redirectRequired = false;

const usersReducer = (oldUsers = users, action) => {
    switch (action.type) {
        case "ADD_USER":
            let newUser = action.payload;
            return oldUsers.concat(newUser);
        case "CLEAR_USERS":
            return [];
        default:
            return oldUsers;
    }
}

const booksReducer = (oldBooks = books, action) => {
    switch(action.type) {
        case "POST_BOOK":
            let newBook = action.payload;
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

const postedBooksReducer = (oldPostedBooks = postedBooks, action) => {
    switch(action.type) {
        case "ADD_POSTED_BOOK":
            return oldPostedBooks.concat(action.payload);
        case "SET_POSTED_BOOKS":
            return action.payload
        case "REMOVE_POSTED_BOOK":
            return oldPostedBooks.filter(book => (book.id !== action.payload.id))
        case "CLEAR_POSTED_BOOKS":
            return [];
        default: return oldPostedBooks
    }
}

const chatsReducer = (oldChats = chats, action) => {
    switch(action.type) {
        case "ADD_CHAT":
            return oldChats.concat(action.payload);
        case "CLEAR_CHATS":
            return [];
        default: return oldChats
    }
}

const currentChatReducer = (curChat = currentChat, action) => {
    switch (action.type) {
        case "SET_CHAT":
            return action.payload;
        default:
            return curChat;
    }
}

const redirectRequiredReducer = (oldRedirectRequired = redirectRequired, action) => {
    switch (action.type) {
        case "INITIATE_REDIRECT":
            return true
        case "CANCEL_REDIRECT":
            return false
        default: return oldRedirectRequired
    }
}

export default combineReducers({
    users: usersReducer,
    books: booksReducer,
    currentUser: currentUserReducer,
    currentBook: currentBookReducer,
    postedBooks: postedBooksReducer,
    chats: chatsReducer,
    currentChat: currentChatReducer,
    redirect: redirectRequiredReducer
});