import React from "react";
function GameCard(props) {
    // const game = {
    //     "owner": "Kali",
    //     "game": "rps",
    //     "status": "win",
    //     "opponent": "user2"
    // }

    const game = props.game
    console.log(game)
    const playerName = props.playerName
    console.log(playerName)
    const getImageUrl = (game_name) => {
        if (game_name === "rock-paper-scissor") {
            return "https://media.istockphoto.com/vectors/rock-paper-scissors-vector-illustration-vector-id1056840214?k=20&m=1056840214&s=170667a&w=0&h=XHMBHLV9gIpRoEvQfa4eMN-h2hfAqXx0gZ88YuU9Tmk="
        }
        else if (game_name === "tic-tac-toe") {
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Tic_tac_toe.svg/1200px-Tic_tac_toe.svg.png"
        }
        else if (game_name === "minesweeper") {
            return "https://minesweeper.online/img/homepage/beginner.png"
        }
        else {
            return "./logo512.png"
        }
    }

    return (
        <div className ="col-sm-3 my-2">
            <div className="card"
            // style={{ width: '12rem' }}
            >

                <img className="card-img-top" src={getImageUrl(game.game)}
                    style={{ height: '12rem' }}
                    alt="No Pic" />

                <div className="card-body">
                    <h5 className="card-title">opponent: {playerName === game.owner ? game.opponent : game.owner}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Result:
                        {
                            game.status === playerName ? "Won" : (game.status === "draw" ? "draw" : (game.status === "InProgress" ? "InProgress" : "Lost"))
                        }

                    </h6>
                </div>
            </div>
        </div>
    );
}

export default GameCard;
