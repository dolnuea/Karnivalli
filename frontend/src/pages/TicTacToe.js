import React from 'react';
import TicTacToeBody from '../components/TicTacToeBody';
import { Background, Header, HeaderBox } from '../styles/TicTacToe.styles';


const TicTacToe = (props) => {
    console.log("TicTacToe")
    let player = props.location.state.player
    let playerColor = ""
    if (player === "p1") {
        playerColor = "#ff124f"

    } else if (player === "p2") {
        playerColor = "#120458"
    } else if (player === "viewer") {
        playerColor = "viewer"
    }
    return (
        <Background>
            <Header>
                <HeaderBox>
                Tic Tac Toe
                </HeaderBox>
            </Header>
            <TicTacToeBody roomNumber={props.location.state.roomCode} playColor={playerColor} player={player} username={props.location.state.username} isGuest={props.location.state.isGuest} />
        </Background>
    );
}

export default TicTacToe;
