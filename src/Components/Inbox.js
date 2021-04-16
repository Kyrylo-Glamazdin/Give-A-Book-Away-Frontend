import React, {Component} from 'react';
import ChatList from './ChatList';
import ConversationWindow from './ConversationWindow';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {cancelRedirect} from "../Actions";

let chatData = [
    {id: 1, users: [1, 3]},
    {id: 2, users: [2, 3]},
    {id: 3, users: [1, 2]}
]

let chatLineData = [
    {id: 1, chatId: 1, userId: 1, lineText: "Hello, User 3!", createdAt: 1618504133},
    {id: 2, chatId: 2, userId: 2, lineText: "Just a casual conversation", createdAt: 1618504133},
    {id: 3, chatId: 3, userId: 1, lineText: "Test chat 2!", createdAt: 1618504226},
    {id: 4, chatId: 2, userId: 3, lineText: "It is! How are you?", createdAt: 1618504170},
    {id: 5, chatId: 1, userId: 3, lineText: "Hello, User 1!", createdAt: 1618504151},
    {id: 6, chatId: 1, userId: 1, lineText: "Hello again, User 3!", createdAt: 1618504170},
    {id: 7, chatId: 2, userId: 3, lineText: "Left on read? Really?", createdAt: 1618504244},
    {id: 8, chatId: 3, userId: 2, lineText: "Test chat 2 user 2!", createdAt: 1618504234},
    {id: 9, chatId: 2, userId: 2, lineText: "Sorry, I was busy", createdAt: 1618504261},
    {id: 10, chatId: 1, userId: 3, lineText: "Hello again, User 1!", createdAt: 1618504207}
]

let chatUserData = [
    {id: 1, username: "User_1"},
    {id: 2, username: "User_2"},
    {id: 3, username: "User_3"}
]

class Inbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chatIconData: [],
            currentConversation: [],
            currentConversationId: 0,
            message: ""
        }
    }

    componentDidMount() {
        this.props.cancelRedirect()
        this.buildChatIconData();

        this.props.socket.on('message', message => {
            this.outputMessage(message)
        })
    }

    buildChatIconData = () => {
        let chatIconData = []
        for (let i = 0; i < chatData.length; i++) {
            let otherUserName = ""
            if (chatData[i].users[0] == this.props.currentUser.id) {
                otherUserName = this.findUsernameById(chatData[i].users[1]);
            }
            else if (chatData[i].users[1] == this.props.currentUser.id) {
                otherUserName = this.findUsernameById(chatData[i].users[0]);
            }
            if (otherUserName==="") {
                continue
            }
            let latestChatLine = this.findLatestChatLine(i + 1)
            let chatDataItem = {
                id: chatData[i].id,
                username: otherUserName,
                updatedAt: latestChatLine.latestTime,
                lineText: latestChatLine.latestLine
            }
            chatIconData.push(chatDataItem)
        }
        chatIconData.sort((a,b) => (a.latestTime > b.latestTime) ? 1 : -1)
        console.log(chatIconData)
        this.setState({
            chatIconData
        })
    }

    findUsernameById = id => {
        for (let i = 0; i < chatUserData.length; i++) {
            if (chatUserData[i].id == id) {
                return chatUserData[i].username
            }
        }
    }

    findLatestChatLine = id => {
        let latestLine = ""
        let latestTime = 0;
        for (let i = 0; i < chatLineData.length; i++) {
            if (chatLineData[i].chatId == id) {
                if (chatLineData[i].createdAt > latestTime) {
                    latestLine = chatLineData[i].lineText
                    latestTime = chatLineData[i].createdAt
                }
            }
        }
        let latestChatLine = {
            latestLine,
            latestTime
        }
        return latestChatLine
    }

    redirectToConversation = conversationId => {
        let fullConversation = []
        for (let i = 0; i < chatLineData.length; i++) {
            if (chatLineData[i].chatId == conversationId) {
                fullConversation.push(chatLineData[i])
            }
        }
        fullConversation.sort((a,b) => (a.createdAt > b.createdAt) ? 1 : -1)
        this.setState({
            currentConversationId: conversationId,
            currentConversation: fullConversation
        })
    }

    handleChatFormChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleChatFormSubmit = event => {
        event.preventDefault()
        let messageObject = {
            chatId: this.state.currentConversationId,
            username: this.props.currentUser.username,
            lineText: this.state.message
        }
        this.props.socket.emit('chatMessage', messageObject)
        this.setState({
            message: ''
        })
    }

    outputMessage = messageObject => {
        let curConversation = this.state.currentConversation
        let newLine = {
            lineText: messageObject.line,
            createdAt: messageObject.createdAt,
            username: messageObject.username
        }
        curConversation.push(newLine)
        this.setState({
            currentConversation: curConversation,
        })
    }

    changeRoom = roomId => {
        this.leaveRoom(this.state.currentConversationId)
        this.joinRoom(roomId)
    }

    joinRoom = roomId => {
        this.props.socket.emit('joinRoom', roomId)
    }

    leaveRoom = roomId => {
        if (this.state.currentConversationId !== 0) {
            this.props.socket.emit('leaveRoom', roomId)
        }
    }

    render() {
        if (!this.props.currentUser.id) {
            return(
                <Redirect to = "/"/>
            )
        }
        return(
            <div>
                <ChatList chats={this.state.chatIconData} 
                redirectToConversation={this.redirectToConversation}
                joinRoom={this.changeRoom}
                />
                <ConversationWindow 
                conversation={this.state.currentConversation} 
                handleChatFormChange={this.handleChatFormChange} 
                handleChatFormSubmit={this.handleChatFormSubmit}
                message={this.state.message}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      currentUser: state.currentUser
    }
  }
  
  export default connect (mapStateToProps, {
    cancelRedirect
  })(Inbox);