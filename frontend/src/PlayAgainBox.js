import { PlayAgainScreen, PlayAgainWinLose, ReplayGameBox } from "./styles/PlayAgain.styles";
import { useHistory } from 'react-router-dom';


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
                <h1>
                    You Won/Lost/Tied! Play again?
                </h1>
            </PlayAgainWinLose>

            <ReplayGameBox onClick={gameRouteChange} >
                <h1>
                    Game Select Screen
                </h1>
            </ReplayGameBox>
        </PlayAgainScreen>
    );
}

export default PlayAgainBox;