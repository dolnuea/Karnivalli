import { Panel, SelectionPanel } from "./styles/GameSelection.styles";
import { useHistory } from 'react-router-dom';
import ticTacToeImage from './images/tic-tac-toe.png';
import RockPaperScissorsImage from './images/rock-paper-scissors.png';
import mineSweeperImage from './images/minesweeper USE THIS ONE.svg';


function GameSelectionScreen() {

    const history = useHistory();

    const routeChange = (game) => {
        // TODO: once the logic for page flow has been sorted, this should pass the game selection to the start or joing page
        let path = 'start-or-join';
        history.push({
            pathname: path,
            state: game
        });
    }

    return (
        <SelectionPanel>
            <Panel hoverColor='#DAF7A6' onClick={() => routeChange('tic-tac-toe')}>
                <img src={ticTacToeImage} height='60%'></img>
                <h1>TicTacToe</h1>
            </Panel>
            <Panel hoverColor='#FF5733' onClick={() => routeChange('rock-paper-scissor')}>
                <img src={RockPaperScissorsImage} height='60%'></img>
                <h1>Rock Paper Scissors</h1>
            </Panel>

            <Panel hoverColor='#FFC300' onClick={() => routeChange('minesweeper')}>
                <img src={mineSweeperImage} height='60%'></img>
                <h1>4D Minesweeper</h1>
                
            </Panel>
        </SelectionPanel>
    );
}
export default GameSelectionScreen;