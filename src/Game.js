import * as Board from "./boardzik/board.ts";
import { generator } from "./boardzik/generator.ts";
import React, { Component, useState } from "react";

const generateBoard = () => Board.create(generator, 7, 7).boardPositions;

function Game() {

    const [board, setBoard] = useState(generateBoard());
    const [selected, setSelected] = useState([]);

    const handlePieceSelection = (col, row) => {
        if (isPieceSelected(col, row)) return;
        if (selected.length === 2) return setSelected([]);

        setSelected(prev => [...prev, { col, row }]);
    };

    const resetBoard = () => {
        setBoard(generateBoard);
    };

    const isPieceSelected = (col, row) => selected.filter(position => position.col === col && position.row === row).length > 0;

    return (
        <div className="App h-full w-full flex justify-center items-center my-20">
            <div className="flex flex-col gap-6">
                <button onClick={resetBoard} className="gap-10 self-center border border-black p-2">NOWY BOARDZIK
                </button>
                {board.map((col, colIndex) =>
                    <div className="flex gap-6">
                        {col.map((row, rowIndex) =>
                            <button onClick={() => handlePieceSelection(colIndex, rowIndex)}
                                    className={`${isPieceSelected(colIndex, rowIndex) ? "bg-blue text-white" : ""}  w-20 h-20 border-black border flex  items-center text-black  justify-center`}>
                                {row}
                            </button>)}
                    </div>)
                }
            </div>

        </div>
    )
}

export default Game;