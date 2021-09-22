import WelcomeScreen from "./WelcomeScreen";
import StartOrJoinScreen from "./StartOrJoinScreen.js";
import GameSelectionScreen from "./GameSelectionScreen";
import PlayAgainBox from "./PlayAgainBox";
import "./App.css";
import TicTacToe from "./webPages/ticTacToe";
import StartGame from "./webPages/startGame";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// to test each page, un-comment the line you want to test

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <WelcomeScreen {...props} />}
          />
          <Route
            exact
            path="/start-or-join"
            render={(props) => <StartOrJoinScreen {...props} />}
          />
          <Route
            exact
            path="/game-selection"
            render={(props) => <GameSelectionScreen {...props} />}
          />
          <Route
            exact
            path="/tic-tac-toe"
            render={(props) => <TicTacToe {...props} />}
          />
          {/* <Route
            exact
            path="/rock-paper-scissor"
            render={(props) => <RockPaperScissor {...props} />}
          /> */}
          <Route
            exact
            path="/play-again"
            render={(props) => <PlayAgainBox {...props} />}
          />
        </Switch>
      </Router>
    </div>
  );
}
