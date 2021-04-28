import React, {Component} from 'react'

class ConversationWindow extends Component {
    render() {
        if (this.props.conversationUsername) {
            return(
                <div>
                    <div>
                        {this.props.conversationUsername}
                    </div>
                    {this.props.conversation.map(line => (
                        <div 
                            key={line.id}>
                            {line.username}
                            {line.lineText}
                            {line.time}
                        </div>
                    ))}
                    <form onSubmit={this.props.handleChatFormSubmit}>
                        <input name="message" value={this.props.message} onChange={this.props.handleChatFormChange}/>
                        <input type="submit"/>
                    </form>
                </div>
            );
        }
        else {
            return(
                <div>
                    Select a chat to start messaging
                </div>
            );
        }
    }
}

export default ConversationWindow;