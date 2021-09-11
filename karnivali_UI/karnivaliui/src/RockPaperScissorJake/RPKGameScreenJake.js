import React, {useState} from "react";
import { ReactDOM } from "react";

import RPSObject from "./rockPaperScissorJake";
import "./rockPaperScissorJake.css";

function RPSGameScreen() {
    


    return (
      <div className="RPSboard">
          <RPSObject Name="leftObject"/>
          <RPSObject Name="middleObject"/>
          <RPSObject Name="rightObject"/>
      </div>
    );
  }


export default RPSGameScreen;