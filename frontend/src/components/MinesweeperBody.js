import React, {useState, useEffect} from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { Board, Clear, GameInfo } from '../styles/Minesweeper.styles';
import MinesweeperCell from './MinesweeperCell';
import useSound from 'use-sound';
import mineSound from '../sounds/mine.mp3';

// import ChatModal from 'react-modal'
// import chatImg from '../images/chat_button_img.png'

let currentTurn = true;
let resetGamePlayers = {}

const MinesweeperBody = (props) => {

    /**********************************Minesweeper variables******************************************/

    // let boardData = initalizeBoardData(props.height, props.width, props.mines);
    const [boardData, setboardData] = useState(initalizeBoardData(props.height, props.width, props.mines));
    // let mineCount = props.mines;
    const[mineCount, setMineCount] = useState(props.mines);
    const[gameWon, setGameWon] = useState(false);

    //end of game modal show variables
    const [show, setShow] = useState(false);
    //modal handles close
    const handleClose = () => setShow(false);

    //variable for game is over
    const [isOver, setIsOver] = useState(false);
    //variable message when game is over
    const[message, setMessage] = useState(null);

    //mine explosion sound effect
    const [play] = useSound(mineSound);

    //modal pops up when game is over
    useEffect(() => {
        if (isOver) {
        setShow(true);
        }
    }, [isOver]);

    // messaging modal variables
    // const [modalIsopen, setModalIsOpen] = useState(false)

    // const [isChatModalOpen, setChatModalOpen] = useState(false)
    // const [chatMsg, setChatMsg] = useState("")
    // const [msgs, setMsgs] = useState("")

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
    /*******************************************************************************************************/
    /*********************************Multiplayer Functionality*********************************************/
    var room_code = props.roomNumber
    var player = props.player;
    var opponent = (player === 'p1') ? 'p2' : (player === 'p2') ? 'p1' : null;

    console.log("room : " + room_code);
    console.log("player : " + player);
    console.log("opponent : " + opponent);

    let socket = new W3CWebSocket('ws://localhost:8000/ws/game/' + room_code)
    setTimeout(() => { console.log("connecting..."); }, 1000);

    //let chat_messages = ""

    //connect server
    useEffect(() => {
        socket.onopen = function (e) {
            console.log('Socket connected')
    }

    socket.onmessage = function (e) {
        var data = JSON.parse(e.data);
        console.log(data);

        // if (data.msg_type !== undefined) {
        //     chat_messages += data.player + ':' + data.chatMsg + '\n'
        //     setMsgs(chat_messages)
        // }

        //reset game
        if (data.payload.reset === "reset") {
            console.log("resetting...")
            resetGamePlayers[data.payload.player] = data.payload.reset;
            checkForResetOrNewGame();
            return;
        }
        //select another game
        if (data.payload.reset === "change") {
            routeChange();
            return;
        }

        // if (data.payload.type == 'end' && player == "viewer") {
        //     alert("Game ended!!");
        //     return;
        // }

        if (player === "viewer") {

            if (data.state === 'p1') {
                revealBoard(data.payload.board);
                alert("Player one wins.")
                return
            } else if (data.state === 'p2') {
                revealBoard(data.payload.board);
                alert("Player two wins.")
                return
            } 
        }

        // if (data.payload.type === 'end' && player === "viewer") {
        //     alert("Game ended!!");
        //     return;
        // }

        if (data.state === player) {
            revealBoard(data.payload.board);
            currentTurn = true;
            setMessage("You won!");
            setIsOver(!isOver);
            return
        } 
        else if ((data.state === 'p2' && player === 'p1') || (data.state === 'p1' && player === 'p2')) {
            revealBoard(data.payload.board);
            currentTurn = true;
            setMessage("You lost!");
            setIsOver(!isOver);
            return
        }
        else if (data.payload.state === 'running' && data.payload.player !== player) {
            swapTurns();
        }
            socket.onclose = function (e) {
                console.log('Socket closed')
            }
        }
    }, []);

    function swapTurns() {
        currentTurn = !currentTurn;
        console.log("swapping turns...")
    }

    /**
     * 
     * @param {*} ws websocket connection
     * @returns check if connection is open
     */
    function isOpen(ws) { 
        return ws.readyState === ws.OPEN 
    }

    // /**
    //  * Send data in multiplayer game session
    //  * @param {*} player 
    //  * @param {*} boardData 
    //  * @returns 
    //  */
    // function sendData(boardData, player){
    //     if (player === "viewer") {
    //         alert("Well, that would be cheating...")
    //         return;
    //     }

    //     var data = {
    //         'player': player,
    //         'state': 'progress',
    //         'reset': ''
    //     }

    //     if (currentTurn === false) {
    //         alert("Please wait for your opponent's turn!")
    //         return
    //     } else {
    //         currentTurn = false
    //     }
    //     socket.send(JSON.stringify({
    //         data
    //     }))
    // }

    /**
     * Reset game
     */
    function resetGame() {
        console.log('reset game');
        setboardData(initalizeBoardData(props.height, props.width, props.mines));
        setGameWon(false);
        setMineCount(props.mines);
        currentTurn = true;
        if (show) {
            setShow(!show);
        }
        setIsOver(false);
    }

    /**
     * Check if game is over: reset or new game
     */
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

    /**
     * Change game
     */
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

    /**
     * Check if game is over: reset or new game
     */
    function checkForResetOrNewGame() {
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

    // function sendChatData(player) {
    //     socket.send(JSON.stringify({
    //         msg_type: "chat_msg",
    //         player,
    //         chatMsg
    //     }))

    //     setChatMsg("")
    // }

/********************************************************************************************/
/************************************Game Functions******************************************/
    /**
     * get mines
     * @param {*} data board data
     * @returns array of mines
     */
    function getMines(data) {
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

    /**
     * get Flags
     * @param {*} data board data
     * @returns flagged cells
     */
    function getFlags(data) {
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

    /**
     * get Hidden cells
     * @param {*} data board data
     * @returns hidden cells
     */
    function getHidden(data) {
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

    /**
     * Gets initial board data
     * @param {*} height 
     * @param {*} width 
     * @param {*} mines 
     * @returns minesweeper board
     */
    function initalizeBoardData(height, width, mines) {
        console.log("initalizeBoardData");
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
                    const area = traverseBoard(data[i][j].x, data[i][j].y, data);
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
        return data;
    }

    /**
     * Looks for neighbouring cells and returns them
     * @param {*} x horizontal position
     * @param {*} y vertical position
     * @param {*} data board data
     * @returns array of neighbouring cells
     */
    function traverseBoard(x, y, data) {
        const el = [];

        //up
        if (x > 0) {
            el.push(data[x - 1][y]);
        }

        //down
        if (x < props.height - 1) {
            el.push(data[x + 1][y]);
        }

        //left
        if (y > 0) {
            el.push(data[x][y - 1]);
        }

        //right
        if (y < props.width - 1) {
            el.push(data[x][y + 1]);
        }

        // top left
        if (x > 0 && y > 0) {
            el.push(data[x - 1][y - 1]);
        }

        // top right
        if (x > 0 && y < props.width - 1) {
            el.push(data[x - 1][y + 1]);
        }

        // bottom right
        if (x < props.height - 1 && y < props.width - 1) {
            el.push(data[x + 1][y + 1]);
        }

        // bottom left
        if (x < props.height - 1 && y > 0) {
            el.push(data[x + 1][y - 1]);
        }

        return el;
    }

    /**
     * Reveals the whole board
     */
    function revealBoard() {
        let updatedData = boardData;
        updatedData.map((datarow) => {
            datarow.map((dataitem) => {
                dataitem.isRevealed = true;
            });
        });
        // boardData = updatedData;
        setboardData(updatedData);
    }

     
    /**
     * reveal logic for empty cell
     * @param {*} x horizontal position
     * @param {*} y vertical position
     * @param {*} data board data
     * @returns empty cell
     */
    function revealEmpty(x, y, data) {
        let area = traverseBoard(x, y, data);
        area.map(value => {
            if (!value.isRevealed && (value.isEmpty || !value.isMine)) {
                data[value.x][value.y].isRevealed = true;
                if (value.isEmpty) {
                    revealEmpty(value.x, value.y, data);
                }
            }
        });
        return data;
    }

    /**
     * Handle User Events
     * @param {*} x horizontal position
     * @param {*} y vertical position
     * @param {*} player 
     * @returns updated board data
     */
    function handleCellClick(x, y, player) {

        if (player === "viewer") {
            alert("Well, that would be cheating...")
            return;
        }

        // if (currentTurn === false) {
        //         alert("Please wait for your opponent's turn!")
        //         console.log("Current turn " + currentTurn);
        //         return
        // } 

        var data = {
            'player' : player,
            'state' : 'running',
            'board' : boardData,
            'reset' : ''
        }

        currentTurn = false

        let win = false;

        // check if revealed. return if true.
        if (boardData[x][y].isRevealed) {
            alert("This cell is already revealed!");
            console.log("This cell is already revealed!");
            return null;
        }

        // check if mine. game over if true
        if (boardData[x][y].isMine) {
            revealBoard();

            data = {'player': player, 'state': opponent,'board' : boardData, 'reset': '' }
            
            // socket.send(JSON.stringify({ 
            //     data
            // }))

            //play sound effect
            play();
            console.log("BOOM! Game Over!");
            setMessage("Game Over");
            setIsOver(!isOver);
        }

        let updatedData = boardData;
        //reveal cells
        updatedData[x][y].isFlagged = false;
        updatedData[x][y].isRevealed = true;

        if (updatedData[x][y].isEmpty) {
            console.log("Empty cell revealed");
            updatedData = revealEmpty(x, y, updatedData);
        }

        if (getHidden(updatedData).length === props.mines) {
            win = true;
            revealBoard();
            data = {'player': player, 'state': player,'board' : boardData, 'reset': '' }
            // socket.send(JSON.stringify({ 
            //     data
            // }))
            console.log("You Win!");
            setMessage("You Win");
            setIsOver(!isOver);
        }

        // boardData = updatedData;
        setboardData(updatedData);
        setGameWon(win);
        setMineCount(props.mines - getFlags(updatedData).length);    

        if (!isOpen(socket)) return;
        socket.send(JSON.stringify(data));
    }

    /**
     * 
     * @param {*} e 
     * @param {*} x horizontal position
     * @param {*} y vertical position
     * @param {*} player 
     */
    function handleContextMenu(e, x, y, player) {
        e.preventDefault();
        let updatedData = boardData;
        let mines = mineCount;
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

        //check win
        if (mines === 0) {
            const mineArray = getMines(updatedData);
            const FlagArray = getFlags(updatedData);
            win = (JSON.stringify(mineArray) === JSON.stringify(FlagArray));
            if (win) {
                revealBoard();
                // var data = {'player': player, 'state': player, 'reset': '' }
                socket.send(JSON.stringify({ 
                    'player': player,
                    'state': player,
                    'board' : boardData,
                    'reset': ''
                }))
                console.log("You Win!");
                setMessage("You Win");
                setIsOver(!isOver);
            }
        }

        // boardData = updatedData;
        setboardData(updatedData);
        setGameWon(win);
        setMineCount(mines);
        console.log("cell at " + x + "," + y + " clicked by " + player);
    }

    /**
     * 
     * @param {*} data board data
     * @param {*} player 
     * @returns rendered board
     */
    function renderBoard(data, player) {
        console.log("render board!")

        return data.map((dataRow) => {
            return (
                <tr>
                    {dataRow.map((dataItem) => {
                        return (
                            <td key={dataItem.x * dataRow.length + dataItem.y}>
                                <MinesweeperCell
                                    onClick={() => handleCellClick(dataItem.x, dataItem.y, player)}
                                    cMenu={(e) => handleContextMenu(e, dataItem.x, dataItem.y, player)}
                                    value={dataItem}
                                />
                                {(dataRow[dataRow.length - 1] === dataItem) ? <Clear /> : ""}
                            </td>);
                    })}
                </tr>
            )
        });
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
            <Board>
                <GameInfo>
                    Mines: {mineCount} <br />
                    {gameWon ? "You Win" : ""}
                </GameInfo>
                {renderBoard(boardData, player)}
            </Board>
        </>
    );
}

export default MinesweeperBody;