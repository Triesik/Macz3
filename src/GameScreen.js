import { Link } from "react-router-dom";

function GameScreen() {
    return (
        <div>
            <h1>Starting Page</h1>
            <Link to="scoreboard">Scoreboard page</Link>
            <Link to="game">Start Game</Link>
        </div>
    );
}

export default GameScreen;
