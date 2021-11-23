import React, {useState, useEffect} from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { Board, Clear, GameInfo } from '../styles/Minesweeper.styles';
import MinesweeperCell from './MinesweeperCell';
import ChatModal from 'react-modal'
import chatImg from '../images/chat_button_img.png'

console.log('start')
var room_code = this.props.roomNumber
let socket = new W3CWebSocket('ws://localhost:8000/ws/game/' + room_code)
setTimeout(() => { console.log("connecting..."); }, 1000);

let currentTurn = true;
let chat_messages = ""


export default class MinesweeperBody extends React.Component {

    state = {
        boardData: this.initalizeBoardData(this.props.height, this.props.width, this.props.mines),
        gameWon: false,
        mineCount: this.props.mines,
        room_code : this.props.roomNumber //room code pulled from start game screen
    };

/*********************************Multiplayer Functionality*********************************************/

    //initialize board
    constructor(state) {   
        super(state);
    
         // messaging modal variables
        const [modalIsopen, setModalIsOpen] = useState(false)

        const [isChatModalOpen, setChatModalOpen] = useState(false)
        const [chatMsg, setChatMsg] = useState("")
        const [msgs, setMsgs] = useState("")

        //end of game modal show variables
        const [show, setShow] = useState(false);
        //modal handles close
        const handleClose = () => setShow(false);

        //variable for game is over
        const [isOver, setIsOver] = useState(false);
        //variable message when game is over
        const[message, setMessage] = useState(null);

        //modal pops up when game is over
        useEffect(() => {
            if (isOver) {
            setShow(true);
            }
        }, [isOver]);

        //route history
        const history = useHistory();

        //take user to game selection screen when game is over
        const routeChange = () => { //for end of game
            resetGame();
            let path = 'game-selection';
            const userDetails = {
                username: localStorage.getItem("username"),
                isGuest: localStorage.getItem("isGuest")
            }
            history.push(path, userDetails);
        }
        //connect server
        useEffect(() => {
            socket.onopen = function (e) {
                console.log('Socket connected')
            }

            socket.onmessage = function (e) {
                var data = JSON.parse(e.data)
                console.log(data)

                if (data.msg_type !== undefined) {
                    chat_messages += data.player + ':' + data.chatMsg + '\n'
                    setMsgs(chat_messages)
                }

                //reset game
                if (data.payload.reset === "reset") {
                    console.log("in reset")
                    resetGamePlayers[data.payload.player] = data.payload.reset;
                    checkForResetOrNewGame();
                    return;
                }
                //select another game
                if (data.payload.reset === "change") {
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
                    } 
                }
                if (data.state === props.location.state.player) {
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

            }

            //todo p1 or p2 wins

            socket.onclose = function (e) {
                console.log('Socket closed')
            }

        }, []);
    }

    

    //end of useEffect

    /** End of Game Modal Functions */

    resetGame() {
        currentTurn = true;
        if (show) {
            setShow(!show);
        }
        setIsOver(false);
    }

