import React from "react";
import { ReactDOM } from "react";
import { StartButton, WelcomeWindow } from "./Components/Welcome.styles";


const redAlert = () => {
    alert("Let's party!")
}


function WelcomeScreen() {
    return (
        <WelcomeWindow>
            <h1>
                Welcome to Karnivali!
            </h1>

            <StartButton onClick={redAlert}>
                Click to get started!
            </StartButton>
        </WelcomeWindow>
    );
}

export default WelcomeScreen;