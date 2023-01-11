import {createSlice} from "@reduxjs/toolkit";
import {create, generatorek, swapPieces} from "../boardzik/board.ts";

const gameSlice = createSlice({
    name: 'game',
    initialState:  create(generatorek, 7, 7),
    reducers: {
        recreate: (state) => {
            return create(generatorek, 7, 7).boardPositions;
        },
        swap: (state, action) =>{
            const {firstPosition, secondPosition}= action.payload;
            return swapPieces( state, firstPosition, secondPosition);
        }
    }
})
export const {recreate, swap} = gameSlice.actions;

export default gameSlice.reducer;
