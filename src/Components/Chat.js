import React, {Component} from 'react';
import ChatList from './ChatList';
import ConversationWindow from './ConversationWindow';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {setChat, cancelRedirect} from "../Actions";
import axios from 'axios';
//current date & time
import moment from 'moment'
import socket from '../socket.js';
import '../Styles/Chat.css'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

// Chat component that allows users to select a conversation and text other users
class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            otherUser: {},
            currentConversation: [],
            message: "",
            chatIcons: [],
            currentChat: {}
        }
    }

    async componentDidMount() {
        if (!this.props.currentUser.id) {
            return;
        }
        window.scrollTo({
            top: 0, behavior: "auto"
        })
        disableBodyScroll(this);
        this.joinPersonalRoom(this.props.currentUser.username)
        //display the message on socket message event
        socket.on('message', message => {
            this.outputMessage(message)
        })
        //enable sockets to receive chat preview icon updates
        socket.on('updateRequired', message => {
            this.updateIcons(message)
        })

        //inbox was opened from SelectedBookPage (conversation with user must be initiated)
        if (this.props.currentChat > 0) {
            let requestObj = {
                userOneId: this.props.currentUser.id,
                userTwoId: this.props.currentChat
            }
            let currentChat = {}
            let otherUser = {}
            let currentConversation = []

            //fetch chat with selected user
            await axios.post("https://books-away.herokuapp.com/api/inbox/findchatbytwousers", requestObj)
            .then(response => {
                if (response.data) {
                    currentChat = response.data
                }
                else {
                    currentChat = requestObj
                }
            })
            .catch(err => console.log(err))

            //fetch selected user info
            let propsOtherUserId = this.props.currentChat
            await axios.get(`https://books-away.herokuapp.com/api/user/${propsOtherUserId}`)
            .then(response => {
                otherUser = response.data
            })
            .catch(err => console.log(err))

            //if chat already exists, fetch the conversation
            if (currentChat.id) {
                let currentChatId = currentChat.id
                this.changeRoom(currentChatId)
                await axios.get(`https://books-away.herokuapp.com/api/inbox/chatlines/${currentChatId}`)
                .then(response => {
                    currentConversation = response.data
                    for (let i = 0; i < currentConversation.length; i++) {
                        if (currentConversation[i].userId === this.props.currentUser.id) {
                            currentConversation[i].username = this.props.currentUser.username
                        }
                        else {
                            currentConversation[i].username = otherUser.username
                        }
                    }
                })
                .catch(err => console.log(err))
            }
            this.setState({
                currentChat,
                otherUser,
                currentConversation,
            })
        }

        //code above shouldn't be executed if inbox was opened from navbar (no conversation should be open)

        //build chat icons
        let chatIcons = []
        const currentUserId = this.props.currentUser.id
        await axios.get(`https://books-away.herokuapp.com/api/inbox/${currentUserId}`)
        .then(async response => {
            let chats = response.data
            for (let i = 0; i < chats.length; i++) {
                let curChatOtherUserId = chats[i].userOneId
                let curChatOtherUserUsername = ""
                if (curChatOtherUserId === currentUserId) {
                    curChatOtherUserId = chats[i].userTwoId
                }
                await axios.get(`https://books-away.herokuapp.com/api/user/${curChatOtherUserId}`)
                .then(response => {
                    curChatOtherUserUsername = response.data.username
                })
                await axios.get(`https://books-away.herokuapp.com/api/inbox/chaticonline/${chats[i].id}`)
                .then(async result => {
                    let latestChatLineId = result.data
                    if (latestChatLineId) {
                        await axios.get(`https://books-away.herokuapp.com/api/inbox/chaticonlatest/${latestChatLineId}`)
                        .then(chatIconLatest => {
                            let latestChatLine = chatIconLatest.data
                            if (!latestChatLine) {
                                latestChatLine = {
                                    otherUserId: curChatOtherUserId,
                                    username: curChatOtherUserUsername
                                }
                            }
                            else {
                                latestChatLine.otherUserId = curChatOtherUserId
                                latestChatLine.username = curChatOtherUserUsername
                            }
                            chatIcons.push(latestChatLine)
                        })
                    }
                })
            }
        })
        this.setState({chatIcons})
    }

    //reset all chat information & disable scroll lock
    componentWillUnmount() {
        clearAllBodyScrollLocks();
        this.leavePersonalRoom(this.props.currentUser.username)
        if (this.state.currentChat.id) {
            this.leaveRoom(this.state.currentChat.id)
        }
        this.props.setChat(0)
        this.props.cancelRedirect()
    }

    handleChatFormChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //send a message
    handleChatFormSubmit = async event => {
        event.preventDefault()
        const currentMessage = this.state.message
        //get current date and time
        const curTime = moment().format('LLL')
        const otherUser = this.state.otherUser
        this.setState({message: ""})
        //new chat
        if (!this.state.currentChat.id) {
            await axios.post("https://books-away.herokuapp.com/api/inbox/chat", this.state.currentChat)
            .then(async newChat => {
                //use sockets to change rooms to send message only to the right person
                this.changeRoom(newChat.data.userTwoId)
                this.joinPersonalRoom(otherUser.username)
                let chatDataItem = {
                    chatId: newChat.data.id,
                    userId: this.props.currentUser.id,
                    username: otherUser.username,
                    lineText: currentMessage,
                    time: curTime
                }
                let chatIcons = this.state.chatIcons
                //create new chat icon
                chatIcons.push(chatDataItem)
                this.setState({
                    chatIcons,
                    currentChat: newChat.data
                })

                let messageObject = {
                    id: this.props.currentUser.id,
                    username: this.props.currentUser.username,
                    lineText: currentMessage,
                    conversationId: newChat.data.id,
                    otherUserId: newChat.data.userTwoId
                }

                let newMessageObject = {
                    chatId: newChat.data.id,
                    userId: this.props.currentUser.id,
                    lineText: currentMessage,
                    time: curTime
                }

                //store message in the database. if successful, emit a message event
                await axios.post("https://books-away.herokuapp.com/api/inbox/chatline", newMessageObject)
                .then(() => {
                    this.redirectToConversation(newChat.data.id)
                    socket.emit('iconUpdate', messageObject)
                    this.leavePersonalRoom(this.state.otherUser.username)
                })
                .catch((err) => {
                console.log("Could not send message")
                console.log(err)})
            })
        }
        //chat already exists
        else {
            this.joinPersonalRoom(this.state.otherUser.username)
            let messageObject = {
                id: this.props.currentUser.id,
                username: this.props.currentUser.username,
                lineText: currentMessage,
                conversationId: this.state.currentChat.id
            }

            let newMessageObject = {
                chatId: this.state.currentChat.id,
                userId: this.props.currentUser.id,
                lineText: currentMessage,
                time: curTime
            }

            let chatDataItem = {
                chatId: this.state.currentChat.id,
                userId: this.props.currentUser.id,
                username: otherUser.username,
                lineText: currentMessage,
                time: curTime
            }
            //update chat icon
            let chatIcons = this.state.chatIcons
            for (let i = 0; i < chatIcons.length; i++) {
                if (chatIcons[i].chatId === chatDataItem.chatId) {
                    chatIcons[i] = chatDataItem
                    break
                }
            }
            this.setState({chatIcons})

            //store message in the database. if successful, emit a message event
            await axios.post("https://books-away.herokuapp.com/api/inbox/chatline", newMessageObject)
            .then(() => {
                socket.emit('iconUpdate', messageObject)
                this.leavePersonalRoom(this.state.otherUser.username)

            })
            .catch((err) => {
                console.log("Could not send message")
                console.log(err)
            })
        }
    }

    //fetch all messages in the selected conversation and other user's information
    redirectToConversation = async conversationId => {
        this.changeRoom(conversationId)
        let fullConversation = []
        let requestObj = {
            conversationId
        }
        let chatIcons = this.state.chatIcons;
        for (let i = 0; i < chatIcons.length; i++) {
            if (chatIcons[i].chatId === conversationId) {
                chatIcons[i].new = false
            }
        }
        let otherUser = {}
        //find chat
        let thisChat = await axios.post("https://books-away.herokuapp.com/api/inbox/findchat/", requestObj)
        if (thisChat.data) {
            thisChat = thisChat.data
        }
        else {
            console.log("Couldn't fetch chat")
            return
        }
        //get messages in the conversation
        let thisChatId = thisChat.id
        await axios.get(`https://books-away.herokuapp.com/api/inbox/chatlines/${thisChatId}`)
        .then(async response => {
            fullConversation = response.data
            let otherUserId = thisChat.userOneId
            if (thisChat.userOneId === this.props.currentUser.id) {
                otherUserId = thisChat.userTwoId
            }
            let currentConversationUsername = ""
            //get other user's username
            await axios.get(`https://books-away.herokuapp.com/api/user/${otherUserId}`)
            .then(response => {
                otherUser = response.data
                currentConversationUsername = otherUser.username
                //for each message in the conversation, set the username of the user that sent the message (based on userId property)
                for (let i = 0; i < fullConversation.length; i++) {
                    if (fullConversation[i].userId === this.props.currentUser.id) {
                        fullConversation[i].username = this.props.currentUser.username
                    }
                    else {
                        fullConversation[i].username = currentConversationUsername
                    }
                }
                this.setState({
                    currentChat: thisChat,
                    otherUser,
                    currentConversation: fullConversation,
                    chatIcons
                })
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    //update the conversation on socket message event
    outputMessage = messageObject => {
        let chatDataItem = {
            chatId: this.state.currentChat.id,
            username: messageObject.username,
            lineText: messageObject.line,
            time: messageObject.time
        }
        let fullConversation = this.state.currentConversation
        fullConversation.push(chatDataItem)
        this.setState({
            currentConversation: fullConversation
        })
    }

    //update chat preview icons on socket updateRequired event
    updateIcons = message => {
        if (message.otherUserId) {
            if (message.otherUserId === this.props.currentUser.id) {
                //new chat. add a new icon
                let chatDataItem = {
                    userId: message.id,
                    chatId: message.conversationId,
                    username: message.username,
                    lineText: message.line,
                    time: message.time,
                    new: true
                }
                let chatIcons = this.state.chatIcons
                chatIcons.push(chatDataItem);
                this.setState({chatIcons})
            }
        }
        //existing chat. update the icon
        else {
            let chatDataItem = {
                chatId: message.conversationId,
                userId: message.id,
                username: message.username,
                lineText: message.line,
                time: message.time
            }
            if (this.state.currentChat.id !== chatDataItem.chatId) {
                chatDataItem.new = true
            }
            let chatIcons = this.state.chatIcons
            for (let i = 0; i < chatIcons.length; i++) {
                if (chatIcons[i].chatId === chatDataItem.chatId) {
                    chatIcons[i] = chatDataItem
                    break
                }
            }
            this.setState({chatIcons})
        }
    }

    //leave current chat room and join the new one (change socket room)
    changeRoom = roomId => {
        if (this.state.currentChat.id) {
            this.leaveRoom(this.state.currentChat.id)
        }
        this.joinRoom(roomId)
    }

    //rooms for conversation & message updates

    joinRoom = roomId => {
        socket.emit('joinRoom', roomId)
    }

    leaveRoom = roomId => {
        socket.emit('leaveRoom', roomId)
    }

    //rooms for conversation preview icons updates

    joinPersonalRoom = roomId => {
        socket.emit('joinRoom', roomId)
    }

    leavePersonalRoom = roomId => {
        socket.emit('leaveRoom', roomId)
    }



    render() {
        if (!this.props.currentUser.id) {
            return(
                <Redirect to = "/"/>
            )
        }
        return(
            <div style = {{height:"100vh"}} className="chat-component-container"> 
                <div className="chat-center">
                    <div className="chatlist">
                        <ChatList 
                        chats={this.state.chatIcons} 
                        redirectToConversation={this.redirectToConversation}
                        currentUserId={this.props.currentUser.id}
                        />
                    </div>
                    <div className="conversation">
                        <ConversationWindow
                        conversation={this.state.currentConversation} 
                        conversationUsername={this.state.otherUser.username}
                        handleChatFormChange={this.handleChatFormChange} 
                        handleChatFormSubmit={this.handleChatFormSubmit}
                        message={this.state.message}
                        currentUserUsername={this.props.currentUser.username}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      currentUser: state.currentUser,
      currentChat: state.currentChat,
    }
  }
  
  export default connect (mapStateToProps, {
      setChat,
      cancelRedirect
  })(Chat);