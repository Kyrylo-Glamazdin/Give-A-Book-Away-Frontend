import React, {Component} from 'react'
import '../Styles/ConversationWindow.css'
import Message from './Message'


class ConversationWindow extends Component {
    render() {
        if (this.props.conversationUsername) {
            return(
                <div className="conversation-list">
                    <div className="conversation-username">
                        {this.props.conversationUsername}
                    </div>
                    {this.props.conversation.map(line => (
                        <Message
                            key={Math.random()}
                            username={line.username}
                            lineText={line.lineText}
                            time={line.time}
                            currentUserUsername={this.props.currentUserUsername}
                            />
                    ))}
                    <form className="chat-form" onSubmit={this.props.handleChatFormSubmit}>
                        <input className="text-input" autoComplete="off" type="text" name="message" value={this.props.message} onChange={this.props.handleChatFormChange}/>
                        <input className="send-button" type="submit" value="Send" />
                    </form>
                </div>
            );
        }
        else {
            return(
                <div className="empty-conversation">
                    Select a chat to start messaging
                </div>
            );
        }
    }
}

export default ConversationWindow;