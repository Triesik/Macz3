import {createSlice} from "@reduxjs/toolkit";
import {
    create,
    fillBoardAfterRemoval,
    generatorek,
    getMatches,
    removeMatchesFromBoard,
    swapPieces
} from "../boardzik/board.ts";

const gameSlice = createSlice({
    name: 'game',
    initialState: create(generatorek, 7, 7),
    reducers: {
        recreate: (state) => {
            return create(generatorek, 7, 7).boardPositions;
        },
        swap: (state, action) => {
            const {firstPosition, secondPosition} = action.payload;
            const boardzik = swapPieces(state, firstPosition, secondPosition);
            const maczes = getMatches(boardzik, 3);
            return fillBoardAfterRemoval(removeMatchesFromBoard(boardzik, maczes));
        }
    }
})
export const {recreate, swap} = gameSlice.actions;

export default gameSlice.reducer;
