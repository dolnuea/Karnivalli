import React from 'react';
import './App.css';
import TicTacToe from './webPages/ticTacToe';
import StartGame from './webPages/startGame';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
    return (
    <Router>
        <div className="App">
              <StartGame />
        </div>
        </Router>
    )
}

export default App;
