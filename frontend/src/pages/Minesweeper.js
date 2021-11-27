import React, { } from 'react';
import MinesweeperBody from '../components/MinesweeperBody';
import { MinesweeperContainer } from '../styles/Minesweeper.styles';

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

export default class Minesweeper extends React.Component {

    state = {
        height: 16,
        width: 16,
        mines: 40,
    };


    render() {
        const { height, width, mines } = this.state;
        return (
            <MinesweeperContainer>
                <MinesweeperBody height={height} width={width} mines={mines} roomNumber={this.props.location.state.roomCode} player = {this.props.location.state.player} />
            </MinesweeperContainer>
        );
    }
}
