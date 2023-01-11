import React, {useState} from 'react'

function ScoreBoard() {

    const [scores, setScores] = useState([]);

    return (
        <ul>
            {scores.map((score, index) => (
                <li key={index}>
                    <div>Username: {score.username}</div>
                    <div>Score: {score.score}</div>
                </li>
            ))}
        </ul>
    )
}

export default ScoreBoard