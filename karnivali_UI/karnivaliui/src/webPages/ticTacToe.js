import React from 'react';
import Header from './components/header';
import TicTacToeBody from './components/ticTacToeBody';

const TicTacToe = (props) => {
    return (
        <div className="TicTacToe">
            <Header />
            <TicTacToeBody roomNumber={props.roomNumber} playColor={props.playColor} />
        </div>
    );
}

export default TicTacToe;
