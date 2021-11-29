import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { Board, BoardContainer, Body, Game, ScoreBoard, Slot } from '../styles/TicTacToe.styles';
import axiosInstance from '../axios';

import useSound from 'use-sound';
import youWin from '../sounds/8youWin.mp3';
import youLose from '../sounds/9youLose.mp3';
import youTie from '../sounds/10youTied.mp3';
import gameSelect from '../sounds/11gameSelect.mp3';
import playAgain from '../sounds/12playAgain.mp3';
import waitOpponent from '../sounds/13waitForOpponent.wav';

import pressButton from '../sounds/14computerbeep.mp3';
import pressButton2 from '../sounds/15computerbeep.mp3';
import pressButton3 from '../sounds/16computerbeep.mp3';
import pressButton4 from '../sounds/17computerbeep.mp3';

let defaultColor = 'grey'
let otherPlayerJoined = false
let gameState = [defaultColor, defaultColor, defaultColor, defaultColor, defaultColor, defaultColor, defaultColor, defaultColor, defaultColor]
let currentTurn = true
let resetGamePlayers = {}
let otherPlayerName = "Guest"
let isOtherPlayerGuest = false
let game_session_id = null


const TicTacToeBody = (props) => {

    // getting sounds setup
    const [playerWon] = useSound(youWin);
    const [playerLost] = useSound(youLose);
    const [playerTied] = useSound(youTie);
    const [goGameSelect] = useSound(gameSelect);
    const [goPlayAgain] = useSound(playAgain);
    const [playerWait] = useSound(waitOpponent);

    const [gameButton] = useSound(pressButton, { volume: 0.1 });
    const [gameButton2] = useSound(pressButton2, { volume: 0.1 });
    const [gameButton3] = useSound(pressButton3, { volume: 0.1 });
    const [gameButton4] = useSound(pressButton4, { volume: 0.1 });

    const [box1, setBox1] = useState(defaultColor)
    const [box2, setBox2] = useState(defaultColor)
    const [box3, setBox3] = useState(defaultColor)
    const [box4, setBox4] = useState(defaultColor)
    const [box5, setBox5] = useState(defaultColor)
    const [box6, setBox6] = useState(defaultColor)
    const [box7, setBox7] = useState(defaultColor)
    const [box8, setBox8] = useState(defaultColor)
    const [box9, setBox9] = useState(defaultColor)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [isOver, setIsOver] = useState(false);
    const [message, setMessage] = useState(null);

    // const [isChatModalOpen, setChatModalOpen] = useState(false)
    // const [chatMsg, setChatMsg] = useState("")
    // const [msgs, setMsgs] = useState("")

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
            username: props.username,
            isGuest: props.isGuest
        }
        history.push(path, userDetails);
    }

    var room_code = props.roomNumber
    var player = props.playColor
    console.log('start')
    let socket = new W3CWebSocket('ws://localhost:8000/ws/game/' + room_code)
    setTimeout(() => { console.log("connecting..."); }, 1000);

    useEffect(() => {
        socket.onopen = function () {
            console.log('Socket connected')

            if (props.player === "p2" && otherPlayerJoined === false) {
                var data = data = { 'type': 'joined', 'playerName': props.username, 'isGuest': props.isGuest, 'player': props.player }
                //socket.send(JSON.stringify({ data }))
                sendMessage(socket, JSON.stringify({ data }))
                
            }
        }

        socket.onmessage = function (e) {
            var data = JSON.parse(e.data)
            console.log(data)

            // if (data.msg_type !== undefined) {
            //     chat_messages += ':' + data.chatMsg + '\n'
            //     setMsgs(chat_messages)
            // }

            if (data.payload.type === "joined") {

                if (otherPlayerJoined) {
                    return;
                }

                if (props.player === data.payload.player) {
                    return;
                }

                if (!data.payload.isGuest && data.payload.playerName === props.username) {
                    return;
                }

                otherPlayerName = data.payload.playerName
                isOtherPlayerGuest = data.payload.isGuest

                if (data.payload.isGuest && !otherPlayerJoined) {
                    var data = data = { 'type': 'joined', 'playerName': props.username, 'isGuest': props.isGuest }
                    //socket.send(JSON.stringify({ data }))
                    sendMessage(socket, JSON.stringify({ data }))
                    otherPlayerJoined = true
                    alert("Your opponent just joined. He joined as a guest");
                    return;
                }

                if (props.isGuest) {
                    var data = data = { 'type': 'joined', 'playerName': props.username, 'isGuest': props.isGuest }
                    //socket.send(JSON.stringify({ data }))
                    sendMessage(socket, JSON.stringify({ data }))
                    otherPlayerJoined = true
                    alert("Your opponent just joined, his name is " + otherPlayerName);
                    return;
                }

                if (data.payload.game_session_id === undefined) {
                    axiosInstance
                        .post(`gamedata/create_game/`, {
                            owner: props.username,
                            game: "tic-tac-toe",
                            status: "InProgress",
                            opponent: otherPlayerName
                        })
                        .then((res) => {
                            console.log("Inside then.........................")
                            console.log("game session id : "+res.data.game_session_id)
                            console.log(res)
                            game_session_id = res.data.game_session_id
                            if (props.player === "p1") {
                                var data = data = { 'type': 'joined', 'playerName': props.username, 'isGuest': props.isGuest, 'game_session_id': game_session_id }
                                socket.send(JSON.stringify({ data }))
                            }
                        });
                } else {
                    console.log("game session id : else block : " + data.payload.game_session_id)
                    game_session_id = data.payload.game_session_id
                }

                otherPlayerJoined = true
                alert("Your opponent just joined, his name is " + otherPlayerName);
                return;
            }
            
            if (data.payload.reset === "reset") {
                console.log("in reset")
                resetGamePlayers[data.payload.player] = data.payload.reset;
                checkForResetOrNewGame();
                return;
            }
            if (data.payload.reset === "change") {
                routeChange();
                return;
            }

            if (data.payload.type == 'end' && player == "viewer") {
                alert("Game ended!!");
                return;
            }

            if (data.payload.type == 'end' && data.payload.player !== player) {
                //alert("Sorry! you lost")
                otherPlayerJoined = false;
                setMessage("Sorry! You lost");
                playerLost();

                if (!props.isGuest && !isOtherPlayerGuest) { 
                    axiosInstance
                        .post(`gamedata/createOrUpdate_game_score/`, {
                            owner: props.username,
                            game: "tic-tac-toe",
                            score: 100
                        })
                        .then((res) => {
                            console.log("Score successfully added")
                        });
                }
               


                //options page
                setIsOver(!isOver);
            } else if (data.payload.type == 'over') {
                //alert("Game over! game end no one won")
                otherPlayerJoined = false;
                setMessage("Game over! No one won");
                playerTied();
                //options page
                setIsOver(!isOver);
            } else if (data.payload.type == 'running' && data.payload.player !== player) {
                setAnotherUserText(data.payload.index, data.payload.player)
            }

        }

        socket.onclose = function () {
            console.log('Socket closed')
        }
    }, []);

    function isConnected(socket) {
        console.log(socket.readyState)
        console.log(W3CWebSocket.OPEN)
        if (socket.readyState !== W3CWebSocket.OPEN) {
            setTimeout(() => { console.log("connecting..."); }, 10000);
            return isConnected(socket);
        } else {
            return true;
        }
    }
    
    const waitForOpenConnection = (socket) => {
        return new Promise((resolve, reject) => {
            const maxNumberOfAttempts = 10
            const intervalTime = 200 //ms

            let currentAttempt = 0
            const interval = setInterval(() => {
                if (currentAttempt > maxNumberOfAttempts - 1) {
                    clearInterval(interval)
                    reject(new Error('Maximum number of attempts exceeded'))
                } else if (socket.readyState === socket.OPEN) {
                    clearInterval(interval)
                    resolve()
                }
                currentAttempt++
            }, intervalTime)
        })
    }

    const sendMessage = async (socket, msg) => {
        if (socket.readyState !== socket.OPEN) {
            try {
                await waitForOpenConnection(socket)
                socket.send(msg)
            } catch (err) { console.error(err) }
        } else {
            socket.send(msg)
        }
    }
    console.log('end')

    console.log(gameState)
    /*
    if (props.player === "p2") {
        if (isConnected(socket)) {
            var data = data = { 'type': 'joined', 'playerName': localStorage.getItem('userName'), 'isGuest': localStorage.getItem('isGuest') }
            socket.send(JSON.stringify({ data }))
        }
    }
    */
    function checkGameEnd() {

        if (player == "viewer") {
            return;
        }

        var count = 0;
        gameState.map((game) => {
            if (game == "#FFC30F" || game == "#581845") {
                count++;
            }
        })

        if (count >= 9) {
            var data = { 'type': 'over' }
            //socket.send(JSON.stringify({ data }))
            sendMessage(socket, JSON.stringify({ data }))
            //alert("Game ends in a draw!!")
            otherPlayerJoined = false;
            if (!props.isGuest && !isOtherPlayerGuest) {
                axiosInstance
                    .post(`gamedata/update_game/`, {
                        game_session_id: game_session_id,
                        status: "draw"
                    })
                    .then((res) => {
                        console.log("Status Updated")
                    });
            }
            setMessage("Game ends in a draw!");
            playerTied();
            setIsOver(!isOver);
            //options page
        }
    }

    function checkWon(value, player) {
        var won = false;

        if (gameState[0] === value && gameState[1] == value && gameState[2] == value) {
            won = true;
        } else if (gameState[3] === value && gameState[4] == value && gameState[5] == value) {
            won = true
        } else if (gameState[6] === value && gameState[7] == value && gameState[8] == value) {
            won = true
        }
        else if (gameState[0] === value && gameState[3] == value && gameState[6] == value) {
            won = true
        }
        else if (gameState[1] === value && gameState[4] == value && gameState[7] == value) {
            won = true
        } else if (gameState[2] === value && gameState[5] == value && gameState[8] == value) {
            won = true
        }
        else if (gameState[0] === value && gameState[4] == value && gameState[8] == value) {
            won = true
        }
        else if (gameState[2] === value && gameState[4] == value && gameState[6] == value) {
            won = true
        }

        if (won) {
            var data = { 'type': 'end', 'player': player }
            //socket.send(JSON.stringify({ data }))
            sendMessage(socket, JSON.stringify({ data }))
            //alert("Good job!, You won")
            otherPlayerJoined = false;

            if (!props.isGuest && !isOtherPlayerGuest) {
                axiosInstance
                    .post(`gamedata/createOrUpdate_game_score/`, {
                        owner: props.username,
                        game: "tic-tac-toe",
                        score: -100
                    })
                    .then((res) => {
                        console.log("Score successfully added")
                    });

                axiosInstance
                    .post(`gamedata/update_game/`, {
                        game_session_id: game_session_id,
                        status: props.username
                    })
                    .then((res) => {
                        console.log("Status Updated")
                    });

            }

            setMessage("Good job! You won");
            playerWon();
            setIsOver(!isOver);
        } else {
            //options page
            checkGameEnd();
        }

    }

    function setText(i, value) {

        if (player == "viewer") {
            alert("Well that would be cheating...")
            return;
        }
        console.log(socket.readyState)
        if (otherPlayerJoined === false) {
            alert("Please wait for the other player to join...")
            playerWait();
            return;
        }

        

        var data = {
            'player': player,
            'index': i,
            'type': 'running',
            'reset': ''
        }



        if (gameState[parseInt(i)] != "#FFC30F" && gameState[parseInt(i)] != "#581845") {

            if (currentTurn == false) {
                alert("Please wait for the oppsition's turn!!")
                return
            } else {
                currentTurn = false
            }

            console.log('same', value)
            gameState[parseInt(i)] = value
            setBoxStateValues()
            console.log(gameState)

            //socket.send(JSON.stringify({data}))
            sendMessage(socket, JSON.stringify({ data }))
            checkWon(value, player)
        } else {
            alert("You cannot fill this space")
        }
    }



    function setBoxStateValues() {
        setBox1(gameState[0])
        setBox2(gameState[1])
        setBox3(gameState[2])
        setBox4(gameState[3])
        setBox5(gameState[4])
        setBox6(gameState[5])
        setBox7(gameState[6])
        setBox8(gameState[7])
        setBox9(gameState[8])
    }

    function setAnotherUserText(i, value) {
        console.log('another', value)
        gameState[parseInt(i)] = value
        setBoxStateValues()
        currentTurn = true
        console.log(gameState)
    }

    function resetGame() {
        gameState =
            [defaultColor,
                defaultColor,
                defaultColor,
                defaultColor,
                defaultColor,
                defaultColor,
                defaultColor,
                defaultColor,
                defaultColor];

        setBoxStateValues();
        currentTurn = true;
        otherPlayerJoined = true;
        resetGamePlayers = {}
        if (show) {
            setShow(!show);
        }
        setIsOver(false);
    }


    function selectResetGame() {
        let reset = 'reset';
        resetGamePlayers[player] = reset;
        var data = {
            'player': player,
            'reset': reset
        }
        //socket.send(JSON.stringify({data}))
        sendMessage(socket, JSON.stringify({ data }))
        checkForResetOrNewGame();
        if (show) {
            setShow(!show);
        }

    }

    function selectRouteChange() {
        let reset = 'change';
        resetGamePlayers[player] = reset;
        var data = {
            'player': player,
            'reset': reset
        }
        //socket.send(JSON.stringify({data}))
        sendMessage(socket, JSON.stringify({ data }))
        setTimeout(() => { console.log("Routing..."); }, 2000);
        routeChange();
    }

    function checkForResetOrNewGame() {
        console.log("checkForResetOrNewGame");
        console.log(resetGamePlayers);
        if (resetGamePlayers['#FFC30F'] !== undefined && resetGamePlayers['#581845'] !== undefined) {
            if (resetGamePlayers['#FFC30F'] === "reset" && resetGamePlayers['#581845'] === "reset") {
                console.log("resetting")
                resetGame();

            } else {
                console.log("routing")
                routeChange();
            }
        }
    }

    // function sendChatData() {
    //     socket.send(JSON.stringify({
    //         msg_type: "chat_msg",
    //         chatMsg
    //     }))

    // }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Title>{message}</Modal.Title>
                <Modal.Footer>
                    <Button 
                        variant="primary" 
                        onClick={selectResetGame}
                        onMouseEnter={() => {
                            goPlayAgain();
                        }}
                        >
                        Play again!
                    </Button>
                    <Button 
                        variant="secondary" 
                        onClick={selectRouteChange}
                        onMouseEnter={() => {
                            goGameSelect();
                        }}
                        >
                        Play another game
                    </Button>
                </Modal.Footer>
            </Modal>

            <Body>
                <Game>
                    <ScoreBoard>
                        Room Number : {props.roomNumber}
                    </ScoreBoard>
                    <BoardContainer>
                        <Board>
                            <Slot 
                                style={{ backgroundColor: box1 }} 
                                data-cell-index="0" 
                                onClick={() => { setText("0", player) }}
                                onMouseEnter={() => {
                                    gameButton();
                                }}
                                ></Slot>

                            <Slot 
                                style={{ backgroundColor: box2 }} 
                                data-cell-index="1" 
                                onClick={() => { setText("1", player) }}
                                onMouseEnter={() => {
                                    gameButton2();
                                }}
                                ></Slot>

                            <Slot 
                                style={{ backgroundColor: box3 }} 
                                data-cell-index="2" 
                                onClick={() => { setText("2", player) }}
                                onMouseEnter={() => {
                                    gameButton3();
                                }}
                                ></Slot>

                            <Slot 
                                style={{ backgroundColor: box4 }} 
                                data-cell-index="3" 
                                onClick={() => { setText("3", player) }}
                                onMouseEnter={() => {
                                    gameButton4();
                                }}
                                ></Slot>

                            <Slot 
                                style={{ backgroundColor: box5 }} 
                                data-cell-index="4" 
                                onClick={() => { setText("4", player) }}
                                onMouseEnter={() => {
                                    gameButton();
                                }}
                                ></Slot>

                            <Slot 
                                style={{ backgroundColor: box6 }} 
                                data-cell-index="5" 
                                onClick={() => { setText("5", player) }}
                                onMouseEnter={() => {
                                    gameButton2();
                                }}
                                ></Slot>
                                
                            <Slot 
                                style={{ backgroundColor: box7 }} 
                                data-cell-index="6" 
                                onClick={() => { setText("6", player) }}
                                onMouseEnter={() => {
                                    gameButton3();
                                }}
                                ></Slot>

                            <Slot 
                                style={{ backgroundColor: box8 }} 
                                data-cell-index="7" 
                                onClick={() => { setText("7", player) }}
                                onMouseEnter={() => {
                                    gameButton4();
                                }}
                                ></Slot>

                            <Slot 
                                style={{ backgroundColor: box9 }} 
                                data-cell-index="8" 
                                onClick={() => { setText("8", player) }}
                                onMouseEnter={() => {
                                    gameButton();
                                }}
                                ></Slot>
                        </Board>
                    </BoardContainer>
                </Game>
                {/* <button onClick={(e) => { setChatModalOpen(true) }}>Chat</button>
                <ChatModal
                    isOpen={isChatModalOpen}
                // style={customStyles}

                // portalClassName={ } // Can mention the class name from .css class.

                >
                    <textarea id="chat_area" cols="100" rows="20" value={msgs}></textarea>
                    <input type="text" id="chat_input" placeholder="type here" onChange={(e) => { setChatMsg(e.target.value) }}></input>
                    <button onClick={(e) => {
                        sendChatData()
                    }}>Send</button>
                    <button onClick={(e) => { setChatModalOpen(false) }}>Close Chat</button>
                </ChatModal> */}
            </Body>
        </>
    );
}

export default TicTacToeBody;
