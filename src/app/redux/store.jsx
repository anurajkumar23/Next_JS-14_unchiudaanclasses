import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { currentAffairsApi } from "./slices/currentAffairsApi";
import { pdfApi } from "./slices/pdfApi";
import {userSlice} from "./slices/userSlices"

const rootReducer = combineReducers({
    [currentAffairsApi.reducerPath]: currentAffairsApi.reducer,
    [pdfApi.reducerPath]: pdfApi.reducer,
    [userSlice.reducerPath]: userSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            currentAffairsApi.middleware, 
            pdfApi.middleware,
            userSlice.middleware
        )
});

setupListeners(store.dispatch);

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
