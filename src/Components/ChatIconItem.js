import React, {Component} from 'react'

class ChatIconItem extends Component {
    render() {
        return(
            <div onClick={() => {
                console.log(this.props.chat.chatId)
                this.props.redirectToConversation(this.props.chat.chatId)
                }}>
                {this.props.chat.time}
                {this.props.chat.username}
                {this.props.chat.lineText}
            </div>
        );
    }
}

export default ChatIconItem;