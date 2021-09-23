import React from 'react';
import Header from './components/header';
import TicTacToeBody from './components/ticTacToeBody';
import ScreenImg from  '../images/wrinkledpaper.jpg';

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
        <div className="TicTacToe" style = {{backgroundImage : `url(${ScreenImg})` }}>
            <Header />
            <TicTacToeBody roomNumber={props.location.state.roomCode} playColor={playerColor} />
        </div>
    );
}

export default TicTacToe;
