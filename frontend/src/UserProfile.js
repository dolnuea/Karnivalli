import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import GameCard from "./GameCard";
import axiosInstance from './axios';


function UserProfile(props) {

    const [games, setGames] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {

        axiosInstance
            .post(`gamedata/game_data_list/`, {
                owner: props.location.state.username
            })
            .then((res) => {
                setGames(JSON.parse(res.data));

                setLoading(false);
                console.log("Inside then.........................")
                //console.log("game data : " + games[0])
                console.log(res)

            });

        
    }, []);



    
    /*
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
    */

    console.log("is loading:" + isLoading)

    if (isLoading) {
        return (
            <div>
                <Navbar state={props.location} />
                <div className="container">
                    <h2> Loading... </h2>
                </div>
            </div>
        );
    }

    console.log("games :" + games)
    return (
        <div>
            <Navbar state={props.location} />
            <div className="container">
                <div className="row d-flex justify-content-start" >
                    {
                        games.map((game) => <GameCard key={game.game_session_id} game={game} playerName={props.location.state.username}/>)
                    }
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
