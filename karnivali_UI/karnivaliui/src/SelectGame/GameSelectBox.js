import React from "react";
import reactDom from "react-dom";

import "./GameSelectBox.css";

const redAlert = () => {
    alert("Let's party!")
};

function GameSelectBox(props) {
    return (
        <div className="gameSelectBox" onClick={redAlert}>
            <h1>
                {props.name}
            </h1>
        </div>
    );
}

export default GameSelectBox;