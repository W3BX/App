import { createSlice } from "@reduxjs/toolkit";
import MERN from "./data";

const initialState = {
    mern: MERN.MONGO
}

const mernSlice = createSlice({
    name: 'mern',
    initialState: initialState,
    reducers: {
        showMern(state, action) {
            if (action.payload == 'mongo') {
                state.mern = MERN.MONGO
            } else if (action.payload == 'express') {
                state.mern = MERN.EXPRESS
            } else if (action.payload == 'react') {
                state.mern = MERN.REACT
            } else if (action.payload == 'node') {
                state.mern = MERN.NODE
            }
        }
    }
})

export const { showMern } = mernSlice.actions

export default mernSlice.reducer