    selectResetGame() {
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

    selectRouteChange() {
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

    checkForResetOrNewGame() {
        console.log("checkForResetOrNewGame");
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

/********************************************************************************************/
    // get mines
    getMines(data) {
        let mineArray = [];

        data.map(datarow => {
            datarow.map((dataitem) => {
                if (dataitem.isMine) {
                    mineArray.push(dataitem);
                }
            });
        });

        return mineArray;
    }

    // get Flags
    getFlags(data) {
        let mineArray = [];

        data.map(datarow => {
            datarow.map((dataitem) => {
                if (dataitem.isFlagged) {
                    mineArray.push(dataitem);
                }
            });
        });

        return mineArray;
    }

    // get Hidden cells
    getHidden(data) {
        let mineArray = [];

        data.map(datarow => {
            datarow.map((dataitem) => {
                if (!dataitem.isRevealed) {
                    mineArray.push(dataitem);
                }
            });
        });

        return mineArray;
    }

    // Gets initial board data
    initalizeBoardData(height, width, mines) {
        let data = [];

        for (let i = 0; i < height; i++) {
            data.push([]);
            for (let j = 0; j < width; j++) {
                data[i][j] = {
                    x: i,
                    y: j,
                    isMine: false,
                    neighbour: 0,
                    isRevealed: false,
                    isEmpty: false,
                    isFlagged: false,
                };
            }
        }

        // plant mines
        let randomx, randomy, minesPlanted = 0;

        while (minesPlanted < mines) {
            randomx = Math.floor((Math.random() * 1000) + 1) % width;
            randomy = Math.floor((Math.random() * 1000) + 1) % height;
            if (!(data[randomx][randomy].isMine)) {
                data[randomx][randomy].isMine = true;
                minesPlanted++;
            }
        }

        // get neighbours

        let updatedData = data;

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (data[i][j].isMine !== true) {
                    let mine = 0;
                    const area = this.traverseBoard(data[i][j].x, data[i][j].y, data);
                    area.map(value => {
                        if (value.isMine) {
                            mine++;
                        }
                    });
                    if (mine === 0) {
                        updatedData[i][j].isEmpty = true;
                    }
                    updatedData[i][j].neighbour = mine;
                }
            }
        }

        data = updatedData;

        console.log(data);
        return data;
    }


    // looks for neighbouring cells and returns them
    traverseBoard(x, y, data) {
        const el = [];

        //up
        if (x > 0) {
            el.push(data[x - 1][y]);
        }

        //down
        if (x < this.props.height - 1) {
            el.push(data[x + 1][y]);
        }

        //left
        if (y > 0) {
            el.push(data[x][y - 1]);
        }

        //right
        if (y < this.props.width - 1) {
            el.push(data[x][y + 1]);
        }

        // top left
        if (x > 0 && y > 0) {
            el.push(data[x - 1][y - 1]);
        }

        // top right
        if (x > 0 && y < this.props.width - 1) {
            el.push(data[x - 1][y + 1]);
        }

        // bottom right
        if (x < this.props.height - 1 && y < this.props.width - 1) {
            el.push(data[x + 1][y + 1]);
        }

        // bottom left
        if (x < this.props.height - 1 && y > 0) {
            el.push(data[x + 1][y - 1]);
        }

        return el;
    }

    // reveals the whole board
    revealBoard() {
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
    revealEmpty(x, y, data) {
        let area = this.traverseBoard(x, y, data);
        area.map(value => {
            if (!value.isRevealed && (value.isEmpty || !value.isMine)) {
                data[value.x][value.y].isRevealed = true;
                if (value.isEmpty) {
                    this.revealEmpty(value.x, value.y, data);
                }
            }
        });
        return data;
    }

    // Handle User Events

    handleCellClick(x, y) {
        let win = false;

        // check if revealed. return if true.
        if (this.state.boardData[x][y].isRevealed) return null;

        // check if mine. game over if true
        if (this.state.boardData[x][y].isMine) {
            this.revealBoard();
            var data = { 'type': 'end', 'player': player }
            socket.send(JSON.stringify({ data }))
            //alert("game over");
            setMessage("Game Over");
            setIsOver(!isOver);
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
            var data = { 'type': 'end', 'player': player }
            socket.send(JSON.stringify({ data }))
            //alert("You Win");
            setMessage("You Win");
            setIsOver(!isOver);
        }

        this.setState({
            boardData: updatedData,
            mineCount: this.props.mines - this.getFlags(updatedData).length,
            gameWon: win,
        });
    }

    handleContextMenu(e, x, y) {
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
                var data = { 'type': 'end', 'player': player }
                socket.send(JSON.stringify({ data }))
                setMessage("You Win");
                //alert("You Win");
            }
        }

        this.setState({
            boardData: updatedData,
            mineCount: mines,
            gameWon: win,
        });
    }

    renderBoard(data) {
        console.log(data)

        return data.map((dataRow) => {
            return (
                <tr>
                    {dataRow.map((dataItem) => {
                        return (
                            <td key={dataItem.x * dataRow.length + dataItem.y}>
                                <MinesweeperCell
                                    onClick={() => this.handleCellClick(dataItem.x, dataItem.y)}
                                    cMenu={(e) => this.handleContextMenu(e, dataItem.x, dataItem.y)}
                                    value={dataItem}
                                />
                                {(dataRow[dataRow.length - 1] === dataItem) ? <Clear /> : ""}
                            </td>);
                    })}
                </tr>
            )
        });
    }

    // Component methods
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
            this.setState({
                boardData: this.initBoardData(nextProps.height, nextProps.width, nextProps.mines),
                gameWon: false,
                mineCount: nextProps.mines,
            });
        }
    }

    render() {
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
                <Board>
                    <ScoreBoard>
                        Room Number : {props.roomNumber}
                    </ScoreBoard>
                    <GameInfo>
                        <span>Mines: {this.state.mineCount}</span><br />
                        <span>{this.state.gameWon ? "You Win" : ""}</span>
                    </GameInfo>
                    {this.renderBoard(this.state.boardData)}
                </Board>
            </>
        );
    }
}