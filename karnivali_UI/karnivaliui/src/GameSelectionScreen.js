import {GameSelectionStyles } from "./Components/GameSelection.styles";
import {useHistory} from 'react-router-dom';


function GameSelectionScreen(){

    const history = useHistory();

    const routeChange = () =>{ 
        let path = 'start-or-join'; 
        history.push(path);
    }
    // const routeChangetoTTT = () =>{ 
    //     let path = 'tic-tac-toe'; 
    //     history.push(path);
    // }
    // const routeChangetoRPS = () =>{ 
    //     let path = 'rock-paper-scissor'; 
    //     history.push(path);
    // }

    return(
        <GameSelectionStyles>
            //todo = tic tac toe and rock paper scissor look, buttons etc.
        </GameSelectionStyles>
    );
}
export default GameSelectionScreen;