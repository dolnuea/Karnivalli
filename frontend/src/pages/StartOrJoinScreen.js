import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import {
  GameboxStart,
  GameboxJoin,
    StartJoinScreen,
    GameboxWatch,
  RoomModal
} from "../styles/StartJoin.styles";
import { Modal, Button } from "react-bootstrap";

function StartOrJoinScreen(props) {""
  const [show, setShow] = useState(false);
  const [option, setOption] = useState("");
  const handleClose = () => setShow(false);

  const [roomCode, setRoomCode] = useState("");
  

  // The selected game passed from GameSelectionScreen
   const selectedGame = props.location.state;


  const history = useHistory();

  const routeChangeStart = () => {
    if (!roomCode) {
          alert("Please add a room number");
          return;
      }

    console.log("startGame", roomCode);
    console.log("username", props.location.username);
    let path = selectedGame;
    history.push(path);
    history.push({
      pathname: path,
      state: {
          roomCode: roomCode,
          player: "p1",
          username: props.location.username,
          isGuest: props.location.isGuest
      }
  });
};

const routeChangeJoin = () => {
  if (!roomCode) {
      alert("Please add a room number");
      return;
  }

  console.log("joinRoom", roomCode);
  console.log("username", props.location.username);
  let path = selectedGame;
  
  history.push({
      pathname: path,
      state: {
          roomCode: roomCode,
          player: "p2",
          username: props.location.username,
          isGuest: props.location.isGuest
      }
  });
 };


    const routeChangeWatch = () => {
        if (!roomCode) {
            alert("Please add a room number");
            return;
        }

        console.log("watchRoom", roomCode);
        let path = selectedGame;

        history.push({
            pathname: path,
            state: {
                roomCode: roomCode,
                player: "viewer"
            }
        });
    };

const routeChange = () => {
  console.log(option)
  if (option === 'start'){
    routeChangeStart();
  }
  else if (option === 'join'){
    routeChangeJoin();
    }

  else if (option === 'viewer') {
    routeChangeWatch();
  }
}


  return (
    <>

      <Modal show={show} onHide={handleClose}> 
        {/* To change this back to styled modal, change 'Modal' to 'RoomModal' above */}
        <Modal.Header closeButton>
          <Modal.Title>Hold up...</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please enter room number</Modal.Body>
        <Modal.Footer>
        <form>
        <input
                  type="text"
                  placeholder="Type Room Number "
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
        />
            <Button variant="primary" onClick={routeChange}>
            Enter
          </Button>
          </form>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {/* To change this back to styled modal, change 'Modal' to 'RoomModal' above */}
      
      <StartJoinScreen>

         {/* <h1>{selectedGame}</h1> */}

        <GameboxStart onClick={() => {setOption("start"); setShow(true); }}>
          <h1>Start New Game</h1>
        </GameboxStart>

        <GameboxJoin onClick={() => {setOption("join"); setShow(true); }}>
          <h1>Join Game</h1>
        </GameboxJoin>


        <GameboxWatch onClick={() => { setOption("viewer"); setShow(true); }}>
           <h1>Watch Game</h1>
        </GameboxWatch>


      </StartJoinScreen>
    </>
  );
}

export default StartOrJoinScreen;