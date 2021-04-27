import {combineReducers} from 'redux';

let users = [

];

let books = [

];

let postedBooks = [

];

let chats = [

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
        case "UNSET_CHAT":
            return {}
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

const chatIconsReducer = (oldChatIcons = [], action) => {
    switch(action.type) {
        case "ADD_ICON":
            return oldChatIcons.concat(action.payload)
        case "EDIT_ICON":
            for (let i = 0; i < oldChatIcons.length; i++) {
                if (oldChatIcons[i].chatId === action.payload.chatId) {
                    oldChatIcons[i] = action.payload
                    break
                }
            }
            return oldChatIcons
        case "SET_ICONS":
            return action.payload
        case "DELETE_ICONS":
            return []
        default: return oldChatIcons
    }
}

const currentConversationUsernameReducer = (oldConversationUsername = "", action) => {
    switch(action.type) {
        case "SET_CONVERSATION_USERNAME":
            console.log(action.payload)
            return action.payload
        case "DELETE_CONVERSATION_USERNAME":
            return ""
        default: return oldConversationUsername
    }
}

const inboxMessageReducer = (oldMessage = "", action) => {
    switch(action.type) {
        case "SET_MESSAGE":
            return action.payload
        case "CLEAR_MESSAGE":
            return ""
        default: return oldMessage
    }
}

const currentConversationReducer = (oldConversation = [], action) => {
    switch(action.type) {
        case "SET_CONVERSATION":
            return action.payload
        case "ADD_MESSAGE_TO_CONVERSATION":
            return oldConversation.concat(action.payload)
        case "CLEAR_CONVERSATION":
            return []
        default: return oldConversation
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
    redirect: redirectRequiredReducer,
    chatIcons: chatIconsReducer,
    currentConversationUsername: currentConversationUsernameReducer,
    inboxMessage: inboxMessageReducer,
    currentConversation: currentConversationReducer
});