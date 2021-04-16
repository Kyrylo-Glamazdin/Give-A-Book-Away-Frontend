import React, {Component} from 'react'

class ChatIconItem extends Component {
    render() {
        return(
            <div onClick={() => this.props.redirectToConversation(this.props.chat.id)}>
                {this.props.chat.username}
                {this.props.chat.lineText}
                {this.props.chat.updatedAt}
            </div>
        );
    }
}

export default ChatIconItem;