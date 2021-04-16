import React, {Component} from 'react'
import ChatIconItem from './ChatIconItem';
class ChatList extends Component {

    redirectToConversation = (chatId) => {
        this.props.joinRoom(chatId)
        this.props.redirectToConversation(chatId)
    }

    render() {
        return(
            <div>
                {this.props.chats.map(chat => {
                    return( <ChatIconItem 
                        key={"chat"+chat.id} 
                        chat={chat} 
                        redirectToConversation={this.redirectToConversation} />)})} 
            </div>
        );
    }
}

export default ChatList;