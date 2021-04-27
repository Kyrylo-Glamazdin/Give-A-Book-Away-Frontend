import React, {Component} from 'react'
import ChatIconItem from './ChatIconItem';
class ChatList extends Component {
    render() {
        // let seen = new Set()
        // const chats = this.props.chats.filter(chat => {
        //     const duplicate = seen.has(chat.chatId);
        //     seen.add(chat.chatId);
        //     if (duplicate) {
        //         console.log('detected duplicate')
        //         this.props.redirectToConversation(this.props.conversationId)
        //     }
        //     return !duplicate;
        // })
        let chats = [];
        let uniqueObject = {};
        for (let i in this.props.chats) {
            let objUsername = this.props.chats[i]['username'];
            uniqueObject[objUsername] = this.props.chats[i];
        }

        for (let i in uniqueObject) {
            chats.push(uniqueObject[i])
        }
        return(
            <div>
                {chats.map(chat => {
                    console.log(chat)
                    return( <ChatIconItem 
                        key={"chat"+chat.id} 
                        chat={chat} 
                        redirectToConversation={this.props.redirectToConversation} />)})} 
            </div>
        );
    }
}

export default ChatList;