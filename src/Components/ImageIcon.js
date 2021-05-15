import React from 'react'
import '../Styles/ImageIcon.css'

// Small image icon containing the first letter of the user's username. Displayed in chat preview icons
function ImageIcon(props) {
    return(
        <div className={"image-icon-"+props.firstLetter || "image-icon-A"}>
            {props.firstLetter}
        </div>
    )
}
export default ImageIcon;