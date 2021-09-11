import React from "react";
import { ReactDOM } from "react";
import "./rockPaperScissorJake.css";

function RPSObject() {
    

    let roll = () => {
        let randNum = Math.floor(Math.random() * 3);
        console.log(randNum);
        return(randNum);
    };

    // Need to find a way to roll the roll function individually for each object and display it in the shape

    return (
      <div className="RPKboard">
          <div className="RPSobject RPSLeft" onClick={roll}>
            <h1>Test</h1>
          </div>

          <div className="RPSobject RPSMiddle" onClick={roll}>
            Click to get started!
          </div>

          <div className="RPSobject RPSRight" onClick={roll}>
            Click to get started!
          </div>
      </div>
    );
  }


export default RPSObject;