import React, {Component} from 'react'
import MessageList from './MessageList'
import '../Styles/ConversationWindow.css'

// Lists all messages in the currently selected chat
class ConversationWindow extends Component {
    // show the username of the user that sent each message, as well as the message time
    render() {
        if (this.props.conversationUsername) {
            return(
                <div className="conversation-list">
                    <div className="conversation-username">
                        {this.props.conversationUsername}
                    </div>
                    <form className="chat-form" onSubmit={this.props.handleChatFormSubmit}>
                        <input className="text-input" autoComplete="off" type="text" name="message" value={this.props.message} onChange={this.props.handleChatFormChange}/>
                        <input className="send-button" type="submit" value="Send" />
                    </form>
                    <MessageList 
                        conversation={this.props.conversation}
                        currentUserUsername={this.props.currentUserUsername}
                    />
                </div>
            );
        }
        //if there's no chat selected, display a message asking user to select a chat
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