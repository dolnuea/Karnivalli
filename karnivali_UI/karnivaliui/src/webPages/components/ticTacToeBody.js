import React, { useState, useEffect} from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

let defaultColor = 'grey'
let gameState = [defaultColor, defaultColor, defaultColor, defaultColor, defaultColor, defaultColor, defaultColor, defaultColor, defaultColor]
let currentTurn = true


const TicTacToeBody = (props) => {
     
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
    const[message, setMessage] = useState(null);

    useEffect(() => {
        if (isOver) {
        setShow(true);
        }
    }, [isOver]);


    const history = useHistory();

    const routeChange = () => { //for end of game
        let path = 'game-selection';
        history.push(path);
    }

    var room_code = props.roomNumber
    var player = props.playColor
    console.log('start')
    let socket = new W3CWebSocket('ws://localhost:8000/ws/game/' + room_code)

    useEffect(() => {
        socket.onopen = function (e) {
            console.log('Socket connected')
        }

        socket.onmessage = function (e) {
            var data = JSON.parse(e.data)
            console.log(data)
            if (data.payload.type == 'end' && data.payload.player !== player) {
                //alert("Sorry! you lost")
                setMessage("Sorry! You lost");
                //options page
                setIsOver(!isOver);
            } else if (data.payload.type == 'over') {
                //alert("Game over! game end no one won")
                setMessage("Game over! No one won");
                //options page
                setIsOver(!isOver);
            } else if (data.payload.type == 'running' && data.payload.player !== player) {
                setAnotherUserText(data.payload.index, data.payload.player)
            }

        }

        socket.onclose = function (e) {
            console.log('Socket closed')
        }
    }, []);


    console.log('end')

    
    console.log(gameState)
    
    let elementArray = document.querySelectorAll('.space')


    function checkGameEnd() {
        var count = 0;
        gameState.map((game) => {
            if (game == "red" || game=="blue") {
                count++;
            }
        })

        if (count >= 9) {
            var data = { 'type': 'over' }
            socket.send(JSON.stringify({ data }))
            //alert("Game ends in a draw!!")
            setMessage("Game ends in a draw!");
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
            socket.send(JSON.stringify({ data }))
            //alert("Good job!, You won")
            setMessage("Good job! You won");
            setIsOver(!isOver);
        } else {
            //options page
            checkGameEnd();
        }

    }

    function setText(i, value) {
        if (currentTurn === false) {
            alert("Please wait for the oppsition's turn!!")
            return
        } else {
            currentTurn = false
        }
        
        var data = {
            'player': player,
            'index': i,
            'type': 'running'
        }


     
        if (gameState[parseInt(i)] != "red" && gameState[parseInt(i)] != "blue") {
            console.log('same', value)
            gameState[parseInt(i)] = value
            setBoxStateValues()
            console.log(gameState)

            socket.send(JSON.stringify({
                data
            }))
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

        <div className="body">
            <div className="full-page" id="full-page">

                <div className="game flex-column">
                    <div className="scoreboard">
                        Room Number : {props.roomNumber}
                    </div>
                    <div className="boardcontainer">
                        <div className="board">
                            <button style={{ backgroundColor: box1 }} data-cell-index="0" className="space" onClick={(e) => { setText("0", player) }}></button>
                            <button style={{ backgroundColor: box2 }} data-cell-index="1" className="space" onClick={(e) => { setText("1", player) }}></button>
                            <button style={{ backgroundColor: box3 }} data-cell-index="2" className="space" onClick={(e) => { setText("2", player) }}></button>
                            <button style={{ backgroundColor: box4 }} data-cell-index="3" className="space" onClick={(e) => { setText("3", player) }}></button>
                            <button style={{ backgroundColor: box5 }} data-cell-index="4" className="space" onClick={(e) => { setText("4", player) }}></button>
                            <button style={{ backgroundColor: box6 }} data-cell-index="5" className="space" onClick={(e) => { setText("5", player) }}></button>
                            <button style={{ backgroundColor: box7 }} data-cell-index="6" className="space" onClick={(e) => { setText("6", player) }}></button>
                            <button style={{ backgroundColor: box8 }} data-cell-index="7" className="space" onClick={(e) => { setText("7", player) }}></button>
                            <button style={{ backgroundColor: box9 }} data-cell-index="8" className="space" onClick={(e) => { setText("8", player) }}></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default TicTacToeBody;
