import { PlayAgainScreen, PlayAgainWinLose, ReplayGameBox, ReplayIconSVG, GameSelectIconSVG } from "./styles/PlayAgain.styles";
import { useHistory } from 'react-router-dom';

import replayIcon from './images/hollowBlueReplay.svg'
import quitIcon from './images/_darkBlueController.svg'

const redAlert = () => {
    alert("Let's party!")
};

function PlayAgainBox(props) {
    console.log("In play again", props)
    const history = useHistory();

    const routeChange = () => {
        let path = ''; //go to welcome page
        history.push(path);
    }
    const gameRouteChange = () => {
        let path = 'game-selection'; //go to welcome page
        history.push(path);
    }

    return (
        <PlayAgainScreen>
            <PlayAgainWinLose onClick={routeChange} >
                <ReplayIconSVG src={replayIcon} alt='replay icon' width="50%"></ReplayIconSVG>
                <h1>
                    Click to Play Again
                </h1>

            </PlayAgainWinLose>

            <ReplayGameBox onClick={gameRouteChange} >
                <GameSelectIconSVG src={quitIcon} alt='quit icon' width="100%"></GameSelectIconSVG>
                <h1>
                    Game Select Screen
                </h1>
            </ReplayGameBox>
        </PlayAgainScreen>
    );
}

export default PlayAgainBox;