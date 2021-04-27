import React, {Component} from 'react'

class ConversationWindow extends Component {
    render() {
        if (this.props.conversationUsername) {
            console.log(this.props.conversationUsername)
            for (let i = 0; i < this.props.conversation.length; i++) {
                console.log(this.props.conversation[i].username)
                if (this.props.conversation[i].username !== this.props.conversationUsername
                    && this.props.conversation[i].username !== this.props.currentUser.username) {
                        console.log('detected force update in conversation window')
                        this.props.renderConversationOnMessageReceive(this.props.conversationId)
                    }
            }
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