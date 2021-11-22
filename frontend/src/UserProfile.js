import React from "react";
import Navbar from "./Navbar";
import GameCard from "./GameCard";


function UserProfile(props) {

    const games = [{
        "owner": "Kali",
        "game": "tic-tac-toe",
        "status": "win",
        "opponent": "user2"
    }, {
        "owner": "Kali",
        "game": "rps",
        "status": "win",
        "opponent": "user2"
    }, {
        "owner": "Kali",
        "game": "tic-tac-toe",
        "status": "lost",
        "opponent": "user2"
    }, {
        "owner": "Kali",
        "game": "rps",
        "status": "win",
        "opponent": "user2"
    }, {
        "owner": "Kali",
        "game": "rps",
        "status": "win",
        "opponent": "user2"
    }]

    console.log(props.location)
    return (
        <div>
            <Navbar state={props.location} />
            <div className="container">
                <div class="row d-flex justify-content-start">
                    {
                        games.map(game => <GameCard game={game} />)
                    }
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
