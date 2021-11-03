

import WelcomeScreen from "./WelcomeScreen";
import StartOrJoinScreen from "./StartOrJoinScreen.js";
import GameSelectionScreen from "./GameSelectionScreen";
import PlayAgainBox from "./PlayAgainBox";
import "./App.css";
import TicTacToe from "./webPages/ticTacToe";
import Minesweeper from "./webPages/minesweeper";
import StartGame from "./webPages/startGame";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RockPaperScissor from "./webPages/components/RockPaperScissor";
import Login from "./login";
import SignUp from "./signup";
import LogOut from "./logout";

// to test each page, un-comment the line you want to test

export default function App() {
  return (
    <div className="App">
      <Router>
              <Switch>

                  <Route
                      exact
                      path="/"
                      render={(props) => <Login {...props} />}
                  />
                  <Route
                      exact
                      path="/sign-up"
                      render={(props) => <SignUp {...props} />}
                  />
                  <Route
                      exact
                      path="/logout"
                      render={(props) => <LogOut {...props} />}
                  />

          <Route
            exact
            path="/welcome"
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
          <Route
            exact
            path="/minesweeper"
            render={(props) => <Minesweeper {...props} />}
          />
          <Route
            exact
            path="/play-again"
            render={(props) => <PlayAgainBox {...props} />}
                  />
                  <Route
                      exact
                      path="/rock-paper-scissor"
                      render={(props) => <RockPaperScissor {...props} />}
                  />

        </Switch>
      </Router>
    </div>
  );
}
