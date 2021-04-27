export const addUser = user => {
    return {
        type: "ADD_USER",
        payload: user
    };
};

export const clearUsers = () => {
    return {
        type: "CLEAR_USERS",
        payload: {}
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

export const addChat = chat => {
    return {
        type: "ADD_CHAT",
        payload: chat
    };
};

export const clearChats = () => {
    return {
        type: "CLEAR_CHATS",
        payload: {}
    };
};

export const setChat = chat => {
    return {
        type: "SET_CHAT",
        payload: chat
    };
};

export const unsetChat = () => {
    return {
        type: "UNSET_CHAT",
        payload: {}
    };
};

export const initiateRedirect = () => {
    return {
        type: "INITIATE_REDIRECT",
        payload: {}
    };
};

export const cancelRedirect = () => {
    return {
        type: "CANCEL_REDIRECT",
        payload: {}
    };
};

export const addIcon = icon => {
    return {
        type: "ADD_ICON",
        payload: icon
    };
};

export const editIcon = icon => {
    return {
        type: "EDIT_ICON",
        payload: icon
    };
};

export const setIcons = icons => {
    return {
        type: "SET_ICONS",
        payload: icons
    };
};

export const deleteIcons = () => {
    return {
        type: "DELETE_ICONS",
        payload: {}
    };
};

export const setConversationUsername = conversationUsername => {
    return {
        type: "SET_CONVERSATION_USERNAME",
        payload: conversationUsername
    };
};

export const deleteConversationUsername = () => {
    return {
        type: "DELETE_CONVERSATION_USERNAME",
        payload: {}
    };
};


export const setMessage = message => {
    return {
        type: "SET_MESSAGE",
        payload: message
    };
};

export const clearMessage = () => {
    return {
        type: "CLEAR_MESSAGE",
        payload: ""
    };
};

export const setConversation = message => {
    return {
        type: "SET_CONVERSATION",
        payload: message
    };
};

export const addMessageToConversation = message => {
    return {
        type: "ADD_MESSAGE_TO_CONVERSATION",
        payload: message
    };
};

export const clearConversation = () => {
    return {
        type: "CLEAR_CONVERSATION",
        payload: {}
    };
};