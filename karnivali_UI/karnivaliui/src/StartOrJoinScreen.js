import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
import {
  GameboxStart,
  GameboxJoin,
  StartJoinScreen,
} from "./Components/StartJoin.styles";
import { Modal, Button } from "react-bootstrap";

function StartOrJoinScreen(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // The selected game passed from GameSelectionScreen
  const selectedGame = props.location.state;

  const redAlert = () => {
    alert("Let's party!");
  };

  const history = useHistory();

  const routeChange = () => {
    let path = selectedGame;
    history.push(path);
  };

  
//   const routeChangetoTTT = () =>{ 
//     let path = 'tic-tac-toe'; 
//     history.push(path);
// }
//   const routeChangetoRPS = () =>{ 
//       let path = 'rock-paper-scissor'; 
//       history.push(path);
//   }

  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
    <StartJoinScreen>

      <h1>Selected Game: {selectedGame}</h1>
      
      <GameboxStart onClick={routeChange}>
        <h1>Start New Game</h1>
      </GameboxStart>

      <GameboxJoin onClick={handleShow}>
        <h1>Join Game</h1>
        <form>
          <label>
            Room Number:
            <input type="text" name="roomnumber" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </GameboxJoin>
    </StartJoinScreen>
    </>
  );
}

export default StartOrJoinScreen;