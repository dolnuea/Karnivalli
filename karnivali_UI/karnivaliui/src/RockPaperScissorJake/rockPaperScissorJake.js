import React, {useState} from "react";
import { ReactDOM } from "react";
import "./rockPaperScissorJake.css";

function RPSObject(props) {
    
    const [objectCount, setObjectCount] = useState(0);


    let roll = () => {

        setObjectCount(Math.floor(Math.random() * 3) + 1)

        // let randNum = Math.floor(Math.random() * 3) + 1;
        // console.log(randNum);
        // return(randNum);
    };

    // Need to find a way to roll the roll function individually for each object and display it in the shape

    return (
      <div className="childBox">
          <div className="RPSobject" onClick={roll}>
            <h1>{props.Name}</h1>
            <p>{objectCount}</p>
            
          </div>
      </div>
    );
  }


export default RPSObject;