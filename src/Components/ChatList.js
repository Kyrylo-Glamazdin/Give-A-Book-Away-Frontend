import React, {Component} from 'react'
import ChatIconItem from './ChatIconItem';
class ChatList extends Component {
    render() {
        return(
            <div>
                {this.props.chats.map(chat => {
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