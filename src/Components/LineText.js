import React from 'react'
import '../Styles/LineText.css'

// Last message in the conversation. Displayed in the chat preview icon
function LineText(props) {
    //display "You: " in front of the message if the message was sent by the logged in user
    if (props.currentUserId === props.chat.userId) {
        //crop the message if too long to fit in the preview
        if (props.chat.lineText.length > 22) {
            let lineText = props.chat.lineText.substr(0, 22) + "...";
            return(
                <div>
                    <div className="you-container">You: </div> {lineText}
                </div>
            )
        }
        else {
            return(
                <div>
                    <div className="you-container">You: </div> {props.chat.lineText}
                </div>
            )
        }
    }
    //display just the message if it was sent by the other user
    else {
        //crop if the message is too long to fit in preview
        if (props.chat.lineText.length > 26) {
            let lineText = props.chat.lineText.substr(0, 26) + "...";
            return (
                <div>
                    {lineText}
                </div>
            )
        }
        else {
            return(
                <div>
                    {props.chat.lineText}
                </div>
            )
        }
    }
}

export default LineText;