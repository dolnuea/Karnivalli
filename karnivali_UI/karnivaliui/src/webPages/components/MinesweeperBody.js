import React, { useState, useEffect} from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import Cell from './MinesweeperCell';


/**
 * @param {*} props 
 * @returns 
 */
const MinesweeperBody = (props) => {

    //default variable
    let currentTurn = true
    let resetGamePlayers = {}

    //minesweeper variables
    let mine_num = this.props.mine_num;
    let board_data = initializeGame(this.props.height, this.props.width, this.props.mines);
    let game_won = false;

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

    /*Multiplayer Game */
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
            } else if (data.payload.type === 'over') {
                //alert("Game over! game end no one won")
                setMessage("Game over! No one won");
                //options page
                setIsOver(!isOver);
            } else if (data.payload.type === 'running' && data.payload.player !== player) {
                setAnotherUserText(data.payload.index, data.payload.player)
            }

        }

        socket.onclose = function (e) {
            console.log('Socket closed')
        }
    }, []);


    /*******Minesweeper functions*********/

    /**
     * Initialize the game board:
     * Put bombs in random locations
     * Calculate the number of bombs in each square's nearby squares
     * Put squares in the gameState array
     */
    function initializeGame(height, width, mines) {
        let gameState = []
        for (let i = 0; i <  height; i++) {
            gameState.push([]);
            for (let j = 0; j < width ; j++) {
                gameState[i][j] = {
                    x: i,
                    y: j,
                    isMine: false,
                    neighbor: 0,
                    isRevealed: false,
                    isEmpty: false,
                    isFlagged: false,
                };
            }
        }

        //put bombs in random locations
        let mines_planted = 0, random_x, random_y;

        while(mines_planted < mines) {
            random_x = Math.floor((Math.random() * 1000) + 1) % width;
            random_y = Math.floor((Math.random() * 1000) + 1) % height;
            if (!gameState[random_x][random_y].isMine) {
                gameState[random_x][random_y].isMine = true;
                mines_planted++;
            }
        }
        
        //calculate the number of bombs in each square's nearby squares
        for (let i = 0; i <  height; i++) {
            for (let j = 0; j < width ; j++) {
                if(gameState[i][[j].isMine] !== true){
                    let mine = 0;
                    const neighbors = getNeighbors(gameState[i][j].x, gameState[i][j].y, gameState);
                    //The map() method creates a new array populated with the results
                    // of calling a provided function on every element in the calling array.
                    neighbors.map(neighbor => {
                        if (neighbor.isMine) {
                            mine++;
                        }
                    });
                    if(mine === 0) {
                        gameState[i][j].isEmpty = true;
                    }
                    gameState[i][j].neighbor = mine;
                }
            }
        }
        console.log(gameState)
        return gameState;
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
        * @param {*} gameState game
     */
    function getNeighbors(i, j, gameState) {

            const neighbors = [];

            //check up
            if (i > 0) {
                neighbors.push(gameState[i - 1][j]);
            }
            //check down
            if (i < this.props.height - 1) {
                neighbors.push(gameState[i + 1][j]);
            }
            //check left
            if (j > 0) {
                neighbors.push(gameState[i][j - 1]);
            }
            //check right
            if (j < this.props.width - 1) {
                neighbors.push(gameState[i][j + 1]);
            }
            //check up-left
            if (i > 0 && j > 0) {
                neighbors.push(gameState[i - 1][j - 1]);
            }
            //check up-right
            if (i > 0 && j < this.props.width - 1) {
                neighbors.push(gameState[i - 1][j + 1]);
            }
            //check down-right
            if (i < this.props.height - 1 && j < this.props.width - 1) {
                neighbors.push(gameState[i + 1][j + 1]);
            }
            //check down-left
            if (i < this.props.height - 1 && j > 0) {
                neighbors.push(gameState[i + 1][j - 1]);
            }
            return neighbors;       
    }

    // get mines
    function getMines(gameState) {
        let mineArray = [];

        gameState.map(datarow => {
            datarow.map((dataitem) => {
                if (dataitem.isMine) {
                    mineArray.push(dataitem);
                }
            });
        });

        return mineArray;
    }

    // get Flags
    function getFlags(gameState) {
        let mineArray = [];

        gameState.map(datarow => {
            datarow.map((dataitem) => {
                if (dataitem.isFlagged) {
                    mineArray.push(dataitem);
                }
            });
        });

        return mineArray;
    }

    // get Hidden cells
    function getHidden(gameState) {
        let mineArray = [];

        gameState.map(datarow => {
            datarow.map((dataitem) => {
                if (!dataitem.isRevealed) {
                    mineArray.push(dataitem);
                }
            });
        });

        return mineArray;
    }

    // reveals the whole board
    function revealBoard() {
        let updatedData = this.state.boardData;
        updatedData.map((datarow) => {
            datarow.map((dataitem) => {
                dataitem.isRevealed = true;
            });
        });
        this.setState({
            boardData: updatedData
        })
    }

    /* reveal logic for empty cell */
    function revealEmpty(x, y, gameState) {
        let area = this.traverseBoard(x, y, gameState);
        area.map(value => {
            if (!value.isRevealed && (value.isEmpty || !value.isMine)) {
                gameState[value.x][value.y].isRevealed = true;
                if (value.isEmpty) {
                    this.revealEmpty(value.x, value.y, gameState);
                }
            }
        });
        return gameState;
    }

    /*User Event Functions */

    function handleCellClick(x, y) {
        let win = false;

        // check if revealed. return if true.
        if (this.state.boardData[x][y].isRevealed) return null;

        // check if mine. game over if true
        if (this.state.boardData[x][y].isMine) {
            this.revealBoard();
            alert("game over");
        }

        let updatedData = this.state.boardData;
        updatedData[x][y].isFlagged = false;
        updatedData[x][y].isRevealed = true;

        if (updatedData[x][y].isEmpty) {
            updatedData = this.revealEmpty(x, y, updatedData);
        }

        if (this.getHidden(updatedData).length === this.props.mines) {
            win = true;
            this.revealBoard();
            alert("You Win");
        }

        this.setState({
            boardData: updatedData,
            mineCount: this.props.mines - this.getFlags(updatedData).length,
            gameWon: win,
        });
    }

    function _handleContextMenu(e, x, y) {
        e.preventDefault();
        let updatedData = this.state.boardData;
        let mines = this.state.mineCount;
        let win = false;

        // check if already revealed
        if (updatedData[x][y].isRevealed) return;

        if (updatedData[x][y].isFlagged) {
            updatedData[x][y].isFlagged = false;
            mines++;
        } else {
            updatedData[x][y].isFlagged = true;
            mines--;
        }

        if (mines === 0) {
            const mineArray = this.getMines(updatedData);
            const FlagArray = this.getFlags(updatedData);
            win = (JSON.stringify(mineArray) === JSON.stringify(FlagArray));
            if (win) {
                this.revealBoard();
                alert("You Win");
            }
        }

        this.setState({
            boardData: updatedData,
            mineCount: mines,
            gameWon: win,
        });
    }

    function renderBoard(data) {
        return data.map((datarow) => {
            return datarow.map((dataitem) => {
                return (
                    <div key={dataitem.x * datarow.length + dataitem.y}>
                        <Cell
                            onClick={() => this.handleCellClick(dataitem.x, dataitem.y)}
                            cMenu={(e) => this._handleContextMenu(e, dataitem.x, dataitem.y)}
                            value={dataitem}
                        />
                        {(datarow[datarow.length - 1] === dataitem) ? <div className="clear" /> : ""}
                    </div>);
            })
        });


    }
    // Component methods
    // function componentWillReceiveProps(nextProps) {
    //     if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
    //         this.setState({
    //             boardData: this.initBoardData(nextProps.height, nextProps.width, nextProps.mines),
    //             gameWon: false,
    //             mineCount: nextProps.mines,
    //         });
    //     }
    // }

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
        board_data[parseInt(i)] = value
        setBoxStateValues()
        currentTurn = true
        console.log(board_data)
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

    function checkForResetOrNewGame() {
        console.log("checkForResetOrNewGame");
        //todo: check if all players have reset or new game
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

    // function checkForResetOrNewGame() {
    //    //todo: check for reset or new game
    // }

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
            
            <div className="board">
                <div className="game-info">
                    <span className="info">mines: {this.state.mineCount}</span><br />
                    <span className="info">{this.state.gameWon ? "You Win" : ""}</span>
                </div>
                {
                    this.renderBoard(this.state.boardData)
                }
            </div>
        </>
    );
}
export default MinesweeperBody;