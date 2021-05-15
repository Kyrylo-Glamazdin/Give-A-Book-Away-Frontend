import React, {Component} from 'react'
import LineText from './LineText'
import ImageIcon from './ImageIcon'
import '../Styles/ChatIconItem.css'

// Individual chat preview icon
class ChatIconItem extends Component {
    //display chat's other user's username, the last chat message, and last message time
    render() {
        //highlight the message in green if it was just received and haven't been read yet
        if (this.props.chat.new) {
            return(
                <div className="conversation-container" onClick={() => {
                    this.props.redirectToConversation(this.props.chat.chatId)
                    }}>
                    <div className="img-icon"> 
                        <ImageIcon firstLetter={this.props.chat.username[0] || "A"}/>
                    </div>
                    <div className="additional-info">
                        <div className="icon-username">
                            {this.props.chat.username}
                        </div>
                        <div className="icon-line-new">
                            <LineText currentUserId={this.props.currentUserId} chat={this.props.chat} />
                        </div>
                        <div className="icon-time">
                            {this.props.chat.time}
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return(
                <div className="conversation-container" onClick={() => {
                    this.props.redirectToConversation(this.props.chat.chatId)
                    }}>
                    <div className="img-icon"> 
                        <ImageIcon firstLetter={this.props.chat.username[0] || "A"}/>
                    </div>
                    <div className="additional-info">
                        <div className="icon-username">
                            {this.props.chat.username}
                        </div>
                        <div className="icon-line">
                            <LineText currentUserId={this.props.currentUserId} chat={this.props.chat} />
                        </div>
                        <div className="icon-time">
                            {this.props.chat.time}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default ChatIconItem;