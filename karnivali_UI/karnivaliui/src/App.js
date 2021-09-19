import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import TicTacToe from './webPages/ticTacToe';
import StartGame from './webPages/startGame';
import StartJoin from './webPages/components/StartJoin';

function App() {
    return (
        <Router>
            <div className="App">
                <StartGame />
                <StartJoin />
            </div>
        </Router>
    )
}

export default App;
