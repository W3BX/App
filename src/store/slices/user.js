import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {},
    islogged: false
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        userdetail(state, action) {
            state.value = action.payload;
            state.islogged = true
        },
        logoutuser(state, action) {
            state.value = {};
            state.islogged = false
        },
        loaduser(state, action) {
           console.log(action.payload)
        }
    }
})

export const { userdetail, logoutuser, loaduser } = userSlice.actions

export default userSlice.reducer
