import React from "react";
import { ReactDOM } from "react";

import Welcome from './welcomeBox';
import StartBtn from './clickStartBox';
import "./welcomePage.css";


function WelcomeScreen() {
    return (

            <div className="Window">

                <Welcome />
                <StartBtn />

            </div>



    );
}

export default WelcomeScreen;