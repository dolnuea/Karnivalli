import React from "react";
import reactDom from "react-dom";
import './StartOrJoinGame.css';

function SelectBox(props) {

    const redAlert = () => {
        alert("Let's party!")
    };



    return (
        <div className="Gamebox" onClick={redAlert}>
            <h1>
                {props.name}
            </h1>
        </div>
    );
}

export default SelectBox;
