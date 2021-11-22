import React from "react";
import { ReactDOM } from "react";
import { useHistory } from 'react-router-dom';
import StartOrJoinScreen from "./StartOrJoinScreen.js";
import { StartButton, WelcomeWindow } from "../styles/Welcome.styles";




function WelcomeScreen(props) {

    const history = useHistory();

    const routeChange = () => {
        let path = 'game-selection';
        history.push(path);
    }
    console.log(props.location.state.isGuest);
    console.log(props.location.state.username);

    if (props.location.state.isGuest) {
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
    } else {
        return(
        <WelcomeWindow>
            <h1>
                Hi {props.location.state.username}, Welcome to Karnivali!
            </h1>

            <StartButton onClick={routeChange}>
                Click Here to Start!
            </StartButton>
        </WelcomeWindow >
            );
    }
   
}

export default WelcomeScreen;