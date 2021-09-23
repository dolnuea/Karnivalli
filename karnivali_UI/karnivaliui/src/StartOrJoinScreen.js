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


  const history = useHistory();

  const routeChange = () => {
    let path = selectedGame;
    history.push(path);
  };


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hold up...</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please enter room number</Modal.Body>
        <Modal.Footer>
        <form>
              <input type="text" />
            <Button variant="primary" onClick={routeChange}>
            Enter
          </Button>
          </form>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <StartJoinScreen>

        <h1>Selected Game: {selectedGame}</h1>

        <GameboxStart onClick={handleShow}>
          <h1>Start New Game</h1>
        </GameboxStart>

        <GameboxJoin onClick={handleShow}>
          <h1>Join Game</h1>
        </GameboxJoin>
      </StartJoinScreen>
    </>
  );
}

export default StartOrJoinScreen;