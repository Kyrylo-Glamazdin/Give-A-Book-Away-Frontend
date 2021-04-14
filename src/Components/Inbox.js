import React, {Component} from 'react';
import ChatList from './ChatList';
import ConversationWindow from './ConversationWindow';
import ChatIconItem from './ChatIconItem';

let chatData = [
    {id: 1},
    {id: 2},
    {id: 3}
]

let chatLineData = [
    //id is big int
    {id: 1, chatId: 1, userId: 1, lineText: "Hello, User 3!", createdAt: "2:00 PM"},
    {id: 2, chatId: 2, userId: 2, lineText: "Just a casual conversation", createdAt: "2:00 PM"},
    {id: 3, chatId: 3, userId: 1, lineText: "Test chat 2!", createdAt: "2:20 PM"},
    {id: 4, chatId: 2, userId: 3, lineText: "It is! How are you?", createdAt: "2:00 PM"},
    {id: 5, chatId: 1, userId: 3, lineText: "Hello, User 1!", createdAt: "2:05 PM"},
    {id: 6, chatId: 1, userId: 1, lineText: "Hello again, User 3!", createdAt: "2:10 PM"},
    {id: 7, chatId: 2, userId: 3, lineText: "Left on read? Really?", createdAt: "4:00 PM"},
    {id: 8, chatId: 3, userId: 2, lineText: "Test chat 2 user 2!", createdAt: "2:25 PM"},
    {id: 9, chatId: 2, userId: 2, lineText: "Sorry, I was busy", createdAt: "10:00 PM"},
    {id: 10, chatId: 1, userId: 3, lineText: "Hello again, User 3!", createdAt: "2:15 PM"}
]

let chatUserData = [
    {id: 1, username: "User_1"},
    {id: 2, username: "User_2"},
    {id: 3, username: "User_3"}
]

class Inbox extends Component {
    render() {
        return(
            <div>
                <ChatList />
                <ConversationWindow />
            </div>
        );
    }
}

export default Inbox;