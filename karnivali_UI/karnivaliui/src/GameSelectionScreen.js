import { Panel, SelectionPanel } from "./Components/GameSelection.styles";
import { useHistory } from 'react-router-dom';
import ticTacToeImage from './images/tic-tac-toe.png';
import RockPaperScissorsImage from './images/rock-paper-scissors.png';


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
            <Panel hoverColor='#2E64FE' onClick={() => routeChange('tic-tac-toe')}>
                <img src={ticTacToeImage} height='80%'></img>
                <h1>TicTacToe</h1>
            </Panel>
            <Panel hoverColor='coral' onClick={() => routeChange('rock-paper-scissor')}>
                <img src={RockPaperScissorsImage} height='80%'></img>
                <h1>Rock Paper Scissors</h1>
            </Panel>
        </SelectionPanel>
    );
}
export default GameSelectionScreen;