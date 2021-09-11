import React from "react";
import reactDom from "react-dom";
import './StartOrJoinGame.css';

function SelectBox(props) {
    return (
      <div className="Gamebox">
        <h1>
            {props.name}
        </h1>
      </div>
    );
  }
  
  export default SelectBox;
  