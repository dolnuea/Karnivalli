import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import TicTacToe from './ticTacToe';

function StartGame() {

    const [text, setText] = useState('')
    const [playColor, setPlayColor] = useState('')
    let history = useHistory()

    const startGame = () => {

        if (!text) {
            alert('Please add a room number')
            return
        }
        setPlayColor('blue')
        console.log('startGame', text)
        history.push("/play/tictactoe")

        
    }

    const joinGame = () => {

        if (!text) {
            alert('Please add a room number')
            return
        }
        setPlayColor('red')
        console.log('joinGame', text)
        history.push("/play/tictactoe")



    }


    return (
        <div className="StartGame">
            <Switch>
                <Route exact path="/play">
                    <form className='add-form' onSubmit={(e) => {e.preventDefault()}}>
                        <div className='form-control'>
                            <label>Room Number</label>
                            <input
                                type='text'
                                placeholder='Type Room Number '
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>

                        <input type='submit' name='start' value='Start Game' className='btn btn-block' onClick={startGame}/>
                        <input type='submit' name='join' value='Join Game' className='btn btn-block' onClick={joinGame}/>
                    </form>
                </Route>
                <Route path="/play/tictactoe">
                    <TicTacToe roomNumber={text} playColor={playColor}/>
                </Route>

            </Switch>
        </div>
    );
}

export default StartGame;
