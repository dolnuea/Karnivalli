import React from 'react';
import Header from './components/header';
import TicTacToeBody from './components/ticTacToeBody';

const TicTacToe = (props) => {
    console.log("TicTacToe")
    let player = props.location.state.player
    let playerColor = ""
    if (player === "p1") {
        playerColor = "red"
    } else if (player === "p2") {
        playerColor = "blue"
    }
    return (
        <div className="TicTacToe">
            <Header />
            <TicTacToeBody roomNumber={props.location.state.roomCode} playColor={playerColor} />
        </div>
    );
}

export default TicTacToe;
