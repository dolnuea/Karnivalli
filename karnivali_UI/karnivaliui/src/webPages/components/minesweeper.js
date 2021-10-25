import React, { useState, useEffect} from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

//https://codeburst.io/learning-react-js-by-building-a-minesweeper-game-ced9d41560ed

let WIDTH = 16;
let HEIGHT = 16;

class MinesweeperBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nearbyBombCount: 0,
            squareState: '',
            bombState: false,
            revealed: false,
            //gameState: [],
            //currentTurn: true,
            //resetGamePlayers: {}
        };
    }

    render() {
        const{nearbyBombCount, squareState, bombState, revealed} = this.state;
        return(
         <div className="minesweeper-board">
             <Board height={HEIGHT} width={WIDTH} squareState={squareState} bombState={bombState} revealed={revealed} nearbyBombCount={nearbyBombCount}/>
        </div>
        );
    }
}


const Minesweeper = (props) => {

    //default variable
    let defaultColor = 'grey'
    let gameState = [] //todo
    let currentTurn = true
    let resetGamePlayers = {}

    //modal components
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    //game-over components
    const [isOver, setIsOver] = useState(false);
    const[message, setMessage] = useState(null);

    //modal visibility for game over
    useEffect(() => {
        if (isOver) {
        setShow(true);
        }
    }, [isOver]);

    //route change for game over
    const history = useHistory();

    const routeChange = () => { //for end of game
        resetGame();
        let path = 'game-selection';
        history.push(path);
    }


    //game session variables
    var room_code = props.roomNumber
    var player = props.playColor
    console.log('start')
    let socket = new W3CWebSocket('ws://localhost:8000/ws/game/' + room_code)
    setTimeout(() => { console.log("connecting..."); }, 1000);

    useEffect(() => {
        socket.onopen = function (e) {
            console.log('Socket connected')
        }

        socket.onmessage = function (e) {
            var data = JSON.parse(e.data)
            console.log(data)
            
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


    /*******Minesweeper functions*********/

    /**
     * Initialize the game board:
     * Put bombs in random locations
     * Calculate the number of bombs in each square's nearby squares
     * Put squares in the gameState array
     */
    function initializeGame() {
        gameState = []
        for (var i = 0; i <  HEIGHT; i++) 
            for (var j = 0; j < WIDTH ; j++) {
                gameState[i][j].push(defaultColor);
                gameState[Math.random() * WIDTH][j].bombState = true; //create bombs in random squares
        }

        for (var i = 0; i < HEIGHT; i++) {
                gameState[Math.random() * WIDTH][j].bombState = true; //create bombs in random squares
        }

        for (var i = 0; i <  HEIGHT; i++) 
            for (var j = 0; j < WIDTH ; j++) {
                adjacentBombCount(i, j);
        }

    }

    /**
     * This function return the number of adjacent bombs in the square at (row, col)
     * @param {*} i row index
     * @param {*} j column index
     * @returns the number of adjacent bombs
     */
    function adjacentBombCount(i, j) {
        var count = 0;
        for (var x = -1; x <= 1; x++) {
            for (var y = -1; y <= 1; y++) {
                if (i + x >= 0 && i + x < HEIGHT && j + y >= 0 && j + y < WIDTH) {
                    if (gameState[i + x][j + y].bombState) {
                        count++;
                    }
                }
            }
        }
        return count;
    }


    /**
     * This function reveals the square at (row, col) and checks if there is a bomb
     */
    function updateGame(){
        //todo update game state: when player clicks a square, reveal that square and check if it is a bomb or not
    }

    /**
     * This function reveals the square at (row, col) and checks 
     * if there is a bomb, then returns true if the user has flagged all mines
     * @returns true if the game is over and player wins, false if player loses
     */
    function winGame() {
        //todo if every bomb is flagged, and there's no flagged non-bomb spots, then print a win message
        for(var i = 0; i < HEIGHT; i++) 
            for (var j = 0; j < WIDTH; j++) {  
                if (gameState[i][j].bombState === true && gameState[i][j].squareState === 'flagged') {
                    return true;
                } 
                else {
                    return false;
                }
            }

    }

    /**
     * 
     * @param {*} i row index
     * @param {*} j column index
     * @returns true if the square at (row, col) is flagged, false otherwise
     */
    function isFlagged(i, j) {
        return gameState[i][j].squareState === 'flag';
    }

    /**
     * 
     * @param {*} i row index
     * @param {*} j column index
     * @returns true if the square at (row, col) is revealed, false otherwise
     */
    function isRevealed(i, j) {
        return gameState[i][j].squareState === 'revealed';
    }
    
    /**
     * 
     * @param {*} i row index
     * @param {*} j column index
     * @returns true if the square at (row, col) has bomb, false otherwise
     */
    function isBomb(i, j) { 
        return gameState[i][j].bombState === true;
    }

    /**
     * Helper function to reveal squares
     * @param {*} i row index
     * @param {*} j column index
     * @returns true if the square at (row, col) is a valid square, false otherwise
     */
    function isValid(i, j) {
        return i >= 0 && i < HEIGHT && j >= 0 && j < WIDTH;
    }

    /**
    Reference: https://github.com/dolnuea/minesweeper/blob/master/minesweeper.c
    ALGORITHM FOR REVEALING:
       Using a recursive approach, referencing from flood fill algorithm:
       STEP 1: If a square is valid then do the following:
       STEP 2: if surrounding squares of asserted square has 0 surrounding bombs, and is not a bomb: Reveal it.
       STEP 3: else if surrounding square of asserted square has surrounding bombs: stop, and print hint number of bombs.
       STEP 4: check next surrounding square of the asserted square
       STEP 5: if the square is already revealed, then stop.
        * @param {*} i row index
        * @param {*} j column index
     */
    function reveal(i, j) {

        if (isValid(i, j)) {
            if (gameState[i][j].squareState === 'revealed'){
            return; //base case: already revealed
            }

            if (gameState[i][j].bombState === 'bomb' || gameState[i][j].nearbyBombCount !== 0) {
                gameState[i][j].squareState = 'revealed'
                return; //base case : if there is bomb and bomb near the coordinates: reveal and stop
            }

            else{
                gameState[i][j].squareState = 'revealed'
                reveal(i - 1, j);
                // south row+1, col
                reveal(i + 1, j);
                // east row, col+1
                reveal(i, j + 1);
                // west row, col-1
                reveal(i, j - 1);
                // northeast row-1, col+1
                reveal(i - 1, j + 1);
                // northwest row-1, col-1
                reveal(i - 1, j - 1);
                // southeast row+1, col+1
                reveal(i + 1, j + 1);
                // southwest row+1, col-1
                reveal(i + 1, j - 1);
            }
        } else 
            return;
    }


    /**
     *  This function resets the game
     */
    function resetGame() {
        initializeGame();
        socket.send(JSON.stringify({
            type: 'reset',
            room_code: room_code,
            player: player
        }));
    }


    function setBoxStateValues() {
        //todo: set the values of the boxes
    }

    function setAnotherUserText(i, value) {
        console.log('another', value)
        gameState[parseInt(i)] = value
        setBoxStateValues()
        currentTurn = true
        console.log(gameState)
    }


    function selectResetGame() {
        let reset = 'reset';
        resetGamePlayers[player] = reset;
        var data = {
            'player': player,
            'reset': reset
        }
        socket.send(JSON.stringify({
            data
        }))
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
        socket.send(JSON.stringify({
            data
        }))
        setTimeout(() => { console.log("Routing..."); }, 2000);
        routeChange();
    }

    function checkForResetOrNewGame() {
       //todo: check for reset or new game
    }

    return(
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
        </>
    );
}

