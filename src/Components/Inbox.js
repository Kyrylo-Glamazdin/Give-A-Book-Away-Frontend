import React, {Component, useContext} from 'react';
import ChatList from './ChatList';
import ConversationWindow from './ConversationWindow';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {addUser, cancelRedirect, setChat, addChat, clearChats, addIcon, setIcons, editIcon, deleteIcons, setConversationUsername, deleteConversationUsername, setMessage, clearMessage, setConversation, addMessageToConversation, clearConversation} from "../Actions";
import axios from 'axios';
import moment from 'moment'
import socket from '../socket.js';

class Inbox extends Component {
    componentDidMount() {
        this.joinPersonalRoom(this.props.currentUser.username)
        if (this.props.currentChat.id) {
            this.leaveRoom(this.props.currentChat.id)
        }
        socket.on('message', message => {
            this.outputMessage(message)
          })
          socket.on('updateRequired', message => {
              console.log('update required')
            this.updateIcons(message)
          })
        this.props.cancelRedirect()
        // this.buildChatIconData();
        this.openConversation()
    }

    componentWillUnmount() {
        this.leavePersonalRoom(this.props.currentUser.username)
        if (this.props.currentChat.id) {
            this.leaveRoom(this.props.currentChat.id)
        }
        // this.props.setChat({})
        this.props.deleteIcons()
        // this.props.deleteConversationUsername()
        // this.props.clearMessage()
        // this.props.clearConversation()
    }

    updateIcons = message => {
        console.log('chaticons')
        console.log(this.props.chatIcons)
        if (message.otherUserId) {
            if (message.otherUserId === this.props.currentUser.id) {
                console.log('find new chat')
                //new chat
                axios.post("http://localhost:3500/api/inbox/findchat", message.conversationId)
                .then(result => {
                    this.props.addChat(result.data)
                    axios.get(`http://localhost:3500/api/user/${message.id}`)
                    .then(response => {
                        let userData = response.data
                        this.props.addUser(userData)
                        let chatDataItem = {
                            chatId: message.conversationId,
                            username: message.username,
                            lineText: message.line,
                            time: message.time
                        }
                        this.props.addIcon(chatDataItem)
                    })
                })
            }
        }
        else {
            console.log('find existing chat')
            let chatDataItem = {
                chatId: message.conversationId,
                username: message.username,
                lineText: message.line,
                time: message.time
            }
            this.props.editIcon(chatDataItem)
        }
    }

    buildChatIconData = () => {
        this.props.deleteIcons()
        let chatIconData = []
        for (let i = 0; i < this.props.chats.length; i++) {
            let otherUserName = ""
            if (this.props.chats[i].userOneId === this.props.currentUser.id) {
                otherUserName = this.findUsernameById(this.props.chats[i].userTwoId);
            }
            else if (this.props.chats[i].userTwoId === this.props.currentUser.id) {
                otherUserName = this.findUsernameById(this.props.chats[i].userOneId);
            }
            if (otherUserName==="") {
                continue
            }
            axios.get(`http://localhost:3500/api/inbox/chaticonline/${this.props.chats[i].id}`)
            .then(result => {
            let latestChatLineId = result.data
            if (latestChatLineId) {
                axios.get(`http://localhost:3500/api/inbox/chaticonlatest/${latestChatLineId}`)
                .then(chatIconLatest => {
                    let latestChatLine = chatIconLatest.data
                    if (!latestChatLine) {
                        latestChatLine = {username: otherUserName}
                    }
                    else {
                        latestChatLine.username = otherUserName
                    }
                    if (chatIconData.length > 0) {
                        if (!this.iconsEqual(chatIconData[chatIconData.length - 1], latestChatLine)) {
                            this.props.addIcon(latestChatLine)
                            chatIconData.push(latestChatLine)
                        }
                    }
                    else {
                        this.props.addIcon(latestChatLine)
                        chatIconData.push(latestChatLine)
                    }
                })
            }
        })
        }
    }

    iconsEqual = (chatIcon1, chatIcon2) => {
        return (chatIcon1.username === chatIcon2.username)
    }

    openConversation = () => {
        //new chat
        if (this.props.currentChat.new) {
            this.props.deleteIcons()
            let newChat = this.props.currentChat
            delete newChat["new"]
            //this.changeRoom(newChat.id)
            this.props.setChat(newChat)
            let otherUserId = this.props.currentChat.userTwoId;
            axios.get(`http://localhost:3500/api/user/${otherUserId}`)
            .then(response => {
                let userData = response.data
                this.props.addUser(userData)
                this.props.setConversationUsername(userData.username)
                this.props.setConversation([])
            })
        }
        //existing chat
        else if (this.props.currentChat.existing){
            let newChat = this.props.currentChat
            delete newChat["existing"]
            this.props.setChat(newChat)
            // this.changeRoom(this.props.currentChat.id)
            let otherUserId = ""
            if (this.props.currentChat.userOneId === this.props.currentUser.id) {
                otherUserId = this.props.currentChat.userTwoId;
            }
            else if (this.props.currentChat.userTwoId === this.props.currentUser.id) {
                otherUserId = this.props.currentChat.userOneId;
            }
            axios.get(`http://localhost:3500/api/user/${otherUserId}`)
            .then(response => {
                let userData = response.data
                this.props.setConversationUsername(userData.username)
                this.redirectToConversation(this.props.currentChat.id)
            })
            .catch(err => console.log(err))
        }
        else {
            this.props.setConversationUsername("")
            this.props.setConversation([])
        }
        this.props.deleteIcons()
        this.buildChatIconData();
    }

