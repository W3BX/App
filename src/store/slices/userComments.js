import { createSlice } from "@reduxjs/toolkit";

const newCommnet = createSlice({
    name: 'newCommnet',
    initialState: [],
    reducers: {
        saveComment(state, action) {

           return [state, ...action.payload] 
        },
        emptyComment(state, action){
            return []
        }
    }

})

export const { saveComment, emptyComment } = newCommnet.actions

export default newCommnet.reducer