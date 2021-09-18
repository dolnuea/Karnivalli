import { PlayAgainScreen, PlayAgainWinLose, ReplayGameBox } from "./Components/PlayAgain.styles";
import {useHistory} from 'react-router-dom';


const redAlert = () => {
    alert("Let's party!")
};

function PlayAgainBox(props) {

    const history = useHistory();

    const routeChange = () =>{ 
        let path = ''; //go to welcome page
        history.push(path);
    }

    return (
        <PlayAgainScreen>
            <PlayAgainWinLose onClick={redAlert} >
                <h1>
                    You Won/Lost/Tied! Play again?
                </h1>
            </PlayAgainWinLose>

            <ReplayGameBox onClick={redAlert} >
                <h1>
                    Game Select Screen
                </h1>
            </ReplayGameBox>
        </PlayAgainScreen>
    );
}

export default PlayAgainBox;