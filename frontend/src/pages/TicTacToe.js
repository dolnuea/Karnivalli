import React from 'react';
import TicTacToeBody from '../components/TicTacToeBody';
import { Background, Header, headlineTitle } from '../styles/TicTacToe.styles';


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
        <Background>
            <Header>TIC TAC TOE</Header>
            <TicTacToeBody roomNumber={props.location.state.roomCode} playColor={playerColor} player={player} username={props.location.state.username} isGuest={props.location.state.isGuest} />
        </Background>
    );
}

export default TicTacToe;
