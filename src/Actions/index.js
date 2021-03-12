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

export const setUser = user => {
    return {
        type: "SET_USER",
        payload: user
    };
};