import { Routes, Route } from "react-router-dom"
import GameScreen from "./GameScreen"
import ScoreBoard from "./ScoreBoard"
import Game from "./Game"
import Login from "./Login"

function App() {
    return (
        <div className="h-full">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="gamescreen" element={<GameScreen />} />
                <Route path="gamescreen/game" element={<Game />} />
                <Route path="gamescreen/scoreboard" element={<ScoreBoard />} />
            </Routes>
        </div>
    )
}

export default App