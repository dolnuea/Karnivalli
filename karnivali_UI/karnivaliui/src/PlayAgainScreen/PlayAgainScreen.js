import react from "react";
import reactDom from "react-dom";

import PlayAgainBox from "./PlayAgainBox";
import "./PlayAgainBox.css";


function PlayAgainScreen() {
    return(
        <div className="playAgainScreen">
            <PlayAgainBox name="You Won/Lost/Tied! Play again?"/>
            <PlayAgainBox name="Game Select Screen"/>
        </div>
    );
}

export default PlayAgainScreen;