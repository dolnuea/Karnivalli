import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { RockPaperScissorBackground, Slot, Rock, Paper, Scissor } from "./rockPaperScissors.styles";
import { useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

let currentTurn = true

export default function RockPaperScissor(props) {
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

    const routeChange = () => {
        let path = 'game-selection';
        history.push(path);
      }

    console.log(props)

    

    // const [rock, setRock] = useState('rock')
    // const [paper, setPaper] = useState('paper')
    // const [scissor, setScissor] = useState('scissor')

    let socket = new W3CWebSocket('ws://localhost:8000/ws/game/rps/' + props.location.state.roomCode)

    let userChoices = {}


    useEffect(() => {

        // This function gets executed when the 
        socket.onopen = function (e) {
            console.log('Socket connected')
        }

        socket.onmessage = function (e) {
            var data = JSON.parse(e.data).payload
            console.log(data)
            if (data.state === "draw") {
                //alert("Its a draw")
                setMessage("Its a draw");
                currentTurn = true
                setIsOver(!isOver);
            }
            if (data.state === props.location.state.player) {
                //alert("you won")
                setMessage("you won");
                currentTurn = true
                setIsOver(!isOver);
            } else if (data.state === 'p2' && props.location.state.player === 'p1') {
                //alert("you lost")
                setMessage("you lost");
                currentTurn = true
                setIsOver(!isOver);
            } else if (data.state === 'p1' && props.location.state.player === 'p2') {
                //alert("you lost")
                setMessage("you lost");
                currentTurn = true
                setIsOver(!isOver);
            }
            let value = data.value
            let player = data['player']
            userChoices[data['player']] = data.value
            console.log(userChoices)

            let state = 'continue'

            if (userChoices.p1 !== undefined && userChoices.p2 !== undefined) {

                if (userChoices.p1 === userChoices.p2) {
                    state = 'draw'
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

        socket.send(JSON.stringify({
            value,
            player,
            state
        }))
    }

    return (
        <>
        <Modal show={show} onHide={handleClose}>
                <Modal.Title>{message}</Modal.Title>
                <Modal.Footer>
                  <Button variant="primary" onClick={''}>
                  Play again!
                </Button>
                <Button variant="secondary" onClick={routeChange}> 
                  Play another game
                </Button>
              </Modal.Footer>
            </Modal>)

        <RockPaperScissorBackground>
            <Slot onClick={(e) => { sendData('rock', props.location.state.player) }}><Rock>🧱</Rock></Slot>
            <Slot onClick={(e) => { sendData('paper', props.location.state.player) }}><Paper>📜</Paper></Slot>
            <Slot onClick={(e) => { sendData('scissor', props.location.state.player) }}><Scissor>✂️</Scissor></Slot>
        </RockPaperScissorBackground>
        </>
    )
}
