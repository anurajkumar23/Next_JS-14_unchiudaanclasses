import { userSlice } from "./slices/userSlices";
import { configureStore,combineReducers } from "@reduxjs/toolkit";
// import {persistReducer} from 'redux-persist'

// import storage from 'redux-persist/lib/storage'


// const persistConfig={
//     key:'root',storage
// }


const rootReducer = combineReducers({
    [userSlice.reducerPath]: userSlice.reducer
})
// const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:rootReducer,
    middleware: getDefaultMiddleware=>getDefaultMiddleware().concat(userSlice.middleware)
})

export const RootState = store.getState
export const AppDispatch = store.dispatch