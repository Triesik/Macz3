import { Routes, Route } from "react-router-dom"
import GameScreen from "./GameScreen"
import Stuff from "./Stuff"
import Game from "./Game"
import Login from "./Login"

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={ <Login/> } />
                <Route path="gamescreen" element={ <GameScreen/> } />
                <Route path="game" element={ <Game/> } />
                <Route path="scoreboard" element={ <ScoreBoard/> } />
            </Routes>
        </div>
    )
}

export default App