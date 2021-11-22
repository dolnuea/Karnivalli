import React from 'react';
import { Board, Clear, GameInfo } from '../styles/Minesweeper.styles';
import MinesweeperCell from './MinesweeperCell';


export default class MinesweeperBody extends React.Component {
    state = {
        boardData: this.initalizeBoardData(this.props.height, this.props.width, this.props.mines),
        gameWon: false,
        mineCount: this.props.mines,
    };

    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);

    // const [isOver, setIsOver] = useState(false);
    // const[message, setMessage] = useState(null);

    // useEffect(() => {
    //     if (isOver) {
    //     setShow(true);
    //     }
    // }, [isOver]);


    // const history = useHistory();

    // const routeChange = () => { //for end of game
    //     resetGame();
    //     let path = 'game-selection';
    //     history.push(path);
    // }

    // var room_code = props.roomNumber
    // var player = props.playColor
    // console.log('start')
    // let socket = new W3CWebSocket('ws://localhost:8000/ws/game/' + room_code)
    // setTimeout(() => { console.log("connecting..."); }, 1000);

    // useEffect(() => {
    //     socket.onopen = function (e) {
    //         console.log('Socket connected')
    //     }

    //     socket.onmessage = function (e) {
    //         var data = JSON.parse(e.data)
    //         console.log(data)

    //         if (data.payload.reset === "reset") {
    //             console.log("in reset")
    //             resetGamePlayers[data.payload.player] = data.payload.reset;
    //             checkForResetOrNewGame();
    //             return;
    //         }
    //         if (data.payload.reset === "change") {
    //             routeChange();
    //             return;
    //         }

    //         if (data.payload.type == 'end' && data.payload.player !== player) {
    //             //alert("Sorry! you lost")
    //             setMessage("Sorry! You lost");
    //             //options page
    //             setIsOver(!isOver);
    //         } else if (data.payload.type == 'over') {
    //             //alert("Game over! game end no one won")
    //             setMessage("Game over! No one won");
    //             //options page
    //             setIsOver(!isOver);
    //         } else if (data.payload.type == 'running' && data.payload.player !== player) {
    //             setAnotherUserText(data.payload.index, data.payload.player)
    //         }

    //     }

    //     socket.onclose = function (e) {
    //         console.log('Socket closed')
    //     }
    // }, []);


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
                alert("You Win");
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
                {/* <Modal show={show} onHide={handleClose}>
                <Modal.Title>{message}</Modal.Title>
                <Modal.Footer>
                    <Button variant="primary" onClick={selectResetGame}>
                  Play again!
                </Button>
                    <Button variant="secondary" onClick={selectRouteChange}>
                  Play another game
                </Button>
              </Modal.Footer>
            </Modal> */}
                <Board>
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