import React from 'react';
import TicTacToeBody from '../components/TicTacToeBody';
import { Background, Header, HeaderBox } from '../styles/TicTacToe.styles';

import useSound from 'use-sound';
import youWin from '../sounds/8youWin.mp3';
import youLose from '../sounds/9youLose.mp3';
import youTie from '../sounds/10youTied.mp3';
import gameSelect from '../sounds/11gameSelect.mp3';
import playAgain from '../sounds/12playAgain.mp3';
import waitOpponent from '../sounds/13waitForOpponent.wav';

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
