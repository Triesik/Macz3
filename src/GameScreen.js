import {Link} from "react-router-dom";

function GameScreen() {
    return (
        <div className={"flex flex-col w-full p-10 justify-around gap-32"}>
            <span className={"text-4xl text-center "}>Menu</span>
            <div className={"flex flex-col w-full text-center gap-10"}>
                <Link to="scoreboard">Scoreboard page</Link>
                <Link to="game">Start Game</Link>
            </div>
        </div>
    );
}

export default GameScreen;