    findUsernameById = id => {
        for (let i = 0; i < this.props.users.length; i++) {
            if (this.props.users[i].id === id) {
                return this.props.users[i].username
            }
        }
    }

    // findLatestChatLine = id => {
    //     axios.get(`http://localhost:3500/api/inbox/chaticonline/${id}`)
    //     .then(result => {
    //         let latestChatLineId = result.data
    //         if (latestChatLineId) {
    //             axios.get(`http://localhost:3500/api/inbox/chaticonlatest/${latestChatLineId}`)
    //             .then(chatIconLatest => {
    //                 console.log('findlatestchatline')
    //                 console.log(chatIconLatest.data)
    //                 return chatIconLatest.data
    //             })
    //         }
    //     })
    // }

    redirectToConversation = conversationId => {
        this.changeRoom(conversationId)
        let fullConversation = []
        let thisChat = this.findChatById(conversationId)
        if (thisChat) {
            this.props.setChat(thisChat)
        }
        let thisChatId = thisChat.id
        axios.get(`http://localhost:3500/api/inbox/chatlines/${thisChatId}`)
        .then(response => {
            fullConversation = response.data
            let otherUserId = thisChat.userOneId
            if (thisChat.userOneId === this.props.currentUser.id) {
                otherUserId = thisChat.userTwoId
            }
            let currentConversationUsername = ""
            axios.get(`http://localhost:3500/api/user/${otherUserId}`)
            .then(response => {
                let userData = response.data
                currentConversationUsername = userData.username
                this.props.setConversationUsername(userData.username)
                for (let i = 0; i < fullConversation.length; i++) {
                    if (fullConversation[i].userId === this.props.currentUser.id) {
                        fullConversation[i].username = this.props.currentUser.username
                    }
                    else {
                        fullConversation[i].username = currentConversationUsername
                    }
                }
                this.props.setConversation(fullConversation)
            })
            .catch(err => console.log(err))

        })
        .catch(err => console.log(err))
        // console.log(thisChat)
        // console.log(thisChat.userOneId)
        // let otherUserId = thisChat.userOneId
        // console.log(otherUserId)
        // if (thisChat.userOneId === this.props.currentUser.id) {
        //     otherUserId = thisChat.userTwoId
        // }
        // let currentConversationUsername = ""
        // await axios.get(`http://localhost:3500/api/user/${otherUserId}`)
        //     .then(response => {
        //         let userData = response.data
        //         currentConversationUsername = userData.username
        //         console.log(userData.username)
        //         this.props.setConversationUsername(userData.username)
        //     })
        //     .catch(err => console.log(err))

        // for (let i = 0; i < fullConversation.length; i++) {
        //     if (fullConversation[i].userId === this.props.currentUser.id) {
        //         fullConversation[i].username = this.props.currentUser.username
        //     }
        //     else {
        //         fullConversation[i].username = currentConversationUsername
        //     }
        // }
        // console.log(fullConversation)
        // this.props.setConversation(fullConversation)
    }

    handleChatFormChange = event => {
        this.props.setMessage(event.target.value)
    }

