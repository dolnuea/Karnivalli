import React from "react";
import { ReactDOM } from "react";
import "./welcomePage.css";


function StartBtn() {
    

    const redAlert = () => {
        alert("Let's party!")
    };


    return (
      <div>
          <button className="btn" onClick={redAlert}>
            Click to get started!
          </button>
      </div>
    );
  }


export default StartBtn;