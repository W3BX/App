import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/user'
import mernSlice from "./slices/mern";
import newComment from "./slices/userComments"
import { reducer as FormReducer } from "redux-form";
import { combineReducers } from "redux";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
    user: userSlice,
    form: FormReducer,
    mern: mernSlice,
    newComment: newComment
})

const persistConfig = {
    key: 'root',
    timeout: 100,
    version: 1,
    storage,

};


const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
})

export default store