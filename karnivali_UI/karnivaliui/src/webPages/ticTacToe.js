import React from 'react';
import Header from './components/header';
import TicTacToeBody from './components/ticTacToeBody';
import ScreenImg from  '../images/Tic_Tac_Toe1.jpg';


const TicTacToe = (props) => {
    console.log("TicTacToe")
    let player = props.location.state.player
    let playerColor = ""
    if (player === "p1") {
        playerColor = "#581845"

    } else if (player === "p2") {
        playerColor = "#FFC30F"
    } else if (player === "viewer") {
        playerColor = "viewer"
    }
    return (
        <div className="TicTacToe" style = {{backgroundImage : `url(${ScreenImg})` }}>
            <Header />
            <TicTacToeBody roomNumber={props.location.state.roomCode} playColor={playerColor} />
        </div>
    );
}

export default TicTacToe;
