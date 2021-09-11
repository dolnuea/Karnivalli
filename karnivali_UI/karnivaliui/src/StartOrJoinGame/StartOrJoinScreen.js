import React from "react";
import reactDom from "react-dom";

import SelectBox from "./StartOrJoinGame.js";
import './StartOrJoinGame.css';

function StartOrJoinScreen() {
    return (
      <div className="StartJoinScreen">
        <SelectBox name="Start Game"/>
        <SelectBox name="Join Game"/>
      </div> 
    );
  }
  
  export default StartOrJoinScreen;
  