import React from "react";
import reactDom from "react-dom";
import {useHistory} from 'react-router-dom';
import './App.css'
import { GameboxStart, GameboxJoin, StartJoinScreen } from './Components/StartJoin.styles'


function StartOrJoinScreen(props) {
  

  const redAlert = () => {
    alert("Let's party!")
  };

  const history = useHistory();

    const routeChange = () =>{ 
        let path = 'game-selection'; 
        history.push(path);
    }

  return (
    <StartJoinScreen>
      <GameboxStart onClick={routeChange}>
        <h1>
          Start New Game
        </h1>
      </GameboxStart>

      <GameboxJoin onClick={redAlert}>
        <h1>
          Join Game
        </h1>
        <form>
          <label>
            Room Number:
            <input type="text" name="roomnumber" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </GameboxJoin>
    </StartJoinScreen>

  );
}

export default StartOrJoinScreen;
