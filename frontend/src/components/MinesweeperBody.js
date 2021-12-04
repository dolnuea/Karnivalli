import React, {useState, useEffect} from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { Board, Clear, GameInfo } from '../styles/Minesweeper.styles';
import MinesweeperCell from './MinesweeperCell';

import useSound from 'use-sound';
import mineSound from '../sounds/mine.mp3';
import axiosInstance from '../axios';
import backgroundSound from '../sounds/26computerBeep.mp3';

import youWin from '../sounds/8youWin.mp3';
import youLose from '../sounds/9youLose.mp3';
import youTie from '../sounds/10youTied.mp3';
import gameSelect from '../sounds/11gameSelect.mp3';
import playAgain from '../sounds/12playAgain.mp3';
import waitOpponent from '../sounds/13waitForOpponent.wav';
import joiningOpponent from '../sounds/27computerBeep.mp3';

// import ChatModal from 'react-modal'
// import chatImg from '../images/chat_button_img.png'

let currentTurn = true;
let resetGamePlayers = {}
let otherPlayerJoined = false
let otherPlayerName = "Guest"
let isOtherPlayerGuest = false
let game_session_id = null
let chat_messages = ""

const MinesweeperBody = (props) => {

    /**********************************Minesweeper variables******************************************/

    // let boardData = initalizeBoardData(props.height, props.width, props.mines);
    const [boardData, setboardData] = useState(initalizeBoardData(props.height, props.width, props.mines));
    // let mineCount = props.mines;
    const[mineCount, setMineCount] = useState(props.mines);

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
    const [backgroundSoundtrack] = useSound(backgroundSound, { volume: 0.1 });

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

    // getting sounds setup
    const [playerWon] = useSound(youWin);
    const [playerLost] = useSound(youLose);
    const [playerTied] = useSound(youTie);
    const [goGameSelect] = useSound(gameSelect);
    const [goPlayAgain] = useSound(playAgain);
    const [playerWait] = useSound(waitOpponent);

    //route history
    const history = useHistory();

    //take user to game selection screen when game is over
    const routeChange = () => { //for end of game
        resetGame();
        otherPlayerJoined = false;
        game_session_id = null;
        otherPlayerName = "Guest"
        isOtherPlayerGuest = false
        let path = 'game-selection';
        const userDetails = {
            username: props.username,
            isGuest: props.isGuest
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

    //connect server
    useEffect(() => {
        socket.onopen = function () {
            console.log('Socket connected')
            if (props.player === "p2" && otherPlayerJoined === false) {
                var data = data = { 'type': 'joined', 'playerName': props.username, 'isGuest': props.isGuest, 'player': props.player, 'board' : boardData , 'winner' : ''}
                //socket.send(JSON.stringify({ data }))
                sendMessage(socket, JSON.stringify({ data }))
            }
        }

        // Handle messages received from the server
        socket.onmessage = function (e) {
            var data = JSON.parse(e.data)
            console.log(data)

            // if (data.msg_type !== undefined) {
            //     chat_messages += ':' + data.chatMsg + '\n'
            //     setMsgs(chat_messages)
            // }

            console.log('isguest ' + data.payload.isGuest)

            if (data.payload.type === "joined") {
                console.log("other player joined")

                if (otherPlayerJoined) {
                    console.log("other player already joined")
                    return;
                }

                if (props.player === data.payload.player) {
                    console.log("player is same as other player")
                    return;
                }

                if (!data.payload.isGuest && data.payload.playerName === props.username) {
                    console.log("player is same as other player")
                    return;
                }

                otherPlayerName = data.payload.playerName
                isOtherPlayerGuest = data.payload.isGuest

                if (data.payload.isGuest && !otherPlayerJoined) {
                    console.log("other player is guest")
                    var data = data = { 'type': 'joined', 'playerName': props.username, 'isGuest': props.isGuest }
                    sendMessage(socket, JSON.stringify({ data }))
                    otherPlayerJoined = true
                    alert("Your opponent just joined. They joined as a guest");
                    return;
                }

                if (props.isGuest) {
                    console.log("player is guest")
                    var data = data = { 'type': 'joined', 'playerName': props.username, 'isGuest': props.isGuest }
                    //socket.send(JSON.stringify({ data }))
                    sendMessage(socket, JSON.stringify({ data }))
                    otherPlayerJoined = true
                    alert("Your opponent just joined, Their name is " + otherPlayerName);
                    return;
                }

                if (data.payload.game_session_id === undefined) {
                    axiosInstance
                        .post(`gamedata/create_game/`, {
                            owner: props.username,
                            game: "minesweeper",
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

            //reset
            if (data.payload.reset === "reset") {
                console.log("in reset")
                resetGamePlayers[data.payload.player] = data.payload.reset;
                checkForResetOrNewGame();
                return;
            }

            //change game
            if (data.payload.reset === "change") {
                routeChange();
                return;
            }

            //game end
            if (data.payload.type === 'end' && player === "viewer") {
                revealBoard(data.payload.board);
                alert("Game ended! " + data.payload.winner + " won");
                return;
            }

            //game end
            if (data.payload.type === 'over' && player === "viewer") {
                revealBoard(data.payload.board);
                alert("Game ended! " + data.payload.winner + " won");
                return;
            }

            if (data.payload.type === 'end' && data.payload.player !== player) {
                revealBoard(data.payload.board);
                otherPlayerJoined = false;
                setMessage("Sorry! You lost");
                playerLost();

                if (!props.isGuest && !isOtherPlayerGuest) { 
                    axiosInstance
                        .post(`gamedata/createOrUpdate_game_score/`, {
                            owner: props.username,
                            game: "minesweeper",
                            score: -100
                        })
                        .then((res) => {
                            console.log("Score successfully added")
                        });
                }
               
                //options page
                setIsOver(!isOver);

            } 

            if (data.payload.type === 'over'){
                otherPlayerJoined = false;

                if(data.payload.winner === player){
                    revealBoard(data.payload.board);
                    setMessage("You won! You survived.");

                    if (!props.isGuest && !isOtherPlayerGuest) {
                        axiosInstance
                            .post(`gamedata/createOrUpdate_game_score/`, {
                                owner: props.username,
                                game: "minesweeper",
                                score: 100
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

                    setIsOver(!isOver); 
                    playerWon();
                }
                else if(data.payload.winner === opponent)
                {
                    setMessage("Game over! You died.");
                    setIsOver(!isOver); 
                    playerLost();
                }
            }

            if (data.payload.type === 'running') {
                setboardData(data.payload.board);
                updateBoard(data.payload.board);

                if(data.payload.currentTurn === player){
                    currentTurn = true;
                    console.log("current turn : " + true)
                }
                else console.log("current turn : " + false)
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

    function updateBoard(data){
        console.log("updating board...")

        return data.map((dataRow) => {
            return (
                <tr>
                    {dataRow.map((dataItem) => {
                        return (
                            <td key={dataItem.x * dataRow.length + dataItem.y}>
                                <MinesweeperCell
                                    value={dataItem}
                                />
                                {(dataRow[dataRow.length - 1] === dataItem) ? <Clear/> : ""}
                            </td>);
                    })}
                </tr>
            )
        });
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


    /**
     * Reset game
     */
    function resetGame() {
        // reset game board
        resetGameBoard();
        setMineCount(props.mines);
        resetGamePlayers = {};
        otherPlayerJoined = true;
        currentTurn = true;
        if (show) {
            setShow(!show);
        }
        setIsOver(false);
    }

    function resetGameBoard(){
        let resetBoard = initalizeBoardData(props.height, props.width, props.mines)
        setboardData(resetBoard);
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
        if (resetGamePlayers['p1'] !== undefined && resetGamePlayers['p2'] !== undefined) {
            if (resetGamePlayers['p1'] === "reset" && resetGamePlayers['p2'] === "reset") {
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
    function revealBoard(data = boardData) {
        let updatedData = data;
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

    /***********************************************************************************************/
    /************************************Render Game Board******************************************/
    /**
     * Handle User Events
     * @param {*} x horizontal position
     * @param {*} y vertical position
     * @param {*} player 
     * @returns updated board data
     */
    function handleCellClick(x, y, player) {
        console.log("handleCellClick");

        if (player === "viewer") {
            alert("Well, that would be cheating...")
            playerWait();
            return;
        }

        console.log(socket.readyState)

        if (otherPlayerJoined === false) {
            alert("Please wait for the other player to join...")
            return;
        }

        if (currentTurn === false) {
                alert("Please wait for your opponent's turn!")
                return
        } 
        // else currentTurn = false;

        // check if revealed. return if true.
        if (boardData[x][y].isRevealed) {
            alert("This cell is already revealed!");
            console.log("This cell is already revealed!");
            return;
        }

        // check if mine. game over if true
        if (boardData[x][y].isMine) {
            //play sound effect
            play();
            revealBoard();
            console.log("BOOM! Game Over!")

            var data = { 'type': 'over', 'winner' : opponent, 'board' : boardData };
            sendMessage(socket, JSON.stringify({ data }))
            otherPlayerJoined = false;

            setMessage("Game Over");
            setIsOver(!isOver);
            return;
        }

        let updatedData = [...boardData];
        
        //reveal cells
        updatedData[x][y].isFlagged = false;
        updatedData[x][y].isRevealed = true;

        if (updatedData[x][y].isEmpty) {
            console.log("Empty cell revealed");
            updatedData = revealEmpty(x, y, updatedData);
        }

        var data = {
            'player' : player,
            'type' : 'running',
            'board' : updatedData,
            'reset' : '',
            'winner' : '',
            'currentTurn' : opponent
        }

        currentTurn = false;

        let win = false;

        if (getHidden(updatedData).length === props.mines) {

            win = true;
            revealBoard();

            var data = { 'type': 'end', 'player': player, 'winner' : player, 'board' : updatedData};
            sendMessage(socket, JSON.stringify({ data }))

            otherPlayerJoined = false;

            if (!props.isGuest && !isOtherPlayerGuest) {
                axiosInstance
                    .post(`gamedata/createOrUpdate_game_score/`, {
                        owner: props.username,
                        game: "minesweeper",
                        score: 100
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

            setMessage("You Win");
            setIsOver(!isOver);
        }

        setboardData(updatedData);
        setMineCount(props.mines - getFlags(updatedData).length);            

        console.log("cell at " + x + "," + y + " clicked by " + player);
        console.log("handle click done");
        setboardData(updatedData);

        sendMessage(socket, JSON.stringify({ data }))
    }

    /**
     * Right click handler
     * @param {*} e 
     * @param {*} x horizontal position
     * @param {*} y vertical position
     * @param {*} player 
     */
    function handleContextMenu(e, x, y, player) {
        e.preventDefault();

        console.log("handleContextMenu");

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

                var data = { 'type': 'end', 'player': player, 'board' : updatedData, 'winner' : player }
                sendMessage(socket, JSON.stringify({ data }))

                if (!props.isGuest && !isOtherPlayerGuest) {
                    axiosInstance
                        .post(`gamedata/createOrUpdate_game_score/`, {
                            owner: props.username,
                            game: "minesweeper",
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

                setMessage("You Win");
                setIsOver(!isOver);
            }
        }

        // boardData = updatedData;
        setboardData(updatedData);
        setMineCount(mines);
    }

    /**
     * 
     * @param {*} data board data
     * @param {*} player 
     * @returns rendered board
     */
    function renderBoard(data, player) {
        
        backgroundSoundtrack()
        
        console.log("render board!")
        // currentTurn = true; //swap current turn

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
                                {(dataRow[dataRow.length - 1] === dataItem) ? <Clear/> : ""}
                            </td>);
                    })}
                </tr>
            )
        });
    }

    /***********************************************************************************************/
    console.log("render board done!")
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
              Play again
            </Button>
                <Button 
                    variant="secondary" 
                    onClick={selectRouteChange}
                    onMouseEnter={() => {
                        goGameSelect();
                    }}
                    >
              Game Select Screen
            </Button>
          </Modal.Footer>
        </Modal>
            <Board>
                <GameInfo>
                    Mines: {mineCount}
                </GameInfo>
                {renderBoard(boardData, player)}
            </Board>
        </>
    );
}

export default MinesweeperBody;