import React from 'react';
import Header from './components/header';
import TicTacToeBody from './components/ticTacToeBody';
import ScreenImg from  '../images/wrinkledpaper.jpg';

const TicTacToe = (props) => {
    return (
        <div className="TicTacToe" style = {{backgroundImage : `url(${ScreenImg})` }}>
            <Header />
            <TicTacToeBody roomNumber={props.roomNumber} playColor={props.playColor} />
        </div>
    );
}

export default TicTacToe;
