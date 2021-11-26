import React, {useState, useEffect} from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { Board, Clear, GameInfo } from '../styles/Minesweeper.styles';
import MinesweeperCell from './MinesweeperCell';
import ChatModal from 'react-modal'
import chatImg from '../images/chat_button_img.png'


let currentTurn = true;
let resetGamePlayers = {}
let gameWon = false;

const MinesweeperBody = (props) => {

    let boardData = initalizeBoardData(props.height, props.width, props.mines);
    let mineCount = props.mines;
    

/*********************************Multiplayer Functionality*********************************************/

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

    console.log('start')
    var room_code = props.roomNumber
    let socket = new W3CWebSocket('ws://localhost:8000/ws/game/' + room_code)
    setTimeout(() => { console.log("connecting..."); }, 1000);

    //let chat_messages = ""

    //connect server
    useEffect(() => {
        socket.onopen = function (e) {
            console.log('Socket connected')
    }

    socket.onmessage = function (e) {
        var data = JSON.parse(e.data)
        console.log(data)

        // if (data.msg_type !== undefined) {
        //     chat_messages += data.player + ':' + data.chatMsg + '\n'
        //     setMsgs(chat_messages)
        // }

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

        // if (data.payload.type == 'end' && player == "viewer") {
        //     alert("Game ended!!");
        //     return;
        // }

        let player = props.location.state.player;

        if (player === "viewer") {

            if (data.state === 'p1') {
                alert("Player one wins.")
                return
            } else if (data.state === 'p2') {
                alert("Player two wins.")
                return
            } 
        }

        // if (data.payload.type === 'end' && player === "viewer") {
        //     alert("Game ended!!");
        //     return;
        // }

        if (data.state === player) {
            currentTurn = true;
            setMessage("You won!");
            setIsOver(true);
            return
        } 
        else if ((data.state === 'p2' && player === 'p1') || (data.state === 'p1' && player === 'p2')) {
            currentTurn = true;
            setMessage("You lost!");
            setIsOver(true);
            return
        }
            socket.onclose = function (e) {
                console.log('Socket closed')
            }

        }
    }, []);

    console.log('end')

    function sendData(player, boardData){
        if (props.location.state.player === "viewer") {
            alert("Well, that would be cheating...")
            return;
        }

        var data = {
            'player': player,
            'state': 'progress',
            'reset': ''
        }

        if (currentTurn === false) {
            alert("Please wait for your opponent's turn!")
            return
        } else {
            currentTurn = false
        }
        socket.send(JSON.stringify({
            data
        }))
        //call won function
        renderBoard(boardData, player)
    }

    //end of useEffect

    //add sendData function for game progress, wait for opposition, cant fill sapce, cheating

    /** End of Game Modal Functions */

    function resetGame() {
        console.log('reset game');
        boardData = initalizeBoardData(props.height, props.width, props.mines);
        gameWon = false;
        mineCount = props.mines;
        currentTurn = true;
        //todo reset game
        if (show) {
            setShow(!show);
        }
        setIsOver(false);
    }

    function selectResetGame() {
        let reset = 'reset';
        let player = props.location.state.player;
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
        let player = props.location.state.player;
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
    // get mines
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

    // get Flags
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

    // get Hidden cells
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

    // Gets initial board data
    function initalizeBoardData(height, width, mines) {
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

        console.log(data);
        return data;
    }


    // looks for neighbouring cells and returns them
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

    // reveals the whole board
    function revealBoard() {
        let updatedData = boardData;
        updatedData.map((datarow) => {
            datarow.map((dataitem) => {
                dataitem.isRevealed = true;
            });
        });
        boardData = updatedData;
        //setBoardData(boardData);
    }

    /* reveal logic for empty cell */
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

    // Handle User Events

    //todo data used twice
    function handleCellClick(x, y, player) {
        let win = false;

        // check if revealed. return if true.
        if (boardData[x][y].isRevealed) return null;

        // check if mine. game over if true
        if (boardData[x][y].isMine) {
            revealBoard();
            var data = { 'state': 'end', 'player': props.location.state.player }
            socket.send(JSON.stringify({ data }))
            //alert("game over");
            setMessage("Game Over");
            setIsOver(!isOver);
        }

        let updatedData = boardData;
        updatedData[x][y].isFlagged = false;
        updatedData[x][y].isRevealed = true;

        if (updatedData[x][y].isEmpty) {
            updatedData = revealEmpty(x, y, updatedData);
        }

        if (getHidden(updatedData).length === props.mines) {
            win = true;
            revealBoard();
            var data = { 'state': player, 'player': player }
            socket.send(JSON.stringify({ data }))
            //alert("You Win");
            setMessage("You Win");
            setIsOver(!isOver);
        }

        boardData = updatedData;
        mineCount = props.mines - getFlags(updatedData).length;
        gameWon = win;
    }

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

        if (mines === 0) {
            const mineArray = getMines(updatedData);
            const FlagArray = getFlags(updatedData);
            win = (JSON.stringify(mineArray) === JSON.stringify(FlagArray));
            if (win) {
                revealBoard();
                var data = { 'state': 'end', 'player': player }
                socket.send(JSON.stringify({ data }))
                setMessage("You Win");
                //alert("You Win");
            }
        }

        boardData = updatedData;
        mineCount = mines;
        gameWon = win;
    }

    function renderBoard(data, player) {
        console.log(data)

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

    // Component methods
    function componentWillReceiveProps(nextProps) {
        if (JSON.stringify(props) !== JSON.stringify(nextProps)) {

            this.setState({
                boardData: initalizeBoardData(nextProps.height, nextProps.width, nextProps.mines),
                gameWon: false,
                mineCount: nextProps.mines,
            });
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
        </Modal>
            <Board>
                <GameInfo>
                    <span>Mines: {mineCount}</span><br />
                    <span>{gameWon ? "You Win" : ""}</span>
                </GameInfo>
                {sendData(boardData, props.location.state.player)}
            </Board>
        </>
    );
}

export default MinesweeperBody;