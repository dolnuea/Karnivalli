import WelcomeScreen from "./pages/WelcomeScreen";
import StartOrJoinScreen from "./pages/StartOrJoinScreen";
import GameSelectionScreen from "./pages/GameSelectionScreen";
import PlayAgainBox from "./PlayAgainBox";
import "./App.css";
import TicTacToe from "./pages/TicTacToe";
import Minesweeper from "./pages/Minesweeper";
import StartGame from "./pages/StartGame";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RockPaperScissor from "./pages/RockPaperScissor";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LogOut from "./pages/Logout";
//import background from "./images/Christmas_background.mp4"
import React from "react"

// to test each page, un-comment the line you want to test

export default function App() {
  return (
    <div className="App">
      {/* <video
        autoPlay
        loop

        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          height: "200%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: "-1"
        }}

      >
        <source src={background} type="video/mp4" />
      </video> */}

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
