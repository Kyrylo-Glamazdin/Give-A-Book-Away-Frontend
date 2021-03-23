import React from "react";
import '../Styles/PostButtons.css';
import Upload from './upload'
import DropdownExampleSearchSelection from './searchdropbox'
import DropdownExampleSelection from './condition'
import Buttons from './submit';

function Post() {
  return (
    <div>
      <div className='layout'>
        <div className='keys'>
          <Upload/>
          <DropdownExampleSearchSelection/>
          <DropdownExampleSelection/>
          <Buttons/>
        </div>
      </div>
    </div>
  );
}


export default Post;