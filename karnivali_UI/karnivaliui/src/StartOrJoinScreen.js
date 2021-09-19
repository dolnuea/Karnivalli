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

  const redAlert = () => {
    alert("Let's party!");
  };

  const history = useHistory();

  const routeChange = () => {
    let path = "game-selection";
    history.push(path);
  };

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