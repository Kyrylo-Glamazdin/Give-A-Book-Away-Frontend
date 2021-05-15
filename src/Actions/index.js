//All actions listed here are designed to alter the reducers in the predictable way.
//Each of these actions can be accessed from any component in which the needed actions were imported

//USERS
export const addUser = (user) => {
  return {
    type: "ADD_USER",
    payload: user,
  };
};

export const clearUsers = () => {
  return {
    type: "CLEAR_USERS",
    payload: {},
  };
};

//BOOKS
export const postBook = (book) => {
  return {
    type: "POST_BOOK",
    payload: book,
  };
};

export const setBooks = (books) => {
  return {
    type: "SET_BOOKS",
    payload: books,
  };
};

export const editBook = (book) => {
  return {
    type: "EDIT_BOOK",
    payload: book,
  };
};

export const deleteBook = (book) => {
  return {
    type: "DELETE_BOOK",
    payload: book,
  };
};

export const clearBooksTemporary = () => {
  return {
    type: "CLEAR_BOOKS_TEMPORARY",
    payload: {},
  };
};

//CURRENT USER
export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

//CURRENT BOOK
export const setBook = (book) => {
  return {
    type: "SET_BOOK",
    payload: book,
  };
};

//POSTED BOOKS (by current user)
export const addPostedBook = (book) => {
  return {
    type: "ADD_POSTED_BOOK",
    payload: book,
  };
};

export const setPostedBooks = (books) => {
  return {
    type: "SET_POSTED_BOOKS",
    payload: books,
  };
};

export const editPostedBook = book => {
  return {
    type: "EDIT_POSTED_BOOK",
    payload: book
  };
};

export const removePostedBook = (book) => {
  return {
    type: "REMOVE_POSTED_BOOK",
    payload: book,
  };
};

export const clearPostedBooks = () => {
  return {
    type: "CLEAR_POSTED_BOOKS",
    payload: [],
  };
};

//CHATS
export const addChat = (chat) => {
  return {
    type: "ADD_CHAT",
    payload: chat,
  };
};

export const clearChats = () => {
  return {
    type: "CLEAR_CHATS",
    payload: {},
  };
};

export const setChat = (chat) => {
  return {
    type: "SET_CHAT",
    payload: chat,
  };
};

export const unsetChat = () => {
    return {
        type: "UNSET_CHAT",
        payload: {}
    };
};

//REDIRECT
export const initiateRedirect = () => {
  return {
    type: "INITIATE_REDIRECT",
    payload: {},
  };
};

export const cancelRedirect = () => {
    return {
        type: "CANCEL_REDIRECT",
        payload: {}
    };
};

//SIMILAR BOOKS
export const postSimilarBook = (payload) => {
  return {
    type: "CHANGE_SIMILAR_BOOK",
    payload,
  };
};

export const clearSimilarBooks = () => {
  return {
    type: "CLEAR_SIMILAR_BOOKS",
    payload: {}
  };
};

//BOOK OWNERS
export const addBookOwner = (user) => {
  return {
    type: "ADD_BOOK_OWNER",
    payload: user,
  };
};

export const clearBookOwner = () => {
  return {
    type: "CLEAR_BOOK_OWNER",
    payload: {},
  };
};

//BOOKS BY OTHER USERS
export const addUserBook = (book) => {
  return {
    type: "ADD_USER_BOOK",
    payload: book
  };
};

export const clearUserBooks = () => {
  return {
    type: "CLEAR_USER_BOOKS",
    payload: {}
  };
};

//LOADING
export const beginLoading = () => {
  return {
    type: "BEGIN_LOADING",
    payload: ""
  };
};

export const endLoading = () => {
  return {
    type: "END_LOADING",
    payload: ""
  };
};