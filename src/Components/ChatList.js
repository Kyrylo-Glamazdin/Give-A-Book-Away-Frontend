import React, {Component} from 'react'
import ChatIconItem from './ChatIconItem';
import '../Styles/ChatList.css';

// All chat preview icons that correspond to each chat associated with the current user.
// redirect to chat's conversation when clicking on the chat icon
class ChatList extends Component {
    render() {
        return(
            <div className="chat-list">
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