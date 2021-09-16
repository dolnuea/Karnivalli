import React from "react";
import { ReactDOM } from "react";

import { Button } from '../Components/Button.styles.js';


function StartBtn() {


  const redAlert = () => {
    alert("Let's party!")
  };


  return (
    <div>
      <Button onClick={redAlert}>
        Click to get started!
      </Button>

    </div>
  );
}


export default StartBtn;