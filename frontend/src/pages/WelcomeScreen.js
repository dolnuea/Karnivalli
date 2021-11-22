import React from "react";
import { ReactDOM } from "react";
import { useHistory } from 'react-router-dom';
import StartOrJoinScreen from "./StartOrJoinScreen.js";
import { StartButton, WelcomeWindow } from "./Components/Welcome.styles";
import Navbar from "./Navbar";



function WelcomeScreen(props) {

    const history = useHistory();

    const routeChange = () => {
        let path = 'game-selection';
        const userDetails = {
            username: props.location.state.username,
            isGuest: props.location.state.isGuest
        }
        history.push(path, userDetails);
    }

    if (props.location.state.isGuest) {
        return (
            <div>
                <Navbar state={props.location} />

                <WelcomeWindow>
                    <h1>
                        Welcome to Karnivali!
                    </h1>

                    <StartButton onClick={routeChange}>
                        Click Here to Start!
                    </StartButton>
                </WelcomeWindow>
            </div>
        );
    } else {
        return (
            <div>
                <Navbar state={props.location} />

                <WelcomeWindow>
                    <h1>
                        Hi {props.location.state.username}, Welcome to Karnivali!
                    </h1>

                    <StartButton onClick={routeChange}>
                        Click Here to Start!
                    </StartButton>
                </WelcomeWindow >
            </div>

        );
    }

}

export default WelcomeScreen;