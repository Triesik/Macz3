import {createSlice} from "@reduxjs/toolkit";
import {GetScoreBoard} from "../service/ScoreBoardService";

const scoreboardSlice = createSlice({
    name: 'scoreboard',
    initialState: await GetScoreBoard(),
    reducers: {
        insertGame: (state, action) => {
            //odpakuj payload jak w game slice
            await InsertGame(action.payload);
            return await FetchScoreboard();
        },
        refresh: (state)=> {
            return await GetScoreBoard();
        }
    }
})
export const {insertGame} = gameSlice.actions;

export default scoreboardSlice.reducer;
