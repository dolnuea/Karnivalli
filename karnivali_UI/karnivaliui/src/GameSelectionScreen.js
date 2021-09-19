import {GameSelectionStyles } from "./Components/GameSelection.styles";
import {useHistory} from 'react-router-dom';


function GameSelectionScreen(){

    const history = useHistory();

    const routeChangetoTTT = () =>{ 
        let path = 'tic-tac-toe'; 
        history.push(path);
    }
    const routeChangetoRPS = () =>{ 
        let path = 'rock-paper-scissor'; 
        history.push(path);
    }

    return(
        <GameSelectionStyles>
            //todo = tic tac toe and rock paper scissor
        </GameSelectionStyles>
    );
}
export default GameSelectionScreen;