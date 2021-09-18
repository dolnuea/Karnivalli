import WelcomeScreen from "./WelcomeScreen";
import StartOrJoinScreen from "./StartOrJoinScreen.js";
import PlayAgainBox from "./PlayAgainBox";
import './App.css';
import TicTacToe from './webPages/ticTacToe';
import StartGame from './webPages/startGame';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


// to test each page, un-comment the line you want to test

function App() {
  return (
    <div>

          {/*   <PlayAgainBox />*/}

      {/* <StartOrJoinScreen /> */}

          {/* <WelcomeScreen />  */}

          {/* <StartGame /> */}

          <Router>
              <div className="App">
                  <StartOrJoinScreen />
              </div>
          </Router>


    </div>
  );
}

export default App;
