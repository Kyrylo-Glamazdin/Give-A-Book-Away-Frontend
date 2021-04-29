import React, {Component} from 'react'
import ChatIconItem from './ChatIconItem';
class ChatList extends Component {
    render() {
        return(
            <div>
                {this.props.chats.map(chat => {
                    return( <ChatIconItem 
                        key={"chat"+chat.chatId} 
                        chat={chat} 
                        redirectToConversation={this.props.redirectToConversation}
                        currentUserId={this.props.currentUserId}
                        />)})} 
            </div>
        );
    }
}

export default ChatList;