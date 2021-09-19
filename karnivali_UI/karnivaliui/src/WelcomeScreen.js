import React from "react";
import { ReactDOM } from "react";
import {useHistory} from 'react-router-dom';
import StartOrJoinScreen from "./StartOrJoinScreen.js";
import { StartButton, WelcomeWindow } from "./Components/Welcome.styles";


// const redAlert = () => {
//     alert("Let's party!")
// }

function WelcomeScreen() {

    const history = useHistory();

    const routeChange = () =>{ 
        let path = 'game-selection'; 
        history.push(path);
    }

    return (
        <WelcomeWindow>
            <h1>
                Welcome to Karnivali!
            </h1>

            <StartButton onClick={routeChange}>
                Click Here to Start!
            </StartButton>
        </WelcomeWindow>
    );
}

export default WelcomeScreen;