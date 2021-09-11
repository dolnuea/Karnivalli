import React from "react";
import reactDom from "react-dom";

import "./PlayAgainBox.css";

const redAlert = () => {
    alert("Let's party!")
};

function PlayAgainBox(props) {
    return (
        <div className="playAgainBox" onClick={redAlert} >
            <h1>
                {props.name}
            </h1>
        </div>
    );
}

export default PlayAgainBox;