    handleChatFormSubmit = event => {
        event.preventDefault()
        let currentMessage = this.props.inboxMessage
        this.props.clearMessage();
        let curTime = moment().format('LLL')
        //message to a new user
        if (!this.props.currentChat.id) {
            // let newChatObject = {
            //     userOneId: this.props.currentUser.id,
            //     userTwoId: this.props.currentChat.userTwoId
            // }
            axios.post("http://localhost:3500/api/inbox/chat", this.props.currentChat)
            .then(newChat => {
                this.props.addChat(newChat.data)
                this.changeRoom(newChat.data.userTwoId)
                this.joinPersonalRoom(this.props.currentConversationUsername)
                this.props.setChat(newChat.data)
                //this.redirectToConversation(newChat.data.id)
                let chatDataItem = {
                    chatId: newChat.data.id,
                    username: this.props.currentConversationUsername,
                    lineText: currentMessage,
                    time: curTime
                }
                this.props.addIcon(chatDataItem)
                let messageObject = {
                    id: this.props.currentUser.id,
                    username: this.props.currentUser.username,
                    lineText: currentMessage,
                    conversationId: newChat.data.id,
                    otherUserId: this.props.currentChat.userTwoId
                }

                let newMessageObject = {
                    chatId: newChat.data.id,
                    userId: this.props.currentUser.id,
                    lineText: currentMessage,
                    time: curTime
                }
                axios.post("http://localhost:3500/api/inbox/chatline", newMessageObject)
                .then(() => {
                    this.redirectToConversation(newChat.data.id)
                    //socket.emit('chatMessage', messageObject)
                    socket.emit('iconUpdate', messageObject)
                    this.leavePersonalRoom(this.props.currentConversationUsername)
                })
                .catch((err) => {
                console.log("Could not send message")
                console.log(err)})
            })
        }
        else {
            this.joinPersonalRoom(this.props.currentConversationUsername)
            let chatDataItem = {
                chatId: this.props.currentChat.id,
                username: this.props.currentConversationUsername,
                lineText: currentMessage,
                time: curTime
            }
            this.props.editIcon(chatDataItem)
            let messageObject = {
                id: this.props.currentUser.id,
                username: this.props.currentUser.username,
                lineText: currentMessage,
                conversationId: this.props.currentChat.id
            }

            let newMessageObject = {
                chatId: this.props.currentChat.id,
                userId: this.props.currentUser.id,
                lineText: currentMessage,
                time: curTime
            }
            axios.post("http://localhost:3500/api/inbox/chatline", newMessageObject)
            .then(response => {
                this.redirectToConversation(this.props.currentChat.id)
                //socket.emit('chatMessage', messageObject)
                console.log('sending')
                socket.emit('iconUpdate', messageObject)
                console.log('sent')
                console.log('leaving')
                this.leavePersonalRoom(this.props.currentConversationUsername)
            })
            .catch((err) => {
                console.log("Could not send message")
                console.log(err)
        })
        }
    }

    renderConversationOrMessageReceive = (conversationId, otherUserName) => {
        if (!conversationId) {
            return
        }
        axios.get(`http://localhost:3500/api/inbox/chatlines/${conversationId}`)
        .then(response => {
            let fullConversation = response.data
            for (let i = 0; i < fullConversation.length; i++) {
                if (fullConversation[i].userId === this.props.currentUser.id) {
                    fullConversation[i].username = this.props.currentUser.username
                }
                else {
                    fullConversation[i].username = otherUserName
                }
            }
            this.props.setConversation(fullConversation)
        })
        .catch(err => console.log(err))
    }

    outputMessage = messageObject => {
        if (messageObject.id !== this.props.currentUser.id) {
            let chatDataItem = {
                chatId: this.props.currentChat.id,
                username: messageObject.username,
                lineText: messageObject.line,
                time: messageObject.time
            }
            // this.props.editIcon(chatDataItem)
            this.renderConversationOrMessageReceive(chatDataItem.chatId, chatDataItem.username)
            // this.buildChatIconData()
            //this.forceUpdate()
        }
    }

    findChatById = chatId => {
        for (let i = 0; i < this.props.chats.length; i++) {
            if (this.props.chats[i].id === chatId) {
                return this.props.chats[i]
            }
        }
    }

    addMessageToConversationWrapper = line => {
        let curConvo = this.props.currentConversation;
        curConvo.push(line)
        this.props.setConversation(curConvo)
    }

    changeRoom = roomId => {
        if (this.props.currentChat.id) {
            this.leaveRoom(this.props.currentChat.id)
        }
        this.joinRoom(roomId)
    }

    joinRoom = roomId => {
        socket.emit('joinRoom', roomId)
    }

    leaveRoom = roomId => {
        socket.emit('leaveRoom', roomId)
    }

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
            <div>
                <div>
                    test
                </div> 
                <ChatList 
                chats={this.props.chatIcons} 
                redirectToConversation={this.redirectToConversation}
                conversationId={this.props.currentChat.id}
                buildChatIconData={this.buildChatIconData}
                />
                <ConversationWindow 
                conversation={this.props.currentConversation} 
                conversationUsername={this.props.currentConversationUsername}
                handleChatFormChange={this.handleChatFormChange} 
                handleChatFormSubmit={this.handleChatFormSubmit}
                message={this.props.inboxMessage}
                currentUser={this.props.currentUser}
                renderConversationOnMessageReceive={this.redirectToConversation}
                conversationId={this.props.currentChat.id}
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
      chats: state.chats,
      chatIcons: state.chatIcons,
      currentConversationUsername: state.currentConversationUsername,
      inboxMessage: state.inboxMessage,
      currentConversation: state.currentConversation
    }
  }
  
  export default connect (mapStateToProps, {
    addUser,
    cancelRedirect, 
    setChat, 
    addChat, 
    clearChats, 
    addIcon, 
    editIcon, 
    setIcons,
    deleteIcons, 
    setConversationUsername, 
    deleteConversationUsername, 
    setMessage, 
    clearMessage, 
    setConversation, 
    addMessageToConversation, 
    clearConversation
  })(Inbox);