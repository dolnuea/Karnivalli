import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import RockPaperScissor from './RockPaperScissor';

export default function StartJoin() {

    const [roomcode, setRoomCode] = useState('')
    const [player, setPlayer] = useState('')
    let history = useHistory()

    const startGame = () => {

        if (!roomcode) {
            alert('Please add a room number')
            return
        }
        setPlayer('p1')
        console.log('startGame', roomcode)
        history.push("/rps/")
    }

    const joinGame = () => {

        if (!roomcode) {
            alert('Please add a room number')
            return
        }

        setPlayer('p2')
        console.log('joinGame', roomcode)
        history.push("/rps")
    }

    return (
        <div>
            <Switch>
                <Route exact path="/gamerps">
                    <form onSubmit={(e) => { e.preventDefault() }}>
                        <div>
                            <label>Room Number</label>
                            <input
                                type='text'
                                placeholder='Type Room Name '
                                value={roomcode}
                                onChange={(e) => setRoomCode(e.target.value)}
                            />
                        </div>

                        <input type='submit' name='start' value='Start Game' onClick={startGame} />
                        <input type='submit' name='join' value='Join Game' onClick={joinGame} />
                    </form>
                </Route>
                <Route exact path="/rps">
                    <RockPaperScissor roomCode={roomcode} player={player} />
                </Route>

            </Switch>
        </div>
    )
}
