import { PlayAgainScreen, PlayAgainWinLose, ReplayGameBox } from "./Components/PlayAgain.styles";

const redAlert = () => {
    alert("Let's party!")
};

function PlayAgainBox(props) {
    return (
        <PlayAgainScreen>
            <PlayAgainWinLose onClick={redAlert} >
                <h1>
                    You Won/Lost/Tied! Play again?
                </h1>
            </PlayAgainWinLose>

            <ReplayGameBox onClick={redAlert} >
                <h1>
                    Game Select Screen
                </h1>
            </ReplayGameBox>
        </PlayAgainScreen>
    );
}

export default PlayAgainBox;