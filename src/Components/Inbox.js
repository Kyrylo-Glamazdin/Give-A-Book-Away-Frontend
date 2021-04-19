import React, {Component} from 'react';
import ChatList from './ChatList';
import ConversationWindow from './ConversationWindow';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {cancelRedirect, setChat, addChat} from "../Actions";
import axios from 'axios';

let chatLineData = [
    {id: 1, chatId: 1, userId: 1, lineText: "Hello, User 3!", time: 1618504133},
    {id: 2, chatId: 2, userId: 2, lineText: "Just a casual conversation", time: 1618504133},
    {id: 3, chatId: 3, userId: 1, lineText: "Test chat 2!", time: 1618504226},
    {id: 4, chatId: 2, userId: 3, lineText: "It is! How are you?", time: 1618504170},
    {id: 5, chatId: 1, userId: 3, lineText: "Hello, User 1!", time: 1618504151},
    {id: 6, chatId: 1, userId: 1, lineText: "Hello again, User 3!", time: 1618504170},
    {id: 7, chatId: 2, userId: 3, lineText: "Left on read? Really?", time: 1618504244},
    {id: 8, chatId: 3, userId: 2, lineText: "Test chat 2 user 2!", time: 1618504234},
    {id: 9, chatId: 2, userId: 2, lineText: "Sorry, I was busy", time: 1618504261},
    {id: 10, chatId: 1, userId: 3, lineText: "Hello again, User 1!", time: 1618504207}
]

class Inbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chatIconData: [],
            currentConversationUsername: "",
            currentConversation: [],
            currentConversationId: 0,
            message: ""
        }
    }

    componentDidMount() {
        this.props.cancelRedirect()
        this.buildChatIconData();
        this.openConversation();

        this.props.socket.on('message', message => {
            console.log("received")
            this.outputMessage(message)
        })
    }

    componentWillUnmount() {
        this.props.setChat({})
        if (this.state.currentConversationId !== 0) {
            this.leaveRoom(this.state.currentConversationId)
        }
    }

    buildChatIconData = () => {
        let chatIconData = []
        for (let i = 0; i < this.props.chats.length; i++) {
            let otherUserName = ""
            if (this.props.chats[i].userOneId == this.props.currentUser.id) {
                otherUserName = this.findUsernameById(this.props.chats[i].userTwoId);
            }
            else if (this.props.chats[i].userTwoId == this.props.currentUser.id) {
                otherUserName = this.findUsernameById(this.props.chats[i].userOneId);
            }
            if (otherUserName==="") {
                continue
            }
            let latestChatLine = this.findLatestChatLine(i + 1)
            let chatDataItem = {
                id: this.props.chats[i].id,
                username: otherUserName,
                updatedAt: latestChatLine.latestTime,
                lineText: latestChatLine.latestLine
            }
            chatIconData.push(chatDataItem)
        }
        chatIconData.sort((a,b) => (a.latestTime > b.latestTime) ? 1 : -1)
        this.setState({
            chatIconData
        })
    }

    openConversation = () => {
        if (this.props.currentChat.new) {
            let otherUserId = this.props.currentChat.userTwoId;
            axios.get(`http://localhost:3500/api/user/${otherUserId}`)
            .then(response => {
                let userData = response.data
                this.setState({currentConversationUsername: userData.username})
            })
        }
    }

    findUsernameById = id => {
        for (let i = 0; i < this.props.users.length; i++) {
            if (this.props.users[i].id == id) {
                return this.props.users[i].username
            }
        }
    }

    findLatestChatLine = id => {
        let latestLine = ""
        let latestTime = 0;
        for (let i = 0; i < chatLineData.length; i++) {
            if (chatLineData[i].chatId == id) {
                if (chatLineData[i].time > latestTime) {
                    latestLine = chatLineData[i].lineText
                    latestTime = chatLineData[i].time
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
        fullConversation.sort((a,b) => (a.time > b.time) ? 1 : -1)

        let conversationUsername = ""

        let curChat = this.findChatById(conversationId)

        if (curChat.userOneId === this.props.currentUser.id) {
            conversationUsername = this.findUsernameById(curChat.userTwoId)
        }
        else if (curChat.userTwoId === this.props.currentUser.id) {
            conversationUsername = this.findUsernameById(curChat.userOneId)
        }
        this.setState({
            currentConversationId: conversationId,
            currentConversation: fullConversation,
            currentConversationUsername: conversationUsername
        })
    }

    handleChatFormChange = event => {
        console.log(this.state)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleChatFormSubmit = event => {
        event.preventDefault()
        let currentMessage = this.state.message
        let currentConversationId = this.state.currentConversationId
        //message to a new user
        if (this.state.currentConversationId === 0) {
            let newChatObject = {
                userOneId: this.props.currentUser.id,
                userTwoId: this.props.currentChat.userTwoId
            }
            axios.post("http://localhost:3500/api/inbox/chat", newChatObject)
            .then(newChat => {
                this.props.addChat(newChat.data)
                this.props.setChat(newChat.data)
                this.changeRoom(newChat.data.id)
                console.log(this.state.message)
                let messageObject = {
                    id: this.props.currentUser.id,
                    username: this.props.currentUser.username,
                    lineText: currentMessage,
                    conversationId: newChat.data.id
                }
                console.log("message: ")
                console.log(messageObject)
                console.log("emitted")
                this.props.socket.emit('chatMessage', messageObject)
                this.setState({
                    currentConversationId: newChat.data.id,
                    message: ''
                })
            })
            // .then(() => {
                
            // })
        }
        else {
            let messageObject = {
                id: this.props.currentUser.id,
                username: this.props.currentUser.username,
                lineText: this.state.message,
                conversationId: currentConversationId
            }
            this.props.socket.emit('chatMessage', messageObject)
            this.setState({
                message: ''
            })
        }
    }

    outputMessage = messageObject => {
        console.log("output")
        console.log(messageObject)
        if (messageObject.id === this.props.currentUser.id) {
            console.log("this user")
            let newMessageObject = {
                chatId: messageObject.conversationId,
                userId: this.props.currentUser.id,
                lineText: messageObject.line,
                time: messageObject.time
            }
            console.log("posting")
            axios.post("http://localhost:3500/api/inbox/chatline", newMessageObject)
            .then(response => {
                console.log("done posting")
                let curConversation = this.state.currentConversation
                let postedMessage = response.data
                let newLine = {
                    lineText: postedMessage.lineText,
                    time: postedMessage.time,
                    username: this.props.currentUser.username
                }
                curConversation.push(newLine)
                this.setState({
                    currentConversation: curConversation,
                })
            })
            .catch(() => console.log("Could not send message"))
        }
        else {
            let curConversation = this.state.currentConversation
            let newLine = {
                lineText: messageObject.line,
                time: messageObject.time,
                username: messageObject.username
            }
            curConversation.push(newLine)
            this.setState({
                currentConversation: curConversation,
            })
        }
    }

    findChatById = chatId => {
        for (let i = 0; i < this.props.chats.length; i++) {
            if (this.props.chats[i].id === chatId) {
                return this.props.chats[i]
            }
        }
    }

    changeRoom = roomId => {
        this.leaveRoom(this.state.currentConversationId)
        this.joinRoom(roomId)
    }

    joinRoom = roomId => {
        this.props.socket.emit('joinRoom', roomId)
        console.log("joining room " + roomId)
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
                conversationUsername={this.state.currentConversationUsername}
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
      currentUser: state.currentUser,
      currentChat: state.currentChat,
      users: state.users,
      chats: state.chats
    }
  }
  
  export default connect (mapStateToProps, {
      setChat,
      addChat,
    cancelRedirect
  })(Inbox);