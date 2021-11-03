import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import MinesweeperBody from './components/MinesweeperBody';

/**
 * The goal of the game is to find all the mines on the board.
You reveal mines by clicking the cells, if you reveal a mine you loose.
If you reveal a cell without mine it will show number of mines surrounding the cell.
You can flag a field by right clicking it.
You win the game if you are able to reveal all the cells that is not a mine or you have flagged all the cells that is a mine.
In the current implementation the game is over when you reveal all squares that are mine free.
No flagging yet

Resources used:
https://github.com/H2rmone/react-minesweeper
https://codeburst.io/learning-react-js-by-building-a-minesweeper-game-ced9d41560ed

Final demo improvement:
https://github.com/WanderHuang/react-minesweeper-sweep-it
https://github.com/OleksandrYehorov/minesweeper

cool version:
https://github.com/kauer3/beesweeper-web

 */

const Minesweeper = (props) => {
    
    console.log("Minesweeper")
    let height = 16;
    let width = 16;
    let mines = 40;

    let player = props.location.state.player
    
    //const{height, width, mines} = this.state;
    /**
     * 
     * Render: display the specified HTML code inside the specified HTML element.
     */
    return(
            <div className="game">
                <MinesweeperBody height={height} width={width} mines={mines}/>
             </div>
        );
}

export default Minesweeper;