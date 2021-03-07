import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import '../Styles/PostButtons.css';
import Navbar from "./Navbar.js";
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