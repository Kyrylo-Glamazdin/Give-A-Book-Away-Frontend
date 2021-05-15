import React from 'react'
import '../Styles/Message.css'

// Individual message in a message list.
//highlight message differently based on which user is logged in
function Message(props) {
    if (props.currentUserUsername === props.username) {
        //logged in user's message
        return(
            <div className="current-user">
                <div className="message-username">
                    {props.username}
                </div>
                <div className="message-time">
                    {props.time}
                </div>
                <div className="message-line">
                    {props.lineText}
                </div>
            </div>
        )
    }
    //other user's message
    else {
        return(
            <div className="other-user">
                <div className="message-username">
                    {props.username}
                </div>
                <div className="message-time">
                    {props.time}
                </div>
                <div className="message-line">
                    {props.lineText}
                </div>
            </div>
        )
    }
}
export default Message;