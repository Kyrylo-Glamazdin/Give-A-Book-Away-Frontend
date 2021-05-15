import React, { Component } from 'react'
import Message from './Message'
import '../Styles/MessageList.css'

// Lists all messages in a conversation
class MessageList extends Component {
    //scroll to the bottom of the conversation on component update
    componentDidUpdate() {
        this._div.scrollTop = this._div.scrollHeight;
    }

    //show each message's username, text, and time
    render() {
        return(
            <div className="message-list" ref={(ref) => this._div = ref}>
                {this.props.conversation.map(line => (
                    <Message
                        key={Math.random()}
                        username={line.username}
                        lineText={line.lineText}
                        time={line.time}
                        currentUserUsername={this.props.currentUserUsername}
                        />
                ))}
            </div>
        );
    }
}

export default MessageList;