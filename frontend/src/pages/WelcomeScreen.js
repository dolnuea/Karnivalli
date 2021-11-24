import React from "react";
import { ReactDOM } from "react";
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import StartOrJoinScreen from "./StartOrJoinScreen.js";
import { StartButton, WelcomeWindow, WelcomeColumnLeft, WelcomeColumnRight, ImageSVG } from "../styles/Welcome.styles";
import Navbar from "../Navbar";

import tvSVG from '../images/hotPinkTV.svg';
import redController from "../images/filledBrightRedController.svg"
import blueController from "../images/filledDarkBlueController.svg"
import purpleController from "../images/filledLightBlueController.svg"

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
                    <WelcomeColumnLeft>
                        <h1>
                            Welcome to Karnivali!
                        </h1>

                        <StartButton hoverColor='rgb(88, 24, 69, 0.7)' onClick={routeChange}>
                            Click Here to Start!
                        </StartButton>
                    </WelcomeColumnLeft>
                        
                    <WelcomeColumnRight>
                        <ImageSVG src={tvSVG} alt='tv image'></ImageSVG>
                        <ImageSVG src={redController} alt='red controller'></ImageSVG>
                        <ImageSVG src={blueController} alt='blue controller'></ImageSVG>
                        <ImageSVG src={purpleController} alt='purple controller'></ImageSVG>
                    </WelcomeColumnRight>
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

                    <StartButton hoverColor='rgb(73, 11, 150, 0.7)' onClick={routeChange}>
                        Click Here to Start!
                    </StartButton>
                </WelcomeWindow >
            </div>

        );
    }

}

export default WelcomeScreen;