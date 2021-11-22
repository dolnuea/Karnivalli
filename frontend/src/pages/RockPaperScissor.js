import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Modal, Button } from "react-bootstrap";
import { RockPaperScissorBackground, Slot, Rock, Paper, Scissor } from "../styles/RockPaperScissors.styles";
import { useHistory } from 'react-router-dom';
import ChatModal from 'react-modal'
import chatImg from '../images/chat_button_img.png'
let currentTurn = true
let userChoices = {}
let resetGamePlayers = {}
let chat_messages = ""

export default function RockPaperScissor(props) {
    console.log(props)

    // const [rock, setRock] = useState('rock')
    // const [paper, setPaper] = useState('paper')
    // const [scissor, setScissor] = useState('scissor')
    const [modalIsopen, setModalIsOpen] = useState(false)

    const [isChatModalOpen, setChatModalOpen] = useState(false)
    const [chatMsg, setChatMsg] = useState("")
    const [msgs, setMsgs] = useState("")

    let socket = new W3CWebSocket('ws://localhost:8000/ws/game/rps/' + props.location.state.roomCode)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [isOver, setIsOver] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (isOver) {
            setShow(true);
        }
    }, [isOver]);

    const history = useHistory();

    const routeChange = () => { //for end of game
        resetGame();
        let path = 'game-selection';
        const userDetails = {
            username: localStorage.getItem("username"),
            isGuest: localStorage.getItem("isGuest")
        }
        history.push(path, userDetails);
    }

    useEffect(() => {
        socket.onopen = function () {
            console.log('Socket connected')
        }

        console.log(userChoices);

        socket.onmessage = function (e) {
            var data = JSON.parse(e.data).payload
            console.log(data)

            if (data.msg_type !== undefined) {
                chat_messages += data.player + ':' + data.chatMsg + '\n'
                setMsgs(chat_messages)
            }

            if (data.reset === "reset") {
                resetGamePlayers[data.player] = data.reset;
                checkForResetOrNewGame();
                return;
            }
            if (data.reset === "change") {
                routeChange();
                return;
            }

            if (props.location.state.player == "viewer") {

                if (data.state === 'p1') {
                    alert("Player one wins.")
                    return
                } else if (data.state === 'p2') {
                    alert("Player two wins.")
                    return
                } else if (data.state === 'draw') {
                    alert("Game drawn.")
                    return
                }
            }

            if (data.state === "draw") {
                setModalIsOpen(true)
                setMessage("Draw!");
                currentTurn = true
                setIsOver(true);
                return
            } else if (data.state === props.location.state.player) {
                currentTurn = true
                setMessage("You won!");
                setIsOver(true);
                return
            } else if ((data.state === 'p2' && props.location.state.player === 'p1') || (data.state === 'p1' && props.location.state.player === 'p2')) {
                currentTurn = true
                setMessage("You lost!");
                setIsOver(true);
                return
            }

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

        socket.onclose = function () {
            console.log('Socket Closed')
        }

    }, [])

    function sendData(value, player) {
        if (props.location.state.player == "viewer") {
            alert("Well, that would be cheating...")
            return;
        }
        console.log(userChoices)

        if (currentTurn == false) {
            alert("Please wait for your opponent's turn!")
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

    function selectResetGame() {
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
            player,
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

    function sendChatData(player) {
        socket.send(JSON.stringify({
            msg_type: "chat_msg",
            player,
            chatMsg
        }))

        setChatMsg("")
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
            </Modal>
            <RockPaperScissorBackground>
                <Slot onClick={() => { sendData('rock', props.location.state.player) }}><Rock>🧱</Rock></Slot>
                <Slot onClick={() => { sendData('paper', props.location.state.player) }}><Paper>📜</Paper></Slot>
                <Slot onClick={() => { sendData('scissor', props.location.state.player) }}><Scissor>✂️</Scissor></Slot>
                <button onClick={(e) => { setChatModalOpen(true) }}><img src={chatImg} ></img></button>
                <ChatModal
                    isOpen={isChatModalOpen}
                    style={{
                        overlay: {
                            width: '500px',
                            height: '700px',
                            padding: '0px',
                            top: '0px'
                        },
                        content: {
                            padding: '10px'
                        }
                    }}

                // portalClassName={ } // Can mention the class name from .css class.

                >
                    <textarea id="chat_area" cols="50" rows="20" value={msgs} style={{ borderRadius: '5px', padding: '5px', backgroundColor: '#F1E5AC' }}></textarea><br></br>
                    <input type="text" id="chat_input" placeholder="Type here"
                        value={chatMsg}
                        onChange={(e) => { setChatMsg(e.target.value) }}
                        style={{ borderRadius: '5px', margin: '3px' }}
                        onKeyPress={(e) => { if (e.key === 'Enter') sendChatData(props.location.state.player) }}>
                    </input>
                    <button
                        onClick={() => { sendChatData(props.location.state.player) }}
                        style={{ backgroundColor: '#ADD8E6', borderRadius: '5px' }}>
                        Send
                    </button>
                    <br></br>
                    <button onClick={() => { setChatModalOpen(false) }} style={{ backgroundColor: 'red', borderRadius: '5px', margin: '3px' }}>Close Chat</button>
                </ChatModal>

            </RockPaperScissorBackground>
        </>
    )
}
