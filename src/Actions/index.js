export const addUser = user => {
    return {
        type: "ADD_USER",
        payload: user
    };
};

export const postBook = book => {
    return {
        type: "POST_BOOK",
        payload: book
    };
};

export const editBook = book => {
    return {
        type: "EDIT_BOOK",
        payload: book
    };
};

export const deleteBook = book => {
    return {
        type: "DELETE_BOOK",
        payload: book
    };
};

export const clearBooksTemporary = () => {
    return {
        type: "CLEAR_BOOKS_TEMPORARY",
        payload: {}
    }
}

export const setUser = user => {
    return {
        type: "SET_USER",
        payload: user
    };
};

export const setBook = book => {
    return {
        type: "SET_BOOK",
        payload: book
    };
};

export const addPostedBook = book => {
    return {
        type: "ADD_POSTED_BOOK",
        payload: book
    };
};

export const setPostedBooks = books => {
    return {
        type: "SET_POSTED_BOOKS",
        payload: books
    };
};

export const removePostedBook = book => {
    return {
        type: "REMOVE_POSTED_BOOK",
        payload: book
    };
};

export const clearPostedBooks = () => {
    return {
        type: "CLEAR_POSTED_BOOKS",
        payload: []
    };
};