import React, { useState, useEffect } from 'react';
import MyModal from './Modals/MyModal'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Modal, Button } from "react-bootstrap";
import { RockPaperScissorBackground, Slot, Rock, Paper, Scissor } from "./rockPaperScissors.styles";
import { useHistory } from 'react-router-dom';

let currentTurn = true
let userChoices = {}
let resetGamePlayers = {}

export default function RockPaperScissor(props) {
    console.log(props)

    // const [rock, setRock] = useState('rock')
    // const [paper, setPaper] = useState('paper')
    // const [scissor, setScissor] = useState('scissor')
    const [modalIsopen, setModalIsOpen] = useState(false)
    const [resultText, setResultText] = useState("")
    let socket = new W3CWebSocket('ws://localhost:8000/ws/game/rps/' + props.location.state.roomCode)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [isOver, setIsOver] = useState(false);
    const[message, setMessage] = useState(null);

    useEffect(() => {
        if (isOver) {
        setShow(true);
        }
    }, [isOver]);

    const history = useHistory();

    const routeChange = () => { //for end of game
        resetGame();
        let path = 'game-selection';
        history.push(path);
    }

    

    useEffect(() => {

        // This function gets executed when the 
        socket.onopen = function (e) {
            console.log('Socket connected')
        }

        console.log(userChoices);

        socket.onmessage = function (e) {
            var data = JSON.parse(e.data).payload
            console.log(data)
            if (data.reset === "reset") {
                resetGamePlayers[data.player] = data.reset;
                checkForResetOrNewGame();
                return;
            }
            if (data.reset === "change") {
                routeChange();
                return;
            }
            if (data.state === "draw") {
                // alert("Its a draw")
                setModalIsOpen(true)
                setResultText("Game is Draw")
                setMessage("Game is Draw");
                currentTurn = true
                setIsOver(true);
                return
            }
            if (data.state === props.location.state.player) {
                //alert("you won")
                currentTurn = true
                setMessage("you won");
                setIsOver(true);
                return
            } else if (data.state === 'p2' && props.location.state.player === 'p1') {
                //alert("you lost")
                currentTurn = true
                setMessage("you lost");
                setIsOver(true);
                return
            } else if (data.state === 'p1' && props.location.state.player === 'p2') {
                //alert("you lost")
                currentTurn = true
                setMessage("you lost");
                setIsOver(true);
                return
            }
            let value = data.value
            let player = data['player']
            userChoices[data['player']] = data.value
            console.log(userChoices)

            let state = 'continue'

            if (userChoices.p1 !== undefined && userChoices.p2 !== undefined) {

                if (userChoices.p1 === userChoices.p2) {
                    state = 'draw'
                    setMessage("draw");
                    setIsOver(true);
                } else if (userChoices.p1 === 'rock' && userChoices.p2 === 'scissor') {
                    state = "p1"
                } else if (userChoices.p1 === 'paper' && userChoices.p2 === 'rock') {
                    state = "p1"
                } else if (userChoices.p1 === 'scissor' && userChoices.p2 === 'paper') {
                    state = "p1"
                } else {
                    state = "p2"

                }
            }

        }

        socket.onclose = function (e) {
            console.log('Socket Closed')
        }

    }, [])

    function sendData(value, player) {
        console.log(userChoices)
        if (currentTurn == false) {
            alert("Please wait for the oppsition's turn!!")
            currentTurn = true
            return
        } else {
            currentTurn = false
        }

        userChoices[player] = value
        let state = 'progress'

        if (userChoices.p1 !== undefined && userChoices.p2 !== undefined) {

            if (userChoices.p1 === userChoices.p2) {
                state = 'draw'
                setMessage("draw");
                setIsOver(true);
            } else if (userChoices.p1 === 'rock' && userChoices.p2 === 'scissor') {
                state = "p1"
            } else if (userChoices.p1 === 'paper' && userChoices.p2 === 'rock') {
                state = "p1"
            } else if (userChoices.p1 === 'scissor' && userChoices.p2 === 'paper') {
                state = "p1"
            } else {
                state = "p2"

            }
        }

        let reset = '';
        socket.send(JSON.stringify({
            value,
            player,
            state,
            reset
        }))
    }

    function resetGame() {
        console.log('reset game');
        userChoices = {};
        resetGamePlayers = {};
        currentTurn = true;
        if (show) {
            setShow(!show);
        }
        setIsOver(false);
        console.log(userChoices);
    }

    function selectResetGame(){
        let reset = 'reset';
        let player = props.location.state.player;
        resetGamePlayers[player] = reset;
        socket.send(JSON.stringify({
            reset,
            player
        }))
        checkForResetOrNewGame();
        if (show) {
            setShow(!show);
        }
        
    }

    function selectRouteChange() {
        let reset = 'change';
        let player = props.location.state.player;
        resetGamePlayers[player] = reset;
        socket.send(JSON.stringify({
            reset,
            player
        }))

        routeChange();
    }

    function checkForResetOrNewGame() {
        if (resetGamePlayers.p1 !== undefined && resetGamePlayers.p2 !== undefined) {
            if (resetGamePlayers.p1 === "reset" && resetGamePlayers.p2 === "reset") {
                console.log("resetting")
                resetGame();
            } else {
                console.log("routing")
                routeChange();
            }
        }
    }


    return (
        <>
        <Modal show={show} onHide={handleClose}>
                <Modal.Title>{message}</Modal.Title>
                <Modal.Footer>
                  <Button variant="primary" onClick={selectResetGame}>
                  Play again!
                </Button>
                <Button variant="secondary" onClick={selectRouteChange}> 
                  Play another game
                </Button>
              </Modal.Footer>
            </Modal>)
        <RockPaperScissorBackground>
            <Slot onClick={(e) => { sendData('rock', props.location.state.player) }}><Rock>🧱</Rock></Slot>
            <Slot onClick={(e) => { sendData('paper', props.location.state.player) }}><Paper>📜</Paper></Slot>
            <Slot onClick={(e) => { sendData('scissor', props.location.state.player) }}><Scissor>✂️</Scissor></Slot>
            {/* <Modal isOpen={modalIsopen}>
                <h2>The Game is draw</h2>
                <button onClick={() => {
                    history.push('/game-selection')
                }}>Choose game</button>
                <button onClick={() => {
                    history.push('/start-or-join')
                }}>Play Again</button>
            </Modal> */}
            {/* <MyModal open={modalIsopen} data={resultText}></MyModal> */}

        </RockPaperScissorBackground>
        </>
    )
}
