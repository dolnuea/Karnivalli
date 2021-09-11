import react from "react";
import reactDom from "react-dom";

import GameSelectBox from "./GameSelectBox";
import "./GameSelectBox.css";


function GameSelectScreen(){
    return(
        <div className="gameSelectScreen">
            <GameSelectBox name="Rock Paper Scissors"/>
            <GameSelectBox name="Tic Tac Toe"/>
        </div> 
    );
}

export default GameSelectScreen